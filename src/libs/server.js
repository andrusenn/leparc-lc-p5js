/**
 * Script server.js
 * 
 * Se encarga de administrar
 * los clientes conectados para el envio de datos y
 * acciones
 * 
 */
const path = require('path')
const express = require('express');
const app = express();
const SocketIo = require('socket.io')

// inicia el servidor
let sio
let lp5
let server
function initServer(_lp5) {
      lp5 = _lp5

      // Settings
      app.set('port', lp5.configs['port'])
      app.use(express.static(path.join(__dirname, '/')))

      server = app.listen(app.get('port'), () => {
            console.log('servidor en puerto', app.get('port'))
      })
      sio = SocketIo(server)

      // websockets
      sio.sockets.on('connection', socket => {
            // Marcadores------------------------------------------------------
            lp5.markers[socket.id.toString()] = {
                  el: document.createElement('span')
            }

            lp5.markers[socket.id.toString()].el.setAttribute('class', 'client-cursor')
            lp5.markers[socket.id.toString()].el.setAttribute('id', socket.id.toString())
            // lp5.markers[socket.id.toString()].el.innerHTML = '<span class="label">' + socket.id.toString() + '</span>'

            socket.on('disconnect', () => {
                  // Remueve marcador
                  lp5.markers[socket.id.toString()] = null
                  var el = document.getElementById(socket.id.toString());
                  el.parentElement.removeChild(el);
            })
            // --------------------------------------------------------------------
            // Primera conexion ----------------------
            // envia codigo del servidor
            let o = {
                  frameSync: frameCount,
                  codeSetup: lp5.cmSetup.getValue(),
                  codeDraw: lp5.cmDraw.getValue(),
                  codeAux: lp5.cmAux.getValue()
            }
            sio.emit('broadcast', o)
            //----------------------------------------

            // recive desde cliente
            socket.on('liveleparc1', data => {
                  lp5.cmSetup.setValue(data.codeSetup)
                  lp5.cmDraw.setValue(data.codeDraw)
                  lp5.cmAux.setValue(data.codeAux)

                  // Restaurar cursor local despues de la actualizacion
                  lp5.restoreCursor(lp5.cmSetup, lp5.cmSetupCp)
                  lp5.restoreCursor(lp5.cmDraw, lp5.cmDrawCp)
                  lp5.restoreCursor(lp5.cmAux, lp5.cmAuxCp)

                  // Actualiza marcadores -----------------------------------
                  let label = (data.nodeName != '') ? data.nodeName : data.id
                  lp5.markers[data.id.toString()].el.innerHTML = '<span class="label">' + label + '</span>'
                  //console.log(data.cmContext)
                  if (data.cmContext) {
                        if (data.cmContext == 'draw') lp5.cmDraw.setBookmark(data.cDraw, { widget: lp5.markers[data.id.toString()].el })
                        if (data.cmContext == 'setup') lp5.cmSetup.setBookmark(data.cSetup, { widget: lp5.markers[data.id.toString()].el })
                        if (data.cmContext == 'aux') lp5.cmAux.setBookmark(data.cAux, { widget: lp5.markers[data.id.toString()].el })
                  }
                  // Reenvia la actualizacion a clientes
                  let o = {
                        // ID
                        id: socket.id,
                        cmContext: lp5.cmFocused,
                        frameSync: frameCount,
                        codeSetup: data.codeSetup,
                        codeDraw: data.codeDraw,
                        codeAux: data.codeAux
                  }
                  socket.broadcast.emit('liveleparc1', o)
            })
            // Eval

            socket.on('eval', eval => {
                  if (eval == 'draw') lp5.evalDraw()
                  if (eval == 'setup') lp5.evalSetup()
                  if (eval == 'aux') lp5.evalAux()
                  // Reenvia la actualizacion a clientes
                  socket.broadcast.emit('eval', eval)
            })
      })
      // Sync
      // Sincroniza frameCount con clientes
      setInterval(function () {
            sio.emit('sync', frameCount)
      }, 1000)
}
exports.setBookmark = function () {
      let el = document.createElement('span')
      el.innerHTML = '<span class="D-cursor" style="border-color:#fff"></span>'
}
exports.eval = function (_b) {
      //socket.close()
      sio.emit('eval', _b)
}
exports.close = function () {
      server.close()
}
exports.initServer = function (lp5) {
      initServer(lp5)
}
exports.sendClient = function (fc) {
      // envia a cliente    
      let cSetup = lp5.cmSetup.getCursor()
      let cDraw = lp5.cmDraw.getCursor()
      let cAux = lp5.cmAux.getCursor()

      let o = {
            cmContext: lp5.cmFocused,
            //
            frameSync: fc,
            codeSetup: lp5.cmSetup.getValue(),
            codeDraw: lp5.cmDraw.getValue(),
            codeAux: lp5.cmAux.getValue(),
            // cursores
            cSetup: cSetup,
            cDraw: cDraw,
            cAux: cAux,
            nodeName: Lp5.nodeName
      }
      sio.emit('liveleparc1', o)
}

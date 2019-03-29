const path = require('path')
const express = require('express');
const app = express();
const SocketIo = require('socket.io')

// inicia el servidor
let sio
let dp5
let server
function initServer(_dp5) {
      dp5 = _dp5

      // Settings
      app.set('port', dp5.configs['port'])
      app.use(express.static(path.join(__dirname, '/')))

      server = app.listen(app.get('port'), () => {
            console.log('servidor en puerto', app.get('port'))
      })
      sio = SocketIo(server)

      // websockets
      sio.sockets.on('connection', socket => {
            // Marcadores------------------------------------------------------
            dp5.markers[socket.id.toString()] = {
                  el: document.createElement('span')
            }

            dp5.markers[socket.id.toString()].el.setAttribute('class', 'client-cursor')
            dp5.markers[socket.id.toString()].el.setAttribute('id', socket.id.toString())
            // dp5.markers[socket.id.toString()].el.innerHTML = '<span class="label">' + socket.id.toString() + '</span>'

            socket.on('disconnect', () => {
                  // Remueve marcador
                  dp5.markers[socket.id.toString()] = null
                  var el = document.getElementById(socket.id.toString());
                  el.parentElement.removeChild(el);
            })
            // --------------------------------------------------------------------
            // Primera conexion ----------------------
            // envia codigo del servidor
            let o = {
                  frameSync: frameCount,
                  codeSetup: dp5.cmSetup.getValue(),
                  codeDraw: dp5.cmDraw.getValue(),
                  codeAux: dp5.cmAux.getValue()
            }
            socket.broadcast.emit('broadcast', o)
            //----------------------------------------

            // recive desde cliente
            socket.on('liveleparc1', data => {
                  dp5.cmSetup.setValue(data.codeSetup)
                  dp5.cmDraw.setValue(data.codeDraw)
                  dp5.cmAux.setValue(data.codeAux)

                  // Restaurar cursor local despues de la actualizacion
                  dp5.restoreCursor(dp5.cmSetup, dp5.cmSetupCp)
                  dp5.restoreCursor(dp5.cmDraw, dp5.cmDrawCp)
                  dp5.restoreCursor(dp5.cmAux, dp5.cmAuxCp)

                  // Actualiza marcadores -----------------------------------
                  let label = (data.nodeName != '') ? data.nodeName : data.id
                  dp5.markers[data.id.toString()].el.innerHTML = '<span class="label">' + label + '</span>'
                  //console.log(data.cmContext)
                  if (data.cmContext) {
                        if (data.cmContext == 'draw') dp5.cmDraw.setBookmark(data.cDraw, { widget: dp5.markers[data.id.toString()].el })
                        if (data.cmContext == 'setup') dp5.cmSetup.setBookmark(data.cSetup, { widget: dp5.markers[data.id.toString()].el })
                        if (data.cmContext == 'aux') dp5.cmAux.setBookmark(data.cAux, { widget: dp5.markers[data.id.toString()].el })
                  }
                  // Reenvia la actualizacion a clientes
                  let o = {
                        // ID
                        id: socket.id,
                        cmContext: dp5.cmFocused,
                        frameSync: frameCount,
                        codeSetup: data.codeSetup,
                        codeDraw: data.codeDraw,
                        codeAux: data.codeAux
                  }
                  socket.broadcast.emit('liveleparc1', o)
            })
            // Eval

            socket.on('eval', eval => {
                  if (eval == 'draw') dp5.evalDraw()
                  if (eval == 'setup') dp5.evalSetup()
                  if (eval == 'aux') dp5.evalAux()
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
exports.initServer = function (dp5) {
      initServer(dp5)
}
exports.sendClient = function (fc) {
      // envia a cliente    
      let cSetup = dp5.cmSetup.getCursor()
      let cDraw = dp5.cmDraw.getCursor()
      let cAux = dp5.cmAux.getCursor()

      let o = {
            cmContext: dp5.cmFocused,
            //
            frameSync: fc,
            codeSetup: dp5.cmSetup.getValue(),
            codeDraw: dp5.cmDraw.getValue(),
            codeAux: dp5.cmAux.getValue(),
            // cursores
            cSetup: cSetup,
            cDraw: cDraw,
            cAux: cAux,
            nodeName: Dp5.nodeName
      }
      sio.emit('liveleparc1', o)
}

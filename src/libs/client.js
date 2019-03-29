/**
 * Script client.js
 * 
 * Se encarga de administrar
 * el envío de datos y acciones al servidos
 * 
 */
let socket = null;
let lp5
// let cursor = { line: 0, ch: 0 }
function connect(_lp5) {
      lp5 = _lp5
      socket = io('http://' + lp5.configs['server-ip'] + ':' + lp5.configs['port']);
      // recive desde servidor
      socket.on('liveleparc1', data => {
            //console.log('recive servidor', 'codigo')
            lp5.cmSetup.setValue(data.codeSetup)
            lp5.cmDraw.setValue(data.codeDraw)
            lp5.cmAux.setValue(data.codeAux)
            // sincroniza
            if(Lp5.sync) frameCount = data.frameSync
            // Restaurar cursor local despues de la actualizacion
            lp5.restoreCursor(lp5.cmSetup, lp5.cmSetupCp)
            lp5.restoreCursor(lp5.cmDraw, lp5.cmDrawCp)
            lp5.restoreCursor(lp5.cmAux, lp5.cmAuxCp)
      })
      socket.on('broadcast', data => {
            //console.log('recive servidor', 'codigo')
            lp5.cmSetup.setValue(data.codeSetup)
            lp5.cmDraw.setValue(data.codeDraw)
            lp5.cmAux.setValue(data.codeAux)
            // Restaurar cursor local despues de la actualizacion
            lp5.restoreCursor(lp5.cmSetup, lp5.cmSetupCp)
            lp5.restoreCursor(lp5.cmDraw, lp5.cmDrawCp)
            lp5.restoreCursor(lp5.cmAux, lp5.cmAuxCp)
      })
      socket.on('eval', eval => {
            if(eval == 'draw') lp5.evalDraw()
            if(eval == 'setup') lp5.evalSetup()
            if(eval == 'aux') lp5.evalAux()
      })
      // Sincroniza frameCount con servidor
      socket.on('sync', fc => {
            if(Lp5.sync) frameCount = fc
      })
}
exports.connect = function (lp5) {
      connect(lp5)
}
exports.close = function () {
      socket.close()
}
exports.eval = function (_b) {
      socket.emit('eval', _b)
}
exports.sendServer = function () {
      // cursores 
      let cSetup = lp5.cmSetup.getCursor()
      let cDraw = lp5.cmDraw.getCursor()
      let cAux = lp5.cmAux.getCursor()

      let o = {
            // ID
            id: socket.id,
            cmContext: lp5.cmFocused,
            // bloques
            codeSetup: lp5.cmSetup.getValue(),
            codeDraw: lp5.cmDraw.getValue(),
            codeAux: lp5.cmAux.getValue(),
            // cursores
            cSetup: cSetup,
            cDraw: cDraw,
            cAux: cAux,
            nodeName: Lp5.nodeName
      }
      // if (socket) {
      socket.emit('liveleparc1', o)
      // }
}

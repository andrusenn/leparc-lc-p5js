let socket = null;
let dp5
// let cursor = { line: 0, ch: 0 }
function connect(_dp5) {
      dp5 = _dp5
      socket = io('http://' + dp5.configs['server-ip'] + ':' + dp5.configs['port']);
      // recive desde servidor
      socket.on('liveleparc1', data => {
            //console.log('recive servidor', 'codigo')
            dp5.cmSetup.setValue(data.codeSetup)
            dp5.cmDraw.setValue(data.codeDraw)
            dp5.cmAux.setValue(data.codeAux)
            // sincroniza
            if(Dp5.sync) frameCount = data.frameSync
            // Restaurar cursor local despues de la actualizacion
            dp5.restoreCursor(dp5.cmSetup, dp5.cmSetupCp)
            dp5.restoreCursor(dp5.cmDraw, dp5.cmDrawCp)
            dp5.restoreCursor(dp5.cmAux, dp5.cmAuxCp)
      })
      socket.on('broadcast', data => {
            //console.log('recive servidor', 'codigo')
            dp5.cmSetup.setValue(data.codeSetup)
            dp5.cmDraw.setValue(data.codeDraw)
            dp5.cmAux.setValue(data.codeAux)
            // Restaurar cursor local despues de la actualizacion
            dp5.restoreCursor(dp5.cmSetup, dp5.cmSetupCp)
            dp5.restoreCursor(dp5.cmDraw, dp5.cmDrawCp)
            dp5.restoreCursor(dp5.cmAux, dp5.cmAuxCp)
      })
      socket.on('eval', eval => {
            if(eval == 'draw') dp5.evalDraw()
            if(eval == 'setup') dp5.evalSetup()
            if(eval == 'aux') dp5.evalAux()
      })
      // Sincroniza frameCount con servidor
      socket.on('sync', fc => {
            if(Dp5.sync) frameCount = fc
      })
}
exports.connect = function (dp5) {
      connect(dp5)
}
exports.close = function () {
      socket.close()
}
exports.eval = function (_b) {
      socket.emit('eval', _b)
}
exports.sendServer = function () {
      // cursores 
      let cSetup = dp5.cmSetup.getCursor()
      let cDraw = dp5.cmDraw.getCursor()
      let cAux = dp5.cmAux.getCursor()

      let o = {
            // ID
            id: socket.id,
            cmContext: dp5.cmFocused,
            // bloques
            codeSetup: dp5.cmSetup.getValue(),
            codeDraw: dp5.cmDraw.getValue(),
            codeAux: dp5.cmAux.getValue(),
            // cursores
            cSetup: cSetup,
            cDraw: cDraw,
            cAux: cAux,
            nodeName: Dp5.nodeName
      }
      // if (socket) {
      socket.emit('liveleparc1', o)
      // }
}

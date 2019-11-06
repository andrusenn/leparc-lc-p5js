function GlitchCut() {
      let arg = arguments
      let mx = random(width)
      let my = random(height)
      let w = random(20,width)
      let h = random(20,500)
      if (arg.length > 0) {
            w = arg[0]
            h = arg[1]
      }
      //if(pulse(int(random(20,60)),int(random(300,660)))){
            let x = int(random(width))
            let y = int(random(height))
            let i = get(x,y,w,h)
            image(i,x+random(-20,20),y+random(-20,20))
      //}
}
// hacer global / make global
if (!global.hasOwnProperty('GlitchCut')) {
      global.GlitchCut = GlitchCut
}
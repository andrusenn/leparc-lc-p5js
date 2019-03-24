class Duchamp{
      contructor(){}
      img(x,y){
            loadImage(libPath('duchamp') + 'roto.png',(img)=>{
                  push()
                  imageMode(CENTER)
                  image(img,x,y)
                  pop()
            })
      }
}
dlc = new Duchamp()
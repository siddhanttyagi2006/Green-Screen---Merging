var Image1 = null;
var Image2 = null;
var Box1;
var Box2;
var Box3;

function F1loadimage()
{
  var img1 = document.getElementById("frontfile");
  Image1 = new SimpleImage(img1);
  Box1 = document.getElementById("can1");
  Image1.drawTo(Box1);
}

function F2loadimage()
{
  var img2 = document.getElementById("backfile");
  Image2 = new SimpleImage(img2);
  Box2 = document.getElementById("can2");
  Image2.drawTo(Box2);
}

function CombinePics()
{
  var output = new SimpleImage(Image1.getWidth(),Image1.getHeight());
  var Threshold = 220;
  for (var pixel of Image1.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > Threshold && pixel.getBlue() < 100 && pixel.getRed() < 100) {
      var backgPixel = Image2.getPixel(x,y);
      output.setPixel(x,y,backgPixel);
    }
    else {
      output.setPixel(x,y,pixel);
    }
  }
  return output;
}

function checkinputs() {
  if (Image1 == null  || ! Image1.complete()) {
    alert("Image 1 not loaded");
  }
  if (Image2 == null || ! Image2.complete()) {
    alert("Image 2 not loaded");
  }
  var Image3 = CombinePics();
  Box3 = document.getElementById("can3");
  Image3.drawTo(Box3);
}

function clearScreen() {
  doClear(Box1);
  doClear(Box2);
  doClear(Box3);
}

function doClear(cnvs) {
  var context = cnvs.getContext("2d");
  context.clearRect(0,0,cnvs.width,cnvs.height);
}
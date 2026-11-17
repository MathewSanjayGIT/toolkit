// Show background color only for Fit mode

document.getElementById("mode").addEventListener("change", function () { const bgSection = document.getElementById("bgSection");

const cropSection = document.getElementById("cropSection");

if (this.value === "fit") {

bgSection.style.display="block";

cropSection.style.display = "none";

} else if (this.value === "crop") {

bgSection.style.display = "none";

cropSection.style.display = "block";

} else {

bgSection.style.display = "none";

cropSection.style.display = "none";

}

});

document.getElementById("mode").dispatchEvent(new Event("change"));

// Set initial state

document.getElementById("mode").dispatchEvent(new Event("change"));
document.getElementById("bgType").addEventListener("change",
                                          function (){
                                            const bgColorSection = document.getElementById("bgColorSection");
                                            bgColorSection.style.display = this.value === "color" ? "block" : "none";
                                          });
function processImage() {

const file = document.getElementById("imageInput").files[0];

if (!file) {

alert("Please select an image");

return;

}

const targetWidth = parseInt(document.getElementById("width").value);

const targetHeight = parseInt(document.getElementById("height").value);

const mode = document.getElementById("mode").value;

const reader = new FileReader();

reader.onload = function (e) {

const img = new Image();

img.onload = function () {

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

canvas.width = targetWidth;

canvas.height = targetHeight;

ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";

ctx.clearRect(0, 0, targetWidth, targetHeight);

//

// STRETCH

//

if (mode === "stretch") {

ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

}

//

// CROP

//

else if (mode === "crop") {

const scale = Math.max( targetWidth / img.width, targetHeight / img.height,);

const newWidth = img.width * scale;

const newHeight = img.height * scale;

const cropPosition = document.getElementById("cropPosition").value;

const x = (targetWidth - newWidth) / 2;

let y;

if (cropPosition === "top") {

y=0;

} else if (cropPosition === "bottom") {

y = targetHeight - newHeight;

} else {

y = (targetHeight - newHeight) / 2;

}

ctx.drawImage(img, x, y, newWidth, newHeight); }

//

// FIT

//

else if (mode === "fit") {
  const bgType = document.getElementById("bgType").value;
  if (bgType === "color") {

const bgColor = document.getElementById("bgColor").value;

ctx.fillStyle = bgColor;

ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else {
// transparent bg
    ctx.clearRect(0, 0, targetWidth, targetHeight);
  }
const scale = Math.min(

targetWidth / img.width,
targetHeight / img.height, );

const newWidth = img.width* scale;

const newHeight = img.height * scale;

const x = (targetWidth - newWidth) / 2;

const y = (targetHeight - newHeight) / 2;

ctx.drawImage(img, x, y, newWidth, newHeight); }

};

img.src = e.target.result; };

reader.readAsDataURL(file);

}

function downloadImage() {

const canvas = document.getElementById("canvas");

const link = document.createElement("a");

link.download = "output.png";

link.href = canvas.toDataURL("image/png");

link.click();

}

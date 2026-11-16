async function compressImage() {

const file document.getElementById("imageInput").files[0];

if (!file) {

alert("Please select an image");

return;

}

const targetKB = parseInt(document.getElementById("targetSize").value);

const img = await loadImage(file);

const canvas document.createElement("canvas");

const ctx canvas.getContext("2d");

canvas.width img.width;

canvas.height = img.height;

ctx.drawImage(img, 0, 0);

let min 0.05; let max = 1.0;

let bestBlob = null;

for (let i=0; i < 20; i++) { const quality (min + max) / 2;

const blob await canvasToBlob(canvas, quality);

const sizeKB blob.size/ 1024;

I

if (sizeKB > targetKB) {

max = quality;

} else {

bestBlob blob;

} min = quality;

if (lbestBlob) {

alert("Could not reach target size.");

return;

const compressedKB = (bestBlob.size / 1024).toFixed(1);
document.getElementById("result").innerHTML =

}

Original Image:

${(file.size / 1024).toFixed(1)) кв <br> ;

Compressed to: ${compressedKB) KB

const link = document.createElement("a");

link.href = URL.createObjectURL(bestBlob);

link.download "compressed.jpg";

link.click();

function loadImage(file) {

return new Promise((resolve) => { const reader new FileReader();

reader.onload = function (e) { const img new Image();

img.onload = () => resolve(img);

}; img.srce.target.result;

}); reader.readAsDataURL(file);

function canvasToBlob(canvas, quality) { return new Promise((resolve) => { canvas.toBlob(resolve, "image/jpeg", quality); }); }
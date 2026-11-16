function addBorder() {

const file = document.getElementById("imageInput").files[0];

if (!file) {

alert("Please select an image");

return;
}

const borderWidth = parseInt(document.getElementById("borderWidth").value);

const borderColor = document.getElementById("borderColor").value;

const reader = new FileReader();

reader.onload = function (e) { const img = new Image();

img.onload = function () { const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

canvas.width = img.width + borderWidth * 2;

canvas.height = img.height + borderwidth * 2;

// Border Background 
ctx.fillstyle = borderColor;

ctx.fillRect(0, 0, canvas.width, canvas.height);

// Original Image

ctx.drawImage(img, borderWidth, borderWidth); };

img.src = e.target.result;

};

reader.readAsDataURL(file);
}

function downloadImage() {

const canvas = document.getElementById("canvas");

const link = document.createElement("a");

link.download = "bordered-image.png";

link.href = canvas.toDataURL("image/png");

link.click();

}

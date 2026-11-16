function generateCard() {

const file = document.getElementById("imageInput").files[0];

if (!file) {

alert("Select an image");

return;
}

const preset = document.getElementById("qualityPreset").value;

const [TARGET_WIDTH, TARGET_HEIGHT] = preset.split(",").map(Number);

const INNER_BORDER= parseInt(document.getElementById("innerBorder").value);

const OUTER_BORDER = parseInt(document.getElementById("outerBorder").value);

const GAP = parseInt(document.getElementById("gap").value);

const BG_COLOR = document.getElementById("bgColor").value;

const BORDER_COLOR = document.getElementById("borderColor").value;

const reader = new FileReader();

reader.onload = function (e) {

const img = new Image();

img.onload = function () {
	
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

canvas.width = TARGET_WIDTH;

canvas.height = TARGET_HEIGHT;

ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";

const canvasWidth = TARGET_WIDTH - OUTER_BORDER * 2;

const canvasHeight = TARGET_HEIGHT - OUTER_BORDER * 2;

const maxingWidth = canvasWidth - GAP * 2 - INNER_BORDER * 2;

const maxImgHeight = canvasHeight - GAP * 2 - INNER_BORDER * 2;

const ratio = Math.min( maxingWidth/img.width, maxImgHeight/img.height,);

const imgwidth = img.width * ratio;

const imgHeight = img.height * ratio;

// OUTER BORDER

ctx.fillstyle = BORDER_COLOR;

ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);

//CARD BACKGROUND

ctx.fillStyle = BG_COLOR;

ctx.fillRect(OUTER_BORDER, OUTER_BORDER, canvasWidth, canvasHeight);

const imagex=

OUTER_BORDER + (canvasWidth - (imgWidth + INNER_BORDER * 2)) / 2;

const image = OUTER_BORDER + (canvasHeight - (imgHeight + INNER_BORDER * 2)) / 2;

// INNER BORDER

ctx.fillStyle = BORDER_COLOR;

ctx.fillRect( imagex, imageY, imgWidth + INNER_BORDER * 2, imgHeight + INNER_BORDER * 2, );

// IMAGE

ctx.drawImage( img, imagex INNER_BORDER, imageY+ INNER_BORDER, imgWidth, imgHeight, );

};

img.src = e.target.result; };

reader.readAsDataURL (file);

}

function downloadImage() {

const canvas = document.getElementById("canvas");

const link = document.createElement("a");

link.download = "output.png";

link.href = canvas.toDataURL("image/png");

link.click();

}

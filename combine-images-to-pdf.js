async function createPDF() {

const files = Array.from(document.getElementById("images").files);

files.sort((a, b) =>

a.name.localeCompare( b.name, undefined, { numeric: true, sensitivity: "base" }

)

);

if (!files.length) { alert("Please select images"); return; }

const pdfDoc =

await PDELib.PDFDocument.create();

for (const file of files) {

const imageBytes = await file.arrayBuffer();

let image;

let dims;

if (

file.type === "image/png"

) {

image = await pdfDoc.embedPng( imageBytes );

dims = image.scale(1);

} else {

image = await pdfDoc.embedJpg( imageBytes );

dims image.scale(1);

}

const page =

pdfDoc.addPage([

dims.width,

dims.height

]);

page.drawImage(

image,

{

x: 0,

y: 0,

width: dims.width,

height: dims.height

}

);

}

const pdfBytes =

await pdfDoc.save();

const blob =

new Blob(

[pdfBytes],

{ 

type: "application/pdf"

}

);

const url =

URL.createObjectURL(blob);

const a =

document.createElement("a");

a.href = url;

a.download = "combined.pdf";

a.click();

URL.revokeobjectURL(url);
}

function readFile(file) {

return new Promise((resolve) => { const reader = new FileReader();

reader.onload = (e) => resolve(e.target.result);

reader.readAsDataURL(file); });

}

function loadImage(src) { return new Promise((resolve) => { const img = new Image();

img.onload = () => resolve(img);
img.src = src;
});
}

async function createPDF() {

const files = Array.from(document.getElementById("images").files);

files.sort((a, b) =>

a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base", }), );

if (files.length === 0) { alert("Please select images"); return; }

const {jsPDF} = window.jspdf;

let pdf = null;

for (let i=0; i < files.length; i++) {

const imageUrl = await readFile(files[i]);

const img = await loadImage(imageUrl);

// Create first PDF page using image dimensions 
  if (i === 0) {

pdf = new jsPDF({ orientation: img.width > img.height? "landscape": "portrait",

unit: "px", format: [img.width, img.height], });

} else { pdf.addPage( [img.width, img.height], img.width > img.height? "landscape": "portrait",
);
}

pdf.addImage(imageUrl, "PNG", 0, 0, img.width, img.height);

pdf.save("combined.pdf");

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

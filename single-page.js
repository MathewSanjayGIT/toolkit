async function convertPDF() {
 const loader = document.getElementById("loader");
 loader.style.display = "flex";
 try {

const file = document.getElementById("pdfFile").files[0];

if (!file) { alert("Please select a PDF");

return; }

const scale = parseFloat(document.getElementById("quality").value);

const arrayBuffer = await file.arrayBuffer();

const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, }).promise;

const pageCanvases = [];

let totalHeight = 0; let maxWidth = 0;

// Render all pages

for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) { const page = await pdf.getPage(pageNum);

const viewport = page.getViewport({
scale: scale, 
 });

const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");

canvas.width = viewport.width;

canvas.height = viewport.height;

await page.render({ canvasContext: ctx, viewport: viewport, }).promise;

pageCanvases.push(canvas);

totalHeight += canvas.height;

maxWidth = Math.max(maxWidth, canvas.width);
}

// Create final canvas

const finalCanvas = document.createElement("canvas");

const finalCtx = finalCanvas.getContext("2d");

finalCanvas.width = maxWidth;

finalCanvas.height = totalHeight;

finalCtx.fillStyle = "#ffffff";

finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

// Stitch pages vertically

let currentY = 0;

for (const canvas of pageCanvases) { const x = (maxWidth - canvas.width) / 2;

finalCtx.drawImage(canvas, x, currentY);

currentY += canvas.height;

}

// Download PNG

const link = document.createElement("a");

link.download = file.name.replace(/\.pdf$/i, "") + "-combined.png"; 

link.href = finalCanvas.toDataURL("image/png"); 

link.click();

alert(pdf.numPages + " page(s) combined into one PNG.");

} catch (error){
  console.error(error);
  alert("An error occured while processing the pdf.");
 } finally {
  loader.style.display = "none";
 }
}

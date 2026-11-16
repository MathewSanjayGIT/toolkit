async function convertPDF() {

const file = document.getElementById("pdfFile").files[0];

if (!file) { alert("Please select a PDF"); return;}

const scale = parseFloat(document.getElementById("quality").value);

const output = document.getElementById("output");

output.innerHTML = "";

const arrayBuffer = await file.arrayBuffer();

const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, }).promise;

for (let pageNum= 1; pageNum <= pdf.numPages; pageNum++) { const page = await pdf.getPage(pageNum);

const viewport = page.getViewport({ scale: scale, });

const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");

canvas.width = viewport.width;

canvas.height = viewport.height;

await page.render({ canvasContext: ctx, viewport: viewport, }).promise;

output.appendChild(canvas);

const downloadBtn = document.createElement("button");

downloadBtn.innerText = "Download Page " + pageNum;

downloadBtn.onclick = function () { const link = document.createElement("a"); 

link.download = "page-" + pageNum + ".png"; 

link.href = canvas.toDataURL("image/png");

link.click();
};
output.appendChild(downloadBtn);

output.appendChild(document.createElement("br"));

output.appendChild(document.createElement("br")); }

alert(pdf.numPages + "page(s) converted successfully");
}

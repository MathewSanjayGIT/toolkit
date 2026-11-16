async function convertPDF() {

const loader = document.getElementById("loader");

loader.style.display = "flex";

const convertButton = document.querySelector( ); "button[onclick='convertPDF()']",
);
convertButton.disabled = true;

try {

const file = document.getElementById("pdfFile").files[0];
if (!file) { alert("Please select a PDF");

return; }

const scale = parseFloat(document.getElementById("quality").value);

const arrayBuffer = await file.arrayBuffer();

const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, }).promise;

const zip = new JSZip();

for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) { const page = await pdf.getPage(pageNum);

const viewport = page.getViewport({
  scale: scale,
  });

const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");

canvas.width = viewport.width;

canvas.height = viewport.height;

await page.render({ canvasContext: ctx, viewport: viewport, }).promise;

const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"), );

zip.file(`page-${pageNum}.png`, blob);
}

const zipBlob = await zip.generateAsync({ type: "blob", });

const link = document.createElement("a");

link.href = URL.createObjectURL(zipBlob);

link.download = file.name.replace(/\.pdf$/i, "") + ".zip";

link.click();

URL.revokeObjectURL(link.href);

alert(pdf.numPages + "page(s) added to ZIP successfully.");
} catch (error) { console.error(error);

alert("An error occurred while converting the PDF."); } finally {

loader.style.display = "none";

convertButton.disabled = false;

}

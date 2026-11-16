function generateQR() {

const url = document.getElementById("url").value.trim();

if (!url) {

alert("Please enter a URL");

return;

}

const canvas = document.getElementById("qrCanvas");

// Clear previous QR

const ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, canvas.width, canvas.height);

QRCode.toCanvas (

canvas,

url,

{

width: 500,

},
 function (error) {
 	if (error) { 

console.error(error);
return;

}



document.getElementById("downloadBtn").style.display= "inline-block";
},
);
}

function downloadQR() {

const canvas = document.getElementById("qrCanvas");

const link = document.createElement("a");

link.download = "qr-code.png";

link.href = canvas.toDataURL("image/png");

link.click();

}

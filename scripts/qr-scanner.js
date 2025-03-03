document.addEventListener("DOMContentLoaded", function () {
    const scanResult = document.getElementById("scan-result");

    function onScanSuccess(decodedText, decodedResult) {
        console.log("QR Code Detected:", decodedText);
        scanResult.innerText = "QR Code Detected!";

        if (decodedText.includes("parking-map.html")) {
            window.location.href = decodedText; // Redirect to Parking Map Page
        } else {
            scanResult.innerText = "Invalid QR Code. Please scan a valid code.";
        }
    }

    function onScanError(error) {
        console.warn("QR Scan Error:", error);
    }

    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.start(
        { facingMode: "environment" }, // Use rear camera on mobile
        { fps: 10, qrbox: 250 },
        onScanSuccess,
        onScanError
    ).catch(err => {
        console.error("QR Scanner Initialization Error:", err);
    });
});

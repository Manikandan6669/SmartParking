document.addEventListener("DOMContentLoaded", function () {
    showTab("qr-scanner");
    setupQRScanner();
    generateParkingSlots();

    document.getElementById("navigate-btn").addEventListener("click", navigateToSlot);
});

// Function to show selected tab
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
}

// QR Code Scanner
function setupQRScanner() {
    const qrReaderDiv = document.getElementById("qr-reader");

    if (!qrReaderDiv) {
        console.error("QR reader div not found!");
        return;
    }

    const qrScanner = new Html5Qrcode("qr-reader");

    qrScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
            document.getElementById("qr-result").innerText = "Scanned: " + decodedText;
            processQRCode(decodedText);
        },
        (errorMessage) => {}
    ).catch(err => console.error("QR Scanner error: ", err));
}

// Process the scanned QR code
function processQRCode(code) {
    alert("Scanned QR Code: " + code);
}

// Generate random parking slots
function generateParkingSlots() {
    const container = document.getElementById("slots-container");
    container.innerHTML = "";

    for (let i = 1; i <= 10; i++) {
        const slot = document.createElement("div");
        slot.className = "slot";
        slot.innerText = "Slot " + i;
        slot.addEventListener("click", () => alert("Selected: " + slot.innerText));
        container.appendChild(slot);
    }
}

// Simulated navigation
function navigateToSlot() {
    document.getElementById("navigation-result").innerText = "Navigating to the nearest parking slot...";
}

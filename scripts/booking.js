const parkingSlots = document.querySelectorAll(".slot");
const bookSlotBtn = document.getElementById("bookSlot");
const leaveParkingBtn = document.getElementById("leaveParking");
const modal = document.createElement("div");
modal.classList.add("modal");
document.body.appendChild(modal);

let userBooking = {}; // To store Name & Key for booked slots

// Function to open modal
function openModal(content, callback = null) {
    modal.innerHTML = content;
    modal.style.display = "block";
    
    if (callback) {
        setTimeout(() => {
            closeModal();
            callback();
        }, 2000); // Auto-close after 2 seconds
    }
}

// Function to close modal
function closeModal() {
    modal.style.display = "none";
}

// Book Slot
parkingSlots.forEach((slot, index) => {
    slot.addEventListener("click", () => {
        if (!slot.classList.contains("booked")) {
            openModal(`
                <h2>Book Parking Slot</h2>
                <input type="text" id="userName" placeholder="Enter Name" required>
                <input type="password" id="userKey" placeholder="Set a Secret Key" required>
                <button onclick="confirmBooking(${index})">Confirm Booking</button>
            `);
        }
    });
});

// Confirm Booking
function confirmBooking(index) {
    const name = document.getElementById("userName").value;
    const key = document.getElementById("userKey").value;
    
    if (name && key) {
        parkingSlots[index].classList.add("booked");
        userBooking[index] = { name, key };
        parkingSlots[index].innerHTML = `<img src="assets/vehicle.png" alt="Vehicle">
            <button class="unpark-btn" onclick="openUnpark(${index})">Unpark</button>`;
        closeModal();
    }
}

// Open Unpark Modal (Only Inside the Booked Slot)
function openUnpark(index) {
    openModal(`
        <h2>Unpark Vehicle</h2>
        <input type="password" id="verifyKey" placeholder="Enter Your Secret Key" required>
        <button onclick="confirmUnpark(${index})">Confirm Unpark</button>
    `);
}

// Confirm Unparking
function confirmUnpark(index) {
    const enteredKey = document.getElementById("verifyKey").value;
    
    if (enteredKey === userBooking[index].key) {
        parkingSlots[index].classList.remove("booked");
        parkingSlots[index].innerHTML = index + 1; // Reset slot number
        delete userBooking[index]; // Remove from booking record
        closeModal();
    } else {
        openModal(`<h2 style="color: red;">Incorrect Key! Try Again.</h2>
            <button onclick="closeModal()">Close</button>`);
    }
}

// Leave Parking Popup (Then Redirect to Scanner)
leaveParkingBtn.addEventListener("click", () => {
    openModal(`
        <h2>Thank you for using SmartParking! 🚗</h2>
    `, () => {
        window.location.href = "index.html"; // Redirect to QR Scanner Page
    });
});

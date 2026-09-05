// -----------------------------
// GLOBAL VARIABLES & OBJECTS
// -----------------------------

// Object to store form data
let orderData = {
    name: "",
    email: "",
    pickupDate: "",
    requestType: "",
    itemDetails: "",
    allergyNotes: ""
};

// Array to track validation errors
let errors = [];


// -----------------------------
// LOAD SAVED DATA ON PAGE OPEN
// -----------------------------

window.addEventListener("DOMContentLoaded", () => {
    loadSavedData();
});

function loadSavedData() {
    const savedName = localStorage.getItem("savedName");
    const savedEmail = localStorage.getItem("savedEmail");

    if (savedName) {
        document.getElementById("name").value = savedName;
    }
    if (savedEmail) {
        document.getElementById("email").value = savedEmail;
    }
}


// -----------------------------
// FORM SUBMISSION HANDLER
// -----------------------------

const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // stop form from submitting

    clearErrors();
    validateForm();

    if (errors.length === 0) {
        saveUserData();
        showSuccessMessage();
        form.reset();
    }
});


// -----------------------------
// VALIDATION LOGIC
// -----------------------------

function validateForm() {
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const pickupField = document.getElementById("pickup-date");
    const itemField = document.getElementById("item-details");

    // Required field check
    if (nameField.value.trim() === "") {
        addError(nameField, "Please enter your name.");
    }

    // Email format check
    if (!emailField.value.includes("@") || !emailField.value.includes(".")) {
        addError(emailField, "Please enter a valid email address.");
    }

    // Required pickup date
    if (pickupField.value.trim() === "") {
        addError(pickupField, "Please select a pickup date.");
    }

    // Required item details
    if (itemField.value.trim() === "") {
        addError(itemField, "Item details are required.");
    }
}

function addError(field, message) {
    errors.push(message);

    const errorMsg = document.createElement("p");
    errorMsg.classList.add("error-message");
    errorMsg.style.color = "red";
    errorMsg.textContent = message;

    field.insertAdjacentElement("afterend", errorMsg);
}

function clearErrors() {
    errors = [];
    document.querySelectorAll(".error-message").forEach(msg => msg.remove());
}


// -----------------------------
// SAVE USER DATA TO LOCALSTORAGE
// -----------------------------

function saveUserData() {
    const nameField = document.getElementById("name").value;
    const emailField = document.getElementById("email").value;

    localStorage.setItem("savedName", nameField);
    localStorage.setItem("savedEmail", emailField);
}


// -----------------------------
// SUCCESS MESSAGE
// -----------------------------

function showSuccessMessage() {
    alert("Your pre-order request has been submitted!");
}

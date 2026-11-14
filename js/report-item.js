
// =====================================
// LIBFIND - REPORT ITEM JAVASCRIPT
// =====================================

// 1. Check Login Status
const isLoggedIn = sessionStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
    window.location.replace("index.html");
} else {

    // 2. Get HTML Elements
    const reportForm = document.getElementById("reportForm");
    const itemImage = document.getElementById("itemImage");

    const imagePreview =
        document.getElementById("imagePreview");

    const previewContainer =
        document.getElementById("imagePreviewContainer");

    const removeImageBtn =
        document.getElementById("removeImageBtn");

    const successMessage =
        document.getElementById("successMessage");

    const reportError =
        document.getElementById("reportError");

    const itemDate =
        document.getElementById("itemDate");

    // 3. Limit Date to Today
    const today = new Date();
    const localDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    itemDate.max = localDate;

    // 4. Image Preview
    let selectedImage = "";

    itemImage.addEventListener("change", function () {

        const file = itemImage.files[0];

        reportError.classList.add("d-none");

        if (!file) {
            clearImage();
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            showError("Please select a JPG, PNG or WEBP image.");
            clearImage();
            return;
        }

        if (file.size > 1024 * 1024) {
            showError("Image must be smaller than 1 MB.");
            clearImage();
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            selectedImage = event.target.result;
            imagePreview.src = selectedImage;
            previewContainer.classList.remove("d-none");
        };

        reader.readAsDataURL(file);
    });

    // 5. Remove Image
    function clearImage() {
        itemImage.value = "";
        selectedImage = "";
        imagePreview.removeAttribute("src");
        previewContainer.classList.add("d-none");
    }

    removeImageBtn.addEventListener("click", clearImage);

    reportForm.addEventListener("reset", function () {
        clearImage();
        successMessage.classList.add("d-none");
        reportError.classList.add("d-none");
    });

    // 6. Show Error
    function showError(message) {
        reportError.textContent = message;
        reportError.classList.remove("d-none");
        successMessage.classList.add("d-none");
    }

    // 7. Submit Report
    reportForm.addEventListener("submit", function (event) {

        event.preventDefault();

        reportError.classList.add("d-none");
        successMessage.classList.add("d-none");

        const name =
            document.getElementById("itemName").value.trim();

        const type =
            document.getElementById("reportType").value;

        const category =
            document.getElementById("itemCategory").value;

        const location =
            document.getElementById("itemLocation").value.trim();

        const date =
            document.getElementById("itemDate").value;

        const description =
            document.getElementById("itemDescription").value.trim();

        // Validate Required Fields
        if (!name || !type || !category ||
            !location || !date || !description) {

            showError("Please complete all required fields.");
            return;
        }

        if (date > localDate) {
            showError("Date cannot be in the future.");
            return;
        }

        // Prevent submission while image is still loading
        if (itemImage.files.length > 0 && !selectedImage) {
            showError("Please wait for the image to finish loading.");
            return;
        }

        // 8. Create Report Object
        const newReport = {
            id: Date.now(),
            name: name,
            category: category,
            location: location,
            date: date,
            description: description,
            image: selectedImage || "images/no-image.svg",
            status: type,
            reportedBy:
                sessionStorage.getItem("username") || "Student"
        };

        // 9. Save Report
        let savedReports;

        try {
            savedReports = JSON.parse(
                localStorage.getItem("libfindReports") || "[]"
            );

            if (!Array.isArray(savedReports)) {
                savedReports = [];
            }

            savedReports.push(newReport);

            localStorage.setItem(
                "libfindReports",
                JSON.stringify(savedReports)
            );

        } catch (error) {
            showError(
                "Unable to save report. Browser storage may be full."
            );
            return;
        }

        // 10. Reset Form and Show Success
        reportForm.reset();
        clearImage();

        successMessage.textContent =
            "Report submitted successfully! Your item has been saved.";

        successMessage.classList.remove("d-none");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 11. Logout
    document.getElementById("logoutBtn")
        .addEventListener("click", function () {

            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("username");

            window.location.replace("index.html");
        });
}

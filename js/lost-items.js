
// =====================================
// LIBFIND - LOST ITEMS JAVASCRIPT
// =====================================

// 1. Check Login Status
const isLoggedIn = sessionStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
    window.location.replace("index.html");
} else {

    // 2. Lost Items Data
    const lostItems = [
        {
            id: 1,
            name: "Water Bottle",
            category: "Personal Item",
            location: "Reading Area",
            date: "2026-11-01",
            description: "Green water bottle.",
            image: "images/bottle.jpg",
            status: "Lost"
        },
        {
            id: 2,
            name: "Bracelet",
            category: "Personal Item",
            location: "Study Room",
            date: "2026-11-03",
            description: "Blue bracelet with a silver clasp and a name of KIMI engraved on it.",
            image: "images/bracelet.jpg",
            status: "Lost"
        },
        {
            id: 3,
            name: "Calculator",
            category: "Electronics",
            location: "Library Lobby",
            date: "2026-11-05",
            description: "Black scientific calculator named Casio.",
            image: "images/calculator.jpg",
            status: "Lost"
        },
        {
            id: 4,
            name: "pen",
            category: "Stationery",
            location: "Discussion Room",
            date: "2026-11-07",
            description: "Blue pen with a black ink cartridge.",
            image: "images/pen.jpg",
            status: "Lost"
        },
        {
            id: 5,
            name: "Purse",
            category: "Personal Item",
            location: "Study Area",
            date: "2026-11-09",
            description: "Dark greenpurse with a beige clasp.",
            image: "images/purse.jpg",
            status: "Lost"
        },
        {
            id: 6,
            name: "Vicks Inhaler",
            category: "Health & Wellness",
            location: "Reading Corner",
            date: "2026-11-10",
            description: "Vicks Inhaler for respiratory relief.",
            image: "images/vicks.jpg",
            status: "Lost"
        }
    ];


// Demo item status saved in browser
function getReturnedDemoItems() {
    try {
        const data = JSON.parse(
            localStorage.getItem("libfindReturnedDemoItems") || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

// Mark a demo item as returned
function markDemoReturned(item) {

    const confirmed = confirm(
        "Are you sure this item has been returned?"
    );

    if (!confirmed) return;

    const returnedItems = getReturnedDemoItems();

    // Use type and ID to identify the demo item
    const itemKey = "Lost-" + item.id;

    if (!returnedItems.includes(itemKey)) {
        returnedItems.push(itemKey);
    }

    localStorage.setItem(
        "libfindReturnedDemoItems",
        JSON.stringify(returnedItems)
    );

    alert("Item marked as returned successfully!");

    // Refresh page to update the item list
    window.location.reload();
}

    // 3. Get HTML Elements
    const itemsContainer =
        document.getElementById("lostItemsContainer");

    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const resultCount =
        document.getElementById("resultCount");

    const noResults =
        document.getElementById("noResults");

    // 4. Display Lost Items
    function displayItems(items) {

        itemsContainer.innerHTML = "";

        resultCount.textContent = items.length + " items";

        if (items.length === 0) {
            noResults.classList.remove("d-none");
            return;
        }

        noResults.classList.add("d-none");

        items.forEach(function (item) {

            const column = document.createElement("div");
            column.className = "col-md-6 col-lg-4";

            const card = document.createElement("div");
            card.className = "item-card";

         
            const image = document.createElement("img");
            image.className = "item-image";
            image.src = item.image;
            image.alt = item.name;
            image.loading = "lazy";

            // Show placeholder if image cannot load
            image.onerror = function () {
                this.onerror = null;
                this.src = "images/no-image.svg";
            };


            const body = document.createElement("div");
            body.className = "item-card-body";

            const title = document.createElement("h3");
            title.textContent = item.name;

            const category = document.createElement("p");
            category.textContent = "Category: " + item.category;

            const location = document.createElement("p");
            location.textContent = "Location: " + item.location;

            const date = document.createElement("p");
            date.textContent = "Date: " + item.date;

            const status = document.createElement("span");
            status.className = "item-status";
            status.textContent = item.status;

            const button = document.createElement("button");
            button.className = "btn btn-details w-100";
            button.textContent = "View Details";

            button.addEventListener("click", function () {
                showItemDetails(item);
            });

            body.appendChild(title);
            body.appendChild(category);
            body.appendChild(location);
            body.appendChild(date);
            body.appendChild(status);

            
        const buttonWrapper = document.createElement("div");
        buttonWrapper.className = "mt-2";

        buttonWrapper.appendChild(button);

        // Mark Returned button for demo items
        if (typeof item.id === "number" && item.id <= 6) {

            const returnedBtn = document.createElement("button");

            returnedBtn.className = "btn btn-returned mt-2 w-100";
            returnedBtn.textContent = "Mark Returned";

            returnedBtn.addEventListener("click", function () {
                markDemoReturned(item);
            });

            buttonWrapper.appendChild(returnedBtn);
        }

        body.appendChild(buttonWrapper);


            card.appendChild(image);
            card.appendChild(body);
            column.appendChild(card);
            itemsContainer.appendChild(column);
        });
    }

    // 5. Search and Filter
    function filterItems() {

        const keyword =
            searchInput.value.toLowerCase().trim();

        const selectedCategory =
            categoryFilter.value;

        const filteredItems = allLostItems.filter(function (item) {

            const matchesSearch =
                item.name.toLowerCase().includes(keyword) ||
                item.location.toLowerCase().includes(keyword);

            const matchesCategory =
                selectedCategory === "All" ||
                item.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        displayItems(filteredItems);
    }

    searchInput.addEventListener("input", filterItems);
    categoryFilter.addEventListener("change", filterItems);

    // 6. View Item Details
    function showItemDetails(item) {

        document.getElementById("itemDetailsTitle").textContent =
            item.name;

        const detailsBody =
            document.getElementById("itemDetailsBody");

        detailsBody.innerHTML = "";

            // Display item image inside modal
            const detailImage = document.createElement("img");

            detailImage.src = item.image;
            detailImage.alt = item.name;
            detailImage.className = "img-fluid rounded mb-3";
            detailImage.style.width = "100%";
            detailImage.style.maxHeight = "250px";
            detailImage.style.objectFit = "contain";

            detailImage.onerror = function () {
                this.onerror = null;
                this.src = "images/no-image.svg";
            };

            detailsBody.appendChild(detailImage);


        const details = [
            ["Category", item.category],
            ["Location", item.location],
            ["Date Reported", item.date],
            ["Status", item.status],
            ["Description", item.description]
        ];

        details.forEach(function (detail) {

            const paragraph = document.createElement("p");

            const label = document.createElement("strong");
            label.textContent = detail[0] + ": ";

            paragraph.appendChild(label);
            paragraph.appendChild(
                document.createTextNode(detail[1])
            );

            detailsBody.appendChild(paragraph);
        });

        const modalElement =
            document.getElementById("itemDetailsModal");

        const modal =
            bootstrap.Modal.getOrCreateInstance(modalElement);

        modal.show();
    }

    // 7. Logout
    document.getElementById("logoutBtn")
        .addEventListener("click", function () {

            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("username");

            window.location.replace("index.html");
        });

    
    // 8. Get User-Submitted Reports
    let savedReports = [];

    try {
        const storedData = JSON.parse(
            localStorage.getItem("libfindReports") || "[]"
        );

        if (Array.isArray(storedData)) {
            savedReports = storedData;
        }

    } catch (error) {
        console.error("Unable to load saved reports:", error);
    }

    // 9. Select Lost Reports Only
    const userLostReports = savedReports.filter(function (item) {
        return item.status === "Lost";
    });

   
        // Remove returned demo items from active Lost list
        const returnedDemoItems = getReturnedDemoItems();

        const activeDemoLostItems = lostItems.filter(function (item) {
            return !returnedDemoItems.includes("Lost-" + item.id);
        });

        const allLostItems = [
            ...userLostReports,
            ...activeDemoLostItems
        ];


    // 11. Initial Display
    displayItems(allLostItems);

}

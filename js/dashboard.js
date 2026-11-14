
// =====================================
// LIBFIND DASHBOARD JAVASCRIPT
// =====================================

// 1. Check Login Status
const isLoggedIn = sessionStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
    window.location.replace("index.html");
} else {

    // 2. Display Username
    const username =
        sessionStorage.getItem("username") || "Student";

    document.getElementById("displayUsername").textContent =
        username;

    // 3. Sample Item Data
    // Same sample items as Lost Items and Found Items pages

    const items = [
        // LOST ITEMS
        {
            name: "Water Bottle",
            category: "Personal Item",
            location: "Reading Area",
            status: "Lost"
        },
        {
            name: "Bracelet",
            category: "Personal Item",
            location: "Study Room",
            status: "Lost"
        },
        {
            name: "Calculator",
            category: "Electronics",
            location: "Library Lobby",
            status: "Lost"
        },
        {
            name: "pen",
            category: "Stationery",
            location: "Discussion Room",
            status: "Lost"
        },
        {
            name: "Purse",
            category: "Personal Item",
            location: "Study Area",
            status: "Lost"
        },
        {
            name: "Vicks Inhaler",
            category: "Health & Wellness",
            location: "Reading Corner",
            status: "Lost"
        },

        // FOUND ITEMS
        {
            name: "Wireless Earbuds",
            category: "Electronics",
            location: "Computer Lab",
            status: "Found"
        },
        {
            name: "Cable",
            category: "Electronics",
            location: "Study Room",
            status: "Found"
        },
        {
            name: "Key",
            category: "Personal Item",
            location: "Reading Area",
            status: "Found"
        },
        {
            name: "Notebook",
            category: "Books",
            location: "Study Room",
            status: "Found"
        },
        {
            name: "Ipad",
            category: "Electronics",
            location: "Discussion Room",
            status: "Found"
        },
        {
            name: "Lipstick",
            category: "Personal Item",
            location: "Library Lobby",
            status: "Found"
        }
    ];


        // Load reports submitted by users
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

        
    // Read returned demo items from localStorage
    let returnedDemoItems = [];

    try {
        const storedData = JSON.parse(
            localStorage.getItem("libfindReturnedDemoItems") || "[]"
        );

        if (Array.isArray(storedData)) {
            returnedDemoItems = storedData;
        }

    } catch (error) {
        console.error("Unable to load returned demo items:", error);
    }

    // Update status of demo items
    const updatedDemoItems = items.map(function (item, index) {

        // First 6 items are Lost demo items
        const itemKey = index < 6
            ? "Lost-" + (index + 1)
            : "Found-" + (index - 5);

        if (returnedDemoItems.includes(itemKey)) {
            return {
                ...item,
                status: "Returned"
            };
        }

        return item;
    });

    // Combine saved reports and updated demo items
    const allItems = [
        ...savedReports,
        ...updatedDemoItems
    ];

        const lostCount = allItems.filter(item =>
            item.status === "Lost"
        ).length;

        const foundCount = allItems.filter(item =>
            item.status === "Found"
        ).length;

        const returnedCount = allItems.filter(item =>
            item.status === "Returned"
        ).length;


    document.getElementById("lostCount").textContent =
        lostCount;

    document.getElementById("foundCount").textContent =
        foundCount;

    document.getElementById("returnedCount").textContent =
        returnedCount;

    // 5. Create Chart
    const chartCanvas =
        document.getElementById("itemsChart");

    if (typeof Chart !== "undefined") {
        new Chart(chartCanvas, {
            type: "bar",

            data: {
                labels: [
                    "Lost Items",
                    "Found Items",
                    "Returned Items"
                ],

                datasets: [{
                    label: "Number of Items",
                    data: [
                        lostCount,
                        foundCount,
                        returnedCount
                    ],

                    backgroundColor: [
                        "#4da8da",
                        "#78c7c2",
                        "#a8a0df"
                    ],

                    borderRadius: 8
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
        });
    }

    // 6. Display Recent Reports
    const recentReportsBody =
        document.getElementById("recentReportsBody");
    
    const recentItems = allItems;

    recentItems.forEach(function (item) {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const categoryCell = document.createElement("td");
        categoryCell.textContent = item.category;

        const locationCell = document.createElement("td");
        locationCell.textContent = item.location;

        const statusCell = document.createElement("td");

        const statusBadge = document.createElement("span");
        statusBadge.classList.add("badge");

        statusBadge.classList.add(
            "status-" + item.status.toLowerCase()
        );

        statusBadge.textContent = item.status;
        statusCell.appendChild(statusBadge);

        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(locationCell);
        row.appendChild(statusCell);

        recentReportsBody.appendChild(row);
    });

    // 7. Logout Function
    document.getElementById("logoutBtn")
        .addEventListener("click", function () {

            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("username");

            window.location.replace("index.html");
        });
}

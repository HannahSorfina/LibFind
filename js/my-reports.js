
// =====================================
// LIBFIND - MY REPORTS JAVASCRIPT
// =====================================

// 1. Check Login
const isLoggedIn = sessionStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
    window.location.replace("index.html");
} else {

    // 2. Current User
    const currentUser =
        sessionStorage.getItem("username") || "Student";

    // 3. HTML Elements
    const reportsContainer =
        document.getElementById("myReportsContainer");

    const searchInput =
        document.getElementById("mySearchInput");

    const statusFilter =
        document.getElementById("myStatusFilter");

    const resultCount =
        document.getElementById("myResultCount");

    const noResults =
        document.getElementById("myNoResults");

    // 4. Read Saved Reports
    function getSavedReports() {
        try {
            const data = JSON.parse(
                localStorage.getItem("libfindReports") || "[]"
            );

            return Array.isArray(data) ? data : [];

        } catch (error) {
            console.error("Unable to load reports:", error);
            return [];
        }
    }

    
    // 5. Get Reports for Current User
    function getMyReports() {
        return getSavedReports().filter(function (report) {
            return report.reportedBy === currentUser;
        });
    }
        

    // 6. Update Summary Cards
    function updateSummary() {

        const reports = getMyReports();

        const active = reports.filter(function (report) {
            return report.status === "Lost" ||
                   report.status === "Found";
        }).length;

        const returned = reports.filter(function (report) {
            return report.status === "Returned";
        }).length;

        document.getElementById("totalReports").textContent =
            reports.length;

        document.getElementById("activeReports").textContent =
            active;

        document.getElementById("returnedReports").textContent =
            returned;
    }

    // 7. Display Reports
    function displayReports(reports) {

        reportsContainer.innerHTML = "";

        resultCount.textContent =
            reports.length + " reports";

        if (reports.length === 0) {
            noResults.classList.remove("d-none");
            return;
        }

        noResults.classList.add("d-none");

        reports.forEach(function (report) {

            const column = document.createElement("div");
            column.className = "col-md-6 col-lg-4";

            const card = document.createElement("div");
            card.className = "my-report-card";

            const image = document.createElement("img");
            image.className = "item-image";
            image.src = report.image || "images/no-image.svg";
            image.alt = report.name;

            image.onerror = function () {
                this.onerror = null;
                this.src = "images/no-image.svg";
            };

            const body = document.createElement("div");
            body.className = "item-card-body";

            const title = document.createElement("h3");
            title.textContent = report.name;

            const location = document.createElement("p");
            location.textContent =
                "Location: " + report.location;

            const date = document.createElement("p");
            date.textContent =
                "Date: " + report.date;

            const status = document.createElement("span");
            status.className =
                "my-report-status my-status-" +
                report.status.toLowerCase();

            status.textContent = report.status;

            // Action Buttons
            const actions = document.createElement("div");
            actions.className = "my-report-actions";

            const viewBtn = document.createElement("button");
            viewBtn.className = "btn btn-details";
            viewBtn.textContent = "View Details";

            viewBtn.addEventListener("click", function () {
                showDetails(report);
            });

            actions.appendChild(viewBtn);

            // Returned Button
            if (report.status !== "Returned") {

                const returnedBtn =
                    document.createElement("button");

                returnedBtn.className =
                    "btn btn-returned";

                returnedBtn.textContent = "Mark Returned";

                returnedBtn.addEventListener("click", function () {
                    markReturned(report.id);
                });

                actions.appendChild(returnedBtn);
            }

            // Delete Button
            const deleteBtn = document.createElement("button");

            deleteBtn.className =
                "btn btn-outline-danger";

            deleteBtn.textContent = "Delete";

            deleteBtn.addEventListener("click", function () {
                deleteReport(report.id);
            });

            actions.appendChild(deleteBtn);

            body.appendChild(title);
            body.appendChild(location);
            body.appendChild(date);
            body.appendChild(status);
            body.appendChild(actions);

            card.appendChild(image);
            card.appendChild(body);
            column.appendChild(card);

            reportsContainer.appendChild(column);
        });
    }

    // 8. Search and Filter
    function filterReports() {

        const keyword =
            searchInput.value.toLowerCase().trim();

        const selectedStatus =
            statusFilter.value;

        const filtered = getMyReports().filter(function (report) {

            const matchesSearch =
                report.name.toLowerCase().includes(keyword) ||
                report.location.toLowerCase().includes(keyword);

            const matchesStatus =
                selectedStatus === "All" ||
                report.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });

        displayReports(filtered);
        updateSummary();
    }

    searchInput.addEventListener("input", filterReports);
    statusFilter.addEventListener("change", filterReports);

    // 9. View Details
    function showDetails(report) {

        document.getElementById("myDetailsTitle").textContent =
            report.name;

        const body =
            document.getElementById("myDetailsBody");

        body.innerHTML = "";

        const image = document.createElement("img");
        image.src = report.image || "images/no-image.svg";
        image.alt = report.name;
        image.className = "img-fluid rounded mb-3";
        image.style.width = "100%";
        image.style.maxHeight = "250px";
        image.style.objectFit = "contain";

        image.onerror = function () {
            this.onerror = null;
            this.src = "images/no-image.svg";
        };

        body.appendChild(image);

        const details = [
            ["Category", report.category],
            ["Location", report.location],
            ["Date", report.date],
            ["Status", report.status],
            ["Description", report.description]
        ];

        details.forEach(function (detail) {

            const p = document.createElement("p");
            const strong = document.createElement("strong");

            strong.textContent = detail[0] + ": ";

            p.appendChild(strong);
            p.appendChild(
                document.createTextNode(detail[1] || "-")
            );

            body.appendChild(p);
        });

        const modal = bootstrap.Modal.getOrCreateInstance(
            document.getElementById("myDetailsModal")
        );

        modal.show();
    }

    // 10. Mark Report as Returned
    function markReturned(reportId) {

        const confirmed = confirm(
            "Mark this item as returned?"
        );

        if (!confirmed) return;

        const reports = getSavedReports();

        const report = reports.find(function (item) {
            return item.id === reportId &&
                   item.reportedBy === currentUser;
        });

        if (!report) {
            alert("Report not found.");
            return;
        }

        report.status = "Returned";

        try {
            localStorage.setItem(
                "libfindReports",
                JSON.stringify(reports)
            );

            filterReports();
            alert("Item marked as returned successfully!");

        } catch (error) {
            alert("Unable to update report.");
        }
    }

    // 11. Delete Report
    function deleteReport(reportId) {

        const confirmed = confirm(
            "Are you sure you want to delete this report?"
        );

        if (!confirmed) return;

        const reports = getSavedReports();

        const updatedReports = reports.filter(function (item) {
            return !(item.id === reportId &&
                     item.reportedBy === currentUser);
        });

        if (updatedReports.length === reports.length) {
            alert("Report not found.");
            return;
        }

        try {
            localStorage.setItem(
                "libfindReports",
                JSON.stringify(updatedReports)
            );

            filterReports();
            alert("Report deleted successfully!");

        } catch (error) {
            alert("Unable to delete report.");
        }
    }

    // 12. Logout
    document.getElementById("logoutBtn")
        .addEventListener("click", function () {

            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("username");

            window.location.replace("index.html");
        });

    // 13. Initial Display
    filterReports();
}

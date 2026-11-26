# LibFind — Library Lost and Found Management System

A responsive web application prototype for managing lost
and found belongings in a library. LibFind provides a
simple interface for users to browse lost and found items,
submit reports, and keep track of their reported belongings.

> **Course:** IMS566 — Advanced Web Design Development
> and Content Management
> **Assignment:** Individual Project
> **Author:** HANNAH SORFINA BINTI MAIZUL JAZMI
> **Matric No:** 2026128131
> **Submission:** Week 9

---

## Project Description

LibFind is a web-based Library Lost and Found Management
System designed to help library users report missing
belongings and find items that have been discovered in
the library. It brings lost-item listings, found-item
listings, and report management into one interface.

The project is built with HTML, CSS, JavaScript, and
Bootstrap 5. Item reports and status updates are stored
in the browser using Local Storage, so the prototype
does not require a backend server or database.

---

## Features

### 1. Login Page
- Simulated login using predefined demo credentials.
- Displays an error message when invalid credentials are entered.
- Show/hide password feature.

### 2. Dashboard
- Displays summary statistics for Lost, Found, and
  Returned items.
- Includes a chart to visualize item statuses.
- Displays recent item reports.

### 3. Lost Items
- Displays reported lost belongings with images and
  descriptions.
- Search and filter items by category.
- View item details.

### 4. Found Items
- Displays belongings found in the library.
- Search and filter found items.
- View item details and status information.

### 5. Report Item
- Submit a new Lost or Found report.
- Enter item information, including name, category,
  location, date, and description.
- Upload an optional item image.

### 6. My Reports
- View reports submitted by the user.
- Search and filter reports.
- View report details, mark items as returned, and
  delete reports.

### 7. Responsive Navigation and Layout
- Navigation links connect the main system pages.
- Responsive layout supports desktop and mobile screen sizes.

---

## Demo Login

| Field | Value |
|-------|-------|
| Username | `student` |
| Password | `libfind123` |

---

## How to Test Login

1. Open the LibFind live website.
2. Enter the demo username and password listed above.
3. Click **Login**.
4. After successful login, the Dashboard will be displayed.
5. To test error handling, enter an incorrect username
   or password and check the error message.

---

## How to Use

1. Log in to LibFind using the demo credentials.
2. View the item summary and chart on the Dashboard.
3. Browse **Lost Items** to find listings of missing
   belongings.
4. Browse **Found Items** to view belongings found
   in the library.
5. Use **Report Item** to submit a new lost or found
   report.
6. Open **My Reports** to review or manage reports
   you submitted.
7. Log out when finished.

---

## Frameworks and Libraries Used

| Technology | Purpose |
|-----------|---------|
| HTML5 | Page structure and content |
| CSS3 | Custom styling and layout |
| JavaScript | Interactivity, form handling, and system functionality |
| Bootstrap 5 | Responsive layout and UI components |
| Chart.js | Dashboard data visualization |
| Browser Local Storage | Saving reports and status updates in the browser |
| GitHub Pages | Hosting and deployment |

---

## Data Storage

LibFind uses the browser's Local Storage to save item
reports and status changes. No backend server or database
is required for this prototype.

---

## Project Structure

\`\`\`
LibFind/
├── index.html
├── dashboard.html
├── lost-items.html
├── found-items.html
├── report-item.html
├── my-reports.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── auth.js
│   ├── app.js
│   └── dashboard.js
└── images/
\`\`\`

---

## Deployment (GitHub Pages)

1. Push the project files to the GitHub repository.
2. Open the repository **Settings**.
3. Select **Pages** from the sidebar.
4. Under **Build and deployment**, select deployment
   from the `main` branch and the root folder.
5. Save the settings and wait for GitHub Pages to
   publish the site.

**Repository:**  
https://github.com/HannahSorfina/LibFind

**Live Website:**  
https://hannahsorfina.github.io/LibFind/

---

## Project Purpose

This project demonstrates the design and development
of a responsive web application interface for a library
lost and found system, applying web design, navigation,
content organization, authentication simulation, and
data visualization concepts.

---

## License

This project is created for academic purposes as part
of the IMS566 individual assignment.

---

**© 2026 LibFind. All rights reserved.**

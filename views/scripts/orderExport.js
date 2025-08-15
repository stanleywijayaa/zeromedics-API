const exportBtn = document.getElementById("exportBtn")
exportBtn.disabled = true

document.getElementById("exportBtn").addEventListener("click", () => {
    console.log("Exporting orders...");
    // Add your export logic here (CSV, Excel, PDF, etc.)
});
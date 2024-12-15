document.getElementById("rotateButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const url = tabs[0].url;

    if (url.endsWith(".pdf")) {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error("Failed to fetch the PDF from the current tab");

        const pdfBlob = await response.blob();

        const formData = new FormData();
        formData.append("pdf", pdfBlob, "current.pdf");

        const angle = document.getElementById("angleInput").value;
        formData.append("angle", angle);

        const pagesInput = document.getElementById("pagesInput").value;
        // Convert the comma-separated string into an array of integers
        const pages = pagesInput
          .split(",")
          .map((page) => parseInt(page.trim(), 10))
          .filter((page) => !isNaN(page)); // Ensure valid pages

        if (pages.length === 0) {
          alert("Please provide valid page numbers.");
          return;
        }

        formData.append("pages", JSON.stringify(pages)); // Send pages array

        const apiResponse = await fetch("http://localhost:3000/rotate-pdf", {
          method: "POST",
          body: formData,
        });

        if (apiResponse.ok) {
          const blob = await apiResponse.blob();
          const pdfUrl = URL.createObjectURL(blob);
          window.open(pdfUrl, "_blank");
        } else {
          const errorText = await apiResponse.text();
          alert("Failed to rotate the PDF: " + errorText);
        }
      } catch (error) {
        console.error("Error processing the PDF:", error);
        alert("An error occurred while processing the PDF.");
      }
    } else {
      alert("Please open a PDF file in the tab.");
    }
  });
});

const https = require("https");
const fs = require("fs");

// Function to download a file
function downloadFile(fileId, destination) {
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

  https
    .get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(destination);
        response.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log(`File downloaded successfully to ${destination}`);
        });
      } else {
        console.error(
          `Failed to download. Status code: ${response.statusCode}`
        );
      }
    })
    .on("error", (err) => {
      console.error(`Error: ${err.message}`);
    });
}

// Replace this with the file ID from your Google Drive link
const fileId = "1-j5IQHDWVSVY0ygJgJycoBB5jo_u0_AE"; // Example file ID
const destination = "downloaded_file.zip"; // Change to your desired file name

downloadFile(fileId, destination);

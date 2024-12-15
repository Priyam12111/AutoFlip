chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create({
    url: "popup.html",
    type: "popup",
    width: 800,
    height: 600,
  });

  // Execute the content script in the current tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
});

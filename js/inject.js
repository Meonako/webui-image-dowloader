export function Inject(tab) {
    if (tab.url.includes("chrome://")) return

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["js/scrap.js"],
    })
}
import { Inject } from "./inject.js"

chrome.action.onClicked.addListener((tab) => {
    Inject(tab)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!request.fileList) return

    for (let i = 0; i < request.fileList.length; i++) {
        let fileInfo = request.fileList[i]
        chrome.downloads.download({
            url: fileInfo.url,
            filename: fileInfo.fn + ".png",
            conflictAction: "uniquify",
        })
    }
})

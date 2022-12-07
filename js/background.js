import { Inject } from "./inject.js"

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "download",
        title: "Click to Download",
        type: "normal",
        contexts: ["selection"],
    })
})

chrome.contextMenus.onClicked.addListener((_, tab) => {
    Inject(tab)
})

chrome.action.onClicked.addListener((tab) => {
    Inject(tab)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!request.fileList) return

    for (let i = 0; i < request.fileList.length; i++) {
        let fileInfo = request.fileList[i]
        chrome.downloads.download({
            url: fileInfo.url,
            filename: fileInfo.fn.replaceAll(".", "_") + ".png",
            conflictAction: "uniquify",
        })
    }
})

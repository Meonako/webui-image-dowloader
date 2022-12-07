function main() {
    const ImageBox = {
        tab_txt2img:
            'div[class="file-preview overflow-y-scroll w-full max-h-60 flex flex-col justify-between mt-7 mb-7 dark\\:text-slate-200"]',
        tab_img2img:
            'div[class="file-preview overflow-y-scroll w-full max-h-60 flex flex-col justify-between mt-7 mb-7 dark\\:text-slate-200"]',
        tab_images_history:
            'div[class="grid gap-2 grid-cols-6 sm\\:grid-cols-6 md\\:grid-cols-6 lg\\:grid-cols-6 xl\\:grid-cols-6 2xl\\:grid-cols-6 svelte-1g9btlg"]',
    }

    const gradio = document.querySelector("gradio-app")
    if (gradio == null) return console.log("Gradio not found")

    const shadow = gradio.shadowRoot
    if (shadow == null) return console.log("Shadow Root not found")

    let activeTab = getVisibleTab(shadow)

    const imageContainer = activeTab.querySelector(ImageBox[activeTab.id])
    if (imageContainer == null) return console.log("Image Container not found")

    let imageList = imageContainer.children
    if (imageList == null) return console.log("Image List not found")

    let fileInfo =
        activeTab.id == "tab_images_history"
            ? getLinkInImagesBrowser(imageList)
            : getLink(imageList)

    chrome.runtime.sendMessage({
        fileList: fileInfo,
    })
}

function getVisibleTab(shadow) {
    const tabs = shadow.querySelector("#tabs")
    console.log(tabs)
    for (let i = 0; i < tabs.children.length; i++) {
        if (tabs.children[i].getAttribute("style") != "display: block;")
            continue
        return tabs.children[i]
    }
}

function getLink(List) {
    let fileInfo = []
    for (let i = 1; i < List.length; i++) {
        let [name, link] = getImageInformation(List[i])
        fileInfo.push({
            url: link,
            fn: name.replaceAll(".", "_"),
        })
    }
    return fileInfo
}

function getLinkInImagesBrowser(List) {
    let fileInfo = []
    for (let i = 0; i < List.length; i++) {
        let [name, link] = getImageInformationInImagesBrowser(List[i])
        fileInfo.push({
            url: link,
            fn: name.replaceAll(".", "_"),
        })
    }
    return fileInfo
}

function getImageInformation(html) {
    let elements = html.children
    return [elements[0].innerText, elements[2].children[0].href]
}

/**
 * 
 * @param {HTMLButtonElement} Button 
 * @returns {[String, String]}
 */
function getImageInformationInImagesBrowser(Button) {
    let img = Button.children[0]
    return [img.src.split("/").pop(), img.src]
}

main()

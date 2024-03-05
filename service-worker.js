function getParamsAndCopy() {
    function getProductType(str) {
        const pantsWords = ["Pants", "Leggings", "Jeans", "Shorts", "Sweatpants", "Jeggings"]
        const topWords = ["Shirt", "Top", "Blouse", "Tee"]
        const jacketWords = ["Coat", "Overcoat", "Jacket"]
        if (str.includes("Dress")) return "Dress"
        if (str.includes("Skirt")) return "Skirt"
        if (pantsWords.some(s => str.includes(s))) return "Pants"
        if (topWords.some(s => str.includes(s))) return "Top"
        if (jacketWords.some(s => str.includes(s))) return "Jacket"
        return str
    }
    
    const element = document.getElementsByClassName("c-wish-list")[0]
    let params = ""
    const lst = element.querySelector("ul")
    for (const c of lst.children) {
        const productType = getProductType(c.ariaLabel)
        params += productType + "," + c.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute('src') 
        + "," + productType + ": www.shein.com" + c.firstElementChild.firstElementChild.getAttribute("href") + ";"
    }
    return params
}

chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes('shein.com/user/wishlist')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: getParamsAndCopy
        }).then(res => {
            console.log(res[0].result)
            chrome.tabs.create({
                url: 'main.html?params=' + res[0].result
            })
        })
    } else if (tab.url.includes("chrome-extension://")) {
        chrome.tabs.captureVisibleTab({ format: 'png' }, function (dataUrl) {
            chrome.tabs.create({ url: dataUrl })
        })
    }
})
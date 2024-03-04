const urlParams = new URLSearchParams(window.location.search)
const params = urlParams.get("params")
const items = params.split(";")

const canvas = document.getElementById('Board')
const context = canvas.getContext('2d')
let x = 0
let y = 0
const s = 1.5
let str = ""
for (const item of items) {
    if (!item) break
    const img = new Image()
    img.onload = function () {
        context.drawImage(img, x, y, 200*s, 275*s)
        x += 250*s
        if (x > 500*s) {
            x = 0
            y += 325*s
        }
    }
    img.src = "https://" + item.split(",")[1].slice(2)
    str += item.split(",")[2] + "\n"
}
navigator.clipboard.writeText(str)

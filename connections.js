const buttons = document.getElementsByClassName("Board-module_boardActionGroup__mUDT8")[0]

if (buttons) {
    let gameState = JSON.parse(localStorage.getItem("nyt-connections-beta"))
    gameState.attemptsRemaining = 4
    localStorage.setItem("nyt-connections-beta", "")  

    const hintButton = document.createElement("button")
    hintButton.classList.add("ActionButton-module_button__IlhXt")
    hintButton.style.backgroundColor = "white"
    hintButton.textContent = "hint"

    const hintText = document.createElement("p")
    hintText.style.display = "none"

    buttons.appendChild(hintButton)
    document.getElementById("default-choices").appendChild(hintText)

    hintButton.addEventListener('click', async () => {
        hintText.style.display = (hintText.style.display == "none") ? "block" : "none"
        hintText.textContent = await generateHint()
    })
}

async function generateHint() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()

    month = (month.toString().length == 1) ? "0" + (month + 1) : (month + 1)
    day = (day.toString().length == 1) ? "0" + day : day

    const response = await fetch(`https://www.nytimes.com/svc/connections/v2/${year}-${month}-${day}.json`)
    const solution = await response.json()
    let hint = ""

    solution.categories.forEach( (category) => {
        hint = hint.concat(category.title.split(" ").pop() + ". ")
    })

    return hint
}


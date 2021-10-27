
const resetButton = document.querySelector("#reset")
const form = document.querySelector("#form")
const winningScoreSelect = form.winScore;
const playNumSelect = form.pNum; 
const scoreDisplay = document.querySelector("#scoreDisplay")
const divButtomlist = document.querySelector("#divButtonList") //for add button to div

// <--- initial setup --->
let winningScore = 3
let isGAmerOver = false

const playerArray = [
    {   
        id: 1,
        score: 0,
        button: document.querySelector('#p1Button'),
        display: document.querySelector('#p1Display'),
    },
    {
        id: 2,
        score: 0,
        button: document.querySelector('#p2Button'),
        display: document.querySelector('#p2Display'),
    }
]

// <---create function to update score when button is clicked--->
function updateScore (player, playerArray) {
    if (!isGAmerOver) {
        // console.log(player)
        player.score += 1
        if (player.score === winningScore) {
            isGAmerOver = true;
            player.display.classList.add("has-text-success")
            player.button.disabled = true
            // console.log(playerArray)
            for (let i in playerArray) {
                // console.log(`this is ${playerArray[i]}`)
                if (playerArray[i] !== player) {
                    playerArray[i].display.classList.add("has-text-danger")
                    playerArray[i].button.disabled = true
                }

            }
        }
        player.display.textContent = player.score
    }
}

// <---add event to button of innitial player (p1, p2)--->
playerArray[0].button.addEventListener("click", function () {
    updateScore(playerArray[0], playerArray)
})

playerArray[1].button.addEventListener("click", function () {
    updateScore(playerArray[1], playerArray)
})


// <---crete reset function--->
function reset() {
    isGAmerOver = false
    playerArray.forEach(element => {
        element.score = 0
        element.display.textContent = element.score
        element.display.classList.remove("has-text-success","has-text-danger")
        element.button.disabled = false
    })
 }

// <---add reset function to reset buttton--->
resetButton.addEventListener("click", reset)

// set winning score
winningScoreSelect.addEventListener("change", function () {
    winningScore =  parseInt(winningScoreSelect.value)
    if (winningScore === 0){
        return alert('Winning score must be greater than "0"')
    }
    reset()
})

// set number of players
playNumSelect.addEventListener("change", function (e) {
    if (playNumSelect.value < 2) {
        return alert("The number of players must be greater than 2.")
    }

    const oldPlayNum = playerArray.length
    const playNum = parseInt(playNumSelect.value)

    //add new player
    if (playNum > oldPlayNum) {
        for (let i = oldPlayNum + 1 ; i <= playNum; i++){
            // create new player buuton
            let newButton = document.createElement("button");
            newButton.innerText=`player${i}`
            newButton.classList.add("button", "card-footer-item", "is-primary")
            newButton.id = `p${i}Button`
            divButtomlist.appendChild(newButton)

            // create new player score display
            let newDisplay = document.createElement("span")
            newDisplay.innerText = 0
            newDisplay.id = `p${i}Display`
            scoreDisplay.appendChild(document.createTextNode(" / "))
            scoreDisplay.appendChild(newDisplay)

            //push new player
            playerArray.push(
                {
                    id: i,
                    score: 0,
                    button: document.querySelector(`#p${i}Button`),
                    display: document.querySelector(`#p${i}Display`),
                }
            )
        }
        // add event to new player button
        for(let i = oldPlayNum; i < playerArray.length ; i++) {
            playerArray[i].button.addEventListener('click', function () {
                updateScore(playerArray[i],playerArray)
            })
        }
        // reset score after change number of players
        reset()
    }
    //remove excess player
    if (playNum < oldPlayNum) {
        for (let i = oldPlayNum; i > playNum; i--){
            divButtomlist.lastElementChild.remove()
            scoreDisplay.lastChild.remove()
            scoreDisplay.lastChild.remove()
            playerArray.pop()
        }
        // reset score after change number of players
        reset()
    }
})

import { BlackjackGame } from "./BlackjackGame.js";
const game = new BlackjackGame();

const startScreen = document.getElementById("start-screen");
const mainGame = document.getElementById("main-game");
const startGameButton = document.getElementById("start-game");
const startMoneyElement = document.getElementById("startMoney");
const activeBetElement = document.getElementById("activeBet");

const knapp = document.getElementById("get-number");
const stanna = document.getElementById("stand");
const reset = document.getElementById("reset");
const currentBetElement = document.getElementById("currentBet");
const bet100 = document.getElementById("bet100");
const bet500 = document.getElementById("bet500");
const bet250 = document.getElementById("bet250");
const bet1000 = document.getElementById("bet1000");
const resetBet = document.getElementById("resetBet");
const exitButton = document.getElementById("EXIT");
const nummerTextElement = document.getElementById("nummerText");
const dealerTextElement = document.getElementById("dealerText");

function newRound() {
    game.newRound();
    // ger startkort till spelaren
    game.player.handCards.push(game.deck.drawCard());
    game.player.handCards.push(game.deck.drawCard());

    // ger startkort till dealern
    getDealerhand();

    document.getElementById("nummer").innerText =
        "Ditt kortvärde: " + game.player.calculateScore();

    document.getElementById("dealer").innerText =
        "Dealerns kortvärde: " + game.dealer.calculateScore();

    document.getElementById("nummerText").innerText = "";
    document.getElementById("dealerText").innerText = "";

    knapp.disabled = false;
    stanna.disabled = false;

    renderHand();
}


// Hämta bild för ett kort, och ger ut sökvägen till kortbilden
function getCardImg(card) {
    const [value, suit] = card.split(" of ");

    const suitCode = {
        diamonds: "D",
        spades: "S",
        hearts: "H",
        clubs: "C"
    }[suit];

    return `./cards/${suitCode}${value}.png`;
}


// Lägger till alla kort på bilden!
function renderHand() {
    // skapar variabler och ränsar dem i DIVEN dealer-hand OCH player-hand
    const handElement = document.getElementById("player-hand");
    const dealerHandElement = document.getElementById("dealer-hand");
    dealerHandElement.innerHTML = "";
    handElement.innerHTML = "";
    // Lägger till kortbilder för spelarens hand
    game.player.handCards.forEach(card => {
        const image = document.createElement("img");
        image.src = getCardImg(card);
        image.alt = card;
        image.width = 100;

        handElement.appendChild(image);
    });

    // Lägger till kortbilder för dealerns hand
    game.dealer.handCards.forEach(card => {
        
        const image = document.createElement("img");
        image.src = getCardImg(card);
        image.alt = card;
        image.width = 100;
    
        dealerHandElement.appendChild(image);
    });
}


// Kollar vem som vinner
function checkWin() {
    const result = game.checkWin();
    if (result === 'player_bust') {
        nummerTextElement.innerText = `Du förlorade!`;
        nummerTextElement.style.color = "red";
        game.money -= game.currentBet;
        document.getElementById("money").innerText = `Pengar: ${game.money} kr`;
        reset.style.backgroundColor = "red";
    } else if (result === 'dealer_bust') {
        dealerTextElement.innerText = `Du vinner!`;
        dealerTextElement.style.color = "green";
        game.money += game.currentBet;
        document.getElementById("money").innerText = `Pengar: ${game.money} kr`;
        stanna.disabled = true;
        reset.style.backgroundColor = "green";
    } else if (result === 'player_win') {
        nummerTextElement.innerText = `Du vinner!`;
        nummerTextElement.style.color = "green";
        game.money += game.currentBet;
        document.getElementById("money").innerText = `Pengar: ${game.money} kr`;
        stanna.disabled = true;
        reset.style.backgroundColor = "green";
    } else if (result === 'dealer_win') {
        dealerTextElement.innerText = `Dealern vinner!`;
        dealerTextElement.style.color = "red";
        game.money -= game.currentBet;
        document.getElementById("money").innerText = `Pengar: ${game.money} kr`;
        stanna.disabled = true;
        reset.style.backgroundColor = "red";
    } else if (result === 'draw') {
        nummerTextElement.innerText = `Oavgjort!`;
        document.getElementById("money").innerText = `Pengar: ${game.money} kr`;
        stanna.disabled = true;
        reset.style.backgroundColor = "yellow";  
        reset.style.color = "black";
    }
}
// Samma som drawCard fast för dealern
function getDealerhand() {
    let card = game.deck.drawCard();
    if (card) {
        game.dealer.handCards.push(card);
    }
    return card;
}

startMoneyElement.innerText = `Pengar: ${game.money} kr`;
function ShowBetScreen() {
    mainGame.classList.add("hidden");
    startScreen.classList.remove("hidden");
    game.currentBet = 0;
    currentBetElement.innerText = `Nuvarande insats: ${game.currentBet} kr`;
    startMoneyElement.innerText = `Pengar: ${game.money} kr`;
    knapp.disabled = false;
    stanna.disabled = false;
}

startGameButton.addEventListener("click", () => {
    if (game.currentBet <= 0) {
        document.getElementById("betERROR").innerText = "Du måste satsa pengar innan du kan starta spelet!";
        return;
    }
    startScreen.classList.add("hidden");
    mainGame.classList.remove("hidden");
    activeBetElement.innerText = `Nuvarande insats: ${game.currentBet} kr`;
    reset.style.backgroundColor = "";
    reset.style.color = "";
    newRound();
});


function placeBet(amount) {
    const betPlaced = game.placeBet(amount);
    if (!betPlaced) {
        document.getElementById("betERROR").innerText = "Du kan inte satsa mer pengar än vad du har!";
        return;
    }
    currentBetElement.innerText = `Nuvarande insats: ${game.currentBet} kr`;

}


// PLAAAYYEERRRRRR
knapp.addEventListener("click", () => {
    let card = game.deck.drawCard();
    if (card) {
            game.player.handCards.push(card);
            renderHand();
            document.getElementById("nummer").innerText = "Ditt kortvärde: " + game.player.calculateScore();
            checkWin();
    }
});

// DEALERRRRRR
stanna.addEventListener("click", () => {
    document.getElementById("dealer").innerText = "Dealerns kortvärde: " + game.dealer.calculateScore();

    if (game.dealer.calculateScore() < 17) {
        game.dealerDrawUntil17();
    }
    checkWin();

    if (game.dealer.calculateScore() > 21) {
        document.getElementById("dealer").innerText = "Dealer bust! : " + game.dealer.calculateScore();
        let element1 = document.getElementById("stand")
        element1.disabled = true;
        
    }
    renderHand(game.dealer.handCards, "dealer-hand");
    let element2 = document.getElementById("get-number");
    element2.disabled = true;
    document.getElementById("money").innerText = `Pengar: ${game.money} kr`;
    

});

reset.addEventListener("click", () => {
    ShowBetScreen();
});

// LAG FUNKTION SOM FUNGERAR SKIIIT BRA
exitButton.addEventListener("click", () => {
    game.money = 1000;
    document.getElementById("startMoney").innerText = `Pengar: ${game.money} kr`;
});


// OLIKA BETS
bet500.addEventListener("click", () => {
    placeBet(500);
});
bet100.addEventListener("click", () => {
    placeBet(100);
});
bet250.addEventListener("click", () => {
    placeBet(250);
});

bet1000.addEventListener("click", () => {
    placeBet(1000);
});

resetBet.addEventListener("click", () => {
    game.currentBet = 0;
    currentBetElement.innerText = `Nuvarande insats: ${game.currentBet} kr`;
    document.getElementById("betERROR").innerText = "";
});


import {Player, Dealer } from "./player.js";
let player = new Player([]);
let dealer = new Dealer([]);
let money = 1000;

// Skapa en kortlek
var deck = [];
var suits = ["diamonds", "spades", "hearts", "clubs"];
var values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

suits.forEach(function(suits) {
    values.forEach(function(value) {
    deck.push(`${value} of ${suits}`);
  });
});

function startaNyRunda() {
    player = new Player([]);
    dealer = new Dealer([]);

    deck = [];

    suits.forEach(suit => {
        values.forEach(value => {
            deck.push(`${value} of ${suit}`);
        });
    });

    player.handCards.push(drawCard());
    player.handCards.push(drawCard());
    getDealerhand();

    document.getElementById("nummer").innerText =
        "Ditt kortvärde: " + player.calculateScore();

    document.getElementById("dealer").innerText =
        "Dealerns kortvärde: " + dealer.handCards[0];

    document.getElementById("nummerText").innerText = "";
    document.getElementById("dealerText").innerText = "";

    knapp.disabled = false;
    stanna.disabled = false;

    renderHand();
}


// Hämta bild för ett kort
function getCardImg(card) {
    const [value, suit] = card.split(" of ");

    const suitCode = {
        diamonds: "H",
        spades: "S",
        hearts: "C",
        clubs: "D"
    }[suit];

    return `./cards/${suitCode}${value}.png`;
}

// Lägger till alla kort på bilden!
function renderHand() {
    // Spakar variabler och ränsar dem
    const handElement = document.getElementById("player-hand");
    const dealerHandElement = document.getElementById("dealer-hand");
    dealerHandElement.innerHTML = "";
    handElement.innerHTML = "";
    // Lägger till kortbilder för spelarens hand
    player.handCards.forEach(card => {
        const image = document.createElement("img");
        image.src = getCardImg(card);
        image.alt = card;
        image.width = 100;

        handElement.appendChild(image);
    });

    // Lägger till kortbilder för dealerns hand
    dealer.handCards.forEach(card => {
        
        const image = document.createElement("img");
        image.src = getCardImg(card);
        image.alt = card;
        image.width = 100;
    
        dealerHandElement.appendChild(image);
    });
}


// Kollar vem som vinner
function checkWin() {
    let playerScore = player.calculateScore();
    let dealerScore = dealer.calculateScore();
    if (playerScore > 21) {
        nummerText.innerText = `Bust! (Värde: ${playerScore}) Du förlorade!`;
        nummerText.style.color = "red";
        money -= 100;
        document.getElementById("money").innerText = `Pengar: ${money} kr`;
        return;
    }
     
    if (dealerScore > 21) {
        dealerText.innerText = `(Värde: ${dealerScore}) Du vinner!`;
        dealerText.style.color = "green";
        money += 100;
        document.getElementById("money").innerText = `Pengar: ${money} kr`;
        document.getElementById("stand").disabled = true;
        return;
    }

    if (playerScore > dealerScore) {
        nummerText.innerText = `Du vinner! (${playerScore} mot ${dealerScore})`;
        nummerText.style.color = "green";
        money += 100;
        document.getElementById("money").innerText = `Pengar: ${money} kr`;
        document.getElementById("stand").disabled = true;
    } else if (dealerScore > playerScore) {
        dealerText.innerText = `Dealern vinner! (${dealerScore} mot ${playerScore})`;
        dealerText.style.color = "red";
        money -= 100;
        document.getElementById("money").innerText = `Pengar: ${money} kr`;
        document.getElementById("stand").disabled = true;
    } else {
        nummerText.innerText = `Oavgjort Båda har ${playerScore}`;
        document.getElementById("money").innerText = `Pengar: ${money} kr`;
        document.getElementById("stand").disabled = true;
    }

        
}


// Tar ett random kort från kortleken
function drawCard(){
    let tempCard = Math.floor(Math.random() * deck.length);
    return deck.splice(tempCard, 1)[0];
}
// Samma som drawCard fast för dealern
function getDealerhand() {
    let card = drawCard();
    if (card) {
        dealer.handCards.push(card);
    }
    return card;
}

// Start kort
player.handCards.push(drawCard());
player.handCards.push(drawCard());
console.log("Din hand: ", player.handCards);
console.log("Din hand värde: ", player.calculateScore());
getDealerhand();
console.log("Dealerns hand: ", dealer.handCards);
console.log("Dealerns hand värde: ", dealer.calculateScore());
document.getElementById("money").innerText = `Pengar: ${money} kr`;

const knapp = document.getElementById("get-number");
const stanna = document.getElementById("stand");
const reset = document.getElementById("reset");

document.getElementById("nummer").innerText = "Ditt kortvärde: " + player.calculateScore();
document.getElementById("dealer").innerText = "Dealerns kortvärde: " + dealer.handCards[0];

renderHand(player.handCards, "player-hand");
renderHand(dealer.handCards, "dealer-hand");

// PLAAAYYEERRRRRR
knapp.addEventListener("click", () => {
    let card = drawCard();
    if (card) {
            player.handCards.push(card);
            renderHand();
            document.getElementById("nummer").innerText = "Ditt kortvärde: " + player.calculateScore();
            

            console.log("Drog kort: " + card);
            console.log("Din hand: " + player.handCards)
            console.log("Din hand värde: " + player.calculateScore());
            console.log("Dealerns hand: " + dealer.handCards)
            console.log("Dealerns hand värde: " + dealer.calculateScore());

            if (player.calculateScore() > 21) {
                document.getElementById("nummer").innerText = "Bust! : " + player.calculateScore();
                let element = document.getElementById("get-number")
                element.disabled = true;
                document.getElementById("stand").disabled = true;
                checkWin();
                console.log("Money: " + money);
                document.getElementById("money").innerText = `Pengar: ${money} kr`;
            }

    }
});

// DEALERRRRRR
stanna.addEventListener("click", () => {
    
    document.getElementById("dealer").innerText = "Dealerns kortvärde: " + dealer.calculateScore();
    console.log("Dealerns hand: " + dealer.handCards)
    console.log("Dealerns hand värde: " + dealer.calculateScore());
    if (dealer.calculateScore() < 17) {
        // Dra kort tills dealern har mer än
        while (dealer.calculateScore() < 17) {
            getDealerhand();
            document.getElementById("dealer").innerText = "Dealerns kortvärde: " + dealer.calculateScore();
            console.log("Dealerns hand: " + dealer.handCards)
            console.log("Dealerns hand värde: " + dealer.calculateScore());
        }
    }
    checkWin();
    if (dealer.calculateScore() > 21) {
        document.getElementById("dealer").innerText = "Dealer bust! : " + dealer.calculateScore();
        let element1 = document.getElementById("stand")
        element1.disabled = true;
        
    }
    renderHand(dealer.handCards, "dealer-hand");
    let element2 = document.getElementById("get-number");
    element2.disabled = true;
    console.log("Money: " + money);
    document.getElementById("money").innerText = `Pengar: ${money} kr`;

});

reset.addEventListener("click", () => {
    startaNyRunda();
});
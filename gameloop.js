import {Player, Dealer } from "./player.js";
let player = new Player([]);
let dealer = new Dealer([]);

// Skapa en kortlek
var deck = [];
var suits = ["diamonds", "spades", "hearts", "clubs"];
var values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

suits.forEach(function(suits) {
    values.forEach(function(value) {
    deck.push(`${value} of ${suits}`);
  });
});


// Kollar vem som vinner
function checkWin() {
    let playerScore = player.calculateScore();
    let dealerScore = dealer.calculateScore();
    if (playerScore > 21) {
        nummerText.innerText = `Bust! (Värde: ${playerScore}) Du förlorade!`;
        nummerText.style.color = "red";
        return;
    }
     
    if (dealerScore > 21) {
        dealerText.innerText = `(Värde: ${dealerScore}) Du vinner!`;
        dealerText.style.color = "green";
        return;
    }

    if (playerScore > dealerScore) {
        nummerText.innerText = `Du vinner! (${playerScore} mot ${dealerScore})`;
        nummerText.style.color = "green";
    } else if (dealerScore > playerScore) {
        dealerText.innerText = `Dealern vinner! (${dealerScore} mot ${playerScore})`;
        dealerText.style.color = "red";
    } else {
        nummerText.innerText = `Oavgjort Båda har ${playerScore}`;
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
getDealerhand();
console.log("Dealerns hand: ", dealer.handCards);
console.log("Dealerns hand värde: ", dealer.calculateScore());


const knapp = document.getElementById("get-number");
const stanna = document.getElementById("stand");
const reset = document.getElementById("reset");

document.getElementById("nummer").innerText = "Ditt kortvärde: " + player.calculateScore();
document.getElementById("dealer").innerText = "Dealerns kortvärde: " + dealer.handCards[0];

// PLAAAYYEERRRRRR
knapp.addEventListener("click", () => {
    let card = drawCard();
    if (card) {
            player.handCards.push(card);
            document.getElementById("nummer").innerText = "Ditt kortvärde: " + player.calculateScore();
            

            console.log("Drog kort: " + card);
            console.log("Din hand: " + player.handCards)
            console.log("Din hand värde: " + player.calculateScore());
            console.log("Dealerns hand: " + dealer.handCards)
            console.log("Dealerns hand värde: " + dealer.calculateScore());

            if (player.calculateScore() > 21) {
                document.getElementById("nummer").innerText = "Bust! : " + player.calculateScore();
                document.getElementById("nummer").style.color = "red";
                let element = document.getElementById("get-number")
                element.disabled = true;
                checkWin();
                

            }



    }
});

// DEALERRRRRR
stanna.addEventListener("click", () => {
    
    document.getElementById("dealer").innerText = "Dealerns kortvärde: " + dealer.calculateScore();
    console.log("Dealerns hand: " + dealer.handCards)
    console.log("Dealerns hand värde: " + dealer.calculateScore());
    if (dealer.calculateScore() < 17) {
        // Dra kort tills dealern har 17 eller mer
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
        document.getElementById("dealer").style.color = "red";
        let element = document.getElementById("stand")
        element.disabled = true;
        
        
    }
});

reset.addEventListener("click", () => {
    location.reload();
});
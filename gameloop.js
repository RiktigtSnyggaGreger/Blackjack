import {Player, Dealer } from "./player.js";
let player = new Player([]);
let dealer = new Dealer([]);

// Skapa en kortlek
var deck = [];
var suits = ["diamonds", "spades", "hearts", "clubs"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

suits.forEach(function(suits) {
    values.forEach(function(value) {
    deck.push(`${value} of ${suits}`);
  });
});


// Tar ett random kort från kortleken
function drawCard(){
    let tempCard = Math.floor(Math.random() * deck.length);
    return deck.splice(tempCard, 1)[0];
}

function getDealerhand() {
    let card = drawCard();
    if (card) {
        dealer.handCards.push(card);
    }
    return card;
}



// Startar med två kort i handen
player.handCards.push(drawCard());
player.handCards.push(drawCard());
console.log("Din hand: ", player.handCards);

// Startar med två kort i dealerns hand
getDealerhand();
getDealerhand();
console.log("Dealerns hand: ", dealer.handCards);

const knapp = document.getElementById("get-number");
// Knappen lägger till ett random kort till i spelarens hand och skrivs i konsolen
knapp.addEventListener("click", () => {
    let card = drawCard();
    if (card) {
            player.handCards.push(card);
    
            console.log("Drog kort: " + card);
            console.log("Din hand: " + player.handCards)
    }
})


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
console.log("Din hand värde: ", player.calculateScore());

// Startar med två kort i dealerns hand
getDealerhand();
getDealerhand();
console.log("Dealerns hand: ", dealer.handCards);
console.log("Dealerns hand värde: ", dealer.calculateScore());

const knapp = document.getElementById("get-number");

const stanna = document.getElementById("stand");

document.getElementById("nummer").innerText = "Ditt kortvärde: " + player.calculateScore();
document.getElementById("dealer").innerText = "Dealerns kortvärde: " + dealer.calculateScore();

// Knappen lägger till ett random kort till i spelarens hand och skrivs i konsolen
knapp.addEventListener("click", () => {
    let card = drawCard();
    if (card) {
            player.handCards.push(card);
            document.getElementById("nummer").innerText = "Ditt kortvärde: " + player.calculateScore();
            document.getElementById("dealer").innerText = "Dealerns kortvärde: " + dealer.calculateScore();

            console.log("Drog kort: " + card);
            console.log("Din hand: " + player.handCards)
            console.log("Din hand värde: " + player.calculateScore());
            console.log("Dealerns hand: " + dealer.handCards)
            console.log("Dealerns hand värde: " + dealer.calculateScore());
            

    }
})






stanna.addEventListener("click", () => {
    if (getDealerhand()) {
        document.getElementById("dealer").innerText = "Dealerns kortvärde: " + dealer.calculateScore();
        console.log("Dealerns hand: " + dealer.handCards)
        console.log("Dealerns hand värde: " + dealer.calculateScore());
        
    }
    
    

});

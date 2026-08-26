export class Player {
    // SUPER DUPER  KLASS
    constructor(handCards = []) {
        this.handCards = handCards;
    }
    // Player funtioner
    calculateScore() {
        let score = 0;
        let aces = 0;

        this.handCards.forEach(card => {
            // Använder allt innan OF
            let value = card.split(" of ")[0];

            if (value === "A") {
                aces += 1;
                score += 11; // Räkna först ess som 11
            } else if (["J", "Q", "K"].includes(value)) {
                score += 10;
            } else {
                score += parseInt(value);
            }
        });

        // Om summan överstiger 21 och det finns ess, ändra ess från 11 till 1, basic reglerrrr
        while (score > 21 && aces > 0) {
            score -= 10;
            aces -= 1;
        }

        if (score > 21) {
        document.getElementById("nummer").innerText = "You lost got fat: " + score;
        document.getElementById("nummer").style.color = "red";
        let element = document.getElementById("get-number")
        element.disabled = true;
        }

        
        

        return score;
    }
}
export class Dealer extends Player {
    constructor(handCards = []) {
        super(handCards);
    }
    // Dealer funtioner
    
}

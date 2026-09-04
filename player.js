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
        return score;
    }
}
export class Dealer extends Player {
    constructor(handCards = []) {
        super(handCards);
    }
    
    
}

export class Deck {
    constructor() {
        this.cards = [];
        this.reset();
    }

    reset() {
        this.cards = [];
        var suits = ["diamonds", "spades", "hearts", "clubs"];
        var values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

        suits.forEach(suit => {
            values.forEach(value => {
                this.cards.push(`${value} of ${suit}`);
            });
        });
    }

    drawCard() {
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        return this.cards.splice(randomIndex, 1)[0];
    }
}


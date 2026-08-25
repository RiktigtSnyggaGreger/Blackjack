export class Player {
    // SUPER DUPER  KLASS
    constructor(handCards = []) {
        this.handCards = handCards;
    }
    // Player funtioner
}
export class Dealer extends Player {
    constructor(handCards = []) {
        super(handCards);
    }
    // Dealer funtioner
}

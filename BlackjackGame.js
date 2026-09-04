import { Deck, Player, Dealer } from './player.js';


export class BlackjackGame {
    constructor() {
        this.deck = new Deck();
        this.player = new Player();
        this.dealer = new Dealer();
        this.money = 1000;
        this.currentBet = 0;
    }

    newRound() {
        this.player = new Player();
        this.dealer = new Dealer();
        this.deck = new Deck();
    }

    placeBet(amount) {
        if (this.currentBet + amount > this.money) {
            return false;
        }
        this.currentBet += amount;
        return true;
    }

    dealerDrawUntil17() {
        while (this.dealer.calculateScore() < 17) {
            this.dealer.handCards.push(this.deck.drawCard());
        }
    }

    checkWin() {
        const playerScore = this.player.calculateScore();
        const dealerScore = this.dealer.calculateScore();

        if (playerScore > 21) {
            return 'player_bust';
        }

        if (dealerScore > 21) {
            return 'dealer_bust';
        }

        if (playerScore > dealerScore) {
            return 'player_win';
        } else if (playerScore < dealerScore) {
            return 'dealer_win';
        } else {
            return 'draw';
        }
    }
}

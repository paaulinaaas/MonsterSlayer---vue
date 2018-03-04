new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		turns: []
	},
	methods: {
		startGame: function() {
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100
		},
		attack: function(){
			var damage = this.calculateDamage(3, 10);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Player hits Monster and gave '+ damage + 'damage'
			})
			if (this.checkWin()) {
				return;
			}
			var damage = this.calculateDamage(6, 14)
			this.playerHealth -= damage;
			this.turns.unshift({
				isPlayer: false,
				text: 'Monster hits you for ' + damage
			})
			this.checkWin();
        },
		specialAttack: function(){
			var damage = this.calculateDamage(5, 15);
			this.monsterHealth -= damage;
				if (this.checkWin()) {
				return;
			}
			this.monsterAttack();
        },
		heal: function(){
			if (this.playerHealth <=90) {
				this.playerHealth += 10;
			} else {
				this.playerHealth = 100;
			}
			this.monsterAttack();
		},
		giveUp: function(){
			this.gameIsRunning = false;
		},
		calculateDamage: function(min, max) {
			return Math.max(Math.floor(Math.random()*max)+1, min);
		},
		monsterAttack: function() {
			var damage = this.calculateDamage(6, 12)
			this.playerHealth -= damage;
			this.checkWin();
			this.turns.unshift({
				isPlayer: false,
				text: 'Monster hits you for ' + damage
			})
		},
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});

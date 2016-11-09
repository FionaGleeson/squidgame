/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};

game_state.main.prototype = {

	preload: function() {
		game.load.image('sky', 'assets/ocean.png');
		game.load.image('ground', 'assets/platform.png');
		game.load.image('kelp', 'assets/kelp.png');
		game.load.image('star', 'assets/fish.png', 480, 480);
		game.load.spritesheet('star', 'assets/fish.png', 480, 480);
		game.load.spritesheet('dude', 'assets/squid.png', 160, 160);
	},

	create: function() {
		game.add.sprite(0, 0, 'star');
		game.add.sprite(0, 0, 'sky');
		this.platforms = game.add.group();
		this.platforms.enableBody = true;
		var ground = this.platforms.create(0, game.world.height - 64, 'ground');
		ground.scale.setTo(2, 2);
		ground.body.immovable = true;
		this.ledge = this.platforms.create(70, 220, 'kelp');
		this.ledge.body.immovable = true;
		this.ledge.body.setSize(110, 400, 0, 0);


		var ledge = this.platforms.create(300, 390, 'kelp');
		ledge.body.immovable = true;
		ledge.body.setSize(110, 400, 0, 0);

		ledge = this.platforms.create(590, 160, 'kelp');
		ledge.body.immovable = true;
		ledge.body.setSize(110, 400, 0, 0);

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.player = game.add.sprite(32, game.world.height - 570, 'dude');
		this.player.scale.setTo(0.7, 0.7);
		game.physics.arcade.enable(this.player);
		this.player.body.bounce.y = 0.45;
		this.player.body.gravity.y = 50;
		this.player.body.setSize(70, 115, 28, 20);



		// this.player.body.onMoveComplete = function() {
		// 	console.log('1');
		// }
		this.player.body.collideWorldBounds = true;
		this.player.animations.add('left', [7, 6, 5], 10, true);
		this.player.animations.add('right', [4, 3, 2], 10, true);
		this.player.animations.add('down', [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], 50, true);
		this.player.animations.add('up', [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], 50, true);
		//controls
		this.cursors = game.input.keyboard.createCursorKeys();

		this.stars = game.add.group();
		this.stars.enableBody = true;
		for (var i = 0; i < 24; i++) {
		var star = this.stars.create(i * 70, 0, 'star');
		star.scale.setTo(0.15, 0.15);

			star.frame = Math.floor(Math.random() * 5);

			star.body.gravity.y = 230;
			star.body.bounce.y = 0.9 + Math.random() * 0.2;
		}

		this.scoreText = game.add.text(16, 16, 'score: 0', {
			fontSize: '32px',
			fill: '#000'
		});

		this.score = -2;
	},


	update: function() {
		if (this.score >= 10) {
            game.state.start("end");
        }
        
        
        
		game.physics.arcade.collide(this.player, this.platforms);

		this.player.body.velocity.x = 0;


		if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
			this.player.animations.stop();
			this.player.frame = 0;


		}


		if (this.cursors.left.isDown) {
			this.player.body.velocity.x = -150;
		}
		else if (this.cursors.right.isDown) {
			this.player.body.velocity.x = 150;
		}


		if (this.cursors.down.isDown) {
			this.player.body.velocity.y = 100;
		}
		else if (this.cursors.up.isDown) {
			this.player.body.velocity.y = -80;
		}

		if (this.cursors.right.isDown) {
			this.player.animations.play('right');
		}
		else if (this.cursors.left.isDown) {
			this.player.animations.play('left');
		}
		else if (this.cursors.down.isDown) {
			this.player.animations.play('down');
		}
		else if (this.cursors.up.isDown) {
			this.player.animations.play('up');
		}






		game.physics.arcade.collide(this.stars, this.platforms);

		game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);


	},

	collectStar: function(player, star) {
		star.kill();
		this.score += 1;
		this.scoreText.text = "Score:" + this.score;

	}

};
game.state.add('main', game_state.main);

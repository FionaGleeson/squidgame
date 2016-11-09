/*global game Phaser game_state */
game_state.story = function() {};
game_state.story.prototype = {
    preload: function() {
        game.load.image('background', 'assets/ocean.2.png');
        game.load.image('star', 'assets/fish.png');
        // game.load.image('dude', 'assets/squid');
        game.load.spritesheet('star', 'assets/fish.png', 480, 480);
        game.load.spritesheet('dude', 'assets/squid.png', 160, 160);

    },
    create: function() {

        game.add.sprite(0, 0, 'background');
        this.storyText = game.add.text(16, 16, 'Help the squid eat fishies so he can not die of starvation. \nIf he eats 10 fish, he will be happy and full. \nSwim down to start.', {
            fontSize: '32px',
            fill: '#000'
        });

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = game.add.sprite(32, game.world.height - 470, 'dude');
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [7, 6, 5], 10, true);
        this.player.animations.add('right', [4, 3, 2], 10, true);
        this.player.animations.add('down', [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], 50, true);
        this.player.animations.add('up', [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], 50, true);

        this.player.scale.setTo(0.7, 0.7);

        this.player.body.bounce.y = 0.45;
        this.player.body.gravity.y = 0;
        this.player.body.setSize(70, 115, 28, 20);

        this.player.body.velocity.x = 0;



        //controls
        this.cursors = game.input.keyboard.createCursorKeys();

    },
    update: function() {

        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.player.animations.stop();
            this.player.frame = 0;
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }

        if (this.player.body.y >= 500) {
            game.state.start("main");
        }






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

    }
};
game.state.add('story', game_state.story);
game.state.start('story');

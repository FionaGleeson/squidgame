/*global game Phaser game_state */
game_state.end = function() {};
game_state.end.prototype = {
    preload: function() {
        game.load.image('ocean', 'assets/oceannn.png');
        //game.load.image('star', 'assets/fish.png');
        // game.load.image('dude', 'assets/squid');
        // game.load.spritesheet('star', 'assets/fish.png', 480, 480);
        game.load.spritesheet('dude', 'assets/Happy.png');

    },
    create: function() {
        game.add.sprite(0, 0, 'ocean');
        this.storyText = game.add.text(16, 16, '                                                               Thank you! \n\n\n                                                        I now have eaten enough \n                                                                  food to not starve', {
            fontSize: '32px',
            fill: '#000'
        });
        game.add.sprite(10, 60, 'dude');
    },
    update: function() {
    
    }
};
game.state.add('end', game_state.end);

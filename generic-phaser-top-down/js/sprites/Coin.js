(function (global) {

    var Coin = function (game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'characters',2);
        this.game = game;
        this.anchor.set(0.5);
        game.physics.arcade.enable(this);
        
        this.body.move = false;
    };


    Coin.prototype = Object.create(Phaser.Sprite.prototype);
    Coin.prototype.constructor = Coin;

    Coin.prototype.create = function () {

    };

    Coin.prototype.update = function () {

    };

    global.Coin = Coin;

})(this);

(function (global) {

    var Key = function (game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'characters',4);
        this.game = game;
        this.anchor.setTo(0.5);
        game.physics.arcade.enable(this);

        this.body.move = false;
    };


    Key.prototype = Object.create(Phaser.Sprite.prototype);
    Key.prototype.constructor = Key;

    Key.prototype.create = function () {

    };

    Key.prototype.update = function () {

    };

    global.Key = Key;

})(this);

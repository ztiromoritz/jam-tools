(function (global) {

    var Door = function (game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'characters', 5);
        this.game = game;
        this.anchor.setTo(0.5);
        game.physics.arcade.enable(this);
        this.move = false;
    };

    Door.prototype = Object.create(Phaser.Sprite.prototype);
    Door.prototype.constructor = Door;

    Door.prototype.create = function () {
    };

    Door.prototype.update = function () {
    };

    global.Door = Door;

})(this);

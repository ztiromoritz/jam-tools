(function (global) {

    var Heart = function (game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'characters',6);
        this.game = game;
        game.physics.arcade.enable(this);
        this.body.setSize(16, 16, 0, 0);
        this.anchor.set(0.5);
    };


    Heart.prototype = Object.create(Phaser.Sprite.prototype);
    Heart.prototype.constructor = Heart;

    Heart.prototype.create = function () {

    };

    Heart.prototype.update = function () {

    };

    global.Heart = Heart;

})(this);

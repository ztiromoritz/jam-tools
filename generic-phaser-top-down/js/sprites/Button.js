(function (global) {

    var OFFSET = 8;

    var Button = function (game, x, y, color, getBlock, playerIsOnTile) {
        Phaser.Sprite.call(this, game, x, y, 'characters',OFFSET+color);
        this.color = color;
        this.game = game;
        game.physics.arcade.enable(this);
        this.body.setSize(16, 16, 0, 0);
        this.anchor.setTo(0.5); //so it flips around its middle
        this.animations.add('idle', [], 10, true);
        this.getBlock = getBlock;
        this.playerIsOnTile = playerIsOnTile;
    };


    Button.prototype = Object.create(Phaser.Sprite.prototype);
    Button.prototype.constructor = Button;

    Button.prototype.create = function () {

    };

    Button.prototype.update = function () {

    };

    Button.prototype.isPressed = function(){
        var X = this.game.math.snapToFloor(Math.floor(this.x), 16) / 16;
        var Y = this.game.math.snapToFloor(Math.floor(this.y), 16) / 16;
        return( this.getBlock(X,Y) || this.playerIsOnTile(X,Y) );
    };

    global.Button = Button;

})(this);

(function (global) {

    var OFFSET = 12;

    var Obstacle = function (game, x, y, color, getPressedButtonByColor) {
        console.log("color",color);
        Phaser.Sprite.call(this, game, x, y, 'characters', OFFSET + color);
        this.color = color;
        this.game = game;
        game.physics.arcade.enable(this);
        this.body.setSize(16, 16, 0, 0);
        this.anchor.setTo(0.5); //so it flips around its middle
        this.animations.add('idle', [], 10, true);
        this.getPressedButtonByColor = getPressedButtonByColor;
        this.passable = false;

        this.X = this.game.math.snapToFloor(Math.floor(this.x), 16) / 16;
        this.Y = this.game.math.snapToFloor(Math.floor(this.y), 16) / 16;
    };


    Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
    Obstacle.prototype.constructor = Obstacle;

    Obstacle.prototype.create = function () {

    };

    Obstacle.prototype.update = function () {
        var button = this.getPressedButtonByColor(this.color);
        if(button && button.isPressed()){
            this.passable = true;
            this.alpha = 0.2;
        }else{
            this.passable = false;
            this.alpha = 1.0;
        }
    };

    Obstacle.prototype.isPassable = function(){
        return this.passable;
    }

    global.Obstacle = Obstacle;

})(this);

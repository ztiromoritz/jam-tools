(function (global) {

    var speed = 2;

    var Block = function (game, x, y, map, layerIndex, getBlock, getObstacle) {
        Phaser.Sprite.call(this, game, x, y, 'characters',5);
        this.game = game;
        game.physics.arcade.enable(this);
        this.body.setSize(16, 16, 0, 0);
        this.anchor.setTo(0.5); //so it flips around its middle
        this.animations.add('idle', [], 10, true);
        this.map = map;
        this.layerIndex = layerIndex;
        this.X = game.math.snapToFloor(Math.floor(this.x), 16) / 16;
        this.Y = game.math.snapToFloor(Math.floor(this.y), 16) / 16;
        this.math = game.math;
        this.target = null;
        this.getBlock = getBlock;
        this.getObstacle = getObstacle;
    };


    Block.prototype = Object.create(Phaser.Sprite.prototype);
    Block.prototype.constructor = Block;

    Block.prototype.create = function () {

    };

    Block.prototype.update = function () {
        if(this.target){
            var X = this.game.math.snapToFloor(Math.floor(this.x), 16) / 16;
            var Y = this.game.math.snapToFloor(Math.floor(this.y), 16) / 16;
            if(this.onTileCenter() && this.target.X === X && this.target.Y === Y){
                this.direction = Phaser.NONE;
                this.target = null;

                return;
            }
            switch (this.direction) {
                case Phaser.LEFT:
                this.x -= speed;
                break;

                case Phaser.RIGHT:
                this.x += speed;
                break;

                case Phaser.UP:
                this.y -= speed;
                break;

                case Phaser.DOWN:
                this.y += speed;
                break;

                case Phaser.NONE:
                break;
                default:

            }
        }
    };

    //Move one field
    //returns true if possible
    Block.prototype.move = function(nextDirection){
        var X = this.game.math.snapToFloor(Math.floor(this.x), 16) / 16;
        var Y = this.game.math.snapToFloor(Math.floor(this.y), 16) / 16;

        var targetTile = null;
        switch (nextDirection) {
            case Phaser.LEFT:
            targetTile = this.map.getTileLeft(this.layerIndex, X, Y);
            break;

            case Phaser.RIGHT:
            targetTile = this.map.getTileRight(this.layerIndex, X, Y);
            break;

            case Phaser.UP:
            targetTile = this.map.getTileAbove(this.layerIndex, X, Y);
            break;

            case Phaser.DOWN:
            targetTile = this.map.getTileBelow(this.layerIndex, X, Y);
            break;

            case Phaser.NONE:
            break;
            default:
        }

        var block = this.getBlock(targetTile.x,targetTile.y);
        var obstacle = this.getObstacle(targetTile.x, targetTile.y);
        if(targetTile &&
            !targetTile.properties.collision &&
            !block &&
            !targetTile.properties.door &&
            !(obstacle && !obstacle.isPassable()))
        {
            this.direction = nextDirection;
            this.target = {X:targetTile.x,Y: targetTile.y};
            this.X = targetTile.x;
            this.Y = targetTile.y;
            return true;
        }else{
            this.direction = Phaser.NONE;
            this.target = null;
            return false;
        }

    };

    Block.prototype.onTileCenter = function(){
        return (this.math.fuzzyEqual(this.x % 16,8,1) && this.math.fuzzyEqual(this.y % 16,8,1));
    };


    global.Block = Block;

})(this);

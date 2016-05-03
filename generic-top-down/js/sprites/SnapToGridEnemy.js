(function (global) {
    var speed = 1;

    var SnapToGridEnemy = function (game, x, y, map, layerIndex, getBlock, getObstacle) {
        Phaser.Sprite.call(this, game, x, y, 'characters',1);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.anchor.set(0.5);
        game.physics.arcade.enable(this);
        this.body.move = false;
        this.direction = Phaser.NONE;
        this.nextDirection = Phaser.NONE;

        this.map = map;
        this.layerIndex = layerIndex;
        this.math = this.game.math;
        this.getBlock = getBlock;
        this.getObstacle = getObstacle;
    };


    SnapToGridEnemy.prototype = Object.create(Phaser.Sprite.prototype);
    SnapToGridEnemy.prototype.constructor = SnapToGridEnemy;

    SnapToGridEnemy.prototype.create = function () {

    };

    SnapToGridEnemy.prototype.update = function () {

        if(this.direction === Phaser.NONE){
                this.nextDirection = _.sample([Phaser.UP, Phaser.DOWN, Phaser.LEFT, Phaser.RIGHT]);
        }


        if(this.onTileCenter()){
            var X = this.game.math.snapToFloor(Math.floor(this.x), 16) / 16;
            var Y = this.game.math.snapToFloor(Math.floor(this.y), 16) / 16;


            var targetTile = null;
            switch (this.nextDirection) {
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
                this.direction = this.nextDirection;
            }else{
                this.direction = Phaser.NONE;
            }
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

    };

    SnapToGridEnemy.prototype.onTileCenter = function(){
        return (this.math.fuzzyEqual(this.x % 16,8,1) && this.math.fuzzyEqual(this.y % 16,8,1));
    };

    global.SnapToGridEnemy = SnapToGridEnemy;

})(this);

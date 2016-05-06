(function (global) {
    var speed = 2;

    var SnapToGridPlayer = function (game, x, y, map, layerIndex, inventory, doorCallback, getBlock, getObstacle) {
        Phaser.Sprite.call(this, game, x, y, 'characters',0);
        this.initX = x;
        this.initY = y;
        this.anchor.set(0.5);
        game.physics.arcade.enable(this);
        this.body.move = false;
        this.body.setSize(12, 12, 0, 0);

        this.cursors = game.input.keyboard.createCursorKeys();
        this.direction = Phaser.NONE;
        this.nextDirection = Phaser.NONE;

        this.map = map;
        this.layerIndex = layerIndex;
        this.animations.add('idle',[0], 10, true);
        this.animations.add('blink',[0,15], 10, true);
        this.play('idle');
        this.math = this.game.math;

        this.inventory = inventory;
        this.immortal = false;
        this.damageTime = null;

        this.doorCallback = doorCallback;
        this.getBlock = getBlock;
        this.getObstacle = getObstacle;
    };


    SnapToGridPlayer.prototype = Object.create(Phaser.Sprite.prototype);
    SnapToGridPlayer.prototype.constructor = SnapToGridPlayer;

    SnapToGridPlayer.prototype.create = function () {

    };

    SnapToGridPlayer.prototype.update = function () {
        this.checkImmortal();

        this.nextDirection = Phaser.NONE;
        if (this.cursors.left.isDown) {
            this.nextDirection = Phaser.LEFT;
        }
        if (this.cursors.right.isDown) {
            this.nextDirection = Phaser.RIGHT;
        }
        if (this.cursors.up.isDown) {
            this.nextDirection = Phaser.UP;
        }
        if (this.cursors.down.isDown) {
            this.nextDirection = Phaser.DOWN;
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


            if(targetTile && !targetTile.properties.collision){
                var block = this.getBlock(targetTile.x,targetTile.y);
                var obstacle = this.getObstacle(targetTile.x, targetTile.y);
                console.log(obstacle);
                if(targetTile.properties.door){
                    if(this.inventory.hasKey()){
                        this.inventory.setKey(false);
                        if(this.doorCallback){
                            this.doorCallback();
                        }
                    }else{
                        this.direction = Phaser.NONE;
                    }
                } else if(block) {
                    if(block.move(this.nextDirection)){
                        this.direction = this.nextDirection;
                    }else{
                        this.direction = Phaser.NONE;
                    }
                } else if(obstacle){
                    if(obstacle.isPassable()){
                        this.direction = this.nextDirection;
                    }else{
                        this.direction = Phaser.NONE;
                    }
                }else{
                    this.direction = this.nextDirection;
                }

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

    SnapToGridPlayer.prototype.checkImmortal = function(){
        if(this.immortal){
            if(_.isNumber(this.damageTime)){
                if(this.game.time.now - this.damageTime > 1300){
                    this.immortal = false;
                    this.play('idle');
                }
            }
        }
    };

    SnapToGridPlayer.prototype.setImmortal = function(){
        this.immortal = true;
        this.damageTime = this.game.time.now;
        this.play('blink');
    };

    //returns true if dead
    SnapToGridPlayer.prototype.damage = function(){
        if(this.immortal){
            return;
        }
        this.setImmortal();
        return this.inventory.heartsDec();
    };

    SnapToGridPlayer.prototype.onTileCenter = function(){
        return (this.math.fuzzyEqual(this.x % 16,8,1) && this.math.fuzzyEqual(this.y % 16,8,1));
    };

    SnapToGridPlayer.prototype.isOnTile = function(X,Y){
        var pX = this.game.math.snapToFloor(Math.floor(this.x), 16) / 16;
        var pY = this.game.math.snapToFloor(Math.floor(this.y), 16) / 16;
        return (pX === X && pY === Y);
    };

    global.SnapToGridPlayer = SnapToGridPlayer;

})(this);

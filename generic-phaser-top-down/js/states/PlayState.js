(function(global){

    var LEVEL = [
        'level1',
        'level2',
        'level3'
    ];

    var PlayState = function(){
        Phaser.State.call(this);

        this.map = null;        //The tiled Map
        this.tileLayer = null;  //TileLayer
        this.player = null;     //The Player sprite
        this.enemies = null;
        this.keys = null;
        this.coins = null;
        this.doors = null;
        this.hearts = null;
        this.blocks = null;
        this.buttons = null;
        this.obstacles = null;

        this.currentLevel = 0;


    };
    PlayState.prototype = Object.create(Phaser.State.prototype);

    PlayState.prototype.create = function(){

        //config/gloabl stuff
        this.game.stage.backgroundColor = '#ff00ff';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.loadLevel(LEVEL[this.currentLevel]);
    };

    PlayState.prototype.restartLevel = function(){
        var self = this;
        var level = LEVEL[this.currentLevel];
        var fadeOut = this.game.add.tween(this.game.world).to({alpha: 0.0}, 500);
        var fadeIn  = this.game.add.tween(this.game.world).to({alpha: 1.0}, 500);
        fadeOut.onComplete.add(function(){
            self.loadLevel(level);
        });
        fadeOut.chain(fadeIn);
        fadeOut.start();
    };

    PlayState.prototype.nextLevel = function(){
        var self = this;
        this.currentLevel++;
        if(this.currentLevel < LEVEL.length){
            var level = LEVEL[this.currentLevel];
            var fadeOut = this.game.add.tween(this.game.world).to({alpha: 0.0}, 500);
            var fadeIn  = this.game.add.tween(this.game.world).to({alpha: 1.0}, 500);
            fadeOut.onComplete.add(function(){
                self.loadLevel(level);
            });
            fadeOut.chain(fadeIn);
            fadeOut.start();
        }else{
            this.game.state.start("win");
        }
    };



    PlayState.prototype.loadLevel = function(mapName){
        var self = this;

        this.game.world.removeAll();

        this.map = this.game.add.tilemap(mapName);
        // By conventions the name of tileset in json/tiled this.map
        // and the cacheKey for the tileset image hast to be the same
        this.map.addTilesetImage('tiles');
        //this.map.addTilesetImage('characters','marker');

        //Tiles - rastered Tiles with collision
        this.tileLayer = this.map.createLayer('tiles');
        this.tileLayer.resizeWorld();

        this.coins = this.game.add.group();
        this.keys = this.game.add.group();
        this.enemies = this.game.add.group();
        this.doors = this.game.add.group();
        this.hearts = this.game.add.group();
        this.buttons = this.game.add.group();
        this.blocks = this.game.add.group();
        this.obstacles = this.game.add.group();

        this.inventory = new Inventory(this.game,null,336,2);
        this.game.add.existing(this.inventory);




        var playerIsOnTile = function(X,Y){
            return self.player.isOnTile(X,Y);
        };

        var getPressedButtonByColor = function(color){
            var result = self.buttons.filter(function(button){
                return button.color === color && button.isPressed();
            });
            if(result.list.length > 0){
                return result.list[0];
            }
            return null;
        };

        var getObstacle = function(X,Y){
            var result = self.obstacles.filter(function(obstacle){
                return obstacle.X === X && obstacle.Y === Y;
            });
            if(result.list.length > 0){
                return result.list[0];
            }
            return null;
        };

        var getBlock = function(X,Y){ //getBlock
            var result = self.blocks.filter(function(block){
                return block.X === X && block.Y === Y;
            });
            if(result.list.length > 0){
                return result.list[0];
            }
            return null;
        };

        var doorCallback = function(){ //doorCallback
            self.nextLevel();
        } ;

        this.map.objects.marker.forEach(function (char) {
            var properties = getTileProperties(char.gid, self.map);
            var x = char.x + 8;
            var y = char.y - 8;
            if (properties.type === 'player') {
                self.player = new SnapToGridPlayer(self.game, x, y, self.map, self.tileLayer.index , self.inventory,
                    doorCallback,getBlock,getObstacle);
                    self.game.add.existing(self.player);
                    //self.game.camera.follow(self.player);
                } else if (properties.type === 'enemy') {
                    var enemy = new SnapToGridEnemy(self.game, x,y, self.map, self.tileLayer.index, getBlock, getObstacle );
                    self.enemies.add(enemy);
                } else if (properties.type === 'key') {
                    var key = new Key(self.game, x, y);
                    self.keys.add(key);
                } else if (properties.type === 'coin') {
                    var coin = new Coin(self.game, x, y);
                    self.coins.add(coin);
                }else if (properties.type === 'heart') {
                    var heart = new Heart(self.game, x, y);
                    self.hearts.add(heart);
                }else if (properties.type === 'block') {
                    var block = new Block(self.game, x, y, self.map, self.tileLayer.index, getBlock, getObstacle);
                    self.blocks.add(block);
                } else if (properties.type === 'button'){
                    var button = new Button(self.game, x,y , Colors.getColor(properties.color), getBlock, playerIsOnTile);
                    self.buttons.add(button);
                } else if (properties.type === 'obstacle'){
                    var obstacle = new Obstacle(self.game, x,y , Colors.getColor(properties.color), getPressedButtonByColor);
                    self.obstacles.add(obstacle);
                }
            });


            //this.textBox = new TextBox(this.game, null, 5, 20);
            //this.game.add.existing(this.textBox);

            /**
            //
            //T A L K
            //
            //
            talk.init().onClose(function(){
                talk.hide();
            }).show('NPC1');
            **/
        };

        PlayState.prototype.update = function() {
            var self = this;

            this.debugInfo();
            this.physics.arcade.collide(this.player, this.coins, null,function(player, coin){
                console.log('pling');
                self.inventory.pointsInc();
                coin.destroy();
            });

            this.physics.arcade.collide(this.player, this.hearts, null,function(player, heart){
                console.log('plong');
                heart.destroy();
                self.inventory.heartsInc();
            });

            this.physics.arcade.collide(this.player, this.keys, null,function(player, key){
                key.destroy();
                self.inventory.setKey(true);
            });

            this.physics.arcade.collide(this.player, this.enemies, null,function(player, enemy){
                if(player.damage())
                {
                    self.restartLevel();
                }
            });

        };

        PlayState.prototype.debugInfo = function() {
            var self = this;
            if (this.game.config.enableDebug) {
                this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
                this.game.debug.body(this.player);
                this.coins.forEach(function (item) {
                    self.game.debug.body(item, 'rgba(255,0,0,0.2)');
                });
            }
        };

        global.PlayState = PlayState;
})(this);

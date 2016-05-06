(function (global) {

    function pad(number){
        return ("    " + number).slice(-4);
    }

    var Inventory = function (game, parent, x, y) {
        Phaser.Group.call(this, game, parent,'Inventory', false, false);
        this.x = x;
        this.y = y;
        this.game = game;
        this.fixedToCamera = true;

        this.state = {
            hearts : 3,
            key : false,
            points : 0
        };

        var self = this;
        var hearts = [];
        hearts.push(game.add.sprite(0, 0, 'characters',6));
        hearts.push(game.add.sprite(16, 0, 'characters',6));
        hearts.push(game.add.sprite(32, 0, 'characters',6));
        _.forEach(hearts, function(heart){
            self.add(heart);
        });
        this.hearts = hearts;

        var key = game.add.sprite(48, 0, 'characters',4);
        this.add(key);
        this.key = key;

        var coin = game.add.sprite(-16,0,'characters',2);
        this.add(coin);

        var points  = game.add.text(-48, 1, pad(this.state.points), {
            font: "14px Courier New",
            fill: "#e3e35d",
            align: "right"
        });
        points.anchor.setTo(0, 0);
        this.points = points;
        this.add(points);


        this.setAllChildren("x",this.x,false,false,1 /**Add*/);
        this.setAllChildren("y",this.y,false,false,1 /**Add*/);

        this.updateSprites();
    };


    Inventory.prototype = Object.create(Phaser.Group.prototype);
    Inventory.prototype.constructor = Inventory;

    Inventory.prototype.updateSprites = function(){
        for(var i = 0; i< 3; i++){
            if(i < this.state.hearts){
                this.hearts[i].alpha = 1.0;
            }else{
                this.hearts[i].alpha = 0.2;
            }
        }
        if(this.state.key){
            this.key.alpha = 1.0;
        }else{
            this.key.alpha = 0.2;
        }
    };

    Inventory.prototype.create = function () {

    };

    Inventory.prototype.update = function () {
        this.updateSprites();
    };

    Inventory.prototype.setKey = function(value){
        this.state.key = value;
    };

    Inventory.prototype.hasKey = function(){
        return this.state.key;
    };

    Inventory.prototype.pointsInc = function(){
        this.state.points += 1;
        this.points.setText(pad(this.state.points));
    };

    Inventory.prototype.heartsDec = function(){
        this.state.hearts -= 1;
        return (this.state.hearts === 0);
    };

    Inventory.prototype.heartsInc = function(){
        if(this.state.hearts < 3){
            this.state.hearts += 1;
        }
    };

    global.Inventory = Inventory;

})(this);

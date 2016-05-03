(function (global) {

    var ELEVEN_CHARS = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~�";

    var TextBox = function (game, parent, x, y) {
        Phaser.Group.call(this, game, parent,'TextBox', false, false);

        this.x = x;
        this.y = y;
        this.game = game;


        this.box = game.add.graphics(0,0);
        this.box.beginFill(0x0000ff);
        this.box.lineStyle(1, 0xffffff, 1);
        this.box.drawRect(0, 0, 375, 100);

        this.add(this.box);

        /*this.text = new Phaser.Text(game, 90, 10, "", {
            wordWrapWidth: 285 ,
            wordWrap: true,
            font : '8px PressStart2P',
            fill : '#ffffff'
        });*/


        this.text = new Phaser.BitmapText(game, 90, 10, "press_12_white", "",12);
        this.text.textHeight = 14;

        //this.text = new Phaser.RetroFont(game,'Eleven', 16, 16, ELEVEN_CHARS, 16, 1, 1);

        this.add(this.text);

        this.char = this.game.add.sprite(5,5,'voice',0);
        this.char.animations.add('idle',[0], 10, true);
        this.char.animations.add('bla',[0,1,2,3], 10, true);
        //this.char.scalet.setTo(2.0);
        this.char.play('idle');

        this.add(this.char);

        this.setAllChildren("x",this.x,false,false,1 /**Add*/);
        this.setAllChildren("y",this.y,false,false,1 /**Add*/);

        this.writeMessage('Hello World! what is up asdfjkhadsf asdflkjhasdf aslkjhasdf asdflkjh asdf ');
    };


    TextBox.prototype = Object.create(Phaser.Group.prototype);
    TextBox.prototype.constructor = TextBox;

    TextBox.prototype.create = function () {

    };

    TextBox.prototype.update = function () {

    };

    TextBox.prototype.writeMessage = function(message) {
        var self = this;
        this.text.setText(message);
        this.char.play('bla');

        var typewriter = new Typewriter();
        typewriter.init(this.game, {
            writerObj : this.text,
            text : message,
            maxWidth : 285,
            time : 50,
            endFn : function(){
                    self.char.play('idle');
            },
            x: 90,
            y: 30,
        });
        //this.text.setText(message);
        typewriter.start();
    };

    global.TextBox = TextBox;

})(this);

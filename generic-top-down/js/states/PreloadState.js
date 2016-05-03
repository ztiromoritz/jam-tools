(function(global){
    var PreloadState = function(game){
        Phaser.State.call(this);
    };


    global.GRAPHICS = false;


    var search = window.location.search;
    if(search){
        if(search.indexOf("gra=true") !== -1){
            global.GRAPHICS = true;
        }

    }

    PreloadState.prototype = Object.create(Phaser.State.prototype);

    PreloadState.prototype.preload = function(){
        //Settings
        this.game.stage.smoothed = false;
        this.game.config.enableDebug = false;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale(2, 2);
        this.game.time.advancedTiming = true;
        //this.game.sound.mute = true;

        if(global.GRAPHICS){
            this.game.load.spritesheet('characters', 'assets/characters/characters.png', 16, 16);
        }else{
            this.game.load.spritesheet('characters', 'assets/characters/characters_dummy.png', 16, 16);
        }


        this.game.load.spritesheet('voice', 'assets/dialogs/voice.png', 64, 64);
        this.game.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('level2', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('level3', 'assets/tilemaps/level3.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('tiles', 'assets/tilemaps/tiles.png', 16, 16);



        //Dialogs
        this.game.load.text('dialog1', 'assets/dialogs/dialog.twee');

        // Fonts
        //font load hack!!
        this.game.add.text(0, 0, "fix", {font:"1px PressStart2P", fill:"#FFFFFF"});
/*
        this.game.load.bitmapFont('eleven', 'assets/fonts/Eleven/eleven/eleven_white.png', 'assets/fonts/Eleven/eleven/eleven.fnt');
        this.game.load.bitmapFont('eleven_12', 'assets/fonts/Eleven/eleven_12/eleven_12.png', 'assets/fonts/Eleven/eleven_12/eleven_12.fnt');
        this.game.load.bitmapFont('eleven_16', 'assets/fonts/Eleven/eleven_16/eleven_16.png', 'assets/fonts/Eleven/eleven_16/eleven_16.fnt');
        this.game.load.bitmapFont('eleven_16_white', 'assets/fonts/Eleven/eleven_16/eleven_16_white.png', 'assets/fonts/Eleven/eleven_16/eleven_16.fnt');
        this.game.load.bitmapFont('eleven_20', 'assets/fonts/Eleven/eleven_20/eleven_20.png', 'assets/fonts/Eleven/eleven_20/eleven_20.fnt');
        this.game.load.bitmapFont('eleven_24', 'assets/fonts/Eleven/eleven_24/eleven_24.png', 'assets/fonts/Eleven/eleven_24/eleven_24.fnt');

        this.game.load.bitmapFont('press_16_white',
        'assets/fonts/press_start_2p/press_16_white_border/press_16_white_border.png',
        'assets/fonts/press_start_2p/press_16_white_border/press_16_white_border.fnt');

        this.game.load.bitmapFont('press_16',
        'assets/fonts/press_start_2p/press_16/press_16.png',
        'assets/fonts/press_start_2p/press_16/press_16.fnt');

        this.game.load.bitmapFont('press_12_2_white',
        'assets/fonts/press_start_2p/press_12_2/press_12_2.png',
        'assets/fonts/press_start_2p/press_12_2/press_12_2.fnt');

        this.game.load.bitmapFont('press_12_white',
        'assets/fonts/press_start_2p/press_12/press_12_white.png',
        'assets/fonts/press_start_2p/press_12/press_12.fnt');

*/
        //this.game.load.image('Eleven', 'assets/fonts/Eleven/Eleven.png');


        this.game.load.onFileComplete.add(function (progress, key, success) {
            console.log(progress + '%', key + ' loaded', success);
        }, game);


        this.game.load.onLoadComplete.add(function(){
            //Post processing
            tweepee.addDialog("dialog", this.game.cache.getText('dialog1'));
        }, this);

    };

    PreloadState.prototype.create = function(){
        this.game.state.start("play");
    };

    global.PreloadState = PreloadState;
})(this);

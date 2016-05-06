
module.exports = {

    name: "Phaser Sprite",

    params: ["Name","Spritesheet"],

    rules: function(config) {

      return({
        items: [
          { destinationFile: config["Name"]+".js", sourceTemplateFile: "PhaserSprite.template" }
        ]
      });

    }

}

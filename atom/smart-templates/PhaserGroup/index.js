
module.exports = {

    name: "Phaser Group",

    params: ["Name"],

    rules: function(config) {

      return({
        items: [
          { destinationFile: config["Name"]+".js", sourceTemplateFile: "PhaserGroup.template" }
        ]
      });

    }

}

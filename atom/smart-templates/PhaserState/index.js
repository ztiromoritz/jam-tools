
module.exports = {

    name: "Phaser State",

    params: ["Name"],

    rules: function(config) {

      return({
        items: [
          { destinationFile: config["Name"]+".js", sourceTemplateFile: "PhaserState.template" }
        ]
      });

    }

}

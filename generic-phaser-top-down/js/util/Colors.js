(function(global){


    var Colors = {
        RED: 0,
        GREEN: 1,
        YELLOW: 2,
        ORANGE: 3
    };

    Colors.getColor = function(name){
        if(name && _.isNumber(Colors[name.toUpperCase()])){
            return Colors[name.toUpperCase()];
        }
        return -1;
    };

    global.Colors = Colors;



})(this);

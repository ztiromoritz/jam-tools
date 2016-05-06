(function (global) {
    var talk = {};

    talk.show = function(dialog){
        tweepee.start("dialog",dialog);
        tweepee.enableKeyboardHandler();
        $('#talk').show();
        return this;
    };

    talk.hide = function(){
        tweepee.disableKeyboardHandler();
        $('#talk').hide();
        return this;
    };

    talk.init = function(){
        tweepee.registerUpdateCallback(function(name,title){
            $('#talk').html(tweepee.getEntry(name, title));
        });
        return this;
    };

    talk.onClose = function(onClose, context) {
        tweepee.registerCloseCallback(_.bind(onClose, context));
        return this;
    };

    global.talk = talk;

})(this);

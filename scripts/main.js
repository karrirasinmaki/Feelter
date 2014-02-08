var MetroCoffee = (function() {
    
    require(["utils/hammer", "utils/utils", "ui/widgets", "ui/mainView"],
    function(hammer,          utils,         widgets,      mainView) {
        
        var context = {
            Hammer: hammer,
            widgets: widgets,
            utils: utils
        };
        
        utils.load.css("font/nexa.css");
        mainView.init(context);
    });
    
})();
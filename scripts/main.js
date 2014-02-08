var MetroCoffee = (function() {
    
    require(["utils/hammer", "utils/utils", "ui/widgets", "ui/mainView"],
    function(hammer,          utils,         widgets,      mainView) {
        
        var context = {
            Hammer: hammer,
            widgets: widgets,
            utils: utils
        };
        
        mainView.init(context);
    });
    
})();
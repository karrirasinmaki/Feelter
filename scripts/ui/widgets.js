define(function() {
    
    var topBar = function() {
        var div = document.createElement("div");
        div.className = "topbar";
        
        return div;
    };
    
    return {
        topBar: topBar
    };
    
});
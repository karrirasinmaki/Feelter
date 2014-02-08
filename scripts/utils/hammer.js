define(["./hammer.core"], function(Hammer) {
    window.Hammer = Hammer;
    require(["utils/hammer.fakemultitouch", "utils/hammer.showtouches"], function(h) {
        Hammer.plugins.fakeMultitouch();
        Hammer.plugins.showTouches();
    });
             
    return Hammer;
});
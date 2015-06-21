require(['fizz', 'svg-injector'], function(fizz, SVGInjector) {
    var controller = function($scope, $element) {
        var mySVGsToInject = $element[0].querySelectorAll('img.inject-me');
        SVGInjector(mySVGsToInject);
    };
    fizz.define('Header', controller);
});
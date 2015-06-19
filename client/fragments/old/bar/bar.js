require(['./js/fizz'], function(fizz) {
    var controller = function($scope) {
        
        var foo = fizz.require('foo');
        
        $scope.val = 0;
        
        $scope.press = function() {
            $scope.val++;
            if (foo.loaded) foo.controller.test();
        };
        
    };
    fizz.define('Fizz-Bar', controller);
});
require(['./js/fizz'], function(fizz) {
    var controller = function($scope) {
        
        $scope.val = 0;
        
        $scope.press = function() {
            $scope.val++;
        };
        
    };
    fizz.define('Foo', controller);
});
require(['./js/fizz'], function(fizz) {
    var controller = function($scope) {
        
        $scope.blah = "stuff";
        
        controller.test = function() {
            console.log('hello');
        };
        
    };
    fizz.define('Fizz-Foo', controller);
});
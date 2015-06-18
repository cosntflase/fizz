/* global Fizz io */

Fizz.defineFragment('Fizz-Unregister', function(element, socket) {
    var fragment = this;
    
    fragment.element = $(element);
    fragment.socket = socket;
    
    fragment.unregister = function(user) {
        fragment.socket.emit('fizz-user-unregister', {
            callback: 'fizz-user-unregister-response'
        });
    };
    
    fragment.socket.on('fizz-user-unregister-response', function(data) {
        if (!data.error) {
            
        }
    });
    
    fragment.controller = function($scope) {
        $scope.unregister = fragment.unregister;
    };
    
});
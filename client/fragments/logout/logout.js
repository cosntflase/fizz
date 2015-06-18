/* global Fizz */

Fizz.defineFragment('Fizz-Logout', function(element, socket) {
    var fragment = this;
    
    fragment.element = $(element);
    fragment.socket = socket;
    
    fragment.logout = function() {
        fragment.socket.emit('fizz-user-logout', {
            callback: 'fizz-user-logout-response'
        });
    };
    
    fragment.socket.on('fizz-user-logout-response', function(data) {
        if (!data.error) {
            
        }
    });
    
    fragment.controller = function($scope) {
        $scope.logout = fragment.logout;
    };
    
});
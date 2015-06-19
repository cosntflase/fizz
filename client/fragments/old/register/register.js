/* global Fizz */

Fizz.defineFragment('Fizz-Register', function(element, socket) {
    var fragment = this;
    
    fragment.element = $(element);
    fragment.socket = socket;
    fragment.project = Fizz.requireFragment('project-browser');
    
    fragment.register = function(user) {
        fragment.socket.emit('fizz-user-register', {
            user: user,
            callback: 'fizz-user-register-response'
        });
    };
    
    fragment.socket.on('fizz-user-register-response', function(data) {
        if (!data.error && data.user) {
            var user = data.user;
            var project = Fizz.insertFragment('project-browser', 'Fizz-Project-Browser', $('body'));
            project.instance.loadUser();
        }
    });
    
    fragment.controller = function($scope) {
        $scope.register = fragment.register;
    };
    
});
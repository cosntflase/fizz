/* global Fizz */

Fizz.defineFragment('Fizz-Login', function(element, socket) {
    var fragment = this;
    
    fragment.element = $(element);
    fragment.socket = socket;
    
    fragment.login = function(user) {
        fragment.socket.emit('fizz-user-login', {
            user: user,
            callback: 'fizz-user-login-response'
        });
    };
    
    fragment.socket.on('fizz-user-login-response', function(data) {
        if (!data.error && data.user) {
            var user = data.user;
            console.log("Logged in as: " + user.email);
            var project = Fizz.insertFragment('project-browser', 'Fizz-Project-Browser', $('body'));
            project.instance.loadUser();
        }
    });
    
    fragment.controller = function($scope) {
        $scope.login = fragment.login;
    };
    
});
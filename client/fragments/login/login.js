require(['./js/fizz', 'jquery', 'bootstrap/js/bootstrap-modal'], function(fizz, $, modal) {
    var controller = function($scope, $element) {
        
        $scope.toggle = true;
        $scope.user = null;
        
        $scope.switch = function() {
            $scope.toggle = !$scope.toggle;
        };
        
        $scope.login = function(user) {
            fizz.socket.emit('fizz-user-login', {
                user: user,
                callback: 'fizz-user-login-callback'
            });
        };
        
        fizz.socket.on('fizz-user-login-callback', function(data) {
            if (!data.error) {
                loginSuccess(data.user);
            }
        });
        
        $scope.register = function(user) {
            fizz.socket.emit('fizz-user-register', {
                user: user,
                callback: 'fizz-user-login-callback'
            });
        };
        
        fizz.socket.on('fizz-user-register-callback', function(data) {
            if (!data.error) {
                loginSuccess(data.user);
            }
        });
        
        function loginSuccess(user) {
            $scope.user = user;
            $scope.$apply();
            //$element.find('.fizz-user-modal').modal('hide');
            fizz.implement('project-browser', 'Project-Browser', $('body'), function(projectBrowser) {
                console.log(projectBrowser);
                projectBrowser.controller.loadUser();
            });
        }
        
        $scope.logout = function() {
            fizz.socket.emit('fizz-user-logout', {
                callback: 'fizz-user-logout-callback'
            });
        };
        
        fizz.socket.on('fizz-user-logout-callback', function(data) {
            if (!data.error) {
                $scope.user = null;
                $scope.$apply();
            }
        });
        
    };
    fizz.define('Login', controller);
});
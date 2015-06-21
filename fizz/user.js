(function() {
    
    var config = require('./config.json');
    var mongoose = require('mongoose');
    mongoose.connect(config.database);
    
    var UserSchema = new mongoose.Schema({
        email: String,
        password: String
    });
    
    var User = mongoose.model('User', UserSchema);
    
    var users = [];
    
    exports.socket = function(socket) {
        
        socket.on('fizz-user-register', register);
        socket.on('fizz-user-unregister', unregister);
        socket.on('fizz-user-login', login);
        socket.on('fizz-user-logout', logout);
        
        function register(data) {
            User.create(data.user, function(error, data) {
                User.findOne(data).exec(
                    function(error, user) {
                        if (user) {
                            users[socket.id] = user;
                            socket.emit(data.callback, { user: user });
                        }
                    });
            });
        }
        
        function unregister() {
            User.remove(socket.fizz.user,
            function (error) {
                socket.emit(data.callback, {});
            });
        }
        
        function login(data) {
            console.log(data.callback);
            User.findOne(data.user).exec(
                function(error, user) {
                    console.log(user);
                    if (user) {
                        users[socket.id] = user;
                        socket.emit(data.callback, { user: user });
                    }
                });
        }
        
        function logout(data) {
            users.splice(users.indexOf(socket.id), 1);
            socket.emit(data.callback, {});
        }
        
    };
    
    exports.getUser = function(socket) {
        return users[socket.id];
    };
    
})();
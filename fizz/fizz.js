(function() {
    
    var user = require('./user.js');
    var file = require('./file.js');
    
    exports.socket = function(socket) {
        socket.fizz = {};
        user.socket(socket);
        file.socket(socket);
    };
    
})();
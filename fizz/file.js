(function() {
    
    var fs = require('fs');
    var path = require('path');
    
    var mkdirp = require('mkdirp');
    var rimraf = require('rimraf');
    
    var user = require('./user');
    
    var file = {
        'file0.txt': 'file0 contents',
        'file1.txt': 'file1 contents',
        'file2.txt': 'file2 contents'
    };
    
    exports.initialize = function(path) {
        
    };
    
    exports.socket = function(socket) {
        
        var makeDataPath = function(user, file_path) {
            return path.join("data", user.getUser(socket).email, file_path);
        };
        
        socket.on('fizz-file-rename', function(path) {
            
        });
        
        socket.on('fizz-file-createDirectory', function(data) {
            mkdirp(makeDataPath(user, data.path), function (err) {
                if (err) console.error(err)
                else console.log('pow!')
                socket.emit(data.callback, {path: data.path});
            });
        });
        
        socket.on('fizz-file-deleteDirectory', function(data) {
            rimraf(makeDataPath(user, data.path), function (err) {
                if (err) console.error(err)
                else console.log('pow!')
                socket.emit(data.callback, {path: data.path});
            });
        });
        
        socket.on('fizz-file-retrieveDirectory', function(data) {
            var userGuy = user.getUser(socket);
            if (userGuy) {
                fs.readdir(makeDataPath(user, data.path), function(err, paths) {
                    if (!err) {
                        var fullPaths = paths.map(function(filepath) {
                            return path.join(data.path, filepath);
                        })
                        console.log(fullPaths);
                        socket.emit(data.callback, { directory: fullPaths });
                    } else {
                        socket.emit(data.callback, { directory: [] });
                    }
                });
            }
        });
        
        socket.on('fizz-file-createFile', function(path) {
            
        });
        
        socket.on('fizz-file-retrieveFile', function(data) {
            fs.readFile(makeDataPath(user, data.path), { encoding: "utf8" }, function(err, contents) {
                socket.emit(data.callback, { contents: contents });
            });
        });
        
        socket.on('fizz-file-saveFile', function(data) {
            console.log(data.contents);
            mkdirp(path.dirname(makeDataPath(user, data.path)), function (err) {
                if (err) console.error(err)
                else console.log('pow!')
            });
            console.log(user.getUser(socket));
            console.log(data.contents);
            fs.writeFile(makeDataPath(user, data.path), data.contents, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
                socket.emit(data.callback, {});
            }); 
            
        });
        
    };
    
})();
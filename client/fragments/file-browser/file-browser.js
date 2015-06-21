require(['fizz', 'bootstrap/modal'], function(fizz, bootstrap) {
    var controller = function($scope) {
        
        var editor;
        
        $scope.files = [];
        $scope.selectFile  = function(file) {
            editor.controller.load(file);
        };
        
        var loadProjectFiles = function(files) {
            $scope.files = files;
            $scope.$apply();
        };
        
        controller.loadProject = function(project) {
            fizz.socket.emit('fizz-file-retrieveDirectory', { 
                path: project,
                callback: 'fizz-file-loadProject-response'
            });
        };
        
        controller.linkEditor = function(editorToLink) {
            editor = editorToLink;
        };
        
        fizz.socket.on('fizz-file-loadProject-response', function(data) {
            if (!data.error) {
                loadProjectFiles(data.directory);
            }
        });
        
    };
    
    fizz.define('File-Browser', controller);
    
});
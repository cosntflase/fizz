require(['./js/fizz', 'bootstrap/js/bootstrap-modal'], function(fizz, bootstrap) {
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
        
        fizz.socket.on('fizz-file-loadProject-response', function(data) {
            if (!data.error) {
                loadProjectFiles(data.directory);
                editor = fizz.implement('editor', 'Editor', $('body'));
            }
        });
        
    };
    
    fizz.define('File-Browser', controller);
    
});
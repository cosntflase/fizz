/* global Fizz io */

Fizz.defineFragment('Fizz-File-Browser', function(element, socket) {
    var fragment = this;
    
    fragment.element = $(element);
    fragment.socket = socket;
    
    fragment.retrieveFile = function(file) {
        fragment.editor.open(file);
    };
    
    fragment.loadProject = function(project) {
        fragment.nextProject = project;
        socket.emit('fizz-file-retrieveDirectory', { 
            path: project,
            callback: 'fizz-file-loadProject-response'
        });
    };
    
    fragment.selectFile = function(file) {
        fragment.editor.instance.load(file);
    };
    
    fragment.socket.on('fizz-file-loadProject-response', function(data) {
        if (!data.error) {
            fragment.project = fragment.nextProject;
            fragment.controller.loadProjectFiles(data.directory);
            fragment.editor = Fizz.insertFragment('editor', 'Fizz-Editor', $('body'));
        }
    });
    
    fragment.controller = function($scope) {
        
        $scope.files = [];
        $scope.selectFile = fragment.selectFile;
        
        fragment.controller.loadProjectFiles = function(files) {
            $scope.files = files;
            $scope.$apply();
        };
        
    };
    
});
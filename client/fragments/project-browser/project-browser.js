/* global Fizz */

Fizz.defineFragment('Fizz-Project-Browser', function(element, socket) {
    var fragment = this;
    
    fragment.element = $(element);
    fragment.socket = socket;
    
    fragment.createProject = function() {
        var name = fragment.element.find('.name').val();
        fragment.socket.emit('fizz-file-createDirectory', {
            path: name,
            callback: 'fizz-file-createProject-response'
        });
    };
    
    fragment.socket.on('fizz-file-createProject-response', function(data) {
        if (!data.error) {
            var name = fragment.element.find('.name').val();
            fragment.controller.addProject(name);
        }
    });
    
    fragment.selectProject = function(project) {
        fragment.fileBrowser.instance.loadProject(project);
    };
    
    fragment.loadUser = function() {
        fragment.socket.emit('fizz-file-retrieveDirectory', {
            path: "",
            callback: 'fizz-file-loadUser-response'
        });
    };
    
    fragment.socket.on('fizz-file-loadUser-response', function(data) {
        if (!data.error) {
            fragment.controller.populateProjects(data.directory);
            fragment.fileBrowser = Fizz.insertFragment('file-browser', 'Fizz-File-Browser', $('body'));
        }
    });
    
    fragment.controller = function($scope) {
        
        $scope.projects = [];
        $scope.createProject = fragment.createProject;
        $scope.selectProject = fragment.selectProject;
        
        fragment.controller.populateProjects = function(directory) {
            $scope.projects = directory;
            $scope.$apply();
        };
        
        fragment.controller.addProject = function(name) {
            $scope.projects.push(name);
            $scope.$apply();
        };
        
    };
    
});

/*
fragment.socket.on('connect', function() {
    
});
*/
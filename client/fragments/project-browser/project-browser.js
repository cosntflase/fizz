require(['fizz', 'bootstrap/modal'], function(fizz, bootstrap) {
    
    var controller = function($scope, $element) {
        
        var fileBrowser;
        
        var projectModal = $element.find('.project-modal');
        var newProjectModal = $element.find('.new-project-modal');
        var deleteProjectModal = $element.find('.delete-project-modal');
        
        $scope.projects = [];
        
        $scope.newProject = function() {
            projectModal.modal('hide');
            newProjectModal.modal('show');
        };
        
        $scope.cancelNewProject = function() {
            newProjectModal.modal('hide');
            projectModal.modal('show');
        };
        
        $scope.createProject = function(newProjectName) {
            fizz.socket.emit('fizz-file-createDirectory', {
                path: newProjectName,
                callback: 'fizz-file-createProject-callback'
            });
        };
        
        fizz.socket.on('fizz-file-createProject-callback', function(data) {
            if (!data.error) {
                addProject(data.path);
                newProjectModal.modal('hide');
                initializeDevelopmentEnvironment(data.path);
            }
        });
        
        $scope.cancelDeleteProject = function() {
            deleteProjectModal.modal('hide');
            projectModal.modal('show');
        };
        
        $scope.deleteProject = function($event, project) {
            $event.stopPropagation();
            projectModal.modal('hide');
            deleteProjectModal.modal('show');
            deleteProjectModal.find('.delete-input').attr('placeholder', project);
            deleteProjectModal.project = project;
        };
        
        $scope.deleteProjectConfirm = function(confirmation) {
            if (confirmation == deleteProjectModal.project) {
                fizz.socket.emit('fizz-file-deleteDirectory', {
                    path: deleteProjectModal.project,
                    callback: 'fizz-file-deleteProject-callback'
                });
            }
        };
        
        fizz.socket.on('fizz-file-deleteProject-callback', function(data) {
            if (!data.error) {
                $scope.projects.splice($scope.projects.indexOf(data.path), 1);
                $scope.$apply();
                deleteProjectModal.modal('hide');
                projectModal.modal('show');
            }
        });
        
        $scope.selectProject = function(project) {
            $element.find('.project-modal').modal('hide');
            initializeDevelopmentEnvironment(project);
        };
        
        var initializeDevelopmentEnvironment = function(project) {
            //fileBrowser.controller.loadProject(project);
            fizz.implement('development-environment', 'Development-Environment', $('body'), function(developmentEnvironment) {
                developmentEnvironment.controller.loadProject(project);
            });
        };
        
        var populateProjects = function(directory) {
            $scope.projects = directory;
            $element.find('.project-modal').modal('show');
            $scope.$apply();
        };
        
        var addProject = function(name) {
            $scope.projects.push(name);
            $scope.$apply();
        };
        
        fizz.socket.on('fizz-file-loadUser-callback', function(data) {
            if (!data.error) {
                populateProjects(data.directory);
            }
        });
        
        controller.loadUser = function() {
            fizz.socket.emit('fizz-file-retrieveDirectory', {
                path: "",
                callback: 'fizz-file-loadUser-callback'
            });
        };
            
    };
    
    fizz.define('Project-Browser', controller);
    
});
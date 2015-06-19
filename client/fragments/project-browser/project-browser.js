require(['./js/fizz', 'bootstrap/js/bootstrap-modal'], function(fizz, bootstrap) {
    
    var controller = function($scope) {
        
        var projectName;
        
        $scope.projects = [];
        $scope.createProject = function(newProjectName) {
            projectName = newProjectName;
            fizz.socket.emit('fizz-file-createDirectory', {
                path: newProjectName,
                callback: 'fizz-file-createProject-response'
            });
        };
        $scope.selectProject = function(project) {
            controller.fileBrowser.instance.loadProject(project);
        };
        
        var populateProjects = function(directory) {
            $scope.projects = directory;
            $scope.$apply();
        };
        
        var addProject = function(name) {
            $scope.projects.push(name);
            $scope.$apply();
        };
        
        fizz.socket.on('fizz-file-loadUser-response', function(data) {
            if (!data.error) {
                populateProjects(data.directory);
                console.log("didit");
                //controller.fileBrowser = fizz.implement('file-browser', 'Fizz-File-Browser', $('body'));
            }
        });
        
        fizz.socket.on('fizz-file-createProject-response', function(data) {
            if (!data.error) {
                addProject(projectName);
            }
        });
        
        controller.loadUser = function() {
            fizz.socket.emit('fizz-file-retrieveDirectory', {
                path: "",
                callback: 'fizz-file-loadUser-response'
            });
        };
            
    };
    fizz.define('Project-Browser', controller);
});
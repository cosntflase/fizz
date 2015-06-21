require(['fizz', 'bootstrap/tab'], function(fizz, bootstrap) {
    var controller = function($scope) {
        
        var fileBrowser = fizz.require('file-browser');
        var editor = fizz.require('editor');
        
        controller.loadProject = function(project) {
            fileBrowser.controller.loadProject(project);
            fileBrowser.controller.linkEditor(editor);
        };
        
    };
    
    fizz.define('Development-Environment', controller);
    
});
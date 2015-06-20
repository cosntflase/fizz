require(['./js/fizz', 'bootstrap/js/bootstrap-modal'], function(fizz, bootstrap) {
    
    
    var controller = function($scope, $element) {
        
        var editor = ace.edit($element.find('.code')[0]);
        var editorSession = editor.getSession();
        
        $scope.save = function() {
            var text = editorSession.getValue();
            
            console.log($scope.fileName);
            fizz.socket.emit('fizz-file-saveFile', { 
                contents: text, 
                path: $scope.fileName,
                callback: 'fizz-file-saveFile-response' 
            });
        };
        
        $scope.load = function(file) {
            $scope.fileName = file || $scope.fileName;
            fizz.socket.emit('fizz-file-retrieveFile', {
                path: $scope.fileName,
                callback: 'fizz-file-retrieveFile-response'
            });
        };
        
        controller.load = $scope.load;
        controller.save = $scope.save;
        
        
        
        editor.setTheme("ace/theme/monokai");
        editorSession.setMode("ace/mode/javascript");
        
        fizz.socket.on('fizz-file-retrieveFile-response', function(data) {
            $scope.$apply();
            console.log(data);
            if (!data.error) {
                editorSession.setValue(data.contents);
            }
        });
    };
    
    fizz.define('Editor', controller);
    
});
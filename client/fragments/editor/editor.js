/* global Fizz ace */

Fizz.defineFragment('Fizz-Editor', function(element, socket) {
    var fragment = this;
    
    fragment.element = $(element);
    fragment.socket = socket;
    fragment.editor = ace.edit(fragment.element.find('.code')[0]);
    fragment.session = fragment.editor.getSession();
    
    fragment.editor.setTheme("ace/theme/monokai");
    fragment.session.setMode("ace/mode/javascript");
    
    fragment.save = function() {
        var filename = $(".filename")[0].value;
        var text = fragment.session.getValue();
        
        console.log(filename);
        fragment.socket.emit('fizz-file-saveFile', { 
            contents: text, 
            path: filename,
            project: Fizz.projectName, 
            callback: 'fizz-file-saveFile-response' 
        });
    };
    
    fragment.load = function(file) {
        var filename = file || $(".filename")[0].value;
        $(".filename")[0].value = filename;
        fragment.socket.emit('fizz-file-retrieveFile', {
            path: filename, 
            project: Fizz.projectName, 
            callback: 'fizz-file-retrieveFile-response'
        });
    };
    
    fragment.socket.on('fizz-file-retrieveFile-response', function(data) {
        console.log(data);
        if (!data.error) {
            fragment.session.setValue(data.contents);
            //$(".code").text(data.contents);
        }
    });
    
    fragment.controller = function($scope) {
        $scope.save = fragment.save;
        $scope.load = fragment.load;
    };
    
});
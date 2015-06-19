/* global io */
define(['jquery', 'angular'/*, 'socketio'*/], function($, angular/*, io*/) {
    
    if (!this.fizz) {
        
        var fizz = {};
        fizz.library = {};
        fizz.library.controllers = {};
        fizz.library.elements = {};
        fizz.library.references = {};
        
        fizz.application = angular.module('fizz', []);
        
        fizz.socket = {};//io.connect();
        
        var initialize = function() {
            importFragments();
            insertFragments();
        };
        
        var importFragments = function() {
            var links = $(document).find('link[rel="import"]');
            [].forEach.call(links, function (link) {
                var element = link.import.querySelector('fragment');
                var type = $(element).attr('type');
                var fragment = Object.create(HTMLElement.prototype);
                fragment.createdCallback = function() {
                    var clone = document.importNode(element, true);
                    this.innerHTML = clone.innerHTML;
                };
                fizz.library.elements[type] = document.registerElement(type + '-fragment', { prototype: fragment });
            });
        };
        
        var insertFragments = function() {
            var panels = $(document).find('panel');
            [].forEach.call(panels, function(panel) {
                construct($(panel));
            });
        };
        
        var define = function(type, constructor) {
            fizz.library.controllers[type] = constructor;
        };
        
        var require = function(identifier) {
            if (!fizz.library.references[identifier]) {
                fizz.library.references[identifier] = {
                    controller: {},
                    loaded: false
                };
            }
            return fizz.library.references[identifier];
        };
        
        var error = function(message) {
            console.log("ERROR: " + message);
        };
        
        var implement = function(identifier, type, container) {
            var panel = $(document.createElement('panel'));
            panel.attr('id', identifier);
            panel.attr('type', type);
            construct(panel);
            container.append(panel);
            return fizz.library.references[identifier];
        };
        
        var construct = function(panel) {
            var identifier = panel.attr('id');
            var type = panel.attr('type');
            var element = new fizz.library.elements[type]();
            panel.append(element);
            if (identifier && fizz.library.controllers[type]) {
                if (!fizz.library.references[identifier]) {
                    fizz.library.references[identifier] = {
                        controller: fizz.library.controllers[type],
                        loaded: true
                    };
                } else {
                    fizz.library.references[identifier].controller = fizz.library.controllers[type];
                    fizz.library.references[identifier].loaded = true;
                }
                fizz.application.controller(identifier + '-controller', fizz.library.references[identifier].controller);
                panel.attr('ng-app', 'fizz');
                panel.attr('ng-controller', identifier + '-controller');
                fizz.library.references[identifier].controller.element = element;
                angular.bootstrap(panel, ['fizz']);
            }
        };
        
        var destruct = function(panel) {
            var identifier = panel.attr('id');
            if (fizz.library.references[identifier]) {
                fizz.library.references[identifier].controller = {};
                fizz.library.references[identifier].loaded = false;
            }
        };
        
        this.fizz = {
            initialize: initialize,
            define: define,
            require: require,
            error: error,
            implement: implement,
            construct: construct,
            destruct: destruct
        };
        
    }
    
    return this.fizz;
    
});
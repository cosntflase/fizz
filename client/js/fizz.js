/* global io */
define(['jquery', 'angular', 'socketio'], function($, angular, io) {
    
    if (!this.fizz) {
        
        var fizz = {};
        fizz.library = {};
        fizz.library.controllers = {};
        fizz.library.elements = {};
        fizz.library.references = {};
        
        fizz.dependents = {};
        
        fizz.application = angular.module('fizz', []);
        
        fizz.socket = io.connect();
        fizz.socket.on('connect', function(data) {
            console.log('connected');
        });
        
        var initialize = function() {
            importFragments();
            insertFragments($(document));
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
        
        var insertFragments = function(element) {
            var panels = element.find('panel');
            console.log(panels);
            [].forEach.call(panels, function(panel) {
                construct($(panel));
            });
        };
        
        var define = function(type, controller) {
            fizz.library.controllers[type] = controller;
            console.log('defined: ' + type);
            console.log(controller);
            if (fizz.dependents[type]) {
                fizz.dependents[type].forEach(function(dependent) {
                    link(dependent.panel, dependent.identifier,  dependent.type);
                });
            }
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
            angular.bootstrap(panel, ['fizz']);
            return fizz.library.references[identifier];
        };
        
        var construct = function(panel) {
            var identifier = panel.attr('id');
            var type = panel.attr('type');
            var element = new fizz.library.elements[type]();
            panel.append(element);
            if (identifier && fizz.library.controllers[type]) {
                link(panel, identifier, type);
            } else if (identifier) {
                if (!fizz.dependents[type]) fizz.dependents[type] = [];
                fizz.dependents[type].push({
                    panel: panel,
                    identifier: identifier,
                    type: type
                });
            }
            insertFragments($(panel));
        };
        
        var link = function(panel, identifier, type) {
            if (!fizz.library.references[identifier]) {
                console.log('pre');
                fizz.library.references[identifier] = {
                    controller: fizz.library.controllers[type],
                    loaded: true
                };
                console.log('controller');
                console.log(fizz.library.references[identifier].controller);
            } else {
                fizz.library.references[identifier].controller = fizz.library.controllers[type];
                fizz.library.references[identifier].loaded = true;
                console.log('controller');
                console.log(fizz.library.references[identifier].controller);
            }
            fizz.application.controller(identifier + '-controller', fizz.library.references[identifier].controller);
            panel.attr('ng-app', 'fizz');
            panel.attr('ng-controller', identifier + '-controller');
        };
        
        var destruct = function(panel) {
            var identifier = panel.attr('id');
            if (fizz.library.references[identifier]) {
                fizz.library.references[identifier].controller = {};
                fizz.library.references[identifier].loaded = false;
            }
        };
        
        this.fizz = {
            socket: fizz.socket,
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
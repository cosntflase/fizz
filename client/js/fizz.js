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
        fizz.fragmentCount = 0;
        
        var initialize = function() {
            importFragments();
            insertFragments($(document));
            //angular.bootstrap($(document), ['fizz']);
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
            [].forEach.call(panels, function(panel) {
                $(panel).attr('id', $(panel).attr('id')/* + '-' + fizz.fragmentCount++*/);
                construct($(panel));
            });
        };
        
        var define = function(type, controller) {
            fizz.library.controllers[type] = controller;
            if (fizz.dependents[type]) {
                fizz.dependents[type].forEach(function(dependent) {
                    link(dependent.panel, dependent.identifier,  dependent.type);
                    if (dependent.callback) dependent.callback(fizz.library.references[dependent.identifier]);
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
        
        var implement = function(identifier, type, container, callback) {
            var panel = $(document.createElement('panel'));
            panel.attr('id', identifier/* + '-' + fizz.fragmentCount++*/);
            panel.attr('type', type);
            var linkedController = construct(panel, callback);
            container.append(panel);
            angular.bootstrap(panel, ['fizz']);
            if (callback && linkedController) callback(fizz.library.references[identifier]);
            return fizz.library.references[identifier];
        };
        
        var construct = function(panel, callback) {
            var identifier = panel.attr('id');
            var type = panel.attr('type');
            var element = new fizz.library.elements[type]();
            var linkedController;
            panel.append(element);
            if (identifier && fizz.library.controllers[type]) {
                link(panel, identifier, type, callback);
                linkedController = true;
            } else if (identifier) {
                if (!fizz.dependents[type]) fizz.dependents[type] = [];
                fizz.dependents[type].push({
                    panel: panel,
                    identifier: identifier,
                    type: type,
                    callback: callback
                });
                linkedController = false;
            }
            insertFragments($(panel));
            return linkedController;
        };
        
        var link = function(panel, identifier, type) {
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
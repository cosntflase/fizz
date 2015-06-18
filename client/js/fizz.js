/* global io angular */

var Fizz = {};
(function (exports) {
    
    var constructors = {};
    var types = {};
    var references = {};
    var controllers = {};
    
    var socket = io.connect();
    
    exports.initialize = function() {
        importFragments();
        insertFragments();
    };
    
    exports.error = function(message) {
        console.log('ERROR: ' + message);
    };
    
    exports.defineFragment = function(type, constructor) {
        constructors[type] = constructor;
    };
    
    exports.requireFragment = function(identifier) {
        if (!references[identifier]) {
            references[identifier] = {
                fragment: {},
                loaded: false
            };
        }
        return references[identifier];
    };
    
    function importFragments() {
        var links = $(document).find('link[rel="import"]');
        [].forEach.call(links, function (link) {
            var element = link.import.querySelector('fragment');
            var name = $(element).attr('name');
            var fragment = Object.create(HTMLElement.prototype);
            fragment.createdCallback = function() {
                var clone = document.importNode(element, true);
                this.innerHTML = clone.innerHTML;
            };
            types[name] = document.registerElement(name + '-fragment', { prototype: fragment });
        });
    }
    
    function insertFragments() {
        var panels = $(document).find('panel');
        [].forEach.call(panels, function(panel) {
            var type = $(panel).attr('fragment');
            exports.implementFragment(panel, type);
        });
    }
    
    exports.insertFragment = function(identifier, type, element) {
        var fragment = exports.createFragment(identifier, type);
        $(element).append(fragment);
        return exports.requireFragment(identifier);
    };
    
    exports.createFragment = function(identifier, type) {
        var panel = document.createElement('panel');
        $(panel).attr('id', identifier);
        exports.implementFragment(panel, type);
        angular.bootstrap($(panel), null);
        return panel;
    };
    
    exports.implementFragment = function(panel, type) {
        var identifier = $(panel).attr('id');
        var element = new types[type]();
        $(panel).append(element);
        if (identifier && constructors[type]) {
            if (references[identifier]) {
                references[identifier].instance = new constructors[type](element, socket);
                references[identifier].loaded = true;
            } else {
                references[identifier] = {
                    instance: new constructors[type](element, socket),
                    loaded: true
                };
            }
            if (references[identifier].instance.controller) {
                controllers[identifier] = references[identifier].instance.controller;
                $(panel).attr('ng-controller', 'Fizz.Fragments.Controllers.' + identifier);
            }
        }
    };
    
    exports.destroyFragment = function(identifier) {
        if (references[identifier]) {
            references[identifier].instance = {};
            references[identifier].loaded = false;
        }
    };
    
    
    
    var Fragments = {};
    Fragments.Constructors = constructors;
    Fragments.Types = types;
    Fragments.References = references;
    Fragments.Controllers = controllers;
    
    exports.Fragments = Fragments;
    
})(Fizz);
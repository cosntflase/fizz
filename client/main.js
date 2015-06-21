require.config({
    "paths": {
        "fizz": "js/fizz",
        "ace": "lib/ace/lib/ace/ace",
        "angular": "lib/angular/angular",
        "bootstrap/affix": "lib/bootstrap/js/affix",
        "bootstrap/alert": "lib/bootstrap/js/alert",
        "bootstrap/button": "lib/bootstrap/js/button",
        "bootstrap/carousel": "lib/bootstrap/js/carousel",
        "bootstrap/collapse": "lib/bootstrap/js/collapse",
        "bootstrap/dropdown": "lib/bootstrap/js/dropdown",
        "bootstrap/modal": "lib/bootstrap/js/modal",
        "bootstrap/popover": "lib/bootstrap/js/popover",
        "bootstrap/scrollspy": "lib/bootstrap/js/scrollspy",
        "bootstrap/tab": "lib/bootstrap/js/tab",
        "bootstrap/tooltip": "lib/bootstrap/js/tooltip",
        "bootstrap/transition": "lib/bootstrap/js/transition",
        "jquery": "lib/jquery/dist/jquery",
        "socketio": "../socket.io/socket.io",
        "webcomponentsjs": "lib/webcomponentsjs/webcomponents",
        "svg-injector": "lib/svg-injector/svg-injector"
    },
    "shim": {
        /*
        "fizz": {
            "deps": [
                "jquery",
                "angular"
            ], 
            "paths": {
                "jquery": "lib/jquery/dist/jquery",
                "angular": "lib/angular/angular"
            }
        },
        */
        "angular": {
            "exports": "angular"
        },
        "bootstrap/affix": { "deps": ["jquery"], "paths": { "jquery": "lib/jquery/dist/jquery" } },
        "bootstrap/alert": { "deps": ["jquery"], "paths": { "jquery": "lib/jquery/dist/jquery" } },
        "bootstrap/button": { "deps": ["jquery"], "paths": { "jquery": "lib/jquery/dist/jquery" } },
        "bootstrap/carousel": { "deps": ["jquery"], "paths": { "jquery": "lib/jquery/dist/jquery" } },
        "bootstrap/dropdown": { "deps": ["jquery"], "paths": { "jquery": "lib/jquery/dist/jquery" } },
        "bootstrap/modal": { "deps": ["jquery"], "paths": { "jquery": "lib/jquery/dist/jquery" } },
        "bootstrap/popover": { "deps": ["jquery"], "paths": { "jquery": "lib/jquery/dist/jquery" } },
        "bootstrap/scrollspy": { "deps": ["jquery"], "paths": { "jquery": "lib/jquery/dist/jquery" } },
        "bootstrap/tab": { "deps": ["jquery"], "paths": { "jquery": "lib/jquery/dist/jquery" } },
        "bootstrap/tooltip": { "deps": ["jquery"], "paths": { "jquery": "lib/jquery/dist/jquery" } },
        "bootstrap/transition": { "deps": ["jquery"], "paths": { "jquery": "lib/jquery/dist/jquery" } }
    }
});

require(['fizz'], function(fizz) {
    fizz.initialize();
});
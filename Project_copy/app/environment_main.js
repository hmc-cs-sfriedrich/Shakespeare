System.register(['angular2/platform/browser', 'angular2/http', "./environment_app.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, http_1, environment_app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (environment_app_component_1_1) {
                environment_app_component_1 = environment_app_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(environment_app_component_1.HttpSample, [http_1.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=environment_main.js.map
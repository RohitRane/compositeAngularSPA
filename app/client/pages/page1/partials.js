'use strict';
module.exports = angular.module("pageApp").run(["$templateCache", function($templateCache) {
    $templateCache.put("about.html", "<div class=\"container-fluid text-center\">\r\n	<h1>{{title}}</h1>\r\n    <h4>{{heading}}</h4>\r\n    <p>{{content}}</p>\r\n    <span>...To be continued</span>\r\n</div>\r\n");
    $templateCache.put("home.html", "<div  class=\"text-center\">\r\n    <h1>Hello {{name}}</h1>\r\n    <img class=\"img-responsive home-img\" src=\"public/images/img1.png\" alt=\"noImage\"></img>\r\n</div>\r\n");
    $templateCache.put("watch.html", "<div class=\"container-fluid text-center\">\r\n	<h1>{{title}}</h1>\r\n    <h4>{{heading}}</h4>\r\n    <p>{{content}}</p>\r\n    <span>...To be continued</span>\r\n</div>\r\n");
    $templateCache.put("footer.html", "<div class=\"page-footer\">\r\n	<h3 class=\"pull-left\">Created by {{creator}}</h3>\r\n</div>");
    $templateCache.put("header.html", "<nav class=\"navbar navbar-inverse\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#myNavbar\" ng-click=\"navbarCollapsed = !navbarCollapsed\">\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n            <a class=\"navbar-brand\" href=\"#\">Composite SPA</a>\r\n        </div>\r\n        <div class=\"collapse navbar-collapse\" id=\"myNavbar\" uib-collapse=\"navbarCollapsed\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li class=\"active\"><a ui-sref=\'root.home\'>Home</a></li>\r\n                <li><a ui-sref=\'root.about\'>About</a></li>\r\n                <li><a ui-sref=\'root.watch\'>Watch</a></li>\r\n                <li><a href=\"#\">Page 3</a></li>\r\n            </ul>\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-user\"></span> Sign Up</a></li>\r\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-log-in\"></span> Login</a></li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n");
}]);
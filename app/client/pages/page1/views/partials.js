'use strict';
module.exports = angular.module("pageApp").run(["$templateCache", function($templateCache) {
    $templateCache.put("about.html", "<div class=\"container-fluid text-center\">\r\n	<h1>{{title}}</h1>\r\n    <h4>{{heading}}</h4>\r\n    <p>{{content}}</p>\r\n    <span>...To be continued</span>\r\n</div>\r\n");
    $templateCache.put("home.html", "<div  class=\"text-center\">\r\n    <h1>Hello {{name}}</h1>\r\n    <img src=\"public/images/img1.png\" alt=\"noImage\"></img>\r\n</div>\r\n");
}]);
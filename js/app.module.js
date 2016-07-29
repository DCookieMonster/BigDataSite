/**
 * Created by dor on 17/07/2016.
 */


var Mainapp=angular.module('mainApp', [ 'ngAnimate', 'ui.bootstrap']);

var PagesApp=angular.module('PagesApp', ['ngRoute','angular.filter', 'ngAnimate', 'ui.bootstrap','ngSanitize',
    'btford.markdown']);

PagesApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
        when('/people', {
            templateUrl: 'pages/people.html',
            controller: 'peopleCtrl'
        }).
        when('/uprojects', {
            templateUrl: 'uprojects.html',
            controller: 'projectCtrl'
        }).
        when('/pic', {
            templateUrl: 'pic.html',
            controller: 'picCtrl'
        }).when('/dor', {
            templateUrl: 'dor.html',
            controller: 'dorCtrl'
        }).
        when('/contact', {
            templateUrl: 'contact.html',
            controller: 'contactCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

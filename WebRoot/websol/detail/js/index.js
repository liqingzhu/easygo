var AA = angular.module('uiRoute', ['ui.router']);
AA.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'template/index.html'
                },
                'footer@index': {
                    templateUrl: 'template/footer.html'
                },
                 'body@index': {
                    templateUrl: 'template/body.html'
                },
                'header@index': {
                    templateUrl: 'template/header.html'
                }
            }
        })     
});

/**
 * Created by zhangjie on 17-3-23.
 */
angular.module('myApp', ['ui.router', 'myApp.controller', 'myApp.directive', 'myApp.service','ngFileUpload','filter','myApp.filters'])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
        //登录页面
            .state('signin', {
                url: '/signin',
                templateUrl: 'template/signin.html',
                controller: 'signinController'
            })
            //最外层框架
            .state('page', {
                url: '/page',
                templateUrl: 'template/page.html',
                controller: 'pageController'
            })
            //申报管理---申报
            .state('page.application', {
                url: '/application',
                views: {
                    'mainController': {
                        templateUrl: 'template/application.html',
                        controller: 'applicationController'
                    }
                }
            })
            //申报管理---审批
            .state('page.approve', {
                url: '/approve',
                views: {
                    'mainController': {
                        templateUrl: 'template/approve.html',
                        controller: 'approveController'
                    }
                }
            })
            //申报管理---公示
            .state('page.publicity', {
                url: '/publicity',

                views: {
                    'mainController': {
                        templateUrl: 'template/publicity.html',
                        controller: 'publicityController'
                    }
                }
            })
            //申报管理---现场监督
            .state('page.supervision', {
                url: '/supervision',
                views: {
                    'mainController': {
                        templateUrl: 'template/supervision.html',
                        controller: 'supervisionController'
                    }
                }
            })
            //申报管理---检查统计---精确查询
            .state('page.precise', {
                url: '/precise',
                views: {
                    'mainController': {
                        templateUrl: 'template/precise.html',
                        controller: 'preciseController'
                    }
                }
            })

            //申报管理---检查统计---组合查询
            .state('page.combination', {
                url: '/combination',
                views: {
                    'mainController': {
                        templateUrl: 'template/combination.html',
                        controller: 'combinationController'
                    }
                }
            })

            //申报管理---检查统计---数量统计
            .state('page.statistics', {
                url: '/statistics',
                views: {
                    'mainController': {
                        templateUrl: 'template/statistics.html',
                        controller: 'statisticsController'
                    }
                }
            })

            //责任追究--公开通报
            .state('page.responsibility', {
                url: '/responsibility',
                views: {
                    'mainController': {
                        templateUrl: 'template/responsibility-investigation.html',
                        controller: 'responsibilityController'
                    }
                }
            })

            //责任追究--纪律处分
            .state('page.punishment', {
                url: '/punishment',
                views: {
                    'mainController': {
                        templateUrl: 'template/punishment.html',
                        controller: 'punishmentController'
                    }
                }
            })

            //系统设置--用户管理
            .state('page.userManagement', {
                url: '/userManagement',
                views: {
                    'mainController': {
                        templateUrl: 'template/userManagement.html',
                        controller: 'userManagementController'
                    }
                }
            })

            //系统设置--角色管理
            .state('page.roleManagement', {
                url: '/roleManagement',
                views: {
                    'mainController': {
                        templateUrl: 'template/roleManagement.html',
                        controller: 'roleManagementController'
                    }
                }
            })


        $urlRouterProvider.otherwise('/signin');

        $locationProvider.hashPrefix('');
    })
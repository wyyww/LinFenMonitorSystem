/**
 * Created by zhangjie on 17-3-23.
 */
angular.module('myApp.directive', [])
    .directive('top',function(){
        return{
            restrict:'A',
            controller:'pageController',
            templateUrl:'template/top.html',
            // link:function($scope,ele,attr){
            //
            // }
        }
    })

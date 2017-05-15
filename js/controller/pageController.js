/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')
//第二个界面
    .controller('pageController', ['$scope','init',function ($scope, init) {
        $.getScript("libs/simplify/simplify.js");
        $.getScript("libs/jquery.slimscroll.min.js");
    }])
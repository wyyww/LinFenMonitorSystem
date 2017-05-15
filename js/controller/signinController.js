/**
 * Created by eexiao on 17-4-10.
 */
//登录界面
angular.module('myApp.controller')
.controller('signinController', ['$scope','$state','init',function ($scope, $state, init) {
    //------------------登录接口验证
    $scope.signin = function () {
        init.userLogin($scope.userName,$scope.password).then(function successCallback(d) {
            $scope.token = d.result.token;
            // console.log(d);
            sessionStorage.setItem('token',JSON.stringify($scope.token));
            $state.go('page');
        }, function errorCallback(response) {

        });
    }

}])
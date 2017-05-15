/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')

//申报管理--精确查询(OK)
    .controller('preciseController',['$scope','init', function ($scope, init) {
        //获取当前部门
        setTimeout(function () {
            //获取当前部门
            init.currentDepartment().then(function (data) {
                data.result.children.unshift(data.result);
                $scope.departments = data.result.children;
                // console.log( $scope.departments);
            }), function (data) {
                console.log(data);
            };
        }, 200);
        $scope.isState = '根组织';
        $scope.isPage = 9;   //每页数据
        $scope.initialPage = 1; //  初始页面

        //点击查询申报结果
        $scope.preciseQuery = function (claimantState) {
            switch(claimantState){
                case '根组织': claimantState='1';break;
                case '新部门': claimantState='4';break;
                case 'Ramirez': claimantState='5';break;
                case 'City': claimantState='6';break;
                case 'Dr.tai': claimantState='7';break;
            }
            if(!$scope.isname){
                $scope.isname='';
            }
            init.preciseResultQuery($scope.isname,claimantState).then(function (data) {
                $scope.messages = data.result;
                $scope.pageNum = Math.ceil($scope.messages.length / $scope.isPage); // 总页
            }), function (data) {
                console.log(data);
            };
        }
    }])
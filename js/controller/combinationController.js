/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')

//申报管理--组合查询
    .controller('combinationController',['$scope','$filter','init', function ($scope, $filter, init) {
        $scope.messages = [];
        $scope.initialPage = 1; //  初始页面
        $scope.isPage = 9;//   每页9条数据
        //点击查询组合查询结果
        $scope.declarePreciseQuery = function () {
            //申报类型
            if (!$scope.isState || $scope.isState == '全部') {$scope.eventType = '0'}
            else if ($scope.isState == '婚嫁') {$scope.eventType = '1';}
            else {$scope.eventType = '2'}

            //宴请人数
            if (!$scope.isNum) {
                $scope.peopleCountMin = '0';
                $scope.peopleCountMax = '50';
            }
            else if ($scope.isNum == "0-50'") {
                $scope.peopleCountMin = '0';
                $scope.peopleCountMax = '50';
            }
            else if ($scope.isNum == "50-100'") {
                $scope.peopleCountMin = '50';
                $scope.peopleCountMax = '100';
            }
            else if ($scope.isNum == "100-150'") {
                $scope.peopleCountMin = '100';
                $scope.peopleCountMax = '150';
            }
            else if ($scope.isNum == "150-200'") {
                $scope.peopleCountMin = '150';
                $scope.peopleCountMax = '200';
            }

            //申报开始时间
            $scope.eventCreateTimeFrom=$filter('date')($scope.beforTime, 'yy-MM-dd');

            //申报结束时间
            $scope.eventCreateTimeTo=$filter('date')($scope.afterTime, 'yy-MM-dd');

            //宴请开始时间
            $scope.eventTimeFrom=$filter('date')($scope.dinnerBeforTime, 'yy-MM-dd');

            //宴请结束时间
            $scope.eventTimeTo=$filter('date')($scope.dinnerAfterTime, 'yy-MM-dd');
            init.DeclareResultsQuery($scope.eventType,$scope.peopleCountMin,$scope.peopleCountMax,$scope.eventCreateTimeFrom,$scope.eventCreateTimeTo, $scope.eventTimeFrom, $scope.eventTimeTo).then(function (data) {
                $scope.messages = data.result;
                console.log(data.total)
                $scope.pageNum = Math.ceil(data.total / $scope.isPage); // 总页
                $scope.initialPage = 1; //  初始页面
            }, function (data) {
                console.log(data);
            });
        }
    }])
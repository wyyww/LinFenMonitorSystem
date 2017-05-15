/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')

//申报管理--数量统计
    .controller('statisticsController', ['$scope','$filter','init',function ($scope,$filter,init) {

        $scope.selectCount=function(){

            //申报开始时间
            $scope.eventCreateTimeFrom=$filter('date')($scope.countBeforeTime, 'yy-MM-dd');

            //申报结束时间
            $scope.eventCreateTimeTo=$filter('date')($scope.countAfterTime, 'yy-MM-dd');

            //宴请开始时间
            $scope.eventTimeFrom=$filter('date')($scope.countDinnerBeforeTime, 'yy-MM-dd');

            //宴请结束时间
            $scope.eventTimeTo=$filter('date')($scope.countDinnerAfterTime, 'yy-MM-dd');

            init.DeclareCountQuery($scope.eventCreateTimeFrom,$scope.eventCreateTimeTo,$scope.eventTimeFrom,$scope.eventTimeTo)
                .then(function (data) {
                    $scope.userArr = data.result;
                    // console.log($scope.userArr)
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('carts'));

                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: '数量'
                        },
                        tooltip: {},
                        legend: {
                            data:['数量']
                        },
                        xAxis: {
                            data: ["根组织","新部门","Ramirez","City","Dr.Tai","老板"]
                        },
                        yAxis: {},
                        series: [{
                            name: '婚嫁',
                            type: 'bar',
                            data: [$scope.userArr[0].type1Count, $scope.userArr[1].type1Count, $scope.userArr[2].type1Count, $scope.userArr[3].type1Count,
                                $scope.userArr[4].type1Count, $scope.userArr[5].type1Count]
                        },{
                            name:'丧葬',
                            type:'bar',
                            data: [$scope.userArr[0].type2Count, $scope.userArr[1].type2Count, $scope.userArr[2].type2Count, $scope.userArr[3].type2Count,
                                $scope.userArr[4].type2Count, $scope.userArr[5].type2Count]
                        }]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);

                }, function (data) {
                    console.log(data);
                });


        }
    }])
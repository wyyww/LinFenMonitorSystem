/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')

//申报管理--现场监督
    .controller('supervisionController', ['$scope','init',function ($scope, init) {
        //----------------详情模态框
        $scope.md = function (m) {
            init. details(m).then(function (d) {
                // console.log(d)
                $scope.isData =d
                // console.log($scope.isData);
                $('#myModal2').modal('toggle')
            },function () {})
        };
        //监督--------初始数据
        $scope.user = {
            staff: '',//申报人
            superviseStatus: -1,//公示状态 -1：未公示 1：已公示
            page: 1,//当前页数
            start: 0,//从第几个开始
            limit: 9//每页显示多少个
        }
        init.superviseDemand( $scope.user).then(function (d) {
            $scope.messages = d.result;
            $scope.pageNum = Math.ceil((d.total-14)/9);
            // console.log(d.total);
            // console.log( $scope.pageNum);
            // console.log($scope.messages);
        }), function (data) {
            console.log(data);
        };
        $scope.onePage =function(){   // -----首页
            $scope.user.page=1;
            $scope.user.start=0;
            init.superviseDemand( $scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }
        $scope.befor= function(){     // -------上一页
            $scope.user.page=$scope.user.page-1;
            $scope.user.start= $scope.user.start-9;
            init.superviseDemand( $scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        };
        $scope.after= function(){       //----------下一页
            if($scope.messages.length!=0) {
                $scope.user.page = $scope.user.page + 1;
                $scope.user.start = $scope.user.start + 9;
                init.superviseDemand($scope.user).then(function (d) {
                    $scope.messages = d.result
                }, function () {
                });
            }
        };
        $scope.lastPage = function () {     //--------------尾页
            $scope.user.page=$scope.pageNum;
            $scope.user.start=9*($scope.pageNum-1)+1;
            init.superviseDemand($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }

        //现场监督  添加排序
        //正向排序
        $scope.supervisionPositiveSequenceOrder=function(num){
            $scope.messages=init.positiveSequenceOrder(num,$scope.messages);
        }
        //逆向排序
        $scope.supervisionInvertedOrder=function(num){
            $scope.messages=init.invertedOrder(num,$scope.messages);
        }


        // 申报人 ----   查询
        $scope.superviseDemand = function () {
            if($scope.isname) {$scope.user.staff = $scope.isname;}
            // console.log($scope.user.staff)
            init.superviseDemand($scope.user).then(function (d) {
                $scope.messages = d.result;
                // console.log($scope.messages);
                $scope.pageNum = Math.ceil((d.total-14)/9);
            }), function (data) {
                console.log(data);
            };
        };
        //  ------------状态查询
        $scope.isState='未监督';
        $scope.state0=function(){
            $scope.isState='未监督';
            $scope.user.superviseStatus =-1;
            init.superviseDemand($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result;
                $scope.pageNum = Math.ceil((d.total-14)/9);
            },function () {});
        };
        $scope.state1=function(){
            $scope.isState='已监督';
            $scope.user.superviseStatus=1;
            init.superviseDemand($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
                $scope.pageNum = Math.ceil((d.total-14)/9);
            },function () {});
        };
        //监督报告按钮接口  style=1 已监督 style=-1 未监督
        $scope.getId = function (id) {
            $scope.superviseReport = function () {
                $scope.userReport = {
                    eventId:id,
                    title: $scope.title,
                    content: $scope.content1
                };
                init.superviseReport($scope.userReport).then(function (data) {
                    init.superviseDemand( $scope.user).then(function (d) {
                        $scope.messages = d.result;
                        $scope.pageNum = Math.ceil((d.total-14)/9);
                    }, function (data) {console.log(data);});

                    swal({
                        title: "修改完成",
                    });

                }), function (data) {
                    console.log(data);
                };

            };
        }
        //违纪登记 style=1 已监督 style=-1 未监督
        $scope.getThisId = function (id) {
            $scope.breakRule = function () {
                $scope.userRegister = {
                    eventId: id,
                    isCashGiftOutOfLimits: $scope.status1,
                    isUsePublicCar: $scope.status2,
                    isUsePublicGoods: $scope.status3,
                    isUsePublicAsserts: $scope.status4,
                    isUsePublicMoney: $scope.status5,
                    attachmentFileCode: '',
                    otherQuestion:$scope.content0,
                    content: $scope.content2
                };
                init.breakRule( $scope.userRegister).then(function (data) {
                    // console.log(data);
                    init.superviseDemand( $scope.user).then(function (d) {
                        $scope.messages = d.result;
                        $scope.pageNum = Math.ceil((d.total-14)/9);
                    }, function (data) {console.log(data);});
                    swal({
                        title: "修改成功"
                    });

                }), function (data) {
                    console.log(data);
                };
            };
        }

    }])
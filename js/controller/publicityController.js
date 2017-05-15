/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')

//申报管理--公示
    .controller('publicityController', ['$scope','init',function ($scope, init) {
        //----------------详情莫太框
        $scope.md = function (m) {
            init. details(m).then(function (d) {
                // console.log(d)
                $scope.isData =d
                // console.log($scope.isData);
                $('#myModal2').modal('toggle')
            },function () {})
        };

        //公示查询--------初始数据
        $scope.user = {
            staff: '',//申报人
            bulletinStatus: -1,//公示状态 -1：未公示 1：已公示
            page: 1,//当前页数
            start: 0,//从第几个开始
            limit: 9//每页显示多少个
        }
        init.publicQuery( $scope.user).then(function (d) {
            $scope.messages = d.result;
            $scope.pageNum = Math.ceil((d.total-14)/9);
            // console.log(d.total);
            // console.log( $scope.pageNum);
            // console.log($scope.messages);
        }), function (data) {
            console.log(data);
        };
        //--------------------翻页
        $scope.onePage =function(){   // -----首页
            $scope.user.page=1;
            $scope.user.start=0;
            init.publicQuery( $scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }
        $scope.befor= function(){     // -------上一页
            $scope.user.page=$scope.user.page-1;
            $scope.user.start= $scope.user.start-9;
            init.publicQuery( $scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        };
        $scope.after= function(){       //----------下一页
            if($scope.messages.length!=0) {
                $scope.user.page = $scope.user.page + 1;
                $scope.user.start = $scope.user.start + 9;
                init.publicQuery($scope.user).then(function (d) {
                    $scope.messages = d.result
                }, function () {
                });
            }
        };
        $scope.lastPage = function () {         //--------------尾页
            $scope.user.page=$scope.pageNum;
            $scope.user.start=9*($scope.pageNum-1)+1;
            init.publicQuery($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }

        //公示  添加排序
        //正向排序
        $scope.publicitypositiveSequenceOrder=function(num){
            $scope.messages=init.positiveSequenceOrder(num,$scope.messages);
        }
        //逆向排序
        $scope.publicityinvertedOrder=function(num){
            $scope.messages=init.invertedOrder(num,$scope.messages);
        }


        // 申报人 ----   查询
        $scope.publicQuery = function () {
            if($scope.isname) {$scope.user.staff = $scope.isname;}
            // console.log($scope.user.staff)
            init.publicQuery($scope.user).then(function (d) {
                $scope.messages = d.result;
                // console.log(d.total);
                $scope.pageNum = Math.ceil((d.total-14)/9);
            }), function (data) {
                console.log(data);
            };
        };
        //  ------------状态查询
        $scope.state0=function(){
            $scope.isState='未公示';
            $scope.user.bulletinStatus =-1;
            init.publicQuery($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
                $scope.pageNum = Math.ceil((d.total-14)/9);
            },function () {});
        };
        $scope.state1=function(){
            $scope.isState='已公示';
            $scope.user.bulletinStatus=1;
            init.publicQuery($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
                $scope.pageNum = Math.ceil((d.total-14)/9);
            },function () {});
        };
        //公示 公示内容提交
        $scope.getId = function (id) {
            $scope.publicTextSubmit = function () {
                $scope.userText = {
                    eventId: id,
                    content: $scope.content1,
                    attachmentFileCode:''
                };
                init.publicTextSubmit($scope.userText).then(function (d) {
                    // console.log(d);
                    init.publicQuery( $scope.user).then(function (d) {
                        $scope.messages = d.result;
                        $scope.pageNum = Math.ceil((d.total-14)/9);
                    }, function (data) {console.log(data);});
                    swal({
                        title: "修改完成"
                    });
                }, function (data) {console.log(data);});
            };
        }
        //公示 公示结果提交    *****bug*****
        $scope.getThisId = function (id) {
            $scope.publicResuleSubmit = function () {
                $scope.userResult = {
                    eventId: id,
                    content: $scope.content2,
                    status: $scope.status,
                    attachmentFileCode:''
                };
                init.publicResuleSubmit($scope.userResult).then(function (da) {
                    // console.log(da)
                    init.publicQuery( $scope.user).then(function (d) {
                        $scope.messages = d.result;
                        $scope.pageNum = Math.ceil((d.total-14)/9);
                    }, function (data) {console.log(data);});
                    swal({title: "修改成功"});
                }, function (data) {console.log(data);});
            };
        }
    }])
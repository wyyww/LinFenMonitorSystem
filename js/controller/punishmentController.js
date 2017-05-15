/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')
//责任追究--纪律处分
    .controller('punishmentController', ['$scope','init',function ($scope,init) {

        //责任追究--纪律处分   查找
        $scope.messages = [
            {
                staff: '',
                staffOrgName: '',
                title: '',
                createTime: '',
                id: '',
            }];

        $scope.user = {
            staff: '',
            page: '',
            start: '',
            limit: ''
        };
        $scope.user.page = 1;
        $scope.user.start = 0;
        $scope.user.limit = 9;

        var userInit = $scope.user;

        //进入页面首先刷新一次
        init.disciplinaryAwardFind($scope.user).then(function (d) {
            $scope.messages = d.result;
            // console.log($scope.messages);
            $scope.pageNum = Math.ceil((d.total-14)/9);
        }), function (data) {
            console.log(data);
        };

        // 被通报人 ----   查询
        $scope.disciplinaryAwardFind = function () {
            if($scope.isname) {$scope.user.staff = $scope.isname;}
            // console.log($scope.user.staff)
            init.disciplinaryAwardFind($scope.user).then(function (d) {
                $scope.messages = d.result;
                // console.log($scope.messages);
                $scope.pageNum = Math.ceil((d.total-14)/9);
            }), function (data) {
                console.log(data);
            };
        };

        //--------------------翻页
        $scope.onePage =function(){   // -----首页
            $scope.user.page=1;
            $scope.user.start=0;
            init.disciplinaryAwardFind($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }
        $scope.befor= function(){     // -------上一页
            $scope.user.page=$scope.user.page-1;
            $scope.user.start= $scope.user.start-9;
            init.disciplinaryAwardFind($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        };
        $scope.after= function(){       //----------下一页
            if($scope.messages.length!=0) {
                $scope.user.page = $scope.user.page + 1;
                $scope.user.start = $scope.user.start + 9;
                init.disciplinaryAwardFind($scope.user).then(function (d) {
                    $scope.messages = d.result
                }, function () {
                });
            }
        };
        $scope.lastPage = function () {             //--------------尾页
            $scope.user.page=$scope.pageNum;
            $scope.user.start=9*($scope.pageNum-1)+1;
            init.disciplinaryAwardFind($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }

        //责任追究--纪律处分  添加排序
        //正向排序
        $scope.punishmentPositiveSequenceOrder=function(str){
            $scope.messages=init.positiveSequenceOrder(str,$scope.messages);
        }
        //逆向排序
        $scope.punishmentInvertedOrder=function(str){
            $scope.messages=init.invertedOrder(str,$scope.messages);
        }

        //责任追究--纪律处分  修改更新
        $scope.disciplinaryAwardAlter = function () {

            $scope.theMessages.id=$scope.id;

            init.disciplinaryAwardAlter($scope.theMessages)
                .then(function (data) {

                }, function (data) {
                    console.log(data);
                });
            //show.api所有数据刷新一次
            init.disciplinaryAwardFind($scope.user)
                .then(function (data) {
                    $scope.messages = data.result;
                    // console.log($scope.messages);
                }, function (data) {console.log(data);});
        }


        //责任追究--纪律处分  修改获得
        $scope.theMessages = [
            {
                id:'',
                title:'',
                staff:'',
                content:'',
                staffOrg:'',
            }];

        $scope.disciplinaryAwardGet = function (id) {
            $('#myModal').modal('toggle');
            $scope.id=id;

            $scope.userGet = {
                id:id
            };

            init.disciplinaryAwardGet($scope.userGet).then(function (data) {
                $scope.theMessages = data.result;
                // console.log(  $scope.theMessages);
            }, function (data) {console.log(data);});
        }

        //用户登录获取所有数据之后才能执行之后的动作
        setTimeout(function () {
            //获取当前部门
            init.currentDepartment().then(function (data) {
                $scope.departments = data.result.children;
                // console.log(data);
            }), function (data) {
                console.log(data);
            };
        }, 200);


        //责任追究--纪律处分  删除
        $scope.deleteGetId = function (id) {
            // console.log(id);
            $scope.disciplinaryAwardDeleteData = function () {
                console.log(id);
                $scope.userDelete = {
                    id: id,
                };
                var userInit = $scope.userDelete;
                init.disciplinaryAwardDeleteData(userInit).then(function (data) {

                    //show.api所有数据刷新一次
                    init.disciplinaryAwardFind($scope.user)
                        .then(function (data) {
                            $scope.messages = data.result;
                            // console.log($scope.messages);
                        }, function (data) {console.log(data);});

                    swal({
                        title: "已删除"
                    });

                }, function (data) {
                    console.log(data);
                });


            };

        }

        //责任追究--纪律处分  添加
        $scope.disciplinaryAwardAddData = function () {

            $scope.userAdd = {
                title:$scope.title,
                content:$scope.content,
                staff:$scope.staff,
                staffOrgId:$scope.staffOrgId,
            };

            var userInit = $scope.userAdd;
            init.disciplinaryAwardAddData(userInit).then(function (data) {

                init.disciplinaryAwardFind($scope.user).then(function (data) {
                    $scope.messages = data.result;
                    // console.log($scope.messages);
                }, function (data) {console.log(data);});
                swal({
                    title: "添加完成"
                });
            }, function (data) {
                console.log(data);
            });
        };
    }])
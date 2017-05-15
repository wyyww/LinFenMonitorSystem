/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')

//责任追究--公开通报
    .controller('responsibilityController',['$scope','init', function ($scope,init) {
        //责任追究--公开通报   查找
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

        //进入页面刷新一次
        init.openBulletinToFind($scope.user).then(function (d) {
            $scope.messages = d.result;
            // console.log($scope.messages);
            $scope.pageNum = Math.ceil((d.total-14)/9);
        }), function (data) {
            console.log(data);
        };

        // 被通报人 ----   查询
        $scope.openBulletinToFind = function () {
            if($scope.isname) {$scope.user.staff = $scope.isname;}
            // console.log($scope.user.staff)
            init.openBulletinToFind($scope.user).then(function (d) {
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
            init.openBulletinToFind($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }
        $scope.befor= function(){     // -------上一页
            $scope.user.page=$scope.user.page-1;
            $scope.user.start= $scope.user.start-9;
            init.openBulletinToFind($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        };
        $scope.after= function(){       //----------下一页
            if($scope.messages.length!=0) {
                $scope.user.page = $scope.user.page + 1;
                $scope.user.start = $scope.user.start + 9;
                init.openBulletinToFind($scope.user).then(function (d) {
                    $scope.messages = d.result
                }, function () {
                });
            }
        };
        $scope.lastPage = function () {             //--------------尾页
            $scope.user.page=$scope.pageNum;
            $scope.user.start=9*($scope.pageNum-1)+1;
            init.openBulletinToFind($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }

        //责任追究--公开通报  添加排序
        //正向排序
        $scope.publicNotificationPositiveSequenceOrder=function(str){
            $scope.messages=init.positiveSequenceOrder(str,$scope.messages);
        }
        //逆向排序
        $scope.publicNotificationInvertedOrder=function(str){
            $scope.messages=init.invertedOrder(str,$scope.messages);
        }

        //责任追究--公开通报   修改更新
        $scope.openBulletinToAlter = function () {

            $scope.theMessages.id=$scope.id;
            init.openBulletinToAlter($scope.theMessages)
            console.log($scope.id);
            $scope.userDate = {
                id: $scope.id,
                title: $scope.title,
                content: $scope.content,
                staff:$scope.staff,
                staffOrgId:$scope.staffOrgId,
            };

            init.openBulletinToAlter($scope.userDate)
                .then(function (data) {

                }, function (data) {
                    console.log(data);
                });

            //show.api所有数据刷新一次
            init.openBulletinToFind($scope.user)
                .then(function (data) {
                    $scope.messages = data.result;
                    // console.log($scope.messages);
                }, function (data) {console.log(data);});
        }

        //责任追究--公开通报   修改获取
        $scope.theMessages = [
            {
                id:'',
                title:'',
                staff:'',
                content:'',
                staffOrg:''
            }];

        $scope.openBulletinToAlterGet = function (id) {
            $('#myModal').modal('toggle');

            $scope.id=id;

            $scope.userGet = {
                id:id
            };

            init.openBulletinToAlterGet($scope.userGet).then(function (data) {
                $scope.theMessages = data.result;
                // console.log($scope.theMessages);
            }, function (data) {console.log(data);});

        }

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

        //责任追究--公开通报  删除
        $scope.deleteGetId=function (id) {
            $scope.deleteData = function () {
                // console.log(id);
                $scope.userDelete = {
                    id: id,
                };
                var userInit = $scope.userDelete;

                init.deleteData(userInit).then(function (data) {
                    // console.log(data);
                    //show.api所有数据刷新一次
                    init.openBulletinToFind($scope.user)
                        .then(function (data) {
                            $scope.messages = data.result;
                            // console.log($scope.messages);
                        }, function (data) {console.log(data);});
                    swal({
                        title: "已删除",
                    });
                }, function (data) {
                    console.log(data);
                });
            };
        }


        //责任追究--公开通报  添加
        $scope.openBulletinToAddData = function () {

            $scope.isTitle = true;
            $scope.isStaff = true;
            $scope.isStaffOrgId = true;
            $scope.isContent = true;

            $scope.userAdd = {
                title:$scope.title,
                content:$scope.content,
                staff:$scope.staff,
                staffOrgId:$scope.staffOrgId,
            };

            init.openBulletinToAddData($scope.userAdd).then(function (data) {
                init.openBulletinToFind($scope.user)
                    .then(function (data) {
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
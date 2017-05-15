/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')

//系统设置--用户管理
    .controller('userManagementController', ['$scope','init',function ($scope,init) {
        //系统设置--用户管理 直接显示
        $scope.messages = [
            {
                username: '',
                name: '',
                orgName: '',
                id: ''
            }];
        $scope.user = {
            page: '',
            start: '',
            limit: ''
        };
        $scope.user.page = 1;
        $scope.user.start = 0;
        $scope.user.limit = 9;
        var userInit = $scope.user;
        init.userManagement(userInit).then(function (d) {
            $scope.messages = d.result;
            $scope.pageNum = Math.ceil((d.total-14)/9)+2;
            console.log($scope.messages);
        }, function (data) {console.log(data);});
        //--------------------翻页
        $scope.onePage =function(){   // -----首页
            $scope.user.page=1;
            $scope.user.start=0;
            init.userManagement($scope.user).then(function (d) {
                console.log(d);
                $scope.messages = d.result
            },function () {});
        }
        $scope.befor= function(){     // -------上一页
            $scope.user.page=$scope.user.page-1;
            $scope.user.start= $scope.user.start-9;
            init.userManagement($scope.user).then(function (d) {
                console.log(d);
                $scope.messages = d.result
            },function () {});
        };
        $scope.after= function(){       //----------下一页
            if($scope.messages.length!=0) {
                $scope.user.page = $scope.user.page + 1;
                $scope.user.start = $scope.user.start + 9;
                init.userManagement($scope.user).then(function (d) {
                    $scope.messages = d.result
                }, function () {
                });
            }
        };
        $scope.lastPage = function () {             //--------------尾页
            $scope.user.page=$scope.pageNum;
            $scope.user.start=9*($scope.pageNum-1)+1;
            init.userManagement($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }

        //系统设置--用户管理 修改获得
        //-----------------部门获取
        init.currentDepartment().then(function (data) {
            data.result.children.unshift(data.result);
            $scope.departments = data.result.children;
        }, function (data) {});
        //----------获得角色NUM
        init.roleManagement($scope.user).then(function (d) {
            $scope.roleNum=d.total
            $scope.user.limit = $scope.roleNum;
            //----------获得角色
            init.roleManagement($scope.user).then(function (d) {
                $scope.user.limit = 9;
                $scope.roles=d.result
            })
        })
        //------------------获得用户信息
        $scope.theMessages = [
            {
                orgId:$scope.orgId,
                roleId:$scope.roleId,
                name:$scope.name,
                password:$scope.password,
                username:$scope.username,
            }];
        $scope.userManagementGetAlter = function (id) {
            $('#myModal').modal('toggle');
            $scope.userGet = {
                userId:id
            };
            //---------获取密码
            $scope.password='';
            init.userManagementGetAlter($scope.userGet).then(function (data) {
                $scope.theMessages = data.result;
                // console.log(  $scope.theMessages);
            }, function (data) {console.log(data);});

        };

        //系统设置--用户管理 修改更新
        $scope.userManagementUpdateAlter = function (id) {
            init.userManagementUpdateAlter( $scope.theMessages,$scope.password).then(function (data) {
                init.userManagement($scope.user).then(function (d) {
                    $scope.messages = d.result;
                    console.log($scope.messages);
                }, function (data) {console.log(data);});
                swal({
                    title: "修改成功"
                });
            }, function (data) {console.log(data);});
        };

        //系统设置--用户管理 删除信息
        $scope.userManagementDelete = function (id) {
            $scope.userDelete = {
                id:id,
            };
            var userInit = $scope.userDelete;
            init.userManagementDelete(userInit).then(function (data) {
                init.userManagement(userInit).then(function (d) {
                    $scope.messages = d.result;
                    console.log($scope.messages);
                }, function (data) {console.log(data);});
                swal({title: "已删除",});
            }, function (data) {console.log(data);});
        };

        //系统设置--用户管理 新增信息
        $scope.userAdd = {
            orgId:'',
            username:'',
            name:'',
            password:'',
            roleId:''
        };
        $scope.userManagementAdd = function () {
            // console.log($scope.newpassword)
            var userInit = $scope.userAdd;
            init.userManagementAdd(userInit).then(function (data) {
                init.userManagement($scope.user).then(function (d) {
                    $scope.messages = d.result;
                    console.log($scope.messages);
                }, function (data) {console.log(data);});
                swal({title: "添加完成",});
            }, function (data) {console.log(data);});
        }
        $scope.md = function () {
            $('#myModal2').modal('toggle')
        };
        $scope.refuse = function () {
            swal({
                title: "修改成功"
            });
        };

    }])
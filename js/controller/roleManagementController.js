/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')

//系统设置--角色管理
    .controller('roleManagementController',['$scope','init', function ($scope,init) {
        //系统设置--角色管理 直接显示
        $scope.messages = [
            {
                name: '',
                id: '',
            }];

        $scope.user = {
            page: '',
            start: '',
            limit: '',
            roleId:''
        };
        $scope.user.page = 1;
        $scope.user.start = 0;
        $scope.user.limit = 9;

        //系统设置--角色管理  添加修改数据的数组集合
        $scope.subsystem=[{item:'', code:'1'},
            {item:'', code:'2'},
            {item:'', code:'3'},
            {item:'', code:'4',},
            {item:'', code:'1.1'},
            {item:'', code:'1.2'},
            {item:'', code:'1.3'},
            {item:'', code:'1.4'},
            {item:'', code:'1.5'},
            {item:'', code:'1.6'},
            {item:'',code:'1.7'},
            {item:'', code:'1.8'},
            {item:'', code:'1.9',},
            {item:'', code:'1.10',},
            {item:'', code:'1.11',},
            {item:'', code:'1.12',},
            {item:'', code:'1.13',},
            {item:'', code:'1.14',},
            {item:'', code:'1.15',},
            {item:'', code:'1.16',},
            {item:'', code:'1.17',},
            {item:'', code:'1.18',},
            {item:'', code:'2.1',},
            {item:'', code:'2.2',},
            {item:'', code:'2.3',},
            {item:'', code:'2.4',},
            {item:'', code:'2.5',},
            {item:'', code:'3.1',},
            {item:'', code:'3.2',},
            {item:'', code:'3.3',},
            {item:'', code:'4.1',},
            {item:'', code:'4.2',},
            {item:'', code:'4.3',},

        ]

        var userInit = $scope.user;
        init.roleManagement(userInit).then(function (data) {
            $scope.messages = data.result;
            $scope.pageNum = Math.ceil((data.total-14)/9)+1;
        }, function (data) {
            console.log(data.result);
        });
        //--------------------翻页
        $scope.onePage =function(){   // -----首页
            $scope.user.page=1;
            $scope.user.start=0;
            init.roleManagement($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }
        $scope.befor= function(){     // -------上一页
            $scope.user.page=$scope.user.page-1;
            $scope.user.start= $scope.user.start-9;
            init.roleManagementd($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        };
        $scope.after= function(){       //----------下一页
            if($scope.messages.length!=0) {
                $scope.user.page = $scope.user.page + 1;
                $scope.user.start = $scope.user.start + 9;
                init.roleManagement($scope.user).then(function (d) {
                    $scope.messages = d.result
                }, function () {
                });
            }
        };
        $scope.lastPage = function () {             //--------------尾页
            $scope.user.page=$scope.pageNum;
            $scope.user.start=9*($scope.pageNum-1)+1;
            init.roleManagement($scope.user).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }
        //修改，添加时对于数据多选框的判断
        $scope.isSelected=function(subsystem){
            subsystem.item=!subsystem.item;
        }

        //系统设置--角色管理 修改获得
        $scope.roleManagementGet = function (id) {
            //让模态框出现和消失
            $('#myModal').modal('toggle');

            //掉接口实现模态框出现，显示复选款选中与否
            $scope.user.roleId=id;
            init.roleManagementGet($scope.user)
                .then(function (data) {
                    $scope.roleName=data.result.name;
                    $scope.roleCheck=data.result.functions;
                    // console.log($scope.roleCheck)
                    for(var i=0;i< $scope.roleCheck.length;i++){
                        $scope.subsystem.forEach(function(value){
                            if(value.code==$scope.roleCheck[i].code){
                                value.item=true;
                            }
                        })
                    }
                }, function (data) {console.log(data);});

        };

        //系统设置--角色管理 修改之后向接口发送数据
        $scope.roleManagementUpdateAlter=function(id){
            var roleCode=[];
            $scope.subsystem.forEach(function(value){
                if(value.item==true){
                    roleCode.push(value.code);
                }
            })
            // console.log(roleCode)
            init.roleManagementUpdateAlter($scope.user.roleId,$scope.roleName,roleCode)
                .then(function (data) {
                    // console.log(data)
                    //修改完成之后，从服务器重新获取内容
                    init.roleManagement(userInit)
                        .then(function (data) {
                            // console.log(data)
                            $scope.messages = data.result;
                            swal("修改成功");
                        }, function (data) {console.log(data);});
                }, function (data) {console.log(data);});
        }

        //系统设置--角色管理 删除
        $scope.roleManagementDelete = function (id) {
            // console.log(id);
            $scope.userDelete = {
                id:id,
            };

            var userInitDelete = $scope.userDelete;
            init.roleManagementDelete(userInitDelete).then(function (data) {
                // console.log(data)
                if(data.success==true){
                    init.roleManagement( userInit)
                        .then(function (data) {
                            $scope.messages = data.result;
                            $scope.pageNum = Math.ceil((data.total-14)/9)+1;
                            // console.log($scope.messages);
                        }, function (data) {console.log(data);});
                }
            }, function (data) {console.log(data);});
        };

        $scope.clearSubsystem=function(){
            $scope.subsystem.forEach(function(value){
                value.item='';
            })
        }

        //系统设置--角色管理 新增
        $scope.roleManagementAdd = function () {
            var roleCode=[];
            $scope.subsystem.forEach(function(value){
                if(value.item==true){
                    roleCode.push(value.code);
                }
            })
            $scope.userAddUser = {
                roleName:$scope.newRoleName,
                functionCodes:roleCode,
            };
            var newUserInit = $scope.userAddUser;
            init.roleManagementAdd(newUserInit).then(function (data) {
                // console.log(data)
                //修改完成之后，从服务器重新获取内容
                init.roleManagement(userInit)
                    .then(function (data) {
                        // console.log(data)
                        $scope.messages = data.result;
                        $scope.pageNum = Math.ceil((data.total-14)/9)+1;
                        swal("添加完成");
                    }, function (data) {console.log(data);});
            }, function (data) {console.log(data);});
        };

    }])
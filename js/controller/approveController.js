/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')
//申报管理--审批
    .controller('approveController', ['$scope','init',function ($scope,init) {
        //------------数据初始
        $scope.staf='';//  申报人
        $scope.isHave=-1; // 审核状态
        $scope.page=1;   //  页码
        $scope.start=0; //  起始项
        init.approveQuery($scope.staf,$scope.isHave,$scope.page,$scope.start)
            .then(function (d) {
                $scope.messages = d.result;
                // console.log(d);
                $scope.pageNum = Math.ceil((d.total-14)/9);
                // console.log(d.total);
                // console.log( $scope.pageNum);
            },function () {});

        //----------申报人查询
        $scope.appQuery=function(){
            init.approveQuery($scope.staf,$scope.isHave,$scope.page,$scope.start).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
                $scope.pageNum = Math.ceil((d.total-14)/9);
            },function () {});
        }
        //  ------------状态查询
        $scope.state0=function(){
            $scope.isState='待审核';
            $scope.isHave = -1;
            init.approveQuery($scope.staf,$scope.isHave,$scope.page,$scope.start).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
                $scope.pageNum = Math.ceil((d.total-14)/9);
            },function () {});
        };
        $scope.state1=function(){
            $scope.isState='通过';
            $scope.isHave = 1;
            init.approveQuery($scope.staf,$scope.isHave,$scope.page,$scope.start).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
                $scope.pageNum = Math.ceil((d.total-14)/9);
            },function () {});
        };
        $scope.state2=function(){
            $scope.isState='拒绝';
            $scope.isHave = 2;
            init.approveQuery($scope.staf,$scope.isHave,$scope.page,$scope.start).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
                $scope.pageNum = Math.ceil((d.total-14)/9);
            },function () {});
        }
        //--------------------翻页
        $scope.onePage =function(){   // -----首页
            $scope.page=1;
            $scope.start=0;
            init.approveQuery($scope.staf,$scope.isHave,$scope.page,$scope.start).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }
        $scope.before= function(){     // -------上一页
            $scope.page=$scope.page-1;
            $scope.start= $scope.start-9;
            init.approveQuery($scope.staf,$scope.isHave,$scope.page,$scope.start).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        };
        $scope.after= function(){       //----------下一页
            if($scope.messages.length!=0) {
                $scope.page = $scope.page + 1;
                $scope.start = $scope.start + 9;
                init.approveQuery($scope.staf, $scope.isHave, $scope.page, $scope.start).then(function (d) {
                    // console.log(d);
                    $scope.messages = d.result
                }, function () {
                });
            }
        };
        $scope.lastPage = function () {             //--------------尾页
            $scope.page=$scope.pageNum;
            $scope.start=9*($scope.pageNum-1)+1;
            init.approveQuery($scope.staf,$scope.isHave,$scope.page,$scope.start).then(function (d) {
                // console.log(d);
                $scope.messages = d.result
            },function () {});
        }

        //审批  添加排序
        //正向排序
        $scope.approvePositiveSequenceOrder=function(num){
            $scope.messages=init.positiveSequenceOrder(num,$scope.messages);
        }
        //逆向排序
        $scope.approveInvertedOrder=function(num){
            $scope.messages=init.invertedOrder(num,$scope.messages);
        }

        //---------------进行审批
        $scope.pass=function(id) {  //-------通过
            $scope.sure=function(){
                console.log(id);
                init.isApprove(id,'1', $scope.content1).then(function () {
                    init.approveQuery($scope.staf,$scope.isHave,$scope.page,$scope.start).then(function (d) {
                        // console.log(d);
                        $scope.messages = d.result
                        $scope.pageNum = Math.ceil((d.total-14)/9);
                    },function () {});
                    swal({
                        title: "审批成功"
                    });
                }, function () {})
            };
        };
        $scope.notPass=function(id){ // 拒绝
            $scope.refuse = function () { //--------------
                console.log(id);
                init.isApprove(id,2, $scope.content2).then(function () {
                    init.approveQuery($scope.staf,$scope.isHave,$scope.page,$scope.start).then(function (d) {
                        // console.log(d);
                        $scope.messages = d.result;
                        $scope.pageNum = Math.ceil((d.total-14)/9);
                    },function () {});
                    swal({
                        title: "审批成功"
                    });
                }, function () {})
            };
        };
        //----------------详情莫太框
        $scope.md=function (m) {
            init. details(m).then(function (d) {
                $scope.isData =d
                // console.log($scope.isData);
                $('#myModal2').modal('toggle')
            },function () {})
        };
    }])
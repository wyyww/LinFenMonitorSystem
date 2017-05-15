/**
 * Created by eexiao on 17-4-10.
 */
angular.module('myApp.controller')

//申报管理--申报
    .controller('applicationController', ['$scope','$filter','init',function ($scope,$filter,init) {
        //获取当前部门
        // setTimeout(function () {
        init.currentDepartment().then(function (data) {
            data.result.children.unshift(data.result);
            $scope.departments = data.result.children;
        }), function (data) {
            console.log(data);
        };
        // }, 200);
        $scope.applicationFormSubmit = function () {
            if ($scope.staffRelationship == '直系亲属') {
                $scope.relationship = 2;
            }
            else {
                $scope.relationship = 1;
            }
            switch ($scope.staffJob) {
                case '县级党员干部':
                    $scope.Job = 1;
                    break;
                case '科级党员干部':
                    $scope.Job = 2;
                    break;
                case '社区基层人员':
                    $scope.Job = 3;
                    break;
                case '一般工作人员':
                    $scope.Job = 4;
                    break;
                default: $scope.Job = 1;break;
            }
            if ($scope.eventType == '丧葬') {$scope.declareEventType = 2;}
            else {$scope.declareEventType = 1;}
            if(!$scope.eventCount){$scope.eventCount=1;}
            if(!$scope.tableCount){$scope.tableCount=50;}
            if(!$scope.peopleCount){$scope.peopleCount=50;}
            if(!$scope.carCount){ $scope.carCount=1;}

            if($scope.eventDate){$scope.eventCreateDate=$filter('date')($scope.eventDate,'yyyy-MM-dd HH:mm:ss');}
            else{$scope.eventCreateDate='';}
            if ($scope.staffOrgId == '根组织') {
                $scope.staffDepartment = '1';
            }
            else if($scope.staffOrgId == '新部门'){
                $scope.staffDepartment = '2';
            }
            else if($scope.staffOrgId == 'Ramirez'){
                $scope.staffDepartment = '3';
            }
            else if($scope.staffOrgId == 'City'){
                $scope.staffDepartment = '4';
            }
            else if($scope.staffOrgId == 'Dr.Tai'){
                $scope.staffDepartment = '5';
            }
            else if($scope.staffOrgId == '老板'){
                $scope.staffDepartment = '5';
            }
            else{ $scope.staffDepartment = '1';}
            var userInit={
                staff: $scope.staff,
                staffRelationship: $scope.relationship,
                staffPoliticalStatus: $scope.staffPoliticalStatus,
                staffJob: $scope.Job,
                staffSpouse: $scope.staffSpouse,
                staffPhone: $scope.staffPhone,
                eventType:  $scope.declareEventType,
                eventCount: $scope.eventCount,
                eventDate:  $scope.eventCreateDate,
                location: $scope.location,
                tableCount: $scope.tableCount,
                peopleCount: $scope.peopleCount,
                peopleRange: $scope.peopleRange,
                carCount: $scope.carCount,
                carSource: $scope.carSource,
                selfPromise: $scope.selfPromise,
                promisePeople: $scope.promisePeople,
                staffOrgId: $scope.staffDepartment,
            };
            //文件上传判断
            if ($scope.applicationForm.files.$valid && $scope.files) {
                init.upload($scope.files[0])
                    .then(function (data) {
                        $scope.attachmentFileCode=data.result.code;
                        if(!$scope.attachmentFileCode){
                            $scope.attachmentFileCode='';
                        }
                        init.declaration(userInit,$scope.attachmentFileCode)
                            .then(function (data) {
                                // console.log(data);
                                swal("申报成功", "", "success");
                            },function () {
                                swal("申报失败，请重试", "", "success");
                            });
                    },function () {});
            }
        }

    }])
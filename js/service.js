/**
 * Created by zhangjie on 17-3-23.
 */
angular.module('myApp.service', [])

    .factory("init", function ($http, $q,$filter,Upload) {  //$q延迟 .defer() 类似于回调  不用使用$scope.apply()
        return {
            //用户登录中的所有数据
            userLogin: function (name,pd) {
                    var deferred = $q.defer();
                    $http({
                        method: 'get',
                        url: 'http://bigbug.tech:8080/wdm-api/api/user/auth.api',
                        params: {
                            username: name,
                            password: pd
                        }
                    })
                        .then(function successCallback(response) {
                            deferred.resolve(response.data);
                        }, function errorCallback(response) {
                            deferred.reject(response.data);
                        });
                    return deferred.promise;
                },

            //获取用户列表
            userList: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/show.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),
                        page: '1',
                        start: '0',
                        limit: '10'
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //获取当前部门
            currentDepartment: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/org/show.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //获取用户角色
            userRole: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/role/get_all.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),
                        roleId: '498'
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //添加新用户
            addUser: function () {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/show.api',
                    data: {
                        token: JSON.parse(sessionStorage.getItem('token')),
                        orgId: '10',
                        username: 'zxiao',
                        name: 'zxiao2',
                        password: '123',
                        roleId: '420'
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },


            // upload on file select or drop
            upload : function (file) {
                var deferred = $q.defer();
                Upload.upload({
                    url: 'http://bigbug.tech:8080/wdm-api/api/upload.api',
                    data: {file: file,}
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                 return deferred.promise;
             },


            declaration:function(userInit,attachmentFileCode){
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/add.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),
                        staff: userInit.staff,
                        staffRelationship: userInit.staffRelationship,
                        staffPoliticalStatus: userInit.staffPoliticalStatus,
                        staffJob: userInit.staffJob,
                        staffSpouse: userInit.staffSpouse,
                        staffPhone: userInit.staffPhone,
                        eventType: userInit.eventType,
                        eventCount: userInit.eventCount,
                        eventDate: userInit.eventDate,
                        location: userInit.location,
                        tableCount: userInit.tableCount,
                        peopleCount: userInit.peopleCount,
                        peopleRange: userInit.peopleRange,
                        carCount: userInit.carCount,
                        carSource: userInit.carSource,
                        attachmentFileCode: attachmentFileCode,
                        selfPromise: userInit.selfPromise,
                        promisePeople: userInit.promisePeople,
                        staffOrgId: userInit.staffOrgId,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //添加根据不同的选择对数据进行排序
            //正序排列数据
            positiveSequenceOrder:function(num,arr){
                    var str=[];
                    switch(num){
                        //申报管理排序依据
                        case 'declarant': str=$filter('orderBy')(arr,'staff',true);break;
                        case 'declareDepartment': str=$filter('orderBy')(arr,'staffOrgName',true);break;
                        case 'declareType': str=$filter('orderBy')(arr,'eventType',true);break;
                        case 'declareCount': str=$filter('orderBy')(arr,'peopleCount',true);break;
                        case 'declareTime': str=$filter('orderBy')(arr,'createTime',true);break;
                        case 'declareEventTime': str=$filter('orderBy')(arr,'eventDate',true);break;
                        //责任追究排序依据
                        case 'noticeMan': str=$filter('orderBy')(arr,'staff',true);break;
                        case 'noticeDepartment': str=$filter('orderBy')(arr,'staffOrgName',true);break;
                        case 'noticeTitle': str=$filter('orderBy')(arr,'title',true);break;
                        case 'noticeTime': str=$filter('orderBy')(arr,'createTime',true);break;
                    }
                    return str;
                },

            //逆向排列数据
            invertedOrder:function(num,arr){
                    var str=[];
                    switch(num){
                        //申报管理排序依据
                        case 'declarant': str=$filter('orderBy')(arr,'staff',false);break;
                        case 'declareDepartment': str=$filter('orderBy')(arr,'staffOrgName',false);break;
                        case 'declareType': str=$filter('orderBy')(arr,'eventType',false);break;
                        case 'declareCount': str=$filter('orderBy')(arr,'peopleCount',false);break;
                        case 'declareTime': str=$filter('orderBy')(arr,'createTime',false);break;
                        case 'declareEventTime': str=$filter('orderBy')(arr,'eventDate',false);break;
                        //责任追究排序依据
                        case 'noticeMan': str=$filter('orderBy')(arr,'staff',false);break;
                        case 'noticeDepartment': str=$filter('orderBy')(arr,'staffOrgName',false);break;
                        case 'noticeTitle': str=$filter('orderBy')(arr,'title',false);break;
                        case 'noticeTime': str=$filter('orderBy')(arr,'createTime',false);break;
                    }
                    return str;
                },

            //审批 查询
            approveQuery:function (staf,isHave,page,start) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/show_audit.api' ,
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),
                        staff: staf,//申报人
                        auditStatus:isHave,//公示状态 -1：未公示 1：已公示
                        page: page,//当前页数
                        start: start,//从第几个开始
                        limit: '9',//每页显示多少个
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response);
                    });
                return deferred.promise;
            },

            //审批  通过1  拒绝2
            isApprove:function (eventId,status,content) {
                var deferred = $q.defer();
                $http({
                    method:'get',
                    url:'http://bigbug.tech:8080/wdm-api/api/wdm/event/audit.api',
                    params:{
                        token: JSON.parse(sessionStorage.getItem('token')),
                        eventId:eventId,
                        status:status,
                        content:content
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response.data);
                    // console.log(response.data);
                }, function errorCallback(response) {deferred.reject(response);
                });
                return deferred.promise;
            },

            //审批页面  申报详情
            details:function (eventId) {
                var deferred = $q.defer();
                $http({
                    method:'get',
                    url:'http://bigbug.tech:8080/wdm-api/api/wdm/event/get.api',
                    params:{
                        token: JSON.parse(sessionStorage.getItem('token')),
                        id:eventId
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.result);
                }, function errorCallback(response) {
                    deferred.reject(response);
                     });
                return deferred.promise;
            },

            //公示 查询
            publicQuery: function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/show_bulletin.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),
                        staff: user.staff,//申报人
                        bulletinStatus: user.bulletinStatus,//公示状态 -1：未公示 1：已公示
                        page: user.page,//当前页数
                        start: user.start,//从第几个开始
                        limit: user.limit,//每页显示多少个
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //公示 公示内容提交
            publicTextSubmit: function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_bulletin/add.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        eventId: user.eventId,//待公示项目id
                        content: user.content,//审批意见内容
                        attachmentFileCode: user.attachmentFileCode,//上传文件code，通过调用文件上传接口获取
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //公示 公示结果提交
            publicResuleSubmit: function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_bulletin_result/add.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        eventId: user.eventId,//待公示项目id
                        content: user.content,//公示结果内容
                        status: user.status,//公示结果状态 1：通过 2：有异议
                        attachmentFileCode:user.attachmentFileCode,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //精确查询  申报情况最终结果查询
            preciseResultQuery: function (claimantName,claimantState) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/search.api',
                    params: {
                        token:JSON.parse(sessionStorage.getItem('token')),                    //令牌
                        staff:claimantName,
                        staffOrgId:claimantState,
                        page: 1,                         //当前页面
                        start:0,                        //从哪个开始
                        limit:9                        //每页显示几个
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //组合查询  申报情况最终结果查询
            DeclareResultsQuery: function (isState,peopleCountMin,peopleCountMax,beforeTime, afterTime,dinnerBeforeTime,dinnerAfterTime) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/search.api',
                    params: {
                        token:JSON.parse(sessionStorage.getItem('token')),                    //令牌
                        eventType: isState,                    //申报类型
                        peopleCountMin: peopleCountMin,              //申报最小人数
                        peopleCountMax: peopleCountMax,             //申报最大人数
                        eventCreateTimeFrom: beforeTime,   //申报时间开始
                        eventCreateTimeTo: afterTime ,     //申报时间结束
                        eventTimeFrom: dinnerBeforeTime,         //宴请开始时间
                        eventTimeTo: dinnerAfterTime,           //宴请结束时间
                        page: 1,                         //当前页面
                        start:  0,                        //从哪个开始
                        limit: 9                        //每页显示几个
                    }
                })
                    .then(function successCallback(response) {
                            deferred.resolve(response.data);
                    }, function errorCallback(response) {
                            deferred.reject(response.data);
                        });
                return deferred.promise;
            },

            //数量统计  申报情况最终结果查询
            DeclareCountQuery: function (beforeTime, afterTime,dinnerBeforeTime,dinnerAfterTime) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/org_event_type_count',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        eventCreateTimeFrom:beforeTime,        //申报时间开始
                        eventCreateTimeTo: afterTime,           //申报时间结束
                        eventTimeFrom: dinnerBeforeTime,         //宴请开始时间
                        eventTimeTo: dinnerAfterTime,           //宴请结束时间
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //现场监督 监督查询接口  (ok)
            superviseDemand: function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/show_supervise.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        staff: user.staff,
                        superviseStatus: user.superviseStatus,
                        page: user.page,
                        start: user.start,
                        limit: user.limit,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //现场监督 监督报告按钮接口
            superviseReport: function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_supervise_report/add.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        eventId: user.eventId,
                        title: user.title,
                        content: user.content,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //现场监督 违纪登记
            breakRule: function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_supervise_principle_breaking/add.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        eventId: user.eventId,
                        isCashGiftOutOfLimits: user.isCashGiftOutOfLimits,
                        isUsePublicCar: user.isUsePublicCar,
                        isUsePublicGoods: user.isUsePublicGoods,
                        isUsePublicAsserts: user.isUsePublicAsserts,
                        isUsePublicMoney: user.isUsePublicMoney,
                        attachmentFileCode:user.attachmentFileCode,
                        otherQuestion: user.otherQuestion,
                        content:user.content,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //责任追究  公开通报  查询
            openBulletinToFind:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/public_notification/show.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        staff: user.staff,
                        page: user.page,
                        start: user.start,
                        limit: user.limit,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //责任追究  公开通报  修改更新
            openBulletinToAlter:function (userInit) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/public_notification/update.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        id:userInit.id,
                        title:userInit.title,
                        content:userInit.content,
                        staff: userInit.staff,
                        staffOrgId:userInit.staffOrg.id,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //责任追究  公开通报 修改获取
            openBulletinToAlterGet:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/public_notification/get.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        id:user.id,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
        },

            //责任追究  公开通报  删除
            deleteData:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/public_notification/delete.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        id:user.id,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //责任追究  公开通报  添加
            openBulletinToAddData:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/public_notification/add.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        title:user.title,
                        content:user.content,
                        staff:user.staff,
                        staffOrgId:user.staffOrgId,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //责任追究--纪律处分  查询
            disciplinaryAwardFind:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/show.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        staff: user.staff,
                        page: user.page,
                        start: user.start,
                        limit: user.limit,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //责任追究--纪律处分  修改更新
            disciplinaryAwardAlter:function (userInit) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/update.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        id:userInit.id,
                        title:userInit.title,
                        content:userInit.content,
                        staff: userInit.staff,
                        staffOrgId:userInit.staffOrg.id,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //责任追究--纪律处分  修改获得
            disciplinaryAwardGet:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/get.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        id:user.id,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //责任追究--纪律处分  删除
            disciplinaryAwardDeleteData:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/delete.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        id:user.id,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //责任追究--纪律处分  添加
            disciplinaryAwardAddData:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/add.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        title:user.title,
                        content:user.content,
                        staff:user.staff,
                        staffOrgId:user.staffOrgId,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //系统设置--用户管理 直接显示
            userManagement:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/show.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        page:user.page,
                        start:user.start,
                        limit:user.limit
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //系统设置--用户管理 修改获得
            userManagementGetAlter:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/get.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        userId:user.userId,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //系统设置--用户管理 修改更新
            userManagementUpdateAlter:function (userInit,password) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/update.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        userId:user.id,
                        orgId:user.organization.id,
                        roleId:user.role.id,
                        name:user.name,
                        password:password
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //系统设置--用户管理 删除信息
            userManagementDelete:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/delete.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        id:550,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //系统设置--用户管理 新增信息
            userManagementAdd:function (userInit) {
            var user = userInit;
            var deferred = $q.defer();
            $http({
                method: 'get',
                url: 'http://bigbug.tech:8080/wdm-api/api/user/add.api',
                params: {
                    token: JSON.parse(sessionStorage.getItem('token')),//令牌
                    orgId:user.orgId,
                    username:user.username,
                    name:user.name,
                    password:user.password,
                    roleId:user.roleId,
                }
            })
                .then(function successCallback(response) {
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response.data);
                });
            return deferred.promise;
        },

            //系统设置--角色管理 直接显示
            roleManagement:function (userInit) {

                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/role/show.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        page:userInit.page,
                        start:userInit.start,
                        limit:userInit.limit,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //系统设置--角色管理 修改获得
            roleManagementGet:function (userInit) {
                var user = userInit;
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/role/get.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        roleId:user.roleId,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //系统设置--角色管理 修改向服务器请求修改内容
            roleManagementUpdateAlter:function(roleId,roleName,roleCode){
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://bigbug.tech:8080/wdm-api/api/role/update.api',
                    params: {
                        token: JSON.parse(sessionStorage.getItem('token')),//令牌
                        roleId:roleId,
                        roleName:roleName,
                        functionCodes:roleCode,
                    }
                })
                    .then(function successCallback(response) {
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },

            //系统设置--角色管理 删除
            roleManagementDelete:function (userInit) {
            var user = userInit;
            var deferred = $q.defer();
            $http({
                method: 'get',
                url: 'http://bigbug.tech:8080/wdm-api/api/role/delete.api',
                params: {
                    token: JSON.parse(sessionStorage.getItem('token')),//令牌
                    id:user.id,
                }
            })
                .then(function successCallback(response) {
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response.data);
                });
            return deferred.promise;
        },

            //系统设置--角色管理 新增
            roleManagementAdd:function (userInit) {
            var user = userInit;
            var deferred = $q.defer();
            $http({
                method: 'get',
                url: 'http://bigbug.tech:8080/wdm-api/api/role/add.api',
                params: {
                    token: JSON.parse(sessionStorage.getItem('token')),//令牌
                    roleName:user.roleName,
                    functionCodes:user.functionCodes,
                }
            })
                .then(function successCallback(response) {
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response.data);
                });
            return deferred.promise;
        },
        }
    })
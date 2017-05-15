/**
 * Created by liuyang on 17-3-27.
 */
angular.module('filter',[])
    .filter('eventType',function () {
    return function (v){
        if(v){
                if(v==1){
                    return '婚嫁'
                }else if(v==2){
                    return '丧葬'
                }
            }
        };
    })

    .filter('Job',function () {
        return function (v){
            if(v){
                if(v==1){
                    return '县级党员干部'
                }else if(v==2){
                    return '科级党员干部'
                }else if(v==3){
                    return '社区基层干部'
                }else if(v==4){
                    return '一般工作人员'
                }
            }
        };
    })

    .filter('relationship',function () {
        return function (v){
            if(v){
                if(v==1){
                    return '本人'
                }else if(v==2){
                    return '直系亲属'
                }
            }
        };
    })
    .filter('bulletin',function () {
        return function (v){
            if(v){
                if(v==-1){
                    return '未公示'
                }else if(v==1){
                    return '已公示'
                }
            }
        };
    })
    .filter('supervise',function () {
        return function (v){
            if(v){
                if(v==-1){
                    return '未监督'
                }else if(v==1){
                    return '已监督'
                }
            }
        };
    })

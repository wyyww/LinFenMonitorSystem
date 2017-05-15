/**
 * Created by 一水茶缘 on 2017/4/1.
 */
angular.module('myApp.filters',[])
    .filter('isDeclare',function(){
        return function(eventType){
            if(eventType=='1'){
                return '嫁娶';
            }
            else{
                return '丧葬';
            }
        }
    })
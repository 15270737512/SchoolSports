var allid=0;
/*jquery Ajax ,赛事查询分页*/
$(document).ready(function(){
  var vm =new Vue({
        el: '.right',
        data: {
            sites: [],          //分页信息
            list:[],            //赛事信息
            event:[],           //项目信息
            athlete:[],         //运动员信息
            referee:[],         //裁判信息
            athleteByEvent:[]  //对应项目的运动员
        },
          created: function () {
          //发送ajax请求，获取赛事信息
          $.ajax({
              url: "http://192.168.191.1:8080/competition/findPage",
              type: "Get",
              async:"false",
              success: function(data){
                  /*这个方法里是ajax发送请求成功之后执行的代码*/
                  vm.sites=data.datas;
                  vm.list=data.datas.list;
              },
              error: function(msg){
                   alert("ajax连接异常："+msg);
              }
           });
        },
        methods:{
          page_up:function(){
            if(vm.sites.pageNum>1){
              var pagenum =vm.sites.pageNum-1;
              var pagesize =vm.sites.pageSize;
              this.$http.get('http://192.168.191.1:8080/competition/findPage?pageNum='+pagenum+'&pageSize='+pagesize+'').then(function(res){
                vm.sites=res.data.datas;
                vm.list=res.data.datas.list;
              },function(){
                console.log('请求失败！');
              });
            }
          },
          page_down:function(){
            if(vm.sites.pageNum<vm.sites.pages){
              var pagenum =vm.sites.pageNum+1;
              var pagesize =vm.sites.pageSize;
              this.$http.get('http://192.168.191.1:8080/competition/findPage?pageNum='+pagenum+'&pageSize='+pagesize+'').then(function(res){
                vm.sites=res.data.datas;
                vm.list=res.data.datas.list;
              },function(){
                console.log('请求失败！');
              });
            }
          },
          page_first:function(){

            var pagesize =vm.sites.pageSize;
            this.$http.get('http://192.168.191.1:8080/competition/findPage?pageNum=1&pageSize='+pagesize+'').then(function(res){
              vm.sites=res.data.datas;
              vm.list=res.data.datas.list;
            },function(){
              console.log('请求失败！');
            });
          },
          page_last:function(){
            var pages =vm.sites.pages;
            var pagesize =vm.sites.pageSize;
            this.$http.get('http://192.168.191.1:8080/competition/findPage?pageNum='+pages+'&pageSize='+pagesize+'').then(function(res){
              vm.sites=res.data.datas;
              vm.list=res.data.datas.list;
            },function(){
              console.log('请求失败！');
            });
          },
          //添加赛事按钮  点击事件
          click_event:function(){
            this.$http.get('http://192.168.191.1:8080/event/findAll')     //请求项目信息
            .then(function(res){
              vm.event=res.data.datas;
              // console.log(vm.event);
            },function(){
              console.log('请求失败！');
            });
            this.$http.get('http://192.168.191.1:8080/athlete/findAll')    //请求运动员信息
            .then(function(res){
              vm.athlete=res.data.datas;
              // console.log(vm.athlete);
            },function(){
              console.log('请求失败！');
            });
            this.$http.get('http://192.168.191.1:8080/referee/findAll')     //请求裁判信息
            .then(function(res){
              vm.referee=res.data.datas;
              // console.log(vm.referee);
            },function(){
              console.log('请求失败！');
            });
          },
          //选中项目时，查询对应的参赛选手信息
          event_change (e) {
          var eventId = e.target.value;
          this.$http.get('http://192.168.191.1:8080/athlete/findAthleteByEventId?eventId='+eventId)     //请求裁判信息
          .then(function(res){
            // console.log(res.data.datas[0].id);
            vm.athleteByEvent=res.data.datas
          },function(){
            console.log('请求失败！');
          });
          },
          //删除赛事
          click_competition_delete:function(id){
            var a =confirm("确定删除吗？");
            if(a==true){
              this.$http.get('http://192.168.191.1:8080/competition/delete?id='+id) //删除对应id的赛事
              .then(function(res){
                vm.listid=res.data.datas;
                if(res.data.code===200){
                  window.location.href='competition.html';
                }else{
                  alert(res.data.message);
                }
              },function(){
                console.log('请求失败！');
              });
            }else{
              return false;
            }
          }
          //
        }
    });
    //项目单选下拉框
    $('#co_name').select2({
      selectOnClose: true,
      placeholder: '请选择'
    });
    //晋级人数单选下拉框
    $('#rules').select2({
      selectOnClose: true,
      placeholder: '请选择'
    });
    //运动员多选框
    $('#co_athlete').select2({
      selectOnClose: true,
      placeholder: '请选择(可多选)'
    });
    //裁判多选框
    $('#co_referee').select2({
      selectOnClose: true,
      placeholder: '请选择(可多选)'
    });
    //日期控件
    $('#datetime').datetimepicker({
        format: 'YYYY-MM-DD hh:mm:ss',
        locale: moment.locale('zh-cn')
    });
    //项目单选下拉框
    $('#co_name_up').select2({
      selectOnClose: true,
      placeholder: '请选择'
    });
    //晋级人数单选下拉框
    $('#rules_up').select2({
      selectOnClose: true,
      placeholder: '请选择'
    });
    //运动员多选框
    $('#co_athlete_up').select2({
      selectOnClose: true,
      placeholder: '请选择(可多选)'
    });
    //裁判多选框
    $('#co_referee_up').select2({
      selectOnClose: true,
      placeholder: '请选择(可多选)'
    });
    //日期控件
    $('#datetime_up').datetimepicker({
        format: 'YYYY-MM-DD hh:mm:ss',
        locale: moment.locale('zh-cn')
    });
})

/*jquery Ajax ,添加赛事*/
  function add_event(){
    var coEvId= $('.co_name').val();      //获取比赛项目的名称
    var startTime= $('#datetime').val();  //获取比赛的时间
    var coatId= $('#co_athlete').val();   //获取对应比赛项目的对应参赛运动员
    var coreId= $('#co_referee').val();   //获取该项目的监督裁判
    var place= $('#place').val();         //获取该赛事的比赛地点
    var currentGroup=$('#currentGroup').val();           //获取该赛事的分组情况
    var rules=$('#rules').val();
    //将运动员的id设为字符串格式 如：1,2
    var coAtId =coatId[0];
    for(var i=1;i<coatId.length;i++){
      coAtId+=","+coatId[i];
    }
    //将裁判的id设为字符串格式 如：1,2
    var coReId =coreId[0];
    for(var i=1;i<coreId.length;i++){
      coReId+=","+coreId[i];
    }
    var data ={
      'competition':{
        'coEvId':coEvId,
        'startTime':startTime,
        'coAtId':coAtId,
        'coReId':coReId,
        'place':place,
        'currentGroup':currentGroup
      },
      'rules':{
        'oust':rules
      }
    };
    $.ajax({
      url:'http://192.168.191.1:8080/competition/add',
      type:'post',
      contentType:'application/json; charset=UTF-8',
      dataType:'json',
      data:JSON.stringify(data),
      success:function(data){
        if(data.code===200){
          window.location.href='competition.html';
        }else{
          alert(data.message);
        }
      }
    })
  }

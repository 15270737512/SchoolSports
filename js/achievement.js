var allid=0;
/*jquery Ajax ,成绩查询分页*/
$(document).ready(function(){
  var vm =new Vue({
        el: '.right',
        data: {
            sites: [],
            list:[],
            listid:[],
            score:[]
        },
        created: function () {
          $.ajax({
              url: "http://192.168.191.1:8080/achievement/findPage",
              type: "Get",
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
              this.$http.get('http://192.168.191.1:8080/achievement/findPage?pageNum='+pagenum+'&pageSize='+pagesize+'').then(function(res){
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
              this.$http.get('http://192.168.191.1:8080/achievement/findPage?pageNum='+pagenum+'&pageSize='+pagesize+'').then(function(res){
                vm.sites=res.data.datas;
                vm.list=res.data.datas.list;
              },function(){
                console.log('请求失败！');
              });
            }
          },
          page_first:function(){

            var pagesize =vm.sites.pageSize;
            this.$http.get('http://192.168.191.1:8080/achievement/findPage?pageNum=1&pageSize='+pagesize+'').then(function(res){
              vm.sites=res.data.datas;
              vm.list=res.data.datas.list;
            },function(){
              console.log('请求失败！');
            });
          },
          page_last:function(){
            var pages =vm.sites.pages;
            var pagesize =vm.sites.pageSize;
            this.$http.get('http://192.168.191.1:8080/achievement/findPage?pageNum='+pages+'&pageSize='+pagesize+'').then(function(res){
              vm.sites=res.data.datas;
              vm.list=res.data.datas.list;
            },function(){
              console.log('请求失败！');
            });
          },
          //修改成绩按钮  点击事件
          click_achievement_update:function(id){
            this.$http.get('http://192.168.191.1:8080/achievement/findById?id='+id) //对应id的成绩信息
            .then(function(res){
              vm.listid=res.data.datas;
              allid=id;
            },function(){
              console.log('请求失败！');
            });
          },
          //删除成绩
          click_achievement_delete:function(id){
            var a=confirm("确定删除吗？");
            if(a==true){
              this.$http.get('http://192.168.191.1:8080/achievement/del?id='+id) //删除对应id的成绩
              .then(function(res){
                vm.listid=res.data.datas;
                if(res.data.code===200){
                  window.location.href='achievement.html';
                }else{
                  alert(res.data.message);
                }
              },function(){
                console.log('请求失败！');
              });
            }else{
              return false;
            }
          },
          //导出Excel表格 点击事件
          findAllScore:function(){
            this.$http.get('http://192.168.191.1:8080/achievement/findAll') //删除对应id的成绩
            .then(function(res){
              vm.score=res.data.datas;
            },function(){
              console.log('请求失败！');
            });
          },
        }
    });
})

/*jquery Ajax ,修改成绩*/
  function ac_update(){
    var score= $('#score').val();
    $.ajax({
      url:'http://192.168.191.1:8080/achievement/edit',
      type:'get',
      data:{
        'id':allid,
        'score':score
      },
      success:function(data){
        if(data.code===200){
          window.location.href='achievement.html';
        }else{
          alert(data.message);
        }
      }
    })
  }

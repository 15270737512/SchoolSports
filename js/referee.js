var allid=0;
/*jquery Ajax ,裁判查询分页*/
$(document).ready(function(){
  var vm =new Vue({
        el: '.right',
        data: {
            sites: [],      //页数，记录条数
            list:[],        //对应的表格信息，如编号，姓名..
            listid:[]       //对应裁判的信息
        },
        created: function () {
          $.ajax({
              url: "http://192.168.191.1:8080/referee/findPage",
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
              this.$http.get('http://192.168.191.1:8080/referee/findPage?pageNum='+pagenum+'&pageSize='+pagesize+'').then(function(res){
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
              this.$http.get('http://192.168.191.1:8080/referee/findPage?pageNum='+pagenum+'&pageSize='+pagesize+'').then(function(res){
                vm.sites=res.data.datas;
                vm.list=res.data.datas.list;
              },function(){
                console.log('请求失败！');
              });
            }
          },
          page_first:function(){

            var pagesize =vm.sites.pageSize;
            this.$http.get('http://192.168.191.1:8080/referee/findPage?pageNum=1&pageSize='+pagesize+'').then(function(res){
              vm.sites=res.data.datas;
              vm.list=res.data.datas.list;
            },function(){
              console.log('请求失败！');
            });
          },
          page_last:function(){
            var pages =vm.sites.pages;
            var pagesize =vm.sites.pageSize;
            this.$http.get('http://192.168.191.1:8080/referee/findPage?pageNum='+pages+'&pageSize='+pagesize+'').then(function(res){
              vm.sites=res.data.datas;
              vm.list=res.data.datas.list;
            },function(){
              console.log('请求失败！');
            });
          },
          //删除裁判
          click_referee_delete:function(id){
            var a =confirm("确定删除吗？");
            if(a==true){
              this.$http.get('http://192.168.191.1:8080/referee/del?id='+id) //删除对应id的裁判
              .then(function(res){
                vm.listid=res.data.datas;
                if(res.data.code===200){
                  window.location.href='referee.html';
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
})
/*jquery Ajax ,添加裁判*/
  function add_referee(){
    var reallyName= $('#referee_reallyName').val();
    var username= $('#referee_username').val();
    var password= $('#referee_password').val();
    var telNumber= $('#referee_telNumber').val();
    $.ajax({
      url:'http://192.168.191.1:8080/referee/add',
      type:'post',
      data:{
        'reallyName':reallyName,
        'username':username,
        'password':password,
        'telNumber':telNumber
      },
      success:function(data){
        if(data.code===200){
          window.location.href='referee.html';
        }else{
          alert(data.message);
        }
      },
      error:function(msg){
        alert(msg.responseJSON.message);
      }
    })
  }

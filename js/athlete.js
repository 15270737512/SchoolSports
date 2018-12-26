var allid=0;
/*jquery Ajax ,运动员查询分页*/
$(document).ready(function(){
  var vm =new Vue({
        el: '.right',
        data: {
            sites: [],    //页数，记录条数
            list:[],      //对应的表格信息，如编号，姓名..
            collage:[],   //学院信息
            event:[],     //项目信息
            listid:[],    //对应运动员的信息
        },
        created: function () {
　　　　　　//为了在内部函数能使用外部函数的this对象，要给它赋值了一个名叫self的变量。
          $.ajax({
              url: "http://192.168.191.1:8080/athlete/findPage",
              type: "Get",
              async:"false",
              success: function(data){
                  /*这个方法里是ajax发送请求成功之后执行的代码*/
                  vm.sites=data.datas;
                  vm.list=data.datas.list;
                  for(var i=0;i<vm.list.length;i++){
                    if(vm.list[i].sex==1){
                      vm.list[i].sex="男"
                    }else if(vm.list[i].sex==0){
                      vm.list[i].sex="女"
                    }else{
                      vm.list[i].sex="未知"
                    }
                  }
              },
              error: function(msg){
                   alert("ajax连接异常："+msg);
              }
           });
        },
        methods:{
          //上一页
          page_up:function(){
            if(vm.sites.pageNum>1){
              var pagenum =vm.sites.pageNum-1;
              var pagesize =vm.sites.pageSize;
              this.$http.get('http://192.168.191.1:8080/athlete/findPage?pageNum='+pagenum+'&pageSize='+pagesize+'').then(function(res){
                vm.sites=res.data.datas;
                vm.list=res.data.datas.list;
                for(var i=0;i<vm.list.length;i++){
                  if(vm.list[i].sex==1){
                    vm.list[i].sex="男"
                  }else if(vm.list[i].sex==0){
                    vm.list[i].sex="女"
                  }else{
                    vm.list[i].sex="未知"
                  }
                }
              },function(){
                console.log('请求失败！');
              });
            }
          },
          //下一页
          page_down:function(){
            if(vm.sites.pageNum<vm.sites.pages){
              var pagenum =vm.sites.pageNum+1;
              var pagesize =vm.sites.pageSize;
              this.$http.get('http://192.168.191.1:8080/athlete/findPage?pageNum='+pagenum+'&pageSize='+pagesize+'').then(function(res){
                vm.sites=res.data.datas;
                vm.list=res.data.datas.list;
                for(var i=0;i<vm.list.length;i++){
                  if(vm.list[i].sex==1){
                    vm.list[i].sex="男"
                  }else if(vm.list[i].sex==0){
                    vm.list[i].sex="女"
                  }else{
                    vm.list[i].sex="未知"
                  }
                }
              },function(){
                console.log('请求失败！');
              });
            }
          },
          //首页
          page_first:function(){

            var pagesize =vm.sites.pageSize;
            this.$http.get('http://192.168.191.1:8080/athlete/findPage?pageNum=1&pageSize='+pagesize+'').then(function(res){
              vm.sites=res.data.datas;
              vm.list=res.data.datas.list;
              for(var i=0;i<vm.list.length;i++){
                if(vm.list[i].sex==1){
                  vm.list[i].sex="男"
                }else if(vm.list[i].sex==0){
                  vm.list[i].sex="女"
                }else{
                  vm.list[i].sex="未知"
                }
              }
            },function(){
              console.log('请求失败！');
            });
          },
          //末页
          page_last:function(){
            var pages =vm.sites.pages;
            var pagesize =vm.sites.pageSize;
            this.$http.get('http://192.168.191.1:8080/athlete/findPage?pageNum='+pages+'&pageSize='+pagesize+'').then(function(res){
              vm.sites=res.data.datas;
              vm.list=res.data.datas.list;
              for(var i=0;i<vm.list.length;i++){
                if(vm.list[i].sex==1){
                  vm.list[i].sex="男"
                }else if(vm.list[i].sex==0){
                  vm.list[i].sex="女"
                }else{
                  vm.list[i].sex="未知"
                }
              }
            },function(){
              console.log('请求失败！');
            });
          },
          //添加运动员按钮  点击事件
          click_athlete:function(){
            this.$http.get('http://192.168.191.1:8080/event/findAll') //参与项目
            .then(function(res){
              vm.event=res.data.datas;
            },function(){
              console.log('请求失败！');
            });
            this.$http.get('http://192.168.191.1:8080/collage/findAll')//所属学院
            .then(function(res){
              vm.collage=res.data.datas;
            },function(){
              console.log('请求失败！');
            });
          },
          //修改运动员按钮  点击事件
          click_athlete_update:function(id){
            this.$http.get('http://192.168.191.1:8080/athlete/findById?id='+id) //对应id的运动员信息
            .then(function(res){
              vm.listid=res.data.datas;
              allid=id;
            },function(){
              console.log('请求失败！');
            });
            this.$http.get('http://192.168.191.1:8080/event/findAll') //参与项目
            .then(function(res){
              vm.event=res.data.datas;
            },function(){
              console.log('请求失败！');
            });
            this.$http.get('http://192.168.191.1:8080/collage/findAll')//所属学院
            .then(function(res){
              vm.collage=res.data.datas;
            },function(){
              console.log('请求失败！');
            });
          },
          //删除运动员
          click_athlete_delete:function(id){
            var a =confirm("确定删除吗？");
            if(a==true){
              this.$http.get('http://192.168.191.1:8080/athlete/delete?id='+id) //删除对应id的运动员
              .then(function(res){
                vm.listid=res.data.datas;
                if(res.data.code===200){
                  window.location.href='athlete.html';
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
    $('#al_atevid').select2({
      selectOnClose: true,
      placeholder: '请选择(可多选)'
    });
    $('#al_atco').select2({
      selectOnClose: true,
      placeholder: '请选择'
    });
    $('#al_atevid_up').select2({
      selectOnClose: true,
      placeholder: '请选择(可多选)'
    });
    $('#al_atco_up').select2({
      selectOnClose: true,
      placeholder: '请选择'
    });
})
/*jquery Ajax ,添加运动员*/
  function add_athlete(){
    var al_num= $('#al_num').val();
    var al_name= $('#al_name').val();
    var al_sex= $('#al_sex').val();
    var al_atco= $('#al_atco').val();
    var al_atevid= $('#al_atevid').val();
    var arr =al_atevid[0];
    for(var i=1;i<al_atevid.length;i++){
      arr+=","+al_atevid[i];
    }
    $.ajax({
      url:'http://192.168.191.1:8080/athlete/add',
      type:'post',
      data:{
        'serialNumber':al_num,
        'name':al_name,
        'sex':al_sex,
        'atCoId':al_atco,
        'atEvId':arr
      },
      success:function(data){
        if(data.code===200){
          window.location.href='athlete.html';
        }else{
          alert(data.message);
        }
      }
    })
  }
/*jquery Ajax ,修改运动员 提交事件*/
  function at_update(){

    var al_num= $('#al_num_up').val();
    var al_name= $('#al_name_up').val();
    var al_sex= $('#al_sex_up').val();
    var al_atco= $('#al_atco_up').val();
    var al_atevid= $('#al_atevid_up').val();
    var arr =al_atevid[0];
    for(var i=1;i<al_atevid.length;i++){
      arr+=","+al_atevid[i];
    }
    $.ajax({
      url:'http://192.168.191.1:8080/athlete/edit',
      type:'post',
      data:{
        'id':allid,
        'serialNumber':al_num,
        'name':al_name,
        'sex':al_sex,
        'atCoId':al_atco,
        'atEvId':arr
      },
      success:function(data){
        if(data.code===200){
          window.location.href='athlete.html';
        }else{
          alert(data.message);
        }
      }
    })
  }

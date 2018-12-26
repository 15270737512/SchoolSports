$(document).ready(function(){
  $('#login').click(function(){
    var username=$('.username').val();
    var password=$('.password').val();
    $.ajax({
      url:'http://192.168.191.1:8080/manager/login',
      type:'post',
      data:{
        'username':username,
        'password':password
      },
      success:function(data){
        if(data.code===200){
            window.location.href='index.html';
        }
      },
      error: function(msg){
          console.log("ajax连接异常："+msg);
      }
    });
  });
});

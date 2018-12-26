// 图片翻转
$(document).ready(function(){
  var deg=0;
  $(".list-select").click(function(){
    if(deg==0){
      deg=90;
      $(".xz-select").css("transform","rotate("+-deg+"deg)");
    }else{
      deg=0;
      $(".xz-select").css("transform","rotate("+-deg+"deg)")
    }
  })
  $(".list-insert").click(function(){
    if(deg==0){
      deg=90;
      $(".xz-insert").css("transform","rotate("+-deg+"deg)")
    }else{
      deg=0;
      $(".xz-insert").css("transform","rotate("+-deg+"deg)")
    }
  })
})

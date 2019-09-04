$(function(){
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  console.log(this)
  var url = $(this).attr('action');
  $.ajax({
      type: "POST",
      url:  url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      // 成功の場合の処理
    })
    .fail({
      // エラーの場合処理
    });
  });
});
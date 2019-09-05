$(function(){
  function buildHTML(message){
    var img = null
    message.image === null ? img = `` : img = `<img class = "main-manu__one-message-detail--image" src="${message.image}">`
    var html = `<div class = "main-manu__one-message">
                  <ul class = "main-manu__one-message-user">
                    <li class = "main-manu__one-message-name">
                      ${message.name}
                    </li>
                    <li class = "main-manu__one-message-time">
                      ${message.created_at}
                    </li>
                  </ul>
                  <div class = "main-manu__one-message-detail">
                    <p class = "main-manu__one-message-detail--content">
                      ${message.content}
                    </p>
                    ${img}
                  </div>
                </div>`
      return html
  }

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
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
      var html = buildHTML(data);
      $('.main-manu__message').append(html)

      var scroll = $('.main-manu__message')[0].scrollHeight;
      $(`.main-manu__message`).animate({scrollTop: scroll}, 'fast')

      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('コメントを入力してください');
      $('#new_message')[0].reset();
    });
  });
});
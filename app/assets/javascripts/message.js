$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var img = message.image ? `<img class = "main-manu__one-message-detail--image" src="${message.image}">` : '';
    var html = `<div class = "main-manu__one-message" data-message-num = "${message.id}", data-group-num = "${message.group_id}">
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

      $('.main-manu__submission-form-text').val('')
      $('.main-manu__submission-form-image-upload').val('')
      $('.main-manu__submission-form-submit').removeAttr('disabled')
    })
    .fail(function(){
      alert('コメントを入力してください');
      $('.main-manu__submission-form-text').val('')
      $('.main-manu__submission-form-image-upload').val('')
      $('.main-manu__submission-form-submit').removeAttr('disabled')
    });
  });
  var reloadMessages = function() {
    if(document.URL.match(/messages/)) {
      var last_message_id = $(".main-manu__one-message:last").data('messageNum');
      var group_id = $(".main-manu__one-message").data('groupNum');
      $.ajax({
        url: `/groups/${group_id}/api/messages`,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        messages.forEach(function(message){
          var insertHTML = buildHTML(message)
          $('.main-manu__message').append(insertHTML)
          var scroll = $('.main-manu__message')[0].scrollHeight;
          $(`.main-manu__message`).animate({scrollTop: scroll}, 'fast')
        })
      })
      .fail(function() {
      });
    };
  };
  setInterval(reloadMessages, 5000);
})
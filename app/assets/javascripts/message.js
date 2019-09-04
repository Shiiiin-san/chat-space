$(function(){
  function buildHTML(message){
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
                    ${message.image}
                  </div>
                </div>`
    return html;
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
      console.log(data);
      var html = buildHTML(data);
      $('.main-manu__message').append(html)
      $('.main-manu__submission-form-text').val('')
    })
    .fail(function(){
      alert('error');
    });
  });
});
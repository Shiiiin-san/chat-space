$(function() {

  var user_list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    user_list.append(html);
  }
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">${ msg }</div>`
    user_list.append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致する名前はありません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  var member_list = $(".js-chat-member");

  $(document).on("click", ".chat-group-user__btn--add", function () {
    var new_member_id = $(this).attr("data-user-id")
    var new_member_name = $(this).attr("data-user-name")
    $(this).parent().remove();
    var html_member = `<div class='chat-group-user'>
                        <input name='group[user_ids][]' type='hidden' value='${new_member_id}'>
                        <p class='chat-group-user__name'>${new_member_name}</p>
                        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                      </div>`
    member_list.append(html_member);
  })
  $(document).on("click", ".chat-group-user__btn--remove", function () {
    $(this).parent().remove();
  })
});
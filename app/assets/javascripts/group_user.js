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
    console.log(input);
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users)
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
  $(document).on("click", ".chat-group-user__btn--add", function () {
    var new_member_id = $(this).attr("data-user-id")
    var new_member_name = $(this).attr("data-user-name")
    console.log(new_member_id)
    console.log(new_member_name)
    $(this).parent().remove();
    // $.ajax({
    //   type: 'GET',
    //   url: '/users',
    //   data: { keyword: input },
    //   dataType: 'json'
    // })
  })
});
$.validator.setDefaults({
  submitHandler: function() {
    alert("提交事件!");
  }
});

$().ready(function() {
  // 提交时验证表单
  var validator = $("#register").validate({
    errorPlacement: function(error, element) {
      element.closest(".form-group").append(error);
    },
    errorElement: "div",
    errorClass: "text-danger",
    messages: {
      username: {
        required: " (必需字段)",
        minlength: " (不能少于 3 个字母)"
      },
      password: {
        required: " (必需字段)",
        minlength: " (字母不能少于 5 个且不能大于 12 个)",
        maxlength: " (字母不能少于 5 个且不能大于 12 个)"
      }
    }
  });

  $(".cancel").click(function() {
    validator.resetForm();
  });
});

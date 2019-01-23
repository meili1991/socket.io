$(() => {
  //点击登录跳转到登陆页面
  $("#login").click(() => {
    $(location).attr("href", "../login/login.html");
  });
  //点击注册跳转到注册页面
  $("#register").click(() => {
    $(location).attr("href", "../register/register.html");
  });
});

let submit = document.getElementById("submit");
let ERR = $("#error");
let SUCC = $("#success");

submit.onsubmit = function (e) {
  e.preventDefault();
  let userName = document.getElementById("username").value;
  let Password = document.getElementById("password").value;

  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: "/",
      data: {
        username: `${userName}`,
        password: `${Password}`,
      },
      contentType: "application/JSON",
      dataType: "text",
      success: function (response) {
        SUCC.html(response);
        SUCC.fadeIn(800);
        ERR.fadeOut();
      },
      error: function (req, status, error) {
        if (error) {
          ERR.html("کاربری با مشخصات وارد شده یافت نشد.");
        }

        ERR.fadeIn(800);
        SUCC.fadeOut();
      },
    });
  });
};

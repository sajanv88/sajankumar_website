"use strict";
$(document).ready(function onReady() {
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  let fullName, email, message, sendMessage, alertBox;
  fullName = $("#name");
  email = $("#email");
  message = $("#message");
  (sendMessage = $("#sendMessage")), (alertBox = $("#alertBox"));

  const inputs = [fullName, email, message];
  alertBox.hide();
  sendMessage.on("click", function onSendMessageHandler() {
    const isValid = inputs.every(input => input.val());
    email.addClass("u-error-border");
    if (!isValid) {
      const elems = inputs.filter(input => !input.val());
      if (elems.length > 0) {
        elems.forEach(function onFilterNonFilled(input) {
          input.removeClass("u-error-border").addClass("u-error-border");
        });
      }
    } else {
      inputs.forEach(function removeAllErrors(input) {
        input.removeClass("u-error-border");
      });

      const opts = {
        fullName: fullName.val(),
        email: email.val(),
        message: message.val()
      };
      fetch("/api/send-message", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(opts)
      })
        .then(function onRes(response) {
          return response.json();
        })
        .then(function onData(data) {
          console.log(data);
          alertBox.show();
          setTimeout(function onTimeout() {
            alertBox.hide();
            inputs.forEach(function removeAllErrors(input) {
              input.val("");
            });
          }, 3000);
        });
    }
  });

  // navigations
  $("#ulList").on("click", function onNavigation(e) {
    const { name } = e.target;
    if (name !== "resume") {
      $("#navi-toggle").prop("checked", false);
      $("html, body").animate(
        {
          scrollTop: $(`#${name}`).offset().top + 40
        },
        1000
      );
    }
  });

  $("#findMore").on("click", function onFindMoreHandler(e) {
    $("html, body").animate(
      {
        scrollTop: $("#aboutme").offset().top + 40
      },
      1000
    );
  });
});

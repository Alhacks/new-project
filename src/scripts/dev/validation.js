(function () {
  "use strict";
  if (typeof $ === "undefined" || !$.validator) return;

  $.extend($.validator.messages, {
    required: "Это поле обязательно",
    remote: "Пожалуйста, введите правильное значение",
    email: "Пожалуйста, введите корректный e-mail",
    url: "Пожалуйста, введите корректный URL",
    date: "Пожалуйста, введите корректную дату",
    dateISO: "Пожалуйста, введите дату в формате ISO",
    number: "Пожалуйста, введите число",
    digits: "Пожалуйста, вводите только цифры",
    equalTo: "Значения не совпадают",
    maxlength: $.validator.format("Введите не больше {0} символов"),
    minlength: $.validator.format("Введите не меньше {0} символов"),
    rangelength: $.validator.format("Введите от {0} до {1} символов"),
    range: $.validator.format("Введите число от {0} до {1}"),
    max: $.validator.format("Введите число не больше {0}"),
    min: $.validator.format("Введите число не меньше {0}")
  });

  // Пример собственного метода из лекции 12.
  $.validator.addMethod("email", function (value, element) {
    return this.optional(element) || /^[-\w.]+@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,6}$/.test(value);
  }, "Введите корректный e-mail");

  const errorPlacement = function (error, element) {
    // Selectric и наши чекбоксы скрывают исходные элементы.
    // Поэтому выводим сообщение в видимый контейнер поля.
    if (element.hasClass("check__input")) {
      error.appendTo(element.closest(".check"));
    } else {
      error.appendTo(element.closest(".field"));
    }
  };

  const eventForm = $("#js-eventForm");
  if (eventForm.length) {
    eventForm.validate({
      errorElement: "span",
      ignore: ":hidden:not(.js-selectric):not(.check__input)",
      errorPlacement: errorPlacement,
      rules: { phone: { minlength: 18 } },
      messages: { phone: { minlength: "Введите телефон полностью" } },
      submitHandler: function (form, event) {
        event.preventDefault();
        $("#js-eventMessage").text("Поля заполнены правильно. Это учебная форма: заявка не отправляется.");
      },
      invalidHandler: function () { $("#js-eventMessage").text(""); }
    });
    eventForm.on("input change", function () { $("#js-eventMessage").text(""); });
    eventForm.find(".js-selectric").on("change", function () { $(this).valid(); });
  }

  const subscribeForm = $("#js-subscribeForm");
  if (subscribeForm.length) {
    const subscribeAction = subscribeForm.attr("action");
    const subscribeEmail = subscribeForm.find("#js-subscribeEmail");
    const subscribeMessage = $("#js-subscribeMessage");
    const subscribeSubmit = subscribeForm.find('[type="submit"]');

    subscribeForm.validate({
      errorElement: "span",
      ignore: ":hidden:not(.check__input)",
      errorPlacement: errorPlacement,
      submitHandler: function (form, event) {
        event.preventDefault();
        subscribeMessage.text("Отправляем учебный запрос…");
        subscribeSubmit.prop("disabled", true);

        // Тестовый адрес из лекции: настоящей рассылки у него нет.
        $.ajax({
          url: subscribeAction,
          method: "POST",
          data: { email: subscribeEmail.val() },
          success: function () {
            subscribeEmail.blur();
            subscribeEmail.val("");
            subscribeForm.data("validator").resetForm();
            subscribeMessage.text("Учебный запрос отправлен. Настоящая подписка не оформляется.");
          },
          error: function () {
            subscribeMessage.text("Запрос не отправлен. Попробуйте ещё раз.");
          },
          complete: function () { subscribeSubmit.prop("disabled", false); }
        });
      }
    });
    subscribeForm.on("input change", function () { subscribeMessage.text(""); });
  }
})();

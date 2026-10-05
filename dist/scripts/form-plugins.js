(function () {
  "use strict";

  const jsSelectric = $(".js-selectric");
  if (jsSelectric.length) {
    jsSelectric.selectric({ nativeOnMobile: false, disableOnMobile: false });
  }

  const mobileMask = $(".js-mobileMask");
  if (mobileMask.length) {
    mobileMask.mask("+7 (000) 000 00 00", {
      placeholder: "+7 (___) ___ __ __"
    });
  }

  const dateField = $(".js-dateField");
  if (dateField.length) {
    const pickerInit = function (pick) {
      const dateInput = pick.find(".js-dateInput");
      const dateDay = pick.find(".js-dateDay");
      const dateMonth = pick.find(".js-dateMonth");
      const dateYear = pick.find(".js-dateYear");

      new AirDatepicker(dateInput[0], {
        autoClose: true,
        minDate: new Date(),
        navTitles: { days: "MMMM <i>yyyy</i>" },
        onSelect: function ({ date }) {
          dateDay.val(date ? ("0" + date.getDate()).slice(-2) : "");
          dateMonth.val(date ? ("0" + (date.getMonth() + 1)).slice(-2) : "");
          dateYear.val(date ? date.getFullYear() : "");
          // Повторно проверяем поле после выбора даты в календаре.
          if (dateInput.closest("form").data("validator")) dateInput.valid();
        }
      });
    };
    $.each(dateField, function () { pickerInit($(this)); });
  }
})();

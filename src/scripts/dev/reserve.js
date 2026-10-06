(function () {
  "use strict";
  const reserveForm = $("#js-reserveForm");
  if (!reserveForm.length || !$.validator) return;
  const checks = reserveForm.find(".js-reserveCheck");
  const tables = reserveForm.find(".js-reserveTable");
  const formatPrice = function (value) {
    return value.toLocaleString("ru-RU") + " ₽";
  };
  const updateOrder = function () {
    let red = 0;
    let black = 0;
    checks.each(function () {
      tables
        .filter('[data-table="' + this.name + '"]')
        .toggleClass("tcolor--selected", this.checked && !this.disabled);
      if (this.checked && !this.disabled) {
        const table = tables.filter('[data-table="' + this.name + '"]');
        const seats = table.find(".js-reservePlace").length;
        if (Number(table.attr("data-price")) === 1400) red += seats;
        else black += seats;
      }
    });
    reserveForm
      .find(".js-orderDetails")
      .eq(0)
      .text(red + " шт. | 1400 ₽");
    reserveForm
      .find(".js-orderDetails")
      .eq(1)
      .text(black + " шт. | 1250 ₽");
    reserveForm
      .find(".js-orderPrice")
      .eq(0)
      .text(formatPrice(red * 1400));
    reserveForm
      .find(".js-orderPrice")
      .eq(1)
      .text(formatPrice(black * 1250));
    $("#js-orderTotal").text(formatPrice(red * 1400 + black * 1250));
    $("#js-reserveSelection").val(red + black ? "selected" : "");
    $("#js-reserveMessage").text("");
  };
  checks.on("change", updateOrder);
  updateOrder();
  reserveForm.validate({
    ignore: ":hidden:not(#js-reserveSelection)",
    rules: { tables: { required: true } },
    messages: { tables: { required: "Выберите хотя бы один столик" } },
    errorElement: "span",
    errorPlacement: function (error) {
      error.addClass("order__error").insertBefore(reserveForm.find('[type="submit"]'));
    },
    submitHandler: function (form, event) {
      event.preventDefault();
      $("#js-reserveMessage").text("Столики выбраны. Оплата в учебном проекте не подключена.");
    },
  });
})();

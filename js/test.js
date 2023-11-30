if (totalAmount % 10 === 1 && totalAmount !== 11) {
    blockForPrice.querySelector(".section-total-top__item-amount").innerHTML =
      `${totalAmount}` + " " + "товар";
  } else if (
    (totalAmount % 10 === 2 ||
      totalAmount % 10 === 3 ||
      totalAmount % 10 == 4) &&
    (totalAmount !== 12 || totalAmount !== 13 || totalAmount !== 14)
  ) {
    blockForPrice.querySelector(".section-total-top__item-amount").innerHTML =
      `${totalAmount}` + " " + "товара";
  } else {
    blockForPrice.querySelector(".section-total-top__item-amount").innerHTML =
      `${totalAmount}` + " " + "товаров";
  }

  totalPrice.innerHTML = makeStrfromNumber(totalSumm) + " " + "сом";
  blockForPrice.querySelector(
    ".section-total-top__item-prev-price"
  ).innerHTML = makeStrfromNumber(totalPreviousSumm) + " " + "сом";
  blockForPrice.querySelector(".section-total-top__item-discount").innerHTML =
    "−" + makeStrfromNumber(totalDiscount) + " " + "сом";

  if (payNowCheck.checked) {
    oderBtn.innerHTML = "Оплатить" + " " + `${totalPrice.innerHTML}`;
  }
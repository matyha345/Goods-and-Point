document.addEventListener("DOMContentLoaded", () => {
  const blockSectionAccordion = document.querySelector(".section__accordion");

  const listelementIsAvailable = document.querySelector(
    ".section__accordion-available"
  );
  const listItemsEnded = document.querySelector(".section__accordion-ended");
  const blockForPrice = document.querySelector(".section__total-header");
  const blocksDeliveryPhotos = document.querySelectorAll(
    ".section__days-element"
  );
  const elementIsAvailable = blockSectionAccordion.querySelectorAll(
    ".section__cards-inner--remain"
  );

  let mainPrices = [];

  for (let i = 0; i < elementIsAvailable.length; i++) {
    let elementAmount = parseInt(
      elementIsAvailable[i].querySelector(".sections__quantity-number").innerHTML
    );
    let itemTotalPrice = parseInt(
      elementIsAvailable[i]
        .querySelector(".section__discount-inner")
        .innerHTML.split(" ")
        .join("")
    );
    let itemPreviosTotalPrice = parseInt(
      elementIsAvailable[i]
        .querySelector(".section__prices-price")
        .innerHTML.split(" ")
        .join("")
    );

    let elementPrice = parseFloat((itemTotalPrice / elementAmount).toFixed(3));
    let elementPreviosPrice = parseFloat(
      (itemPreviosTotalPrice / elementAmount).toFixed(3)
    );
    let itemDiscount = elementPreviosPrice - elementPrice;

    mainPrices.push({
      elementPrice: elementPrice,
      elementPreviosPrice: elementPreviosPrice,
      itemDiscount: itemDiscount,
    });
  }

  // ============= Accordion ============= // ============= Accordion =============
  // ============= Accordion ============= // ============= Accordion =============

  const accordionHeaders = document.querySelectorAll(
    ".section__accordion-header"
  );

  accordionHeaders.forEach(function (accordionHeader) {
    accordionHeader.addEventListener("click", function () {
      accordionHeader.parentNode
        .querySelector(".section__accordion-cards")
        .classList.toggle("isSetActive");
      accordionHeader
        .querySelector(".section__accordion-icon")
        .classList.toggle("section__icon-active");
      if (accordionHeader.querySelector(".section__header-checkbox")) {
        accordionHeader
          .querySelector(".section__accordion-blok")
          .classList.toggle("isSetActive");
        accordionHeader
          .querySelector(".section__accordion-blok--header-text")
          .classList.toggle("isSetActive");

        let totalSumm = 0;
        let totalAmount = 0;

        for (let i = 0; i < elementIsAvailable.length; i++) {
          if (
            elementIsAvailable[i].classList.contains("section__cards-inner--remain")
          ) {
            const elementAmount = parseInt(
              elementIsAvailable[i].querySelector(".sections__quantity-number")
                .innerHTML
            );
            const elementPrice = mainPrices[i].elementPrice;
            console.log(elementPrice);
            totalAmount += elementAmount;
            totalSumm += elementAmount * elementPrice;
            console.log(totalSumm);
          }
        }

        if (totalAmount % 10 === 1 && totalAmount !== 11) {
          accordionHeader.querySelector(
            ".section__accordion-blok--header-text"
          ).innerHTML =
            `${totalAmount}` +
            "" +
            "товар" +
            "." +
            makeStrfromNumber(parseFloat(totalSumm.toFixed(3))) +
            " " +
            "сом";
        } else if (
          (totalAmount % 10 === 2 ||
            totalAmount % 10 === 3 ||
            totalAmount % 10 == 4) &&
          (totalAmount !== 12 || totalAmount !== 13 || totalAmount !== 14)
        ) {
          accordionHeader.querySelector(
            ".section__accordion-blok--header-text"
          ).innerHTML =
            `${totalAmount}` +
            " " +
            "товара" +
            " · " +
            makeStrfromNumber(parseFloat(totalSumm.toFixed(3))) +
            " " +
            "сом";
        } else {
          accordionHeader.querySelector(
            ".section__accordion-blok--header-text"
          ).innerHTML =
            `${totalAmount}` +
            " " +
            "товаров" +
            " · " +
            makeStrfromNumber(parseFloat(totalSumm.toFixed(3))) +
            " " +
            "сом";
        }
      }
    });
  });



  const btnsMinus = document.querySelectorAll(".sections__quantity-minus");
  const btnsPlus = document.querySelectorAll(".sections__quantity-plus");

  btnsMinus.forEach(function (btnMinus) {
    btnMinus.addEventListener("click", function () {
      let count = parseInt(
        btnMinus.parentNode.querySelector(".sections__quantity-number")
          .innerHTML
      );

      let btnPlus = btnMinus.parentNode.querySelector(
        ".sections__quantity-plus"
      );

      if (count > 1) {
        let newCount = count - 1;
        if (newCount === 1) {
          btnMinus.classList.remove("btn-active");
        }
        btnMinus.parentNode.querySelector(
          ".sections__quantity-number"
        ).innerHTML = `${newCount}`;
        btnPlus.classList.add("btn-active");
      } else {
        btnMinus.parentNode.querySelector(
          ".sections__quantity-number"
        ).innerHTML = "1";
        btnMinus.classList.remove("btn-active");
      }
      calculateTotalPrice();
    });
  });

  btnsPlus.forEach(function (btnPlus) {
    btnPlus.addEventListener("click", function () {
      let count = parseInt(
        btnPlus.parentNode.querySelector(".sections__quantity-number").innerHTML
      );
      let btnMinus = btnPlus.parentNode.querySelector(
        ".sections__quantity-minus"
      );
      let newCount = count + 1;
      if (
        btnPlus.parentNode.parentNode.querySelector(
          ".sections__amount-balance span"
        )
      ) {
        let str = btnPlus.parentNode.parentNode.querySelector(
          ".sections__amount-balance span"
        ).innerHTML;
        for (let el of str.trim().split(" ")) {
          if (!isNaN(parseInt(el)) && count === el - 1) {
            btnPlus.classList.remove("btn-active");
            btnPlus.parentNode.querySelector(
              ".sections__quantity-number"
            ).innerHTML = `${newCount}`;
            btnMinus.classList.add("btn-active");
          } else if (!isNaN(parseInt(el)) && count < el - 1) {
            btnPlus.parentNode.querySelector(
              ".sections__quantity-number"
            ).innerHTML = `${newCount}`;
            btnMinus.classList.add("btn-active");
          }
        }
      } else {
        btnPlus.parentNode.querySelector(
          ".sections__quantity-number"
        ).innerHTML = `${newCount}`;
        btnMinus.classList.add("btn-active");
      }
      calculateTotalPrice();
    });
  });


  const checkAll = document.getElementById("check-all");
  const checkboxes = document.querySelectorAll(
    ".section__cards-checkbox--default"
  );

  const totalAmountCheckbox = checkboxes.length;

  checkAll.addEventListener("click", function () {
    if (this.checked) {
      checkboxes.forEach(function (el) {
        el.checked = true;
      });
      calculateTotalPrice();
    }
  });

  checkboxes.forEach(function (el) {
    el.addEventListener("click", () => {
      let uncheckAmount = 0;

      for (let checkbox of checkboxes) {
        if (!checkbox.checked) {
          uncheckAmount++;
        }
      }
      if (totalAmountCheckbox === uncheckAmount) {
        checkAll.checked = false;
      }
      calculateTotalPrice();
    });
  });

  document.querySelectorAll(".sections__icons-love").forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("sections__icons-love--active");
    });
  });

  const payNowCheck = document.getElementById("pay-now");
  const oderBtn = document.querySelector(".section__pay-btn");
  const totalPrice = document.querySelector(".section__price-number");

  payNowCheck.addEventListener("click", () => {
    if (payNowCheck.checked) {
      oderBtn.innerHTML = "Оплатить" + " " + `${totalPrice.innerHTML}`;
    } else {
      oderBtn.innerHTML = "Заказать";
    }
  });

  const nameInput = document.getElementById("name");
  const surnameInput = document.getElementById("surname");
  const emailInput = document.getElementById("email");
  const telInput = document.getElementById("tel");
  const indexInput = document.getElementById("index");

  const massInputs = [
    nameInput,
    surnameInput,
    emailInput,
    telInput,
    indexInput,
  ];

  if (window.screen.availWidth < 685) {
    emailInput.parentNode.querySelector(
      ".section__recipient-form__label"
    ).innerHTML = "Электронная почта";
  }
  window.addEventListener("resize", () => {
    if (window.screen.availWidth < 685) {
      emailInput.parentNode.querySelector(
        ".section__recipient-form__label"
      ).innerHTML = "Электронная почта";
    }
  });
  telInput.addEventListener("focus", function () {
    if (!this.value.trim()) {
      this.value = "+";
    }
  });
  telInput.addEventListener("blur", function () {
    if (this.value.trim().length === 1) {
      this.value = "";
    }
  });
  telInput.addEventListener("keypress", function () {
    if (this.value.length === 18) {
      this.value = this.value + " ";
    }
  });
  telInput.addEventListener("keypress", function () {
    if (this.value.length === 2) {
      this.value = this.value + " (";
    }
  });
  telInput.addEventListener("keypress", function () {
    if (this.value.length === 7) {
      this.value = this.value + ") ";
    }
  });
  telInput.addEventListener("keypress", function () {
    if (this.value.length === 12 || this.value.length === 15) {
      this.value = this.value + "-";
    }
  });

  for (let i in massInputs) {
    massInputs[i].addEventListener("blur", () => {
      if (massInputs[i].value) {
        massInputs[i].parentNode
          .querySelector(".section__recipient-form__label")
          .classList.add("section__recipient-form__label-top");
      } else {
        massInputs[i].parentNode
          .querySelector(".section__recipient-form__label")
          .classList.remove("section__recipient-form__label-top");
      }
    });
  }
  oderBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const surname = surnameInput.value.trim();
    const email = emailInput.value.trim();
    const tel = telInput.value.trim();
    const index = indexInput.value.trim();

    let massErrors = [];

    massErrors.push(errorsInName(name));
    massErrors.push(errorsInSurname(surname));
    massErrors.push(errorsInEmail(email));
    massErrors.push(errorsInTel(tel));
    massErrors.push(errorsInIndex(index));

    for (let i in massErrors) {
      manageErrorElement(massErrors[i], i);
    }

    for (let i in massErrors) {
      if (massErrors[i]) {
        location.href = "#" + massInputs[i].id;
        break;
      }
    }
  });

  for (let i in massInputs) {
    massInputs[i].addEventListener("blur", function () {
      if (this.value.trim()) {
        hangListenerOnInput(this.value.trim(), i);
      }
    });
    massInputs[i].addEventListener("keyup", function () {
      if (
        massInputs[i].parentNode.querySelector(
          ".section__recipient-form__error"
        )
      ) {
        hangListenerOnInput(this.value.trim(), i);
      }
    });
  }

  const deleteItemBtn = document.querySelectorAll(".sections__icons-basket");
  const cartBtnHeader = document.querySelector(".header__wrapper-basket");
  const cartBtnFooter = document.querySelector(".footer__icons-basket");

  deleteItemBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      const path = e.currentTarget.dataset.path;
      document
        .querySelector(`[data-target="${path}"]`)
        .classList.add("isSetActive");

      if (
        document
          .querySelector(`[data-target="${path}"]`)
          .classList.contains("section__inner--item-remain")
      ) {
        document
          .querySelector(`[data-target="${path}"]`)
          .classList.remove("section__inner--item-remain");
        let cartAmountItems = [];
        cartAmountItems.push(
          cartBtnHeader.querySelector(".cart__amount-items")
        );
        cartAmountItems.push(
          cartBtnFooter.querySelector(".cart__amount-items")
        );

        for (i in cartAmountItems) {
          cartAmountItems[i].innerHTML = `${
            parseInt(cartAmountItems[i].innerHTML) - 1
          }`;
          if (parseInt(cartAmountItems[i].innerHTML) === 0) {
            cartAmountItems[i].classList.add("isSetActive");
          }
        }
      } else if (
        document
          .querySelector(`[data-target="${path}"]`)
          .classList.contains("section__accordion-ended__inner")
      ) {
        document
          .querySelector(`[data-target="${path}"]`)
          .classList.remove("section__accordion-ended__inner");
        const count = listItemsEnded.querySelectorAll(
          ".section__accordion-ended__inner"
        ).length;
        if (count % 10 === 1 && count !== 11) {
          document
            .querySelector(`[data-target="${path}"]`)
            .parentNode.previousElementSibling.querySelector(
              ".section__accordion-blok--header-text-two"
            ).innerHTML = "Отсутствует · " + `${count}` + " товар";
        } else if (
          (count % 10 === 2 || count % 10 === 3 || count % 10 == 4) &&
          (count !== 12 || count !== 13 || count !== 14)
        ) {
          document
            .querySelector(`[data-target="${path}"]`)
            .parentNode.previousElementSibling.previousElementSibling.querySelector(
              ".section__accordion-blok--header-text-two"
            ).innerHTML = "Отсутствуют · " + `${count}` + " товара";
        } else {
          document
            .querySelector(`[data-target="${path}"]`)
            .parentNode.previousElementSibling.previousElementSibling.querySelector(
              ".section__accordion-blok--header-text-two"
            ).innerHTML = "Отсутствует · " + `${count}` + " товаров";
        }
      }
      calculateTotalPrice();
    });
  });

  function hangListenerOnInput(value, i) {
    switch (i) {
      case "0":
        manageErrorElement(errorsInName(value), i);
        break;
      case "1":
        manageErrorElement(errorsInSurname(value), i);
        break;
      case "2":
        manageErrorElement(errorsInEmail(value), i);
        break;
      case "3":
        manageErrorElement(errorsInTel(value), i);
        break;
      case "4":
        manageErrorElement(errorsInIndex(value), i);
        break;
    }
  }

  function manageErrorElement(error, i) {
    if (error) {
      if (
        massInputs[i].parentNode.querySelector(
          ".section__recipient-form__error"
        )
      ) {
        massInputs[i].parentNode
          .querySelector(".section__recipient-form__error")
          .classList.remove("isSetActive");
        massInputs[i].parentNode.querySelector(
          ".section__recipient-form__error"
        ).innerHTML = error;
      } else {
        let textError = document.createElement("span");
        textError.classList.add("section__recipient-form__error");
        if (
          massInputs[i].parentNode.querySelector(
            ".section__recipient-form__info"
          )
        ) {
          textError.classList.add("section__recipient-form__error-index");
        }
        textError.innerHTML = error;
        massInputs[i].parentNode.append(textError);
      }
      massInputs[i].classList.add("section__recipient-form__input-wrong");
    } else {
      if (
        massInputs[i].parentNode.querySelector(
          ".section__recipient-form__error"
        )
      ) {
        massInputs[i].parentNode
          .querySelector(".section__recipient-form__error")
          .classList.add("isSetActive");
        massInputs[i].classList.remove("section__recipient-form__input-wrong");
      }
    }
  }

  function errorsInName(name) {
    let textErrorName = "";
    if (!name) {
      textErrorName = "Укажите имя";
    } else if (/[^a-z]/i.test(name) && /[^а-я]/i.test(name)) {
      textErrorName = "Имя может сожержать только буквы";
    }
    return textErrorName;
  }

  function errorsInSurname(surname) {
    let textErrorSurname = "";
    if (!surname) {
      textErrorSurname = "Введите фамилию";
    } else if (/[^a-z]/i.test(surname) && /[^а-я]/i.test(surname)) {
      textErrorSurname = "Фамилия может сожержать только буквы";
    }
    return textErrorSurname;
  }
  function errorsInEmail(email) {
    let textErrorEmail = "";
    if (!email) {
      textErrorEmail = "Укажите электронную почту";
    } else if (!validateEmail(email)) {
      textErrorEmail = "Проверьте адрес электронной почты";
    }
    return textErrorEmail;
  }
  function errorsInTel(tel) {
    let textErrorTel = "";
    if (!tel) {
      textErrorTel = "Укажите номер телефона";
    } else if (!validateTel(tel)) {
      textErrorTel = "Формат: +9 (999) 999-99-99";
    }
    return textErrorTel;
  }
  function errorsInIndex(index) {
    let textErrorIndex = "";
    if (!index) {
      textErrorIndex = "Укажите индекс";
    } else if (index.length > 10) {
      textErrorIndex = "Индекс не может быть длинне 10 цифр";
    } else if (!validateIndex(index)) {
      textErrorIndex = "Формат: 123456";
    }
    return textErrorIndex;
  }
  function validateEmail(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
  function validateTel(tel) {
    return tel.match(
      /^[+][0-9][\s][(][0-9]{3}[)][\s][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/
    );
  }
  function validateIndex(index) {
    return index.match(/^([0-9]{6}|[0-9]{7}|[0-9]{8}|[0-9]{9}|[0-9]{10})$/);
  }

  function calculateTotalPrice() {
    let totalSumm = 0;
    let totalPreviousSumm = 0;
    let totalDiscount = 0;
    let totalAmount = 0;

    for (let i = 0; i < elementIsAvailable.length; i++) {
      if (
        elementIsAvailable[i].classList.contains("section__cards-inner--remain")
      ) {
        if (
          elementIsAvailable[i].querySelector(".section__cards-checkbox--default")
            .checked
        ) {
          const elementAmount = parseInt(
            elementIsAvailable[i].querySelector(".sections__quantity-number")
              .innerHTML
          );
          const totalelementPrice = parseFloat(
            (elementAmount * mainPrices[i].elementPrice).toFixed(3)
          );
          const totalelementPreviosPrice = parseFloat(
            (elementAmount * mainPrices[i].elementPreviosPrice).toFixed(3)
          );

          totalSumm += totalelementPrice;
          totalPreviousSumm += totalelementPreviosPrice;
          totalAmount += elementAmount;
          totalDiscount += elementAmount * mainPrices[i].itemDiscount;

          const totalelementPriceText = elementIsAvailable[i].querySelector(
            ".section__discount-inner"
          );

          totalelementPriceText.innerHTML = makeStrfromNumber(totalelementPrice);
          elementIsAvailable[i].querySelector(".section__prices-price").innerHTML =
            makeStrfromNumber(totalelementPreviosPrice) + " " + "сом";

          if (window.screen.availWidth < 900) {
            if (totalelementPriceText.innerHTML.length > 10) {
              totalelementPriceText.parentNode.parentNode.classList.add("column");

              elementIsAvailable[i]
                .querySelector(".section__card-descriptions__remain-content")
                .classList.add("column-padding");
            } else {
              totalelementPriceText.parentNode.parentNode.classList.remove(
                "column"
              );
              elementIsAvailable[i]
                .querySelector(".section__card-descriptions__remain-content")
                .classList.remove("column-padding");
            }
          } else {
            totalPrice.classList.remove(
              "section__total-top__total-price-small"
            );
            totalelementPriceText.parentNode.parentNode.classList.remove("column");
            elementIsAvailable[i]
              .querySelector(".section__card-descriptions__remain-content")
              .classList.remove("column-padding");
            if (totalelementPriceText.innerHTML.length > 12) {
              totalelementPriceText.classList.add(
                "section__discount-inner__item-price-number-too-big"
              );
            } else if (totalelementPriceText.innerHTML.length > 6) {
              totalelementPriceText.classList.add(
                "section__discount-inner__item-price-number-big"
              );
              totalelementPriceText.classList.remove(
                "section__discount-inner__item-price-number-too-big"
              );
            } else {
              totalelementPriceText.classList.remove(
                "section__discount-inner__item-price-number-big"
              );
            }
          }
        }
      }
    }

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
    calculateAmountInDilivery();
  }

  function makeStrfromNumber(number) {
    const masNumber = `${number}`.split("");
    let strNumber = "";
    let count = 0;

    for (let i in masNumber) {
      if (count % 3 === 0 && masNumber[masNumber.length - 1 - i] !== ".") {
        strNumber += " ";
      }
      if (masNumber[masNumber.length - 1 - i] === ".") {
        count = 0;
      } else {
        count++;
      }
      strNumber += `${masNumber[masNumber.length - 1 - i]}`;
    }

    const resultStr = strNumber.split("").reverse().join("");
    return resultStr;
  }

  function calculateAmountInDilivery() {
    const deliveryDay = document.querySelector(".section__delivery-date");
    blocksDeliveryPhotos[0].parentNode.classList.remove("isSetActive");
    blocksDeliveryPhotos[1].parentNode.classList.remove("isSetActive");
    blocksDeliveryPhotos[0].parentNode.previousElementSibling.style.marginBottom =
      "";
    blocksDeliveryPhotos[1].parentNode.previousElementSibling.style.marginBottom =
      "";
    blocksDeliveryPhotos[0].parentNode.parentNode.style.marginBottom = "";
    // blocksDeliveryPhotos[0].parentNode.parentNode.nextElementSibling.classList.remove(
    //   "isSetActive"
    // );
    deliveryDay.classList.remove("isSetActive");
    deliveryDay.innerHTML = "7-8 фев";
    let countBottom = 0;
    let countTop = 0;
    listelementIsAvailable
      .querySelectorAll(".section__cards-inner--remain")
      .forEach(function (el) {
        let itemImg = el
          .querySelector(".section__card-images")
          .getElementsByTagName("img")[0];
        let elementAmount = parseInt(
          el.querySelector(".sections__quantity-number").innerHTML
        );
        let itemSrc = itemImg.getAttribute("src");

        let imgDeliveryBlockTop = blocksDeliveryPhotos[0].querySelector(
          `[src='${itemSrc}']`
        );
        let imgDeliveryBlockBottom = blocksDeliveryPhotos[1].querySelector(
          `[src='${itemSrc}']`
        );

        if (el.querySelector(".section__cards-checkbox--default").checked) {
          countTop++;
          imgDeliveryBlockTop.parentNode.classList.remove("isSetActive");
          if (imgDeliveryBlockBottom) {
            imgDeliveryBlockBottom.parentNode.classList.remove("isSetActive");
          }

          if (elementAmount === 1) {
            imgDeliveryBlockTop.parentNode
              .querySelector(".section__days-img__amount")
              .classList.add("isSetActive");
          } else {
            imgDeliveryBlockTop.parentNode
              .querySelector(".section__days-img__amount")
              .classList.remove("isSetActive");
          }
          if (elementAmount > 184) {
            imgDeliveryBlockTop.parentNode.querySelector(
              ".section__days-img__amount"
            ).innerHTML = `184`;
            if (elementAmount - 184 === 1) {
              imgDeliveryBlockBottom.parentNode
                .querySelector(".section__days-img__amount")
                .classList.add("isSetActive");
            } else {
              imgDeliveryBlockBottom.parentNode
                .querySelector(".section__days-img__amount")
                .classList.remove("isSetActive");
              imgDeliveryBlockBottom.parentNode.querySelector(
                ".section__days-img__amount"
              ).innerHTML = `${elementAmount - 184}`;
            }
            countBottom++;
          } else {
            imgDeliveryBlockTop.parentNode.querySelector(
              ".section__days-img__amount"
            ).innerHTML = `${elementAmount}`;
          }
        } else {
          imgDeliveryBlockTop.parentNode.classList.add("isSetActive");
          if (imgDeliveryBlockBottom) {
            imgDeliveryBlockBottom.parentNode.classList.add("isSetActive");
          }
        }
      });
    if (!countTop) {
      blocksDeliveryPhotos[0].parentNode.classList.add("isSetActive");
      blocksDeliveryPhotos[0].parentNode.previousElementSibling.style.marginBottom =
        "0";
      blocksDeliveryPhotos[0].parentNode.parentNode.style.marginBottom = "0";
      blocksDeliveryPhotos[0].parentNode.parentNode.nextElementSibling.classList.add(
        "isSetActive"
      );
      deliveryDay.classList.add("isSetActive");
    }
    if (!countBottom) {
      blocksDeliveryPhotos[1].parentNode.classList.add("isSetActive");
      blocksDeliveryPhotos[1].parentNode.previousElementSibling.style.marginBottom =
        "0";
      deliveryDay.innerHTML = "5–6 фев";
    }

    listelementIsAvailable
      .querySelectorAll(".section__cards-inner.isSetActive")
      .forEach(function (el) {
        let itemImg = el
          .querySelector(".section__card-images")
          .getElementsByTagName("img")[0];
        let itemSrc = itemImg.getAttribute("src");

        let imgDeliveryBlockTop = blocksDeliveryPhotos[0].querySelector(
          `[src='${itemSrc}']`
        );
        let imgDeliveryBlockBottom = blocksDeliveryPhotos[1].querySelector(
          `[src='${itemSrc}']`
        );

        imgDeliveryBlockTop.parentNode.classList.add("isSetActive");
        if (imgDeliveryBlockBottom) {
          imgDeliveryBlockBottom.parentNode.classList.add("isSetActive");
        }
      });
  }

  function changeDeliverAndPickup() {
    const yWudgetСhange = document.querySelector(".yWidgetPopup__main-left");
    const yWudgetСhangeDelivery = document.querySelector(
      ".yWidgetPopup__main-right"
    );
    const contentToShowInPickup = document.querySelector(".content-pickup");
    const contentToShowByCourier = document.querySelector(".content-delivery");

    function showContentInPickup() {
      contentToShowInPickup.style.display = "block";
      contentToShowByCourier.style.display = "none";

      // Добавить/удалить класс для подсветки кнопки
      yWudgetСhange.classList.add("highlighted");
      yWudgetСhangeDelivery.classList.remove("highlighted");
    }

    function showContentByCourier() {
      contentToShowByCourier.style.display = "block";
      contentToShowInPickup.style.display = "none";

      yWudgetСhangeDelivery.classList.add("highlighted");
      yWudgetСhange.classList.remove("highlighted");
    }

    yWudgetСhange.addEventListener("click", showContentInPickup);
    yWudgetСhangeDelivery.addEventListener("click", showContentByCourier);

    yWudgetСhange.addEventListener("click", showContentInPickup);
    yWudgetСhangeDelivery.addEventListener("click", showContentByCourier);
  }

  function popupWrapper() {
    const popupLinks = document.querySelectorAll(".popup-link");
    const body = document.querySelector("body");
    const lockPadding = document.querySelectorAll(".lock-padding");

    let unlock = "true";

    const timeout = 800;

    if (popupLinks.length > 0) {
      for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function (e) {
          const popupName = popupLink.getAttribute("href").replace("#", "");
          const curentPopup = document.getElementById(popupName);
          popupOpen(curentPopup);
          e.preventDefault();
        });
      }
    }

    const popupCloseIcon = document.querySelectorAll(".close-popup");

    if (popupCloseIcon.length > 0) {
      for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener("click", function (e) {
          popupClose(el.closest(".popup"));
          e.preventDefault();
        });
      }
    }

    function popupOpen(curentPopup) {
      if (curentPopup && unlock) {
        // для доп popup (сейчас его нет)
        const popupActive = document.querySelector(".popup.open");
        if (popupActive) {
          popupClose(popupActive, false);
        } else {
          bodyLock();
        }
        curentPopup.classList.add("open");
        curentPopup.addEventListener("click", function (e) {
          if (!e.target.closest(".popup__content")) {
            popupClose(e.target.closest(".popup"));
          }
        });
      }
    }

    function popupClose(popupActive, doUnlock = true) {
      if (unlock) {
        popupActive.classList.remove("open");
        if (doUnlock) {
          bodyUnlock();
        }
      }
    }
    function bodyLock() {
      const lockPaddingValue =
        window.innerWidth -
        document.querySelector(".wrapper-popup").offsetWidth +
        "px";
      if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
          const el = lockPadding[i];
          el.style.paddingRight = lockPaddingValue;
        }
      }
      body.style.paddingRight = lockPaddingValue;
      body.classList.add("lock");

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, timeout);
    }

    function bodyUnlock() {
      setTimeout(function () {
        if (lockPadding.length > 0) {
          for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = "0px";
          }
        }
        body.style.paddingRight = "0px";
        body.classList.remove("lock");
      }, 0);
      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, timeout);
    }

    document.addEventListener("keydown", function (e) {
      if (e.which === 27) {
        const popupActive = document.querySelector(".popup.open");
        popupClose(popupActive);
      }
    });
  }

  function mediaSearchWrapper() {
    const searchButton = document.querySelector(".header__input-search");
    const searchContent = document.querySelector(
      ".header__input-inner--absolute"
    );

    searchButton.addEventListener("click", (event) => {
      const isContentVisible = searchContent.classList.contains(
        "header__input-inner--show"
      );

      if (!isContentVisible || !searchContent.contains(event.target)) {
        searchContent.classList.toggle("header__input-inner--show");
      }
    });

    document.addEventListener("click", (event) => {
      const isClickSearch = searchButton.contains(event.target);
      const isClickContent = searchContent.contains(event.target);

      if (!isClickSearch && !isClickContent) {
        searchContent.classList.remove("header__input-inner--show");
      }
    });
  }

  function HoverListenersWrapper() {
    const addHoverListeners = (triggerSelector, contentSelector) => {
      const trigger = document.querySelector(triggerSelector);
      const content = document.querySelector(contentSelector);

      const showContent = () => {
        content.style.display = "block";
      };

      const hideContent = () => {
        content.style.display = "none";
      };

      trigger.addEventListener("mouseover", showContent);
      trigger.addEventListener("mouseout", hideContent);
    };

    addHoverListeners(
      ".section__refusalReturn-title--btn",
      ".section__refusalReturn-title--content"
    );
    addHoverListeners(
      ".section__total-title--btn",
      ".section__total-title--content"
    );
  }

  const checkboxesModal = document.querySelectorAll(
    ".yWidgetPopup__inner-default"
  );

  checkboxesModal.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      checkboxesModal.forEach((cb) => {
        if (cb !== checkbox) {
          cb.checked = false;
        }
      });
      if (!checkbox.checked) {
        checkbox.checked = true;
      }
    });
  });

  changeDeliverAndPickup();
  HoverListenersWrapper();
  popupWrapper();
  mediaSearchWrapper();
  calculateTotalPrice();
});

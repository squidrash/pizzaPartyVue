import {
  helpers,
  required,
  numeric,
  minValue,
  maxValue,
  integer,
  alphaNum,
} from "@vuelidate/validators";

export function offerValidRules(typeOffer) {
  let result = new Object();
  result.name = {
    required: helpers.withMessage("Введите название", required),
  };
  result.promoCode = {
    required: helpers.withMessage("Введите промокод", required),
    alphaNum: helpers.withMessage(
      "промокод не должен содержать знаки",
      alphaNum
    ),
  };
  result.description = {
    required: helpers.withMessage("Введите описание", required),
  };
  result.typeOffer = {
    required: helpers.withMessage("Выберите тип акции", required),
  };

  if (typeOffer === "GeneralDiscount") {
    result.discount = {
      required: helpers.withMessage("Введите размер скидки", required),
      numeric: helpers.withMessage("Введите число", numeric),
      minValue: helpers.withMessage(
        () => "Минимальное значение 1",
        minValue(1)
      ),
      maxValue: helpers.withMessage(
        () => "максимальное значение 20",
        maxValue(20)
      ),
    };
    result.minOrderAmount = {
      required: helpers.withMessage(
        "Введите минимальную сумму заказа",
        required
      ),
      numeric: helpers.withMessage("Введите число", numeric),
      minValue: helpers.withMessage(
        () => "Минимальное значение 1",
        minValue(1)
      ),
    };
  }
  if (typeOffer === "ExtraDish" || typeOffer === "ThreeForPriceTwo") {
    result.mainDish = {
      required: helpers.withMessage("Выберите блюдо", required),
    };
    result.requiredNumberOfDish = {
      required: helpers.withMessage("Введите количество блюд", required),
      numeric: helpers.withMessage("Введите число", numeric),
      minValue: helpers.withMessage(
        () => "Минимальное значение 1",
        minValue(1)
      ),
      integer: helpers.withMessage("Число должно быть целым", integer),
    };
    result.numberOfExtraDish = {
      required: helpers.withMessage("Введите количество блюд", required),
      numeric: helpers.withMessage("Введите число", numeric),
      minValue: helpers.withMessage(
        () => "Минимальное значение 1",
        minValue(1)
      ),
      integer: helpers.withMessage("Число должно быть целым", integer),
    };
    result.extraDish = {
      required: helpers.withMessage("Выберите блюдо", required),
    };
  }
  return result;
}

import {
  helpers,
  required,
  numeric,
  minValue,
  //   maxValue,
  //   integer,
  //   alphaNum,
} from "@vuelidate/validators";

export function dishValidRules() {
  let result = new Object();
  result.productName = {
    required: helpers.withMessage("Введите название", required),
  };
  result.price = {
    required: helpers.withMessage("Введите цену", required),
    numeric: helpers.withMessage("Введите число", numeric),
    minValue: helpers.withMessage(() => "Минимальное значение 1", minValue(1)),
  };
  //   result.category = {
  //     required: helpers.withMessage("Выберите категорию", required),
  //   };
  result.description = {
    required: helpers.withMessage("Введите описание", required),
  };
  return result;
}

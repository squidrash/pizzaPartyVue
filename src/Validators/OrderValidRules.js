import { helpers, required, numeric, minValue } from "@vuelidate/validators";

export function addressValidRules() {
  let result = new Object();
  result.city = {
    required: helpers.withMessage("Выберите город", required),
  };
  result.street = {
    required: helpers.withMessage("Введите улицу", required),
  };
  result.numberOfBuild = {
    required: helpers.withMessage("Введите номер дома", required),
  };
  result.numberOfEntrance = {
    numeric: helpers.withMessage("Введите номер подъезда", numeric),
    minValue: helpers.withMessage("Минимальное значение 1", minValue(1)),
  };
  result.apartment = {
    numeric: helpers.withMessage("Введите номер квартиры", numeric),
    minValue: helpers.withMessage("Минимальное значение 1", minValue(1)),
  };
  return result;
}

export function dishesValidRules() {
  let result = {
    required: helpers.withMessage("Выберите блюда", required),
  };
  return result;
}

export function quantityValidRules() {
  let result = {
    required: helpers.withMessage("Введите количество", required),
    minValue: helpers.withMessage("Минимальное значение 1", minValue(1)),
  };
  return result;
}

import { helpers, required, numeric, minLength } from "@vuelidate/validators";
import { notNumber } from "./validators";

export function customerValidRules() {
  let result = new Object();
  result.name = {
    required: helpers.withMessage("Введите имя", required),
    notNumber: helpers.withMessage("Имя не должно содержать цифр", notNumber),
  };
  result.lastName = {
    required: helpers.withMessage("Введите фамилию", required),
    notNumber: helpers.withMessage(
      "Фамилия не должна содержать цифр",
      notNumber
    ),
  };
  result.phone = {
    required: helpers.withMessage("Введите телефон", required),
    numeric: helpers.withMessage("Только цифры", numeric),
    minLength: helpers.withMessage("Длина номера 10 цифр", minLength(10)),
  };
  return result;
}

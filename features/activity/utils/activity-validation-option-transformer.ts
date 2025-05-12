import { ValidationOption } from "../../../enums/ValidationOption";

export const activityValidationOptionTransformer = (
  option: ValidationOption
) => {
  switch (option) {
    case ValidationOption.MANUAL:
      return "Manuelle";
    case ValidationOption.AUTOMATIC:
      return "Automatique";
  }
};

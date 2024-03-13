import type { AccessDataI } from "../types/pluginConfigurator";

export const checkFormValues = (formValues: AccessDataI) => {
  return Object.values(formValues).every((inputValue) => !!inputValue);
};

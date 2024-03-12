import type { AccessData } from "../types/pluginConfigurator";

export const checkFormValues = (formValues: AccessData) => {
  return Object.values(formValues).every((inputValue) => !!inputValue);
};

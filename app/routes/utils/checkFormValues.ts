import type { ModulZugangsdatenData } from "../types/pluginConfigurator";

export const checkFormValues = (formValues: ModulZugangsdatenData) => {
  const isFormValid = Object.values(formValues).every(
    (inputValue) => !!inputValue,
  );
  return isFormValid;
};

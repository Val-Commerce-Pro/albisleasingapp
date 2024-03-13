import { Form, useSubmit } from "@remix-run/react";
import { useState } from "react";
import type {
  GetProduktgruppen,
  GetVertragsarten,
  GetZahlungsweisen,
} from "~/routes/types/methods";
import type { AccessDataI } from "~/routes/types/pluginConfigurator";
import { checkFormValues } from "~/routes/utils/checkFormValues";
import { baseServerUrl } from "~/routes/utils/urls";
import { Divider } from "../divider";
import { TextField } from "../textfield";
import styles from "./styles.module.css";

export const actionZagangsdaten = async () => {
  const getMethodsData = async (method: string) => {
    try {
      const requestBody = { method };
      const response = await fetch(`${baseServerUrl}/api/getMethodsData`, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching AppConfig:", error);
    }
  };
  const [zahlungsweisen, produktgruppen, vertragsarten]: [
    GetZahlungsweisen,
    GetProduktgruppen,
    GetVertragsarten,
  ] = await Promise.all([
    getMethodsData("getZahlungsweisen"),
    getMethodsData("getProduktgruppen"),
    getMethodsData("getVertragsarten"),
  ]);

  return { zahlungsweisen, produktgruppen, vertragsarten };
};

export const accessDataInitialValues = {
  apiLink: "",
  username: "",
  password: "",
  _action: "zagangsdaten",
};

export const Zagangsdaten = () => {
  const submit = useSubmit();
  const [accessData, setAccessData] = useState<AccessDataI>(
    accessDataInitialValues,
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.id;
    const value = event.target.value;
    setAccessData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    if (checkFormValues(accessData)) {
      submit({ ...accessData }, { method: "post" });
    }
  }
  return (
    <div className={`sectionContainer`}>
      <Divider title="Zugangsdaten" type="section" />
      <Form title="Zagangsdaten" method="POST" className={styles.formContainer}>
        <TextField
          name="apiLink"
          label="Albis API Link:"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={accessData.apiLink}
        />
        <TextField
          name="username"
          label="Benutzer:"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={accessData.username}
        />
        <TextField
          name="password"
          label="Passwort:"
          type="password"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={accessData.password}
        />
      </Form>
    </div>
  );
};

import { Form, useSubmit } from "@remix-run/react";
import { TextField } from "@shopify/polaris";
import { useState } from "react";
import type {
  GetProduktgruppen,
  GetVertragsarten,
  GetZahlungsweisen,
} from "~/routes/types/methods";
import type { AccessData } from "~/routes/types/pluginConfigurator";
import { checkFormValues } from "~/routes/utils/checkFormValues";
import { baseServerUrl } from "~/routes/utils/urls";
import { Divider } from "../divider";
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

export const Zagangsdaten = () => {
  const submit = useSubmit();
  const [accessData, setAccessData] = useState<AccessData>({
    apiLink: "",
    userName: "",
    password: "",
    _action: "zagangsdaten",
  });

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
          id="api-link"
          label="Albis API Link:"
          autoComplete="off"
          value={accessData.apiLink}
          onChange={(value) =>
            setAccessData((prev) => ({ ...prev, apiLink: value }))
          }
          onBlur={handleSave}
        />
        <TextField
          id="username"
          label="Benutzer"
          autoComplete="off"
          value={accessData.userName}
          onChange={(value) =>
            setAccessData((prev) => ({ ...prev, userName: value }))
          }
          onBlur={handleSave}
          requiredIndicator
        />
        <TextField
          id="password"
          label="Passwort"
          autoComplete="off"
          type="password"
          value={accessData.password}
          onChange={(value) =>
            setAccessData((prev) => ({
              ...prev,
              password: value,
            }))
          }
          onBlur={handleSave}
        />
      </Form>
    </div>
  );
};

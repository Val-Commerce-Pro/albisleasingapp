import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";

import { authenticate } from "../shopify.server";

import { getPluginConf } from "~/models/methods.server";
import { updateOrCreateModulAktiv } from "~/models/modulAktiv.server";
import { updateOrCreateModulEinstellungen } from "~/models/modulEinstellungen";
import { updateOrCreateModulZugangsdaten } from "~/models/modulZugangsdaten";
import { Divider } from "./components/divider";
import { ModulAktiv } from "./components/modulAktiv";
import { ModulEinstellungen } from "./components/modulEinstellungen";
import { ModulZugangsdaten } from "./components/modulZugangsdaten";
import styles from "./styles/appStyles.module.css";

import type {
  ActionZugangsdatenResponse,
  ModulEinstellungenData,
  ModulZugangsdatenData,
  PluginConfData,
} from "./types/pluginConfigurator";
import { formatData } from "./utils/formatData";
import { getLoaderResponse } from "./utils/getLoaderResponseObj";
import { getAllMethodData } from "./utils/getMethodsData";

export const action: ActionFunction = async ({
  request,
}): Promise<ActionZugangsdatenResponse | undefined> => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  switch (_action) {
    case "modulAktiv":
      const isModulAktiv: boolean = values["isModulAktiv"] === "true";
      const modulAktivData = await updateOrCreateModulAktiv({
        shop: session.shop,
        isModulAktiv,
      });
      if (!modulAktivData) {
        console.log("error: Error modulAktivData ModulZugangsdaten");
        // return { error: "Error modulAktivData ModulZugangsdaten" };
      }
      // return { success: true };
      break;
    case "zugangsdaten":
      const credentials = formatData(values) as ModulZugangsdatenData;

      const credentialsDb = await updateOrCreateModulZugangsdaten(
        session.shop,
        {
          apiLink: credentials.apiLink,
          benutzer: credentials.benutzer,
          passwort: credentials.passwort,
        },
      );

      if (!credentialsDb) {
        console.log("error: Error updating/Creating ModulZugangsdaten");
        // return { error: "Error updating/Creating ModulZugangsdaten" };
      }

      const { zahlungsweisen, produktgruppen, vertragsarten } =
        await getAllMethodData(credentials);

      const isCredentialsValid =
        !!zahlungsweisen && !!produktgruppen && !!vertragsarten;

      return {
        // success: true,
        data: {
          isCredentialsValid,
          zahlungsweisen,
          produktgruppen,
          vertragsarten,
        },
      };
    case "einstellungen":
      const einstellungenData = formatData(
        values,
        true,
      ) as ModulEinstellungenData;

      console.log("Formatted data - ", einstellungenData);

      const updatedEinstellungenData = await updateOrCreateModulEinstellungen(
        session.shop,
        einstellungenData,
      );
      console.log("updatedEinstellungenData", updatedEinstellungenData);
      if (!updatedEinstellungenData) {
        console.log("error: Error updating ModulEinstellungen");
        // return { error: "Error updating ModulEinstellungen" };
      }
      // return { success: true };
      break;
    default:
      break;
    // return { error: "Action not found" };
  }
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<PluginConfData> => {
  console.log("loader renders");
  const { session } = await authenticate.admin(request);
  const pluginConfData = await getPluginConf(session.shop);
  if (!pluginConfData)
    return getLoaderResponse({
      modulAktiv: {
        isModulAktiv: false,
        shop: session.shop,
      },
    });
  console.log("pluginConfData", pluginConfData);

  const { ModulZugangsdaten, isModulAktiv, shop } = pluginConfData;

  if (!isModulAktiv || !ModulZugangsdaten || !shop)
    return getLoaderResponse({
      modulAktiv: {
        isModulAktiv: false,
        shop: session.shop,
      },
    });
  console.log("ModulZugangsdaten", ModulZugangsdaten);
  const credentials = {
    apiLink: ModulZugangsdaten.apiLink,
    benutzer: ModulZugangsdaten.benutzer,
    passwort: ModulZugangsdaten.passwort,
  };
  const { zahlungsweisen, produktgruppen, vertragsarten } =
    await getAllMethodData(credentials);

  console.log(
    "zahlungsweisen, produktgruppen, vertragsarten",
    zahlungsweisen,
    produktgruppen,
    vertragsarten,
  );

  console.log(
    "!!zahlungsweisen && !!produktgruppen && !!vertragsarten;",
    !!zahlungsweisen && !!produktgruppen && !!vertragsarten,
  );
  const isCredentialsValid =
    !!zahlungsweisen && !!produktgruppen && !!vertragsarten;

  const modulAktiv = {
    isModulAktiv,
    shop,
  };
  const modulZugangsdaten = {
    ...credentials,
  };
  const modulEinstellungen = ModulZugangsdaten?.ModulEinstellungen
    ? { ...ModulZugangsdaten.ModulEinstellungen }
    : undefined;

  const methods = isCredentialsValid
    ? { zahlungsweisen, produktgruppen, vertragsarten }
    : undefined;

  console.log(
    "ModulZugangsdaten?.ModulEinstellungen",
    ModulZugangsdaten?.ModulEinstellungen,
  );
  return getLoaderResponse({
    modulAktiv,
    modulZugangsdaten,
    modulEinstellungen,
    isCredentialsValid,
    methods,
  });
};

export default function Index() {
  const loaderData = useLoaderData<PluginConfData>();
  const { modulAktiv, modulEinstellungen, modulZugangsdaten } = loaderData;

  const actionData = useActionData<ActionZugangsdatenResponse | undefined>();

  const { apiLink, benutzer, isCredentialsValid, passwort } = modulZugangsdaten;
  const credentials = {
    apiLink,
    benutzer,
    passwort,
  };

  console.log("actionData", actionData);
  console.log("loaderData", loaderData);

  if (actionData) {
    console.log(
      "actionData -- data.isCredentialsValid -- ",
      actionData.data.isCredentialsValid,
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formTitle}>
        <h1>Albis Leasing</h1>
        <p>Konfiguration</p>
      </div>
      <Divider type="main" />
      <ModulAktiv initialValue={modulAktiv.isModulAktiv} />
      {modulAktiv.isModulAktiv && (
        <ModulZugangsdaten
          initialValues={credentials}
          isCredentialsValid={isCredentialsValid}
        />
      )}
      {modulAktiv.isModulAktiv && modulZugangsdaten.isCredentialsValid && (
        <ModulEinstellungen
          initialValues={modulEinstellungen as ModulEinstellungenData}
        />
      )}
    </div>
  );
}

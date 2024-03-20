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
  ActionZugangsdaten,
  ModulEinstellungenData,
  ModulZugangsdatenData,
  PluginConfData,
} from "./types/pluginConfigurator";
import { formatData } from "./utils/formatData";
import { getLoaderResponse } from "./utils/getLoaderResponseObj";
import { getAllMethodData } from "./utils/getMethodsData";

export const action: ActionFunction = async ({
  request,
}): Promise<ActionZugangsdaten | null> => {
  console.log("request", request);
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

      return modulAktivData
        ? null
        : { error: "Error modulAktivData Modul Zugangsdaten" };
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

      return credentialsDb
        ? null
        : { error: "Error updating/Creating ModulZugangsdaten" };
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
      return updatedEinstellungenData
        ? null
        : { error: "Error updating/Creating ModulEinstellungen" };
    default:
      return null;
  }
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<PluginConfData> => {
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
        isModulAktiv: isModulAktiv ?? false,
        shop: shop ?? session.shop,
      },
    });
  const credentials = {
    apiLink: ModulZugangsdaten.apiLink,
    benutzer: ModulZugangsdaten.benutzer,
    passwort: ModulZugangsdaten.passwort,
  };
  const { zahlungsweisen, produktgruppen, vertragsarten } =
    await getAllMethodData(credentials);

  const isCredentialsValid =
    !!zahlungsweisen.result &&
    !!produktgruppen.result &&
    !!vertragsarten.result;

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

  const methodsData = isCredentialsValid
    ? {
        zahlungsweisen: zahlungsweisen.result,
        produktgruppen: produktgruppen.result,
        vertragsarten: vertragsarten.result,
      }
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
    methodsData,
  });
};

export default function Index() {
  const loaderData = useLoaderData<PluginConfData>();
  const actions = useActionData<ActionZugangsdaten | null>();
  const { modulAktiv, modulEinstellungen, modulZugangsdaten, methodsData } =
    loaderData;

  const { apiLink, benutzer, isCredentialsValid, passwort } = modulZugangsdaten;
  const credentials = {
    apiLink,
    benutzer,
    passwort,
  };

  console.log("loaderData", loaderData);
  console.log("actions", actions);

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
          methodsData={methodsData}
        />
      )}
    </div>
  );
}

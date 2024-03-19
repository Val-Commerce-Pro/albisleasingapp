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
import { ModulZagangsdaten } from "./components/modulZagangsdaten";
import styles from "./styles/appStyles.module.css";
import type {
  ModulAktivData,
  ModulEinstellungenData,
  ModulZugangsdatenData,
  PluginConfData,
} from "./types/pluginConfigurator";
import { formatData } from "./utils/formatData";
import { getAllMethodData } from "./utils/getMethodsData";

export const action: ActionFunction = async ({ request }) => {
  console.log("action renders");
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
        return { error: "Error modulAktivData ModulZugangsdaten" };
      }
      return { success: true, data: modulAktivData };
    case "zagangsdaten":
      const credentials = formatData(values) as ModulZugangsdatenData;

      const credentialsDb = await updateOrCreateModulZugangsdaten(
        session.shop,
        credentials,
      );

      if (!credentialsDb) {
        return { error: "Error updating ModulZugangsdaten" };
      }

      return { success: true, data: credentialsDb };
    case "einstellungen":
      const einstellungenData = formatData(
        values,
        true,
      ) as ModulEinstellungenData;

      console.log("Format data - ", einstellungenData);

      const updatedEinstellungenData = await updateOrCreateModulEinstellungen(
        session.shop,
        einstellungenData,
      );
      console.log("updatedEinstellungenData", updatedEinstellungenData);
      if (!updatedEinstellungenData) {
        return { error: "Error updating ModulEinstellungen" };
      }
      return { success: true, data: updatedEinstellungenData };
    default:
      return "Action not found";
  }
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<PluginConfData | ModulAktivData | null> => {
  console.log("loader renders");
  const { session } = await authenticate.admin(request);
  const pluginConfData = await getPluginConf(session.shop);
  if (!pluginConfData) return null;
  console.log("pluginConfData", pluginConfData);

  const { ModulZugangsdaten, isModulAktiv, shop } = pluginConfData;
  console.log("ModulZugangsdaten", ModulZugangsdaten);
  const credentials = {
    apiLink: ModulZugangsdaten?.apiLink ?? "",
    benutzer: ModulZugangsdaten?.benutzer ?? "",
    passwort: ModulZugangsdaten?.passwort ?? "",
  };
  const { zahlungsweisen, produktgruppen, vertragsarten } =
    await getAllMethodData(credentials);

  const isCredentialsValid =
    !zahlungsweisen || !produktgruppen || !vertragsarten;

  const loaderReturn = {
    modulAktiv: {
      isModulAktiv: isModulAktiv ?? false,
      shop: shop ?? session.shop,
    },
    modulZugangsdaten: {
      ...credentials,
      isCredentialsValid,
    },
    modulEinstellungen: {
      vertragsart: "",
      restwertInBeiTAVertrag: null,
      produktgruppe: "",
      zahlungsweisen: "",
      auswahlZahlungsweiseAnzeigen: false,
      minLeasingsumme: "",
      servicePauschaleNetto: "",
      albisServiceGebuhrNetto: "",
      provisionsangabe: "",
      objektVersicherung: false,
      auswahlObjektVersicherungAnzeigen: false,
      mietsonderzahlung: "",
      eingabeSonderzahlungErmoglichen: false,
      pInfoseiteZeigeAlle: false,
      antragOhneArtikelMoglich: false,
      kundeKannFinanzierungsbetragAndern: false,
    },
  };
  console.log("loaderReturn - ", loaderReturn);
  return loaderReturn;
};

export default function Index() {
  const loaderData = useLoaderData<PluginConfData>();
  const { modulAktiv, modulZugangsdaten, modulEinstellungen } = loaderData;

  const actionData = useActionData<typeof action>();
  console.log("actionData", actionData);
  console.log("loaderData", loaderData);

  return (
    <div className={styles.container}>
      <div className={styles.formTitle}>
        <h1>Albis Leasing</h1>
        <p>Konfiguration</p>
      </div>
      <Divider type="main" />
      <ModulAktiv initialValue={modulAktiv.isModulAktiv} />
      {modulAktiv.isModulAktiv && (
        <ModulZagangsdaten
          initialValues={modulZugangsdaten as ModulZugangsdatenData}
          isCredentialsValid={modulZugangsdaten.isCredentialsValid}
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

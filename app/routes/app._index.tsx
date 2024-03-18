import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";

import { authenticate } from "../shopify.server";

import type { ChangeEvent } from "react";
import { useState } from "react";

import type { PluginConfData } from "~/mockData/pluginConfiguratorMockData";
import { getPluginConf } from "~/models/methods.server";
import { updateOrCreateModulAktiv } from "~/models/modulAktiv.server";
import { updateOrCreateModulZugangsdaten } from "~/models/modulZugangsdaten";
import { Divider } from "./components/divider";
import { ModulAktiv } from "./components/modulAktiv";
import { ModulEinstellungen } from "./components/modulEinstellungen";
import { Zagangsdaten } from "./components/zagangsdaten";
import styles from "./styles/appStyles.module.css";
import type { ModulZugangsdatenData } from "./types/pluginConfigurator";
import { getAllMethodData } from "./utils/getMethodsData";

export const action: ActionFunction = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  switch (_action) {
    case "modulAktiv":
      const isModulAktiv: boolean = values["isAppActive"] === "true";
      const modulAktivData = await updateOrCreateModulAktiv({
        shop: session.shop,
        isModulAktiv,
      });
      return modulAktivData ?? false;
    case "zagangsdaten":
      console.log("zagangsdaten _action, values - ", _action, values);
      const castedValues = Object.entries(values).reduce(
        (acc, [key, value]) => {
          acc[key] = value.toString();
          return acc;
        },
        {} as { [key: string]: string },
      );
      const credentials = castedValues as ModulZugangsdatenData;

      await updateOrCreateModulZugangsdaten(session.shop, credentials);

      const { zahlungsweisen, produktgruppen, vertragsarten } =
        await getAllMethodData(credentials);

      if (!zahlungsweisen || !produktgruppen || !vertragsarten) {
        return { error: true };
      }

      return {
        zahlungsweisen,
        produktgruppen,
        vertragsarten,
        credentialsValid:
          !!zahlungsweisen && !!produktgruppen && !!vertragsarten,
      };
    case "einstellungen":
      console.log("einstellungen _action, values - ", _action, values);
      return "Einstellungen No Action";
    default:
      return "No Action";
  }
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<PluginConfData | null> => {
  const { session } = await authenticate.admin(request);
  const pluginConfData = await getPluginConf(session.shop);
  if (!pluginConfData || !pluginConfData.modulAktivData) return null;
  const { modulAktivData } = pluginConfData;
  console.log("pluginConfData", pluginConfData);
  // console.log("pluginConfData", pluginConfData);
  // console.log("Loader function renders");
  // const { zahlungsweisen, produktgruppen, vertragsarten } =
  //   await getAllMethodData();

  return { modulAktivData };
};

export default function Index() {
  const loaderData = useLoaderData<PluginConfData>();
  const { modulAktivData } = loaderData;
  const actionData = useActionData<typeof action>();
  console.log("actionData", actionData);
  console.log("loaderData", loaderData);
  // console.log("loaderData", loaderData);
  const submit = useSubmit();

  const [isAppActive, setIsAppActive] = useState(modulAktivData.isModulAktiv);

  const handleModulAktivChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log("handleModulAktivChange renders");

    setIsAppActive(e.target.checked);

    const data = {
      isAppActive: e.target.checked,
      _action: "modulAktiv",
    };
    console.log("handleModulAktivChange submitted data", data);
    submit(data, { method: "POST" });
    //send data to action and save it into the database
  };
  // console.log("isAppActive", isAppActive);

  // const { zahlungsweisen, produktgruppen, vertragsarten } = loaderData;

  // console.log("getVertragsarten", vertragsarten);
  // console.log("getZahlungsweisen", zahlungsweisen);
  // console.log("getProduktgruppen", produktgruppen);

  // function handleSave() {
  // setSavingCofig(true);
  // if (id === undefined) {
  //   console.error("could not load ID from server, cant submit without ID");
  // } else {
  //   const data = {
  //     id,
  //     shop: shop ?? "",
  //     ...appConfig,
  //   };
  //   submit(data, { method: "post" });
  // }
  // setSavingCofig(false);
  // }

  return (
    <div className={styles.container}>
      <div className={styles.formTitle}>
        <h1>Albis Leasing</h1>
        <p>Konfiguration</p>
      </div>
      <Divider type="main" />
      <ModulAktiv
        handleOnChange={handleModulAktivChange}
        checkboxValue={isAppActive}
      />
      {isAppActive && (
        <>
          <Zagangsdaten />
          <ModulEinstellungen />
        </>
      )}
    </div>
  );
}

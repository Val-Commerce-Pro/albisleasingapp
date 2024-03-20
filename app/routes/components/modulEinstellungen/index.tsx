import { Form, useSubmit } from "@remix-run/react";
import type { ChangeEvent } from "react";
import { useState } from "react";

import type { ModulEinstellungenData } from "~/routes/types/pluginConfigurator";
import { Divider } from "../divider";
import { Switch } from "../switch";
import { TextField } from "../textfield";
import styles from "./styles.module.css";

type ModulEinstellungenProps = {
  initialValues: ModulEinstellungenData;
};

export const ModulEinstellungen = ({
  initialValues,
}: ModulEinstellungenProps) => {
  const submit = useSubmit();
  const [modulEinstellungenData, setModulEinstellungenData] =
    useState<ModulEinstellungenData>(initialValues);

  function handleSave() {
    submit(
      { ...modulEinstellungenData, _action: "einstellungen" },
      { method: "POST" },
    );
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setModulEinstellungenData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSwitchOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target;

    const updatedModulEinstellungenData: ModulEinstellungenData = {
      ...modulEinstellungenData,
      [name]: checked,
    };
    setModulEinstellungenData(updatedModulEinstellungenData);
    submit(
      { ...updatedModulEinstellungenData, _action: "einstellungen" },
      { method: "POST" },
    );
  };
  return (
    <div className={`sectionContainer`}>
      <Divider title="Modul-Einstellungen" type="section" />
      <Form
        title="Einstellungen"
        method="POST"
        className={styles.formContainer}
      >
        <TextField
          name="vertragsart"
          label="Vertragsart:"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={modulEinstellungenData.vertragsart}
        />
        <TextField
          name="restwertInBeiTAVertrag"
          label="Restwert in % bei TA-Vertrag:"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={""}
          hidden={true}
        />
        <TextField
          name="produktgruppe"
          label="Produktgruppe:"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={modulEinstellungenData.produktgruppe}
        />
        <TextField
          name="zahlungsweisen"
          label="Zahlungsweisen:"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={modulEinstellungenData.zahlungsweisen}
        />
        <Switch
          name={"auswahlZahlungsweiseAnzeigen"}
          label="Auswahl Zahlungsweise anzeigen"
          handleOnChange={handleSwitchOnChange}
          checkboxValue={modulEinstellungenData.auswahlZahlungsweiseAnzeigen}
        />
        <TextField
          name="minLeasingsumme"
          label="Min. Leasingsumme:"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={modulEinstellungenData.minLeasingsumme}
        />
        <TextField
          name="servicePauschaleNetto"
          label="Service Pauschale (Netto):"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={modulEinstellungenData.servicePauschaleNetto}
        />
        <TextField
          name="albisServiceGebuhrNetto"
          label="Albis Service Gebühr (Netto):"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={modulEinstellungenData.albisServiceGebuhrNetto}
        />
        <TextField
          name="provisionsangabe"
          label="Provisionsangabe:"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={modulEinstellungenData.provisionsangabe}
        />
        <Switch
          name={"objektVersicherung"}
          label="Objekt-Versicherung:"
          handleOnChange={handleSwitchOnChange}
          checkboxValue={modulEinstellungenData.objektVersicherung}
        />
        <Switch
          name={"auswahlObjektVersicherungAnzeigen"}
          label="Auswahl Objekt-Versicherung anzeigen:"
          handleOnChange={handleSwitchOnChange}
          checkboxValue={
            modulEinstellungenData.auswahlObjektVersicherungAnzeigen
          }
        />
        <TextField
          name="mietsonderzahlung"
          label="Mietsoderzahlung:"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          textFieldValue={modulEinstellungenData.mietsonderzahlung}
        />
        <Switch
          name={"eingabeSonderzahlungErmoglichen"}
          label="Eingabe Sonderzahlung ermöglichen:"
          handleOnChange={handleSwitchOnChange}
          checkboxValue={modulEinstellungenData.eingabeSonderzahlungErmoglichen}
        />
        <Switch
          name={"pInfoseiteZeigeAlle"}
          label="P-Infoseite zeige alle Monate:"
          handleOnChange={handleSwitchOnChange}
          checkboxValue={modulEinstellungenData.pInfoseiteZeigeAlle}
        />
        <Switch
          name={"antragOhneArtikelMoglich"}
          label="Antrag ohne Artikel möglich:"
          handleOnChange={handleSwitchOnChange}
          checkboxValue={modulEinstellungenData.antragOhneArtikelMoglich}
        />
        <Switch
          name={"kundeKannFinanzierungsbetragAndern"}
          label="Kunde kann Finanzierungsbetrag ändern:"
          handleOnChange={handleSwitchOnChange}
          checkboxValue={
            modulEinstellungenData.kundeKannFinanzierungsbetragAndern
          }
        />
      </Form>
    </div>
  );
};

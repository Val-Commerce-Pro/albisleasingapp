import { Form } from "@remix-run/react";
import { useState } from "react";

import type { ModulEinstellungenType } from "~/routes/types/pluginConfigurator";
import { Divider } from "../divider";
import { Switch } from "../switch";
import { TextField } from "../textfield";
import styles from "./styles.module.css";

export const modulEinstellungenInitialValues = {
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
  eingabeSonderzahlungErmöglichen: false,
  pInfoseiteZeigeAlle: false,
  antragOhneArtikelMoglich: false,
  kundeKannFinanzierungsbetragAndern: false,
  _action: "einstellungen",
};

export const ModulEinstellungen = () => {
  const [modulEinstellungenData, setModulEinstellungenData] =
    useState<ModulEinstellungenType>(modulEinstellungenInitialValues);

  function handleSave() {
    //write data into the database
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("event", event);
    const name = event.target.id;
    const value = event.target.value;
    setModulEinstellungenData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className={`sectionContainer`}>
      <Divider title="Modul-Einstellungen" type="section" />
      <Form title="Zagangsdaten" method="POST" className={styles.formContainer}>
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
          handleOnChange={handleChange}
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
          handleOnChange={handleChange}
          checkboxValue={modulEinstellungenData.objektVersicherung}
        />
        <Switch
          name={"auswahlObjektVersicherungAnzeigen"}
          label="Auswahl Objekt-Versicherung anzeigen:"
          handleOnChange={handleChange}
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
          name={"eingabeSonderzahlungErmöglichen"}
          label="Eingabe Sonderzahlung ermöglichen:"
          handleOnChange={handleChange}
          checkboxValue={modulEinstellungenData.eingabeSonderzahlungErmöglichen}
        />
        <Switch
          name={"pInfoseiteZeigeAlle"}
          label="P-Infoseite zeige alle Monate:"
          handleOnChange={handleChange}
          checkboxValue={modulEinstellungenData.pInfoseiteZeigeAlle}
        />
        <Switch
          name={"antragOhneArtikelMoglich"}
          label="Antrag ohne Artikel möglich:"
          handleOnChange={handleChange}
          checkboxValue={modulEinstellungenData.antragOhneArtikelMoglich}
        />
        <Switch
          name={"kundeKannFinanzierungsbetragAndern"}
          label="Kunde kann Finanzierungsbetrag ändern:"
          handleOnChange={handleChange}
          checkboxValue={
            modulEinstellungenData.kundeKannFinanzierungsbetragAndern
          }
        />
      </Form>
    </div>
  );
};

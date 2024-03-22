async function fillInterfaceWithMethodsData() {
  const insurance = document.getElementById("propertyInsurance");
  const financingAmount = document.getElementById("financingAmount");
  const downPayment = document.getElementById("downPayment");
  const calcBtn = document.getElementById("calculatorBtn");

  const paymentMethod = document.getElementById("paymentMethod");
  const shopDomainTag = document.getElementById("shopDomain");
  const shop = shopDomainTag.textContent;

  const getPluginConfData = async () => {
    try {
      const parameters = new URLSearchParams({ shop });
      const requestUrl = `https://albisleasingapp.cpro-server.de/api/getPluginConfData?${parameters}`;

      const response = await fetch(requestUrl, { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("getPluginConfData", getPluginConfData);
      const { isModulAktiv, shop, ModulZugangsdaten } = data;
      if (!isModulAktiv || !ModulZugangsdaten) return data;

      const { ModulEinstellungen } = ModulZugangsdaten;
      const modulAktiv = {
        isModulAktiv,
        shop,
      };
      const modulZugangsdaten = {
        apiLink: ModulZugangsdaten.apiLink,
        benutzer: ModulZugangsdaten.benutzer,
        passwort: ModulZugangsdaten.passwort,
      };
      const modulEinstellungen = ModulEinstellungen;

      const pluginConfig = {
        modulAktiv,
        modulZugangsdaten,
        modulEinstellungen,
      };
      console.log("pluginConfig", pluginConfig);
      return pluginConfig;
    } catch (error) {
      console.error("Error fetching AppConfig:", error);
    }
  };

  const getMethodsData = async (method, werte) => {
    try {
      //needs to add the credentials
      const requestBody = werte ? { method, shop, werte } : { method, shop };

      console.log("requestBody", requestBody);
      const response = await fetch(
        `https://albisleasingapp.cpro-server.de/api/getMethodsData`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching AppConfig:", error);
    }
  };

  const mockWerte = {
    kaufpreis: "769.00",
    prodgrp: "1",
    mietsz: "200.00",
    vertragsart: "1",
    zahlweise: "1",
  };

  const zahlungsweisen = await getMethodsData("getZahlungsweisen");
  console.log("zahlungsweisen", zahlungsweisen);
  const getRate = await getMethodsData("getRate", mockWerte);
  console.log("getRate", getRate);
  const pluginConfData = await getPluginConfData();
  console.log("pluginConfData", pluginConfData);

  if (!zahlungsweisen) return console.log("Could not getzahlungsweisen Method");

  if (paymentMethod) {
    zahlungsweisen.result.forEach(({ bezeichnung, monate }) => {
      const option = document.createElement("option");
      option.text = bezeichnung;
      option.value = monate;
      paymentMethod.appendChild(option);
    });
  }

  // function calculateLeasing(e) {
  //   // Get values from the form

  //   const testBtn = document.getElementById("testBtn");

  //   testBtn.addEventListener("click", (e) => {
  //     console.log("func testBtn");
  //   });

  //   calcBtn.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     console.log(
  //       "e, insurance, financingAmount, downPayment, paymentMethod",
  //       e,
  //       insurance,
  //       financingAmount,
  //       downPayment,
  //       paymentMethod
  //     );
  //   });
  // }
}
const getTestRoute = async () => {
  try {
    const requestUrl = `https://albisleasingapp.cpro-server.de/api/testRoute`;

    const response = await fetch(requestUrl, { method: "GET" });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("getTestRoute:", data);
  } catch (error) {
    console.error("Error fetching AppConfig:", error);
  }
};
document.addEventListener("DOMContentLoaded", async () => {
  await getTestRoute();
  await fillInterfaceWithMethodsData();
});

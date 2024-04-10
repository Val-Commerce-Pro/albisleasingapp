import { useEffect, useState } from "react";
import { PageTitle } from "../components/pagetitle";
import { SectionCalculator } from "../components/sectionCalculator";
import { SectionCartItems } from "../components/sectionCartItems";
import { SectionLeasingRates } from "../components/sectionLeasingRates";
import { LeasingRate } from "../types/albisMethods";
import { ShoppingCart, ShoppingCartItem } from "../types/cartTypes";
import { CalcData, LocalStorageI } from "../types/localStorage";
import { PluginConfig } from "../types/pluginConfig";
import { formatDecimalNumber } from "../utils/formatValues";
import { getAlbisMethodsData } from "../utils/getAlbisMethodsData";
import { deleteCartItem, updateCartData } from "../utils/shopifyAjaxApi";

type AlbisLeasingProps = {
  cartData: ShoppingCart;
  pluginConfData: PluginConfig;
};

export const AlbisLeasing = ({
  cartData,
  pluginConfData,
}: AlbisLeasingProps) => {
  const { modulEinstellungen } = pluginConfData;
  const { total_price } = cartData;
  const [leasingRate, setLeasingRate] = useState<LeasingRate | undefined>();

  useEffect(() => {
    const storageDataAsString = localStorage.getItem("cp@albisLeasing");
    const stateInitialData: LocalStorageI =
      storageDataAsString &&
      Object.keys(storageDataAsString).length > 1 &&
      JSON.parse(storageDataAsString);

    const getAlbisData = async () => {
      const werte = {
        kaufpreis: formatDecimalNumber(
          stateInitialData
            ? stateInitialData.calcData.finanzierungsbetragNetto
            : total_price,
        ),
        prodgrp: modulEinstellungen.produktgruppe,
        mietsz: "0",
        vertragsart: modulEinstellungen.vertragsart,
        zahlweise: stateInitialData
          ? stateInitialData.calcData.zahlungsweise
          : modulEinstellungen.zahlungsweisen,
        provision: modulEinstellungen.provisionsangabe,
      };

      const leasingRateData: LeasingRate = await getAlbisMethodsData(
        "getRate",
        werte,
      );
      setLeasingRate(leasingRateData);
    };
    getAlbisData();
  }, [modulEinstellungen, total_price]);

  const [cartItems, setCartItems] = useState<ShoppingCart>(cartData);

  const handleUpdateItemQuantity = async (
    item: ShoppingCartItem,
    type?: "plus",
  ) => {
    const productQuantity = {
      [item.id]: type ? item.quantity + 1 : item.quantity - 1,
    };
    const updatedCartData = await updateCartData(productQuantity);
    setCartItems(updatedCartData);
  };

  const handleDeleteCartItem = async (item: ShoppingCartItem) => {
    const productQuantity = {
      [item.id]: 0,
    };
    const updatedCartData = await deleteCartItem(productQuantity);
    setCartItems(updatedCartData);
  };

  const handleGetRate = async (calcData: CalcData) => {
    const werte = {
      kaufpreis: formatDecimalNumber(calcData.finanzierungsbetragNetto),
      prodgrp: modulEinstellungen.produktgruppe,
      mietsz: calcData.anzahlung,
      vertragsart: modulEinstellungen.vertragsart,
      zahlweise: calcData.zahlungsweise,
      provision: modulEinstellungen.provisionsangabe,
    };
    console.log("werte", werte);
    const leasingRateData: LeasingRate = await getAlbisMethodsData(
      "getRate",
      werte,
    );
    setLeasingRate(leasingRateData);
  };

  return (
    <div className="max-w-[1280px] mx-auto p-4">
      <PageTitle title="Albis Leasing" />
      <SectionCartItems
        cartData={cartItems}
        handleUpdateItemQuantity={handleUpdateItemQuantity}
        handleDeleteCartItem={handleDeleteCartItem}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-2 mt-5">
        <div className="order-2 lg:order-1">
          {leasingRate && (
            <SectionLeasingRates
              leasingValue={leasingRate?.result.kaufpreis}
              leasingRate={leasingRate?.result.raten}
            />
          )}
        </div>
        <div className="order-1 lg:order-2">
          <SectionCalculator
            finanzierungsbetragNetto={total_price}
            auswahlObjektVersicherungAnzeigen={
              modulEinstellungen.auswahlObjektVersicherungAnzeigen
            }
            auswahlZahlungsweiseAnzeigen={
              modulEinstellungen.auswahlZahlungsweiseAnzeigen
            }
            kundeKannFinanzierungsbetragAndern={
              modulEinstellungen.kundeKannFinanzierungsbetragAndern
            }
            zahlungsweisenPlugin={modulEinstellungen.zahlungsweisen}
            handleGetRate={handleGetRate}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbisLeasing;

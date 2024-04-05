import { useEffect, useState } from "react";
import { PageTitle } from "../components/pagetitle";
import { SectionCalculator } from "../components/sectionCalculator";
import { SectionCartItems } from "../components/sectionCartItems";
import { SectionLeasingRates } from "../components/sectionLeasingRates";
import { LeasingRate } from "../types/albisMethods";
import { ShoppingCart, ShoppingCartItem } from "../types/cartTypes";
import { PluginConfig } from "../types/pluginConfig";
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
    console.log("useEffect SectionLeasingRates render");
    const getAlbisData = async () => {
      const werte = {
        kaufpreis: (total_price / 100).toString(),
        prodgrp: modulEinstellungen.produktgruppe,
        mietsz: "0",
        vertragsart: modulEinstellungen.vertragsart,
        zahlweise: modulEinstellungen.zahlungsweisen,
        provision: modulEinstellungen.provisionsangabe,
      };
      console.log("werte", werte);
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

  console.log("leasingRate", leasingRate);
  return (
    <div className="max-w-[1280px] m-auto p-4">
      <PageTitle title="Albis Leasing" />
      <SectionCartItems
        cartData={cartItems}
        handleUpdateItemQuantity={handleUpdateItemQuantity}
        handleDeleteCartItem={handleDeleteCartItem}
      />
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-2 mt-5">
        <div className="order-2 md:order-1">
          {leasingRate && (
            <SectionLeasingRates
              leasingValue={total_price}
              leasingRate={leasingRate?.result.raten}
            />
          )}
        </div>
        <div className="order-1 md:order-2">
          <SectionCalculator
            calcData={{
              leasingValue: total_price,
              auswahlObjektVersicherungAnzeigen:
                modulEinstellungen.auswahlObjektVersicherungAnzeigen,
              auswahlZahlungsweiseAnzeigen:
                modulEinstellungen.auswahlZahlungsweiseAnzeigen,
              kundeKannFinanzierungsbetragAndern:
                modulEinstellungen.kundeKannFinanzierungsbetragAndern,
              zahlungsweisen: modulEinstellungen.zahlungsweisen,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbisLeasing;

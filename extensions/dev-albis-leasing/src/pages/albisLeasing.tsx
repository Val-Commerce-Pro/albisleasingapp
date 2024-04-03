import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Box } from "../components/box";
import { PageTitle } from "../components/pagetitle";
// import { ShoppingCart } from "../types/cartTypes";
// import { TextField } from "../components/textfield";

import { SectionCalculator } from "../components/sectionCalculator";
import { SectionCartItems } from "../components/sectionCartItems";
import { ShoppingCart, ShoppingCartItem } from "../types/cartTypes";
import { PluginConfig } from "../types/pluginConfig";
import { deleteCartItem, updateCartData } from "../utils/shopifyAjaxApi";
// import { mockCartItems } from "../mockData/mockData";

type AlbisLeasingProps = {
  cartData: ShoppingCart;
  pluginConfigData: PluginConfig;
};

export const AlbisLeasing = ({
  cartData,
  pluginConfigData,
}: AlbisLeasingProps) => {
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
  // const [cartData] = useState<ShoppingCart>(mockCartItems);

  // const [cartData, setCartData] = useState<ShoppingCart>();

  // const [formData, setFormData] = useState({
  //   minLeasingsumme: "",
  // });

  // function handleChange(event: ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.target;
  //   console.log("name, value", name, value);
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // }
  // function handleSave() {
  //   console.log("handle Save render");
  //   console.log("cartData", cartData);
  //   console.log("formData", formData);
  // }
  useEffect(() => {
    // const getCartData = async () => {
    //   fetch("/cart.js")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       const formattedData = shoppingCartSchema.parse(data);
    //       console.log("formattedData", formattedData);
    //       // setCartData(data);
    //     })
    //     .catch((error) => console.error("Error fetching cart data:", error));
    // };
    // getCartData();
    // const getPluginConfData = async () => {
    //   try {
    //     const parameters = new URLSearchParams({ shop });
    //     const requestUrl = `https://albisleasingapp.cpro-server.de/api/getPluginConfData?${parameters}`;
    //     const response = await fetch(requestUrl, { method: "GET" });
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     const data = await response.json();
    //     return data;
    //   } catch (error) {
    //     console.error("Error fetching AppConfig:", error);
    //   }
    // };
    // const pluginConfData = getPluginConfData();
    // console.log("pluginConfData", pluginConfData);
    // const getMethodsData = async (method, werte) => {
    //   try {
    //     const requestBody = werte ? { method, shop, werte } : { method, shop };
    //     const response = await fetch(
    //       `https://albisleasingapp.cpro-server.de/api/getMethodsData`,
    //       {
    //         method: "POST",
    //         body: JSON.stringify(requestBody),
    //       },
    //     );
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     const data = await response.json();
    //     return data;
    //   } catch (error) {
    //     console.error("Error fetching AppConfig:", error);
    //   }
    // };
  }, []);
  return (
    pluginConfigData &&
    pluginConfigData?.modulAktiv &&
    cartData && (
      <div className="max-w-[1280px] m-auto p-4">
        <PageTitle title="Albis Leasing" />
        {/* <Link className="text-2xl" to="/pages/albis-leasing-request">
        Go to Albis Request
      </Link> */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.5fr] gap-4">
          <SectionCartItems
            cartData={cartItems}
            handleUpdateItemQuantity={handleUpdateItemQuantity}
            handleDeleteCartItem={handleDeleteCartItem}
          />
          <SectionCalculator leasingValue={cartData.total_price} />
        </div>
        {/* <Box title="Artikel aus dem Warenkorb">
        <div className="textfieldContainer">
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <TextField
            name="minLeasingsumme"
            label="minLeasingsumme"
            type="text"
            handleOnChange={handleChange}
            handleOnBlur={handleSave}
            handleKeyDown={handleSave}
            textFieldValue={formData.minLeasingsumme}
            error={false}
            success={false}
          />
        </div>
      </Box> */}
      </div>
    )
  );
};

export default AlbisLeasing;

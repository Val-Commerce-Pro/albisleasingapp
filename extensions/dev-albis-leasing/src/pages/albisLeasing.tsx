import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Box } from "../components/box";
import { PageTitle } from "../components/pagetitle";
// import { ShoppingCart } from "../types/cartTypes";
// import { TextField } from "../components/textfield";

import { SectionCalculator } from "../components/sectionCalculator";
import { SectionCartItems } from "../components/sectionCartItems";
import { useGetCartData } from "../hooks/useGetCartData";
import { useGetPluginConfData } from "../hooks/useGetPluginConfData";
// import { mockCartItems } from "../mockData/mockData";

export const AlbisLeasing = () => {
  // const [cartData] = useState<ShoppingCart>(mockCartItems);
  const cartData = useGetCartData();
  const pluginConfData = useGetPluginConfData();
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
  console.log("formatted", cartData);
  return pluginConfData && pluginConfData?.modulAktiv && cartData ? (
    <div className="max-w-[1280px] m-auto p-4">
      <PageTitle title="Albis Leasing" />
      {/* <Link className="text-2xl" to="/pages/albis-leasing-request">
        Go to Albis Request
      </Link> */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.5fr] gap-4">
        <SectionCartItems cartData={cartData} />
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
  ) : (
    <h1>Loading...</h1>
  );
};

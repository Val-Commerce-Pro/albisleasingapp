import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "../components/box";
import { TextField } from "../components/textfield";

export const AlbisLeasing = () => {
  const [cartData, setCartData] = useState();
  const [formData, setFormData] = useState({
    minLeasingsumme: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log("name, value", name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleSave() {
    console.log("handle Save render");
    console.log("cartData", cartData);
    console.log("formData", formData);
  }
  useEffect(() => {
    const getCartData = async () => {
      fetch("/cart.js")
        .then((response) => response.json())
        .then((data) => {
          console.log("cart data", data);
          setCartData(data);
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    };
    getCartData();
  }, []);

  return (
    <div className="w-40 h-40 bg-slate-100">
      Albis Request page{" "}
      <Link className="text-2xl" to="/pages/albis-leasing-request">
        Go to Albis Request
      </Link>
      <Box title="Artikel aus dem Warenkorb">
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
      </Box>
    </div>
  );
};

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CartInfo } from "../helpers/getCart";

export const AlbisLeasing = () => {
  const cartData = CartInfo();
  useEffect(() => {
    // const getCartData = async () => {

    // }
    console.log("cartData", cartData);
  }, []);
  return (
    <div className="w-40 h-40 bg-slate-100">
      Albis Request page{" "}
      <Link className="text-2xl" to="/pages/albis-leasing-request">
        Go to Albis Request
      </Link>
    </div>
  );
};

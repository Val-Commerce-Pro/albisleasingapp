import { Link, useLoaderData } from "react-router-dom";

export const AlbisRequest = () => {
  const loaderData = useLoaderData();
  console.log("AlbisRequest loaderData", loaderData);

  return (
    <div className="w-24 h-24 bg-slate-200">
      Albis Request page{" "}
      <Link to="/pages/albis-leasing">Go to Albis Leasing</Link>
    </div>
  );
};

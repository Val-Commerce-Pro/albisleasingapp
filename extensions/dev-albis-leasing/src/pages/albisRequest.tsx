import { Link, useLoaderData } from "react-router-dom";

export const AlbisRequest = () => {
  const loaderData = useLoaderData();
  console.log("AlbisRequest loaderData", loaderData);

  return (
    <div className="max-w-7xl m-auto p-1">
      Albis Request page{" "}
      <Link to="/pages/albis-leasing">Go to Albis Leasing</Link>
    </div>
  );
};

export default AlbisRequest;

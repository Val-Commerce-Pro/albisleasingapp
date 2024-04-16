import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loading from "./components/loading";
// import { useGetCartData } from "./hooks/useGetCartData";
import { useGetPluginConfData } from "./hooks/useGetPluginConfData";
import { mockCartItems } from "./mockData/mockData";
import { AlbisLeasing } from "./pages/albisLeasing";
import { AlbisRequest } from "./pages/albisRequest";

function App() {
  // const cartData = useGetCartData();
  const cartData = mockCartItems;
  const pluginConfData = useGetPluginConfData();
  console.log("cartData", cartData);
  console.log("pluginConfData", pluginConfData);

  return (
    <Router>
      <Routes>
        {cartData && pluginConfData && pluginConfData?.modulAktiv ? (
          <>
            <Route
              path="/pages/albis-leasing"
              element={
                <AlbisLeasing
                  cartData={cartData}
                  pluginConfData={pluginConfData}
                />
              }
            />
            <Route
              path="/pages/albis-leasing-request"
              element={<AlbisRequest pluginConfData={pluginConfData}/>}
            />
          </>
        ) : (
          <Route path="/pages/albis-leasing" element={<Loading />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

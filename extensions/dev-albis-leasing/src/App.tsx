import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useGetCartData } from "./hooks/useGetCartData";
import { useGetPluginConfData } from "./hooks/useGetPluginConfData";
// import { mockCartItems } from "./mockData/mockData";
import { AlbisLeasing } from "./pages/albisLeasing";
import { AlbisRequest } from "./pages/albisRequest";
import LoadingPage from "./pages/loading";

function App() {
  const cartData = useGetCartData();
  const pluginConfData = useGetPluginConfData();

  // if (!pluginConfData) return <LoadingPage />;

  // return (
  //   <Router>
  //     <Routes>
  //       <Route
  //         path="/pages/albis-leasing"
  //         element={
  //           <AlbisLeasing
  //             cartData={mockCartItems}
  //             pluginConfigData={pluginConfData}
  //           />
  //         }
  //       />
  //       <Route path="/pages/albis-leasing-request" element={<AlbisRequest />} />
  //     </Routes>
  //   </Router>
  // );
  return (
    <Router>
      <Routes>
        {cartData && pluginConfData ? (
          <>
            <Route
              path="/pages/albis-leasing"
              element={
                <AlbisLeasing
                  cartData={cartData}
                  pluginConfigData={pluginConfData}
                />
              }
            />
            <Route
              path="/pages/albis-leasing-request"
              element={<AlbisRequest />}
            />
          </>
        ) : (
          <Route path="/pages/albis-leasing" element={<LoadingPage />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

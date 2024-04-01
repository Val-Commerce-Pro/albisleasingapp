// import { createBrowserRouter } from 'react-router-dom';
// import AlbisLeasing from './pages/albisLeasing';
// import { AlbisRequest } from './pages/albisRequest';

// const albisRequestLoader = async ({ request }) => {
//   try {
//     const response = await fetch("/cart.js");
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching cart data:", error);
//     return null;
//   }
// };

// export const router = createBrowserRouter([
//   {
//     path: "/pages/albis-leasing",
//     element: <AlbisLeasing />,
//     loader: albisRequestLoader,
//   },
//   // {
//   //   path: "/pages/albis-leasing-request",
//   //   element: <AlbisRequest />,
//   //   loader: albisRequestLoader,
//   // },
// ]);

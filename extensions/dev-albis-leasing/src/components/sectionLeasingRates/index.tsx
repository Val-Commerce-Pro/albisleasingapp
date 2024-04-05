import { useNavigate } from "react-router-dom";
import { LeasingRate, Rate } from "../../types/albisMethods";
import { ShoppingCart } from "../../types/cartTypes";
import { Box } from "../box";

type SectionLeasingRatesProps = {
  leasingValue: ShoppingCart["total_price"];
  leasingRate?: LeasingRate["result"]["raten"];
};

export const SectionLeasingRates = ({
  leasingRate,
  leasingValue,
}: SectionLeasingRatesProps) => {
  const navigate = useNavigate();
  const handleClickRateOpt = (itemRate: Rate) => {
    const shopSecureUrl = document.getElementById("shopSecureUrl")?.textContent;
    console.log("shopSecureUrl", shopSecureUrl);
    console.log("itemRate clicked", itemRate);
    navigate(`pages/albis-leasing-request`);
  };
  return (
    <Box
      title={`Leasingraten (Finanzierungsbetrag: ${(leasingValue / 100).toFixed(2)} €)`}
    >
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-center">
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vertragslaufzeit
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Monatliche Rate
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Versicherung
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Gesamtleasingrate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {leasingRate &&
              leasingRate.map((itemRate, index) => (
                <tr
                  key={index}
                  onClick={() => handleClickRateOpt(itemRate)}
                  className="cursor-pointer transition-all duration-100 ease-in-out hover:bg-gray-100 text-center"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border">
                    {itemRate.laufzeit} Monate
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border">
                    €{itemRate.rate.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border">
                    €{itemRate.versicherung.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border">
                    €{(itemRate.rate + itemRate.versicherung).toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

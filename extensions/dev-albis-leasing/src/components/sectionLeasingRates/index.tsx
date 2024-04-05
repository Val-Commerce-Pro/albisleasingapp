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

  const formattedLeasingValue = (leasingValue / 100).toFixed(2);
  const infoTextAbove =
    "WICHTIG: Bitte achten Sie darauf, dass die Lieferzeiten zum Zeitpunkt der Antragstellung gelten. Bis Sie den Leasingvertrag unterschreiben und sich ausweisen, können sich die Lieferzeiten ändern.";
  const infoTextBelow =
    "(1) in EUR zzgl. MwSt. Im Monat bei quartalsweiser oder monatlicher Zahlung. (2) Der Leasingnehmer kann durch Vorlage eines auf die ALBIS HiTec Leasing GmbH ausgestellten Sicherungsscheins die ausreichende Deckung durch eine bestehende oder neu abzuschließende Versicherung bei jedem beliebigen Versicherungsgeber nachweisen. (1s) Eine zusätzliche einmalige Gebühr in Höhe von 67,50 € netto wird berechnet.";

  return (
    <Box
      title={`Leasingraten (Finanzierungsbetrag: ${formattedLeasingValue} €)`}
    >
      <p>{infoTextAbove}</p>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50 rounded-t-lg">
            <tr className="text-center">
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
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
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
              >
                Gesamtleasingrate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 rounded-b-lg">
            {leasingRate &&
              leasingRate.map((itemRate, index) => (
                <tr
                  key={index}
                  onClick={() => handleClickRateOpt(itemRate)}
                  className="cursor-pointer transition-all duration-100 ease-in-out hover:bg-gray-100 text-center"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 rounded-bl-lg">
                    {itemRate.laufzeit} Monate
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    €{itemRate.rate.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    €{itemRate.versicherung.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 rounded-br-lg">
                    €{(itemRate.rate + itemRate.versicherung).toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p>{infoTextBelow}</p>
    </Box>
  );
};

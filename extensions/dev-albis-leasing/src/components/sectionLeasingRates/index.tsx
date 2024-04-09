import { useNavigate } from "react-router-dom";
import { LeasingRate, Rate } from "../../types/albisMethods";
import { ShoppingCart } from "../../types/cartTypes";
import { Box } from "../box";

type SectionLeasingRatesProps = {
  leasingValue?: ShoppingCart["total_price"];
  leasingRate?: LeasingRate["result"]["raten"];
};

export const SectionLeasingRates = ({
  leasingRate,
  leasingValue,
}: SectionLeasingRatesProps) => {
  const navigate = useNavigate();

  const handleClickRateOpt = (itemRate: Rate) => {
    const dataFromLocalStorageAsString =
      localStorage.getItem("cp@albisLeasing");

    const dataFromLocalStorage = dataFromLocalStorageAsString
      ? JSON.parse(dataFromLocalStorageAsString)
      : {};

    const dataToLocalStorage = {
      leasing: {
        ...dataFromLocalStorage.leasing,
        ...itemRate,
      },
    };
    localStorage.setItem("cp@albisLeasing", JSON.stringify(dataToLocalStorage));

    navigate(`pages/albis-leasing-request`);
  };

  return (
    <Box title={`Leasingraten (Finanzierungsbetrag: ${leasingValue} €)`}>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <pre className="p-3 text-xs">{`Rechnen Sie hier schnell und einfach die zu zahlende monatliche Leasingrate für den geplanten Einkaufswert aus:\nKaufpreis (ohne MwSt.) als Finanzierungsbetrag eintragen:`}</pre>
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
                    €{itemRate.rate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    €{itemRate.versicherung}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 rounded-br-lg">
                    €{itemRate.rate + itemRate.versicherung}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="text-sm p-3 flex flex-col gap-1 border-t border-gray-200">
          <strong>
            WICHTIG: Bitte achten Sie darauf, dass die Lieferzeiten zum
            Zeitpunkt der Antragstellung gelten. Bis Sie den Leasingvertrag
            unterschreiben und sich ausweisen, können sich die Lieferzeiten
            ändern.
          </strong>
          <pre className="text-xs whitespace-pre-wrap">
            {`(1) in EUR zzgl. MwSt. Im Monat bei quartalsweiser oder monatlicher Zahlung.\n(2) Der Leasingnehmer kann durch Vorlage eines auf die ALBIS HiTec Leasing GmbH ausgestellten Sicherungsscheins die ausreichende Deckung durch eine bestehende oder neu abzuschließende Versicherung bei jedem beliebigen Versicherungsgeber nachweisen.\n(1s) Eine zusätzliche einmalige Gebühr in Höhe von 67,50 € netto wird berechnet.`}
          </pre>
        </div>
      </div>
    </Box>
  );
};

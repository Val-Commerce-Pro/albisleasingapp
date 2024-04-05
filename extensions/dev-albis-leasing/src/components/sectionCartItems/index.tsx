import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { ShoppingCart, ShoppingCartItem } from "../../types/cartTypes";
import { Box } from "../box";

type SectionCartItemsProps = {
  cartData: ShoppingCart;
  handleUpdateItemQuantity: (item: ShoppingCartItem, type?: "plus") => void;
  handleDeleteCartItem: (item: ShoppingCartItem) => void;
};

export const SectionCartItems = ({
  cartData,
  handleUpdateItemQuantity,
  handleDeleteCartItem,
}: SectionCartItemsProps) => {
  return (
    <Box title="Artikel aus dem Warenkorb">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cartData.items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleUpdateItemQuantity(item)}
                      className={`p-1 mr-2 rounded-full border-0 ${
                        item.quantity <= 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateItemQuantity(item, "plus")}
                      className="p-1 ml-2 rounded-full border-0 text-gray-500 hover:text-gray-700"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 break-words">
                  {item.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  €{(item.final_price / 100).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDeleteCartItem(item)}
                    className="p-1 rounded-full border-0 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 text-right text-sm font-medium text-gray-900"
              >
                Total
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                €{(cartData.total_price / 100).toFixed(2)}
              </td>
              <td className="px-6 py-4"></td>{" "}
              {/* Empty cell for the Actions column */}
            </tr>
          </tbody>
        </table>
      </div>
    </Box>
  );
};

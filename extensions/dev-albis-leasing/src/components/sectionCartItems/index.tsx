import { useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { MockCartData, MockCartItems } from "../../mockData/mockData";
import { Box } from "../box";

type SectionCartItemsProps = {
  cartData?: MockCartData;
};

export const SectionCartItems = ({ cartData }: SectionCartItemsProps) => {
  const [cartItems, setCartItems] = useState<MockCartItems>(
    cartData?.items ?? [],
  );

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) {
      return; // Prevent the quantity from going below 1
    }
    // Update the quantity for the specified index
    const newCartItems = [...cartItems];
    newCartItems[index] = {
      ...newCartItems[index],
      quantity: newQuantity,
    };
    setCartItems(newCartItems);
    // TODO: Persist the new quantity to the backend or state management solution
  };

  const deleteItem = (index: number) => {
    // Filter out the item to delete
    const newCartItems = cartItems.filter((_, idx) => idx !== index);
    setCartItems(newCartItems);
    // TODO: Remove the item from the cart in the backend or state management solution
  };

  // const handleUpdateQuantity = () => {};

  return cartData ? (
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
            {cartItems.map((item, index) => (
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
                      onClick={() => updateQuantity(index, item.quantity - 1)}
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
                      onClick={() => updateQuantity(index, item.quantity + 1)}
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
                    onClick={() => deleteItem(index)}
                    className="p-1 rounded-full border-0 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  ) : (
    <h1 className="text-3xl">LOADING</h1>
  );
};

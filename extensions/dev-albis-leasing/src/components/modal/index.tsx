import { Spinner } from "../spinner";

type ModalProps = {
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading: boolean;
};

export const Modal = ({ onSubmit, isLoading }: ModalProps) => {
  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-[16px] w-full max-w-[672px] max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-[16px] md:p-[20px] border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Albis Leasing Anfrage
            </h3>
            <button
              onClick={closeModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-[32px] h-[32px] ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="static-modal"
            >
              <svg
                className="w-[12px] h-[12px]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-[16px] md:p-[20px] space-y-[16px]">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Sie sind kurz davor eine Leasinganfrage an ALBIS Leasing zu
              senden. Sind Sie sicher, dass ihre Daten korrekt sind? Die
              Leasinganfrage kann im Nachhinein nicht verändert werden.
            </p>
          </div>
          <div className="flex items-center p-[16px] md:p-[20px] border-t border-gray-200 rounded-b-[4px] dark:border-gray-600">
            <button
              onClick={(e) => onSubmit(e)}
              data-modal-hide="static-modal"
              type="submit"
              className="min-w-[145px] h-[48px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[20px] py-[10px] text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? <Spinner /> : "Anfrage senden"}
            </button>
            <button
              onClick={closeModal}
              data-modal-hide="static-modal"
              type="button"
              className="h-[48px] py-[10px] px-[20px] ms-[12px] text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function openModal() {
  const modal = document.getElementById("static-modal");
  if (!modal) return;
  modal.style.display = "flex";
}

export function closeModal() {
  const modal = document.getElementById("static-modal");
  if (!modal) return;
  modal.style.display = "none";
}

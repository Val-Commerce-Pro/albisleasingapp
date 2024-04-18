import { useEffect } from "react";

type SnackbarProps = {
    text: string;
    success: boolean;
}

export const Snackbar = ({text, success}: SnackbarProps) => {
    useEffect(() => {
        closeSnackbar();
    }, []);

    return (
        <div id={success ? "toast-success" : "toast-danger"} className="fixed inset-x-0 mx-auto bottom-[20px] center-[20px] flex items-center w-full max-w-md p-[16px] mb-[16px] text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className={success ? "inline-flex items-center justify-center flex-shrink-0 w-[32px] h-[32px] text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200" : "inline-flex items-center justify-center flex-shrink-0 w-[32px] h-[32px] text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"}>
                <svg className="w-[20px] h-[20px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    {success ? 
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/> 
                        :
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                        }
                </svg>
            </div>
            <div className="ms-[12px] text-sm font-normal">{text}</div>
            <button onClick={closeSnackbar} type="button" className="ms-auto -mx-[6px] -my-[6px] bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-[6px] hover:bg-gray-100 inline-flex items-center justify-center h-[32px] w-[32px] dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target={success? "#toast-success" : "#toast-danger"} aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-[12px] h-[12px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    )
};

export const openSnackbar = () => {
    const snackbar = document.getElementById("toast-success") ?? document.getElementById("toast-danger");
    if(!snackbar) return
    snackbar.style.display = "flex";

    setTimeout(function(){snackbar.style.display = "none"}, 5000);
};

function closeSnackbar() {
    const snackbar = document.getElementById("toast-success") ?? document.getElementById("toast-danger");
    if(!snackbar) return
    snackbar.style.display = "none";
}
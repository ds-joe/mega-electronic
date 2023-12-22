// Dependencies
import {
  toast as createToast,
  ToastOptions,
  TypeOptions,
} from "react-toastify";
import { useMemo, ReactNode, createElement } from "react";
import { usePage } from "@inertiajs/react";

// Components
import ConfirmationToast from "@/Components/Toasts/ConfirmationToast";

/**
 * @desc This hook using to handle toast alerts.
 * @documentation https://fkhadra.github.io/react-toastify/introduction/
 * @returns
 */
const useToast = () => {
  const { settings } = usePage().props as ServerProps;
  const toastOptions = useMemo(
    (): ToastOptions => ({
      position: settings.direction === "rtl" ? "top-left" : "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      rtl: settings.direction === "rtl",
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: settings.dark_mode ? 'dark' : 'light',
    }),
    [settings]
  );

  /**
   * @desc This function using to create a toast.
   * @param { ReactNode } message
   * @param { TypeOptions } type
   * @param { ToastOptions } options
   * @returns
   */
  const toast = (
    message: ReactNode,
    type: TypeOptions = "default",
    options: ToastOptions | any = toastOptions
  ) => {
    switch (type) {
      case "default":
        createToast(message, options);
        break;
      case "error":
        createToast.error(message, options);
        break;
      case "success":
        createToast.success(message, options);
        break;
      case "warning":
        createToast.warning(message, options);
        break;
      case "info":
        createToast.info(message, options);
        break;
    }
  };

  /**
 * @desc This function using to create a confirmation toast.
 * @param { string|undefined } children
 * @param { ()=> void } onConfirm
 * @param { ()=> void } onClose
 * @return { void }
 */
  const confirmationToast = (children?: ReactNode, onConfirm?: () => void, onClose?: () => void): void => {
    const toastId = Math.random() * Math.random();
    const options: ToastOptions = {
      toastId,
      ...toastOptions,
      autoClose: false,
      onClose: onClose,
      closeOnClick: false,
    };
    function whenConfirm() {
      onConfirm && onConfirm();
      createToast.dismiss(toastId);
    }
    function whenClose() {
      onClose && onClose();
      createToast.dismiss(toastId);
    }

    createToast.warning(
      createElement(ConfirmationToast, {
        children,
        onClose: whenClose,
        onConfirm: whenConfirm,
      }),
      options
    );
  };



  return {
    toastOptions,
    toast,
    confirmationToast
  };
};

export default useToast;

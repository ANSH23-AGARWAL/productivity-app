import { toast } from 'react-toastify';

const baseOptions = {
  position: 'top-right',
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

export const notifySuccess = (message, options) =>
  toast.success(message, { ...baseOptions, ...options });

export const notifyError = (message, options) =>
  toast.error(message, { ...baseOptions, ...options });

export const notifyInfo = (message, options) =>
  toast.info(message, { ...baseOptions, ...options });

export const notifyWarning = (message, options) =>
  toast.warn(message, { ...baseOptions, ...options });

export const notifyPromise = (promise, messages, options) =>
  toast.promise(promise, messages, { ...baseOptions, ...options });

import CryptoJS from 'crypto-js';

export const encryptMessage = (message, password) => {
  return CryptoJS.AES.encrypt(message, password).toString();
};

export const decryptMessage = (encryptedMessage, password) => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, password);
  return bytes.toString(CryptoJS.enc.Utf8);
};
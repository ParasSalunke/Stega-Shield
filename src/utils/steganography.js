export const encodeMessageInImage = (imageDataUrl, message) => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.src = imageDataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const binaryMessage = message
          .split('')
          .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          .join('');

        if (binaryMessage.length > imgData.data.length / 4) {
          reject(new Error('Message is too long for this image'));
          return;
        }

        // Add message length at the beginning
        const messageLength = binaryMessage.length.toString(2).padStart(32, '0');
        const fullBinaryMessage = messageLength + binaryMessage;

        for (let i = 0; i < fullBinaryMessage.length; i++) {
          imgData.data[i * 4] = (imgData.data[i * 4] & 0xFE) | parseInt(fullBinaryMessage[i], 2);
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL());
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    } catch (error) {
      reject(error);
    }
  });
};

export const decodeMessageFromImage = (imageDataUrl) => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.src = imageDataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let binaryMessage = '';

        // Extract message length first (first 32 bits)
        for (let i = 0; i < 32; i++) {
          binaryMessage += (imgData.data[i * 4] & 1).toString();
        }

        const messageLength = parseInt(binaryMessage, 2);
        binaryMessage = '';

        // Extract actual message
        for (let i = 32; i < 32 + messageLength; i++) {
          binaryMessage += (imgData.data[i * 4] & 1).toString();
        }

        const message = binaryMessage
          .match(/.{8}/g)
          .map(byte => String.fromCharCode(parseInt(byte, 2)))
          .join('');

        resolve(message);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    } catch (error) {
      reject(error);
    }
  });
};
import { useState } from 'react';
import { decodeMessageFromImage } from '../utils/steganography.js';
import { decryptMessage } from '../utils/encryption.js';

const ImageDecoder = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [decodedMessage, setDecodedMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [requiresPassword, setRequiresPassword] = useState(false);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 5242880) { // 5MB limit
            setError('Image size should be less than 5MB');
            setSelectedImage(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target.result);
            setError('');
            setDecodedMessage('');
            setRequiresPassword(false);
            setPassword('');
        };
        reader.readAsDataURL(file);
    };

    const handleDecodeMessage = async () => {
        if (!selectedImage) {
            setError('Please upload an image first');
            return;
        }

        setIsProcessing(true);
        try {
            const extractedData = await decodeMessageFromImage(selectedImage);

            try {
                const parsedData = JSON.parse(extractedData);

                if (parsedData.type === 'protected') {
                    setRequiresPassword(true);

                    if (!password) {
                        setError('This image is password protected. Please enter the password.');
                        setIsProcessing(false);
                        return;
                    }

                    try {
                        const decryptedMessage = await decryptMessage(parsedData.data, password);
                        setDecodedMessage(decryptedMessage);
                        setError('');
                    } catch (err) {
                        setError('Invalid password or corrupted data', err.message);
                        return;
                    }
                } else {
                    // Handle unprotected messages
                    setDecodedMessage(parsedData.data || extractedData);
                }
            } catch (err) {
                // If JSON parsing fails, try to show the raw message
                console.warn('JSON parsing failed:', err.message);
                setDecodedMessage(extractedData);
            }
        } catch (err) {
            setError('No hidden message found or image is corrupted', err.message);
            setDecodedMessage('');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <section
            className="bg-white rounded-lg shadow-lg p-6"
            aria-labelledby="decoder-title"
        >
            <h1
                id="decoder-title"
                className="text-2xl font-bold text-gray-800 mb-6"
            >
                Image Decoder - Extract Hidden Messages
            </h1>

            <div
                className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6"
                role="region"
                aria-label="Instructions"
            >
                <div className="text-sm text-blue-700">
                    <strong className="font-semibold">How it works:</strong>
                    <ul className="list-disc ml-4 mt-2">
                        <li>Upload an image containing a hidden message (max 5MB)</li>
                        <li>If the image is password-protected, enter the password</li>
                        <li>Click &quot;Decode Message&quot; to extract the hidden content</li>
                    </ul>
                    <p className="mt-2">
                        🔒 All decoding happens securely in your browser - no data is sent to any server.
                    </p>
                    <p className="mt-2 text-xs">
                        Note: Only images encoded with our tools can be decoded. Regular images will show an error message.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col">
                    <label
                        htmlFor="encoded-image"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Upload Encoded Image
                    </label>
                    <input
                        title='Choose an image to decode'
                        id="encoded-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="file:mr-4 file:py-2 file:px-4 file:border-0
                             file:text-sm file:font-semibold file:bg-blue-50
                             file:text-blue-700 hover:file:bg-blue-100"
                        aria-describedby="image-requirements"
                    />
                    <span
                        id="image-requirements"
                        className="text-xs text-gray-500 mt-1"
                    >
                        Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                    </span>
                </div>

                {selectedImage && (
                    <div
                        className="mt-4"
                        role="img"
                        aria-label="Selected encoded image"
                    >
                        <img
                            src={selectedImage}
                            alt="Selected encoded image preview"
                            className="max-h-64 rounded-lg object-contain mx-auto"
                            loading="lazy"
                        />
                    </div>
                )}

                {requiresPassword && (
                    <div
                        className="flex flex-col space-y-2"
                        role="group"
                        aria-labelledby="password-label"
                    >
                        <label
                            id="password-label"
                            htmlFor="decode-password"
                            className="text-sm font-medium text-gray-700"
                        >
                            🔒 Password Protected Image
                        </label>
                        <input
                            id="decode-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password to decode"
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            aria-required="true"
                        />
                    </div>
                )}

                {error && (
                    <div
                        role="alert"
                        className="text-red-500 text-sm"
                    >
                        {error}
                    </div>
                )}

                <button
                    onClick={handleDecodeMessage}
                    disabled={!selectedImage || isProcessing}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md
                           hover:bg-blue-700 focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50
                           disabled:cursor-not-allowed cursor-pointer"
                    aria-busy={isProcessing}
                >
                    {isProcessing ? 'Decoding...' : 'Decode Message'}
                </button>

                {isProcessing && (
                    <div
                        role="status"
                        className="text-blue-600 text-center"
                        aria-live="polite"
                    >
                        Decoding message...
                    </div>
                )}

                {decodedMessage && (
                    <div
                        className="mt-4"
                        role="region"
                        aria-labelledby="decoded-message-title"
                    >
                        <h2
                            id="decoded-message-title"
                            className="text-lg font-semibold text-gray-800 mb-2"
                        >
                            Decoded Message
                        </h2>
                        <div
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                            role="textbox"
                            aria-readonly="true"
                        >
                            {decodedMessage}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ImageDecoder;
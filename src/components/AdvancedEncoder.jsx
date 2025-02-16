import { useState } from 'react';
import { encodeMessageInImage } from '../utils/steganography.js';
import { encryptMessage } from '../utils/encryption.js';

const AdvancedEncoder = () => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [settings, setSettings] = useState({
        quality: 'high',
        password: '',
        compressionLevel: 0.9,
        messageType: 'text'
    });
    const [hiddenImage, setHiddenImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const qualityPresets = {
        high: { compression: 0.9, capacity: 'Lower' },
        medium: { compression: 0.7, capacity: 'Medium' },
        low: { compression: 0.5, capacity: 'Higher' }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5242880) {
                setError('Image size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEncode = async () => {
        if (!image || !message.trim()) {
            setError('Please provide both an image and content to hide');
            return;
        }

        if (!settings.password) {
            setError('Password is required for encoding');
            return;
        }

        setIsProcessing(true);
        try {
            // Encrypt the message first
            const encryptedData = await encryptMessage(message, settings.password);

            // Create a structured message object
            const processedMessage = JSON.stringify({
                type: 'protected',
                data: encryptedData,
                timestamp: new Date().toISOString()
            });

            const encodedImage = await encodeMessageInImage(
                image,
                processedMessage,
                qualityPresets[settings.quality].compression
            );

            setHiddenImage(encodedImage);
            setError('');
        } catch (err) {
            setError(`Failed to encode content: ${err.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!hiddenImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the original image
            ctx.drawImage(img, 0, 0);

            // Add watermark
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '20px Arial';
            ctx.fillText('🔒 Password Protected', 20, 40);

            // Create download link
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'protected_image.png';
            link.click();
        };

        img.src = hiddenImage;
    };

    return (
        <section
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
            aria-labelledby="advanced-encoder-title"
        >
            <h1
                id="advanced-encoder-title"
                className="text-2xl font-bold text-gray-800 mb-6"
            >
                Advanced Image Encoder
            </h1>

            <div
                className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6"
                role="region"
                aria-label="Instructions"
            >
                <div className="text-sm text-blue-700">
                    <strong className="font-semibold">How it works:</strong>
                    <ul className="list-disc ml-4 mt-2">
                        <li>Upload an image (max 5MB)</li>
                        <li>Choose quality setting (affects message capacity)</li>
                        <li>Set a password for security</li>
                        <li>Enter your message and encode</li>
                    </ul>
                    <p className="mt-2">
                        🔒 Password protection ensures only authorized users can decode your message.
                    </p>
                    <p className="mt-2 text-xs">
                        Tip: Higher quality = smaller capacity, lower quality = larger capacity.
                        All processing happens locally in your browser.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="cover-image"
                                className="text-sm font-medium text-gray-700 mb-2"
                            >
                                Upload Cover Image
                            </label>
                            <input
                                title='Choose an image to encode'
                                id="cover-image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
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

                        {image && (
                            <div
                                className="mt-4"
                                role="img"
                                aria-label="Preview of cover image"
                            >
                                <img
                                    src={image}
                                    alt="Cover image preview"
                                    className="max-h-48 rounded-lg object-contain"
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="quality-settings"
                                className="text-sm font-medium text-gray-700 mb-2"
                            >
                                Encoding Settings
                            </label>
                            <select
                                id="quality-settings"
                                value={settings.quality}
                                onChange={(e) => setSettings({ ...settings, quality: e.target.value })}
                                className="w-full p-2 border rounded-md"
                                aria-describedby="quality-description"
                            >
                                {Object.entries(qualityPresets).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)} Quality ({value.capacity} capacity)
                                    </option>
                                ))}
                            </select>
                            <span
                                id="quality-description"
                                className="text-xs text-gray-500 mt-1"
                            >
                                Select quality level - affects how much data can be hidden
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="encode-password"
                                className="text-sm font-medium text-gray-700 mb-2"
                            >
                                Password (Required)
                            </label>
                            <input
                                id="encode-password"
                                type="password"
                                placeholder="Enter password"
                                value={settings.password}
                                onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                                className="w-full p-2 border rounded-md"
                                required
                                aria-required="true"
                                aria-describedby="password-requirements"
                            />
                            <span
                                id="password-requirements"
                                className="text-xs text-gray-500 mt-1"
                            >
                                Password is required to secure your hidden message
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="secret-content"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Content to Hide
                    </label>
                    <textarea
                        id="secret-content"
                        className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter content to hide..."
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        aria-describedby="content-requirements"
                    />
                    <span
                        id="content-requirements"
                        className="text-xs text-gray-500 mt-1"
                    >
                        Enter the message you want to hide in the image
                    </span>
                </div>

                {error && (
                    <div
                        role="alert"
                        className="text-red-500 text-sm"
                    >
                        {error}
                    </div>
                )}

                <button
                    onClick={handleEncode}
                    disabled={!image || !message.trim() || !settings.password || isProcessing}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md
                             hover:bg-blue-700 focus:outline-none focus:ring-2
                             focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50
                             disabled:cursor-not-allowed cursor-pointer"
                    aria-busy={isProcessing}
                >
                    {isProcessing ? 'Processing...' : 'Encode Content'}
                </button>

                {hiddenImage && (
                    <div
                        className="mt-6 space-y-4"
                        role="region"
                        aria-labelledby="result-title"
                    >
                        <h2
                            id="result-title"
                            className="text-lg font-semibold text-gray-800"
                        >
                            Result
                        </h2>
                        <img
                            src={hiddenImage}
                            alt="Image with encoded message"
                            className="max-h-48 rounded-lg object-contain"
                            loading="lazy"
                        />

                        <button
                            onClick={handleDownload}
                            className="block w-full text-center py-2 px-4 border border-blue-600
                                     text-blue-600 rounded-md hover:bg-blue-50 cursor-pointer"
                            aria-label="Download image with hidden message"
                        >
                            Download Protected Image
                        </button>

                        <p
                            className="text-sm text-gray-500 text-center"
                            role="note"
                        >
                            🔒 This image requires a password to decode the hidden message
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdvancedEncoder;
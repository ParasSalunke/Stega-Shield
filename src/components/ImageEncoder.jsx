import { useState } from 'react';
import { encodeMessageInImage } from '../utils/steganography.js';

const ImageEncoder = () => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [hiddenImage, setHiddenImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5242880) { // 5MB limit
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

    const handleHideMessage = async () => {
        if (!image || !message.trim()) {
            setError('Please provide both an image and a message');
            return;
        }

        setIsProcessing(true);
        try {
            const encodedImage = await encodeMessageInImage(image, message);
            setHiddenImage(encodedImage);
            setError('');
        } catch (err) {
            setError(`Failed to encode message: ${err.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const link = document.createElement('a');
            link.href = hiddenImage;
            link.download = 'encoded_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            setError(`Failed to download image: ${err.message}`);
        } finally {
            setIsDownloading(false);
        }
    };

    const isButtonDisabled = !image || !message.trim() || isProcessing;

    return (
        <section
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
            aria-labelledby="encoder-title"
        >
            <h1
                id="encoder-title"
                className="text-2xl font-bold text-gray-800 mb-6"
            >
                Image Encoder - Hide Secret Messages in Images
            </h1>

            <div
                className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6"
                role="region"
                aria-label="Instructions"
            >
                <p className="text-sm text-blue-700">
                    <span className="font-semibold">How it works:</span>
                    <ul className="list-disc ml-4 mt-2">
                        <li>Upload any image (max 5MB)</li>
                        <li>Type or paste your secret message</li>
                        <li>Click &quot;Hide Message&quot; to encode</li>
                        <li>Download the encoded image to share</li>
                    </ul>
                    <p className="mt-2">
                        🔒 Your data never leaves your browser - all processing happens locally.
                    </p>
                    <p className="mt-2 text-xs">
                        Note: Larger messages require bigger images. The app will notify you if your
                        message is too long for the selected image.
                    </p>
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col">
                    <label
                        htmlFor="image-upload"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Upload Image
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:border-0
                            file:text-sm file:font-semibold file:bg-blue-50
                            file:text-blue-700 hover:file:bg-blue-100"
                        aria-describedby="file-requirements"
                    />
                    <span
                        id="file-requirements"
                        className="text-xs text-gray-500 mt-1"
                    >
                        Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                    </span>
                </div>

                {image && (
                    <div className="mt-4">
                        <img
                            src={image}
                            alt="Original image selected for encoding"
                            className="max-h-64 rounded-lg object-contain mx-auto"
                            loading="lazy"
                        />
                    </div>
                )}

                <div className="flex flex-col">
                    <label
                        htmlFor="secret-message"
                        className="text-sm font-medium text-gray-700 mb-2"
                    >
                        Secret Message
                    </label>
                    <textarea
                        id="secret-message"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your secret message here..."
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        aria-describedby="message-requirements"
                    />
                    <span
                        id="message-requirements"
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
                    onClick={handleHideMessage}
                    disabled={isButtonDisabled}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md
                        hover:bg-blue-700 focus:outline-none focus:ring-2
                        focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50
                        disabled:cursor-not-allowed cursor-pointer"
                    aria-busy={isProcessing}
                >
                    {isProcessing ? 'Encoding message...' : 'Hide Message'}
                </button>

                {hiddenImage && (
                    <div
                        className="mt-6 space-y-4"
                        role="region"
                        aria-label="Encoded image result"
                    >
                        <h2 className="text-lg font-semibold text-gray-800">
                            Encoded Image
                        </h2>
                        <img
                            src={hiddenImage}
                            alt="Image with hidden message encoded"
                            className="max-h-64 rounded-lg object-contain mx-auto"
                            loading="lazy"
                        />
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="block w-full text-center py-2 px-4 border border-blue-600
                                text-blue-600 rounded-md hover:bg-blue-50 disabled:opacity-50
                                disabled:cursor-not-allowed cursor-pointer"
                            aria-busy={isDownloading}
                        >
                            {isDownloading ? 'Downloading image...' : 'Download Encoded Image'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ImageEncoder;
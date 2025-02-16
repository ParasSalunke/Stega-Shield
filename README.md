<div align="center">
  <img src="public/logo.png" alt="Stega-Shield Logo" width="200" height="200"/>

  # Stega-Shield

  <p>A modern steganography tool for secure message hiding in images</p>

  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/ParasSalunke/Stega-Shield/blob/main/LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  [![GitHub Stars](https://img.shields.io/github/stars/ParasSalunke/Stega-Shield)](https://github.com/ParasSalunke/Stega-Shield/stargazers)
  [![GitHub Issues](https://img.shields.io/github/issues/ParasSalunke/Stega-Shield)](https://github.com/ParasSalunke/Stega-Shield/issues)
  [![GitHub Forks](https://img.shields.io/github/forks/ParasSalunke/Stega-Shield)](https://github.com/ParasSalunke/Stega-Shield/network/members)
  [![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/ParasSalunke/Stega-Shield/issues)
  [![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg)](https://reactjs.org/)
  [![Powered by Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF.svg)](https://vitejs.dev/)

  <div align="center">
    <a href="https://stega-shield.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/ParasSalunke/Stega-Shield/issues">Report Bug</a>
    ·
    <a href="https://github.com/ParasSalunke/Stega-Shield/issues">Request Feature</a>
  </div>
</div>

---

<div align="center">
  <video src="https://github.com/user-attachments/assets/216f59f0-72a4-4a82-a74d-e7f9aa21a855" controls>
    Your browser does not support the video tag.
  </video>
</div>

# 🛡️Stega-Shield

Stega-Shield is a modern web application that lets you hide secret messages within images using steganography and encryption. Built with React and TailwindCSS, it provides a secure and user-friendly way to encode and decode hidden messages.

> Designed and developed by [Paras Salunke](https://www.linkedin.com/in/salunkeparasofficial)

## ✨Features

- **Image-based Steganography**: Securely hide text messages within images
- **Encryption Support**: Optional password protection using AES encryption
- **Multiple Encoding Options**:
  - Basic Encoder: Simple message hiding
  - Advanced Encoder: Password-protected messages with quality settings
  - Decoder: Extract hidden messages with password support
- **Security Features**:
  - Client-side processing only - no data leaves your browser
  - AES encryption for password-protected messages
  - Support for various image formats (PNG, JPG, GIF)
- **User Experience**:
  - Real-time image preview
  - Responsive design with TailwindCSS
  - Detailed error handling and user feedback
  - 5MB file size limit for optimal performance
  - Accessibility features including ARIA labels

## 🛠️Tech Stack

- **React** (v19.0.0) - Core UI framework
- **Vite** (v6.1.0) - Build tool and development server
- **Crypto-js** (v4.2.0) - AES encryption for message protection
- **TailwindCSS** (v4.0.6) - Utility-first CSS framework
- **React Icons** (v5.4.0) - Icon components

## 🧩Components

### ImageEncoder
- Basic encoding functionality
- Supports image upload up to 5MB
- Real-time preview
- Download encoded images

### AdvancedEncoder
- Password protection
- Quality settings (High/Medium/Low)
- Enhanced message capacity options
- Visual watermark for protected images

### ImageDecoder
- Extracts hidden messages
- Supports encrypted and non-encrypted messages
- Password input for protected content
- Clear feedback and error handling

## 🔧Technical Implementation

### Steganography (steganography.js)
- LSB (Least Significant Bit) implementation
- Binary message encoding
- Message length preservation
- Canvas-based image processing

### Encryption (encryption.js)
- AES encryption using CryptoJS
- Secure message protection
- Password-based decryption

### Security (crypto-js Library)
  - AES encryption for message protection
  - Secure password-based encryption/decryption
  - Industry-standard cryptographic functions


## 🚀Installation

1. Clone the repository:
```bash
git clone https://github.com/ParasSalunke/Stega-Shield.git
```

2. Navigate to project directory:
```bash
cd stega-shield
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start development server:
```bash
npm run dev
# or
yarn dev
```

5. Build for production:
```bash
npm run build
# or
yarn build
```

Your application will be available at `http://localhost:5173` by default.

> 💡 **Note**: Make sure you have Node.js (v16 or higher) and npm/yarn installed on your system.

### Quick Setup (Single Command)

```bash
git clone https://github.com/ParasSalunke/Stega-Shield.git && cd stega-shield && npm install && npm run dev
```

## 📁Project Structure

```
src/
├── components/
│   ├── AdvancedEncoder.jsx # Enhanced encoding with encryption
│   ├── Footer.jsx          # Application footer
│   ├── GitHubButton.jsx    # GitHub repository button
│   ├── Header.jsx          # Application header
│   ├── ImageDecoder.jsx    # Message extraction component
│   └── ImageEncoder.jsx    # Basic encoding component
│ 
├── utils/
│   ├── steganography.js    # Image processing utilities
│   └── encryption.js       # Encryption handling
│   
└── App.jsx                 # Main Interface

```

## 🔒Security Notes

- All processing happens client-side
- Messages can be optionally encrypted with AES
- No data is transmitted to external servers
- Image data is handled securely in memory

## 🤝Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📝License

This project is licensed under the MIT License.

MIT License

Copyright (c) 2025 [Paras Nitin Salunke]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

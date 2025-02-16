import { FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-8">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-gray-600 text-sm flex items-center gap-2">
            Designed and Developed by
            <a
              href="https://www.parassalunke.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
            >
              Paras Salunke
            </a>
          </p>
          <div className="flex items-center space-x-4 mt-2">
            <a
              href="https://www.linkedin.com/in/salunkeparasofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@ParasSalunke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/paras_salunke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/Paras__Salunke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FaXTwitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/ParasSalunkeOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FaFacebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@ParasSalunke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FaYoutube className="h-5 w-5" />
            </a>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            © {new Date().getFullYear()} Stega Shield. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
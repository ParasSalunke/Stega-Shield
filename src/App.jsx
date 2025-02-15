import { useState } from 'react';
import Header from './components/Header';
import ImageEncoder from './components/ImageEncoder';
import ImageDecoder from './components/ImageDecoder';
import AdvancedEncoder from './components/AdvancedEncoder';
import Footer from './components/Footer';

const App = () => {
  const [activeTab, setActiveTab] = useState('encode');

  const tabs = [
    {
      id: 'encode', name: 'Image Encoder', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      id: 'decode', name: 'Image Decoder', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      )
    },
    {
      id: 'advanced', name: 'Advanced', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select a tab</label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    title={tab.name}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }
                      group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                      cursor-pointer focus:outline-none
                    `}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-8">
            {activeTab === 'encode' && <ImageEncoder />}
            {activeTab === 'decode' && <ImageDecoder />}
            {activeTab === 'advanced' && <AdvancedEncoder />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
import GitHubButton from './GitHubButton';
import shieldIcon from '/logo.png';

const Header = () => {
  const repoOwner = 'ParasSalunke';
  const repoName = 'stega-shield';

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center p-1.5 sm:p-2">
              <img
                title='Stega Shield Logo'
                src={shieldIcon}
                alt="Shield Icon"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <h1
                title='Stega Shield'
                className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight"
              >
                Stega Shield
              </h1>
              <p
                title='Secure Image Steganography Tool'
                className="text-[10px] sm:text-sm text-gray-600 leading-tight"
              >
                Secure Image Steganography Tool
              </p>
            </div>
          </div>

          <GitHubButton repoOwner={repoOwner} repoName={repoName} />
        </div>
      </div>
    </header>
  );
};

export default Header;
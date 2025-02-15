import GitHubButton from './GitHubButton';
import shieldIcon from '/logo.png';

const Header = () => {
  const repoOwner = 'ParasSalunke';
  const repoName = 'stega-shield';

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col space-y-4 sm:space-y-0 items-center justify-between sm:flex-row">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-600 rounded-lg flex items-center justify-center p-2">
              <img
                title='Stega Shield Logo'
                src={shieldIcon}
                alt="Shield Icon"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <h1 title='Stega Shield' className="ml-3 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Stega Shield
              </h1>
              <p title='Secure Image Steganography Tool' className="ml-3 text-xs sm:text-sm text-gray-600">
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
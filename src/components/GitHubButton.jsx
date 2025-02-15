import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FaGithub, FaStar } from 'react-icons/fa';

const GitHubButton = ({ repoOwner, repoName }) => {
    const [starCount, setStarCount] = useState(0);

    useEffect(() => {
        const fetchStarCount = async () => {
            try {
                const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`);
                const data = await response.json();
                setStarCount(data.stargazers_count);
            } catch (error) {
                console.error('Error fetching star count:', error);
            }
        };

        fetchStarCount();
    }, [repoOwner, repoName]);

    return (
        <a
            href={`https://github.com/${repoOwner}/${repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
        >
            <FaGithub className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Star</span>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded">
                <FaStar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-sm sm:text-base">{starCount}</span>
            </div>
        </a>
    );
};

GitHubButton.propTypes = {
    repoOwner: PropTypes.string.isRequired,
    repoName: PropTypes.string.isRequired,
};

export default GitHubButton;
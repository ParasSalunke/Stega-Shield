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
            title='GitHub Repository'
            href={`https://github.com/${repoOwner}/${repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2 py-1 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
            <FaGithub className="h-4 w-4" />
            <span className="border-l border-gray-600 pl-2">{starCount}</span>
            <FaStar className="h-3 w-3 text-yellow-400" />
        </a>
    );
};

GitHubButton.propTypes = {
    repoOwner: PropTypes.string.isRequired,
    repoName: PropTypes.string.isRequired,
};

export default GitHubButton;
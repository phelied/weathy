/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    "transform": {
        "^.+\\.[t|j]sx?$": "babel-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    "transformIgnorePatterns": [
        "node_modules/(?!@shotgunjed)/"
    ]
    ,
};

module.exports = config;
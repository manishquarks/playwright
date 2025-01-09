const os = require('os');
const path = require('path');

const automationType = process.env.AUTOMATION_TYPE || 'web';
let testDir = './tests';

if (automationType === 'api') {
    testDir = './tests-api';
}

const globalConfig = {
    testDir: process.env.TEST_DIR || testDir,
    retries: parseInt(process.env.RETRIES || '0', 10) || 0,
    workers: parseInt(process.env.WORKERS || '3', 10) || 3,
    fullyParallel: process.env.FULLY_PARALLEL === 'true',
    timeout: parseInt(process.env.TIMEOUT || '60000', 10),
    expect: {
        timeout: parseInt(process.env.EXPECT_TIMEOUT || '5000', 10),
    },
    reporter: process.env.REPORTER || [['html'],
    [
        'allure-playwright',
        {
            outputFolder: 'allure-results',
            suiteTitle: true,
            detail: true,
            environmentInfo: {
                project: 'Unizon Web Automation',
                framework: 'playwright-js',
                browserName: process.env.BROWSER_NAME || 'chromium',
                headless: process.env.HEADLESS === 'true',
                os_platform: os.platform(),
                os_release: os.release(),
                os_version: os.version(),
            },
        }
    ]
    ],
    use: {
        browserName: process.env.BROWSER_NAME || 'chromium',
        headless: false,
        ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',
        screenshot: process.env.SCREENSHOT || 'only-on-failure',
        video: process.env.VIDEO || 'retain-on-failure',
        trace: process.env.TRACE || 'on-first-retry',
        launchOptions: {
            args: ["--start-maximized"],
        },
    },

    // globalTeardown: require.resolve(path.join(__dirname, '..', 'global-teardown.js')),
};

export { globalConfig };

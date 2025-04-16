module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: [
            'src/features/step_definitions/**/*.ts',
            'src/support/**/*.ts'
        ],
        paths: ['src/features/**/*.feature'],
        format: ['progress-bar', 'json:reports/json/cucumber-report.json'],
        formatOptions: {
            snippetInterface: 'async-await'
        },
        timeout: 20000  // 20 seconds timeout
    }
};
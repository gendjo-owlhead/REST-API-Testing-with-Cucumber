import * as report from 'multiple-cucumber-html-reporter';
import * as path from 'path';
import * as fs from 'fs';

try {
    // Use process.cwd() to get the current working directory
    const reportPath = path.join(process.cwd(), 'reports');
    const jsonDir = path.join(reportPath, 'json');
    const htmlDir = path.join(reportPath, 'html');

    // Ensure directories exist
    if (!fs.existsSync(jsonDir)) {
        fs.mkdirSync(jsonDir, { recursive: true });
    }
    if (!fs.existsSync(htmlDir)) {
        fs.mkdirSync(htmlDir, { recursive: true });
    }

    report.generate({
        jsonDir: jsonDir,
        reportPath: htmlDir,
        displayDuration: true,
        durationInMS: true,
        metadata: {
            browser: {
                name: 'API Tests',
                version: 'REST API'
            },
            device: 'Local Machine',
            platform: {
                name: 'macOS',
                version: process.platform
            }
        },
        customData: {
            title: 'Test Execution Info',
            data: [
                { label: 'Project', value: 'REST API Testing' },
                { label: 'Release', value: '1.0.0' },
                { label: 'Execution Start Time', value: new Date().toISOString() },
                { label: 'Node Version', value: process.version }
            ]
        },
        pageTitle: 'REST API Test Report',
        reportName: 'REST API Test Execution Report',
        openReportInBrowser: true
    });
    console.log('Report generated successfully!');
} catch (error) {
    console.error('Error generating report:', error);
    process.exit(1);
}
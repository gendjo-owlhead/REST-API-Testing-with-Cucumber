declare module 'multiple-cucumber-html-reporter' {
    interface ReportOptions {
        jsonDir: string;
        reportPath: string;
        displayDuration?: boolean;
        durationInMS?: boolean;
        metadata?: {
            browser?: {
                name: string;
                version: string;
            };
            device?: string;
            platform?: {
                name: string;
                version: string;
            };
        };
        customData?: {
            title: string;
            data: Array<{
                label: string;
                value: string;
            }>;
        };
        pageTitle?: string;
        reportName?: string;
        openReportInBrowser?: boolean;
    }

    export function generate(options: ReportOptions): void;
}
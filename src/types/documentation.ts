export interface ComponentDocumentation {
    name: string;
    description: string;
    preview: {
        width: number;
        height: number;
        backgroundColor: string;
        borderRadius?: number;
    };
    usage: string;
    bestPractices: string;
    dosAndDonts: string;
    accessibility: string;
    storybookUrl?: string;
    variants?: {
        name: string;
        description: string;
        preview: {
            width: number;
            height: number;
            backgroundColor: string;
            borderRadius?: number;
        };
    }[];
    codeExamples?: {
        language: string;
        code: string;
    }[];
}

export interface DocumentationDatabase {
    [componentName: string]: ComponentDocumentation;
} 
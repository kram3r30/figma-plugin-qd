export interface ComponentProps {
    name: string;
    type: string;
    width: number;
    height: number;
    constraints: Constraints;
    effects: readonly Effect[];
    fills: Paint[] | PluginAPI['mixed'];
    strokes: Paint[];
}

export interface AIResponse {
    role: 'assistant' | 'user';
    content: string;
} 
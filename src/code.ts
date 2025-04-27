// code.ts      
// Sample documentation data - In a real implementation, this would come from an API or database
import { DocumentationDatabase, ComponentDocumentation } from './types/documentation';
import { componentDocs } from './data/components'; // Import the actual data
// import { askAI } from './services/ai-service'; // Assuming this is refactored or replaced by local logic

console.log('[code.ts] Plugin code starting...');

// Add cache object after imports
const responseCache: Record<string, { response: string; timestamp: number }> = {};

// Main plugin logic
async function main() {
    console.log('[code.ts] Main function started.');

    // Show the UI
    figma.showUI(__html__, { width: 430, height: 584 });
    console.log('[code.ts] UI shown.');

    // Send the initial component documentation data to the UI
    figma.ui.postMessage({ type: 'load-documentation', data: componentDocs });
    console.log('[code.ts] Component documentation sent to UI.');

    // Listen for selection changes
    figma.on('selectionchange', () => {
        const selection = figma.currentPage.selection;
        if (selection.length === 1) {
            const node = selection[0];
            // Check if the selected node is a component or instance
            if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
                const componentName = node.name;
                // Send the selected component name to the UI
                figma.ui.postMessage({
                    type: 'component-selected',
                    componentName: componentName
                });
                console.log(`[code.ts] Component selected: ${componentName}`);
            }
        }
    });

    // Handle messages received from the UI
    figma.ui.onmessage = async (msg) => {
        // console.log('[code.ts] Message received:', msg); // REMOVED this line

        if (!msg || typeof msg !== 'object') {
            console.warn('[code.ts] Invalid message format');
            return;
        }

        switch (msg.type) {
            case 'resize':
                // Add type check for safety
                if (typeof msg.width === 'number' && typeof msg.height === 'number') {
                    figma.ui.resize(msg.width, msg.height);
                } else {
                    console.warn('[code.ts] Invalid resize message payload:', msg);
                }
                break;

            case 'close':
                figma.closePlugin();
                break;

            case 'ask-ai':
                if (typeof msg.question === 'string' && typeof msg.component === 'string') {
                    await handleAskAi(msg as { type: 'ask-ai', question: string, component: string });
                } else {
                    console.error('[code.ts] Invalid ask-ai message payload:', msg);
                    // Send a standard error message back
                    sendAiResponseToUi('Error', 'Invalid message format. Expected "component" and "question" properties.', true);
                }
                break;
            
            // Add case for the initial data request from ui.ts (if needed, otherwise remove)
            case 'get-initial-data':
                console.log('[code.ts] Received request for initial data from UI.');
                figma.ui.postMessage({ type: 'load-documentation', data: componentDocs });
                console.log('[code.ts] Sent initial documentation back to UI.');
                break;

            case 'open-storybook':
                if (typeof msg.component === 'string') {
                    const componentName = msg.component;
                    const doc = componentDocs[componentName];
                    if (doc && doc.storybookUrl) {
                        console.log(`[code.ts] Opening Storybook URL for ${componentName}: ${doc.storybookUrl}`);
                        figma.openExternal(doc.storybookUrl);
                    } else {
                        console.warn(`[code.ts] Storybook URL not found for component: ${componentName}`);
                        // Optionally notify the UI about the missing link
                        figma.notify(`Storybook link not found for ${componentName}.`, { error: true });
                    }
                } else {
                    console.error('[code.ts] Invalid open-storybook message payload:', msg);
                }
                break;

            default:
                console.warn(`[code.ts] Unknown message type received: ${msg?.type}`);
        }
    };
}

// AI Request Handler (Reverted to Non-Streaming)
async function handleAskAi(msg: { question: string, component: string }) {
    console.log('[code.ts] Handling AI question (non-streaming): ', msg.question, 'for component:', msg.component);
    
    // Create a cache key
    const cacheKey = `${msg.component}:${msg.question}`;
    
    // Check if the response is in the cache and not expired (e.g., 5 minutes)
    const cachedResponse = responseCache[cacheKey];
    const now = Date.now();
    const CACHE_EXPIRY = 15 * 60 * 1000; // 15 minutes in milliseconds
    
    if (cachedResponse && (now - cachedResponse.timestamp) < CACHE_EXPIRY) {
        console.log('[code.ts] Returning cached response for:', cacheKey);
        sendAiResponseToUi(msg.component, cachedResponse.response, false);
        return;
    }
    
    try {
        const prompt = buildPrompt(msg.component, msg.question);
        
        // Call Ollama and wait for the full response
        const result = await callOllamaApiNonStreamed(prompt);

        // Check if the response structure is as expected
        if (result && typeof result.response === 'string') {
            // Store the response in the cache
            responseCache[cacheKey] = {
                response: result.response,
                timestamp: now
            };
            sendAiResponseToUi(msg.component, result.response, false);
        } else {
            console.error('[code.ts] Unexpected response structure from Ollama:', result);
            throw new Error('Received an unexpected response format from the AI service.');
        }

    } catch (error) {
        console.error('[code.ts] Error during AI request (raw):', error);
        console.error(`[code.ts] Raw error type: ${typeof error}, message: ${error instanceof Error ? error.message : 'N/A'}`);
        const errorMessage = formatErrorMessage(error);
        sendAiResponseToUi(msg.component, errorMessage, true);
    }
}

// Ollama API Interaction (Non-Streaming Version)
const OLLAMA_URL = 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = 'llama3:8b';

async function callOllamaApiNonStreamed(prompt: string) {
    console.log(`[code.ts] Calling Ollama API (${OLLAMA_MODEL}) at: ${OLLAMA_URL} (non-streaming).`);

    const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: OLLAMA_MODEL,
            prompt: prompt,
            stream: false // Ensure streaming is disabled
        })
    });

    console.log(`[code.ts] Ollama API response status: ${response.status}`);
    // logHeaders(response.headers); // Optional: log headers if needed

    if (!response.ok) { // Check for non-2xx status codes first
        const errorText = await response.text().catch(() => 'Could not read error body');
        console.error(`[code.ts] Ollama API request failed. Status: ${response.status}, Body: ${errorText}`);
        throw new Error(`Ollama API request failed with status ${response.status}`);
    }

    // Parse the full JSON response
    try {
    const data = await response.json();
        console.log('[code.ts] Ollama JSON response received.');
    return data;
    } catch (jsonError) {
        console.error('[code.ts] Failed to parse Ollama JSON response:', jsonError);
        throw new Error('Failed to parse the response from the AI service.');
    }
}

// Prompt Construction (Remains the same)
function buildPrompt(componentName: string, question: string): string {
    return `
You are Gator, a friendly Design System documentation expert.

Role:
- Provide clear, authoritative guidance on using design system components.
- Structure responses like official documentation.

Instructions:
- Important: Use plain text formatting only (no markdown: **bold**, *, \`, #, ###, etc.).
- Use bullet points to make the response more engaging.
- Use emojis to make the response more engaging. Important: Use the correct emojis.
- Write in a clear, friendly tone.
- Use the following format for the response: 
- Important: Keep the responses concise and to the point.
   
<h3>Component Name</h3>
<p>Component Description</p>

<h3>Component: ${componentName}</h3>
<p>Question: ${question}</p>

<p>Respond based on established design system principles.</p>
`;
}

// Utility Functions

function sendAiResponseToUi(componentName: string, response: string, isError: boolean) {
    figma.ui.postMessage({
        type: 'ai-response', // Use standard response for errors and success
        componentName: componentName, 
        response: response,
        error: isError,
        timestamp: Date.now()
    });
}

// formatErrorMessage remains largely the same, potentially remove stream-specific errors if desired
function formatErrorMessage(error: unknown): string {
    let message = 'An unexpected error occurred while contacting the AI service.';
    if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
            message = `Could not connect to Ollama at ${OLLAMA_URL}. Please ensure Ollama is running and accessible. Is the model '${OLLAMA_MODEL}' installed?`;
        } else if (error.message.includes('Ollama API request failed')) { // Keep general API failure
             message = `The AI service returned an error: ${error.message}. Check Ollama server logs.`;
        } else if (error.message.includes('Failed to parse the response')) {
             message = `Error processing the AI response: ${error.message}.`;
        } else {
             message = error.message; // Use raw error message for other cases
        }
    }
     console.log('[code.ts] Formatted error message:', message);
    return message;
}

// logHeaders can remain the same, called optionally
function logHeaders(headers: Headers | undefined) {
    if (!headers) return;
    const headerObj: Record<string, string> = {};
    try {
        headers.forEach((value, key) => {
            headerObj[key] = value;
        });
        console.log(`[code.ts] Ollama response headers:`, headerObj);
    } catch (err) {
        console.log(`[code.ts] Could not read response headers:`, err);
    }
}

// Run Main
main().catch(err => {
    console.error("[code.ts] Error running plugin:", err);
    figma.closePlugin("An error occurred.");
});
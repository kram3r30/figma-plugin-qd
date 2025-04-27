console.log('[ui.ts] UI Script loaded!');

interface ComponentData {
    name: string;
    usage: string;
    bestPractices: string;
    dosAndDonts: string;
    accessibility: string;
    storybookUrl: string;
}

// --- Sample Data (Fallback) ---
const sampleComponentData: ComponentData = {
    name: "Button",
    usage: `<p>Buttons are interactive elements that trigger actions.</p><h4>Common Uses:</h4><ul><li>Form submissions</li><li>Modal triggers</li></ul>`,
    bestPractices: `<ul><li>Use clear labels</li><li>Maintain consistent styling</li></ul>`,
    dosAndDonts: `<h4>Do:</h4><ul><li>Use verb-first labels</li></ul><h4>Don't:</h4><ul><li>Use generic labels</li></ul>`,
    accessibility: `<h4>Requirements:</h4><ul><li>Keyboard accessible</li><li>Sufficient contrast</li></ul>`,
    storybookUrl: "#"
};

// --- State Variables ---
let currentComponent: ComponentData | null = null; // Start with null, wait for data
let componentDocsData: Record<string, ComponentData> = {};
let isSelectorPopulated: boolean = false; // NEW: Flag for population status
let pendingSelectedComponent: string | null = null; // NEW: Store pending selection

// --- DOM Elements (Cached) ---
let componentSelect: HTMLSelectElement | null = null;
let optionsGrid: HTMLElement | null = null;
let aiQuestionInput: HTMLTextAreaElement | null = null;
let askAiButton: HTMLButtonElement | null = null;
let backButton: HTMLButtonElement | null = null;
let contentTitle: HTMLElement | null = null;
let contentBody: HTMLElement | null = null; // Restore this for regular HTML content
let aiResponseContainer: HTMLElement | null = null; // Container for AI area
let aiResponseTextArea: HTMLTextAreaElement | null = null;
let copyResponseButton: HTMLButtonElement | null = null;
let storybookLink: HTMLAnchorElement | null = null;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('[ui.ts] DOMContentLoaded');
    cacheDOMElements();
    bindEventListeners();
    // Request initial documentation data from the plugin code
    parent.postMessage({ pluginMessage: { type: 'get-initial-data' } }, '*');
});

function cacheDOMElements() {
    componentSelect = document.getElementById('component-select') as HTMLSelectElement;
    optionsGrid = document.querySelector('.options-grid');
    aiQuestionInput = document.getElementById('ai-question') as HTMLTextAreaElement;
    askAiButton = document.getElementById('ask-ai') as HTMLButtonElement;
    backButton = document.getElementById('back-button') as HTMLButtonElement;
    contentTitle = document.getElementById('content-title');
    contentBody = document.getElementById('content-body'); // Cache the regular content body
    aiResponseContainer = document.getElementById('ai-response-container'); // Cache the AI area container
    aiResponseTextArea = document.getElementById('ai-response-textarea') as HTMLTextAreaElement;
    copyResponseButton = document.getElementById('copy-response-button') as HTMLButtonElement;
    storybookLink = document.getElementById('storybook-link') as HTMLAnchorElement;
}

// --- Event Binding ---
function bindEventListeners() {
    componentSelect?.addEventListener('change', handleComponentSelectChange);
    optionsGrid?.addEventListener('click', handleOptionClick);
    askAiButton?.addEventListener('click', handleAskAiClick);
    backButton?.addEventListener('click', handleBackClick);
    copyResponseButton?.addEventListener('click', handleCopyResponseClick);

    // Optional: Add keydown listeners for options grid for accessibility
    optionsGrid?.querySelectorAll('.option[role="button"]').forEach(option => {
        option.addEventListener('keydown', (e) => {
            // Cast event to KeyboardEvent
            const keyboardEvent = e as KeyboardEvent;
            if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                e.preventDefault();
                (option as HTMLElement).click();
            }
        });
    });

    // Resize Logic (keep if needed, simplified)
    const grabber = document.getElementById('resize-grabber');
    if (grabber) {
        let isResizing = false, startX = 0, startY = 0, startWidth = 0, startHeight = 0;
        grabber.addEventListener('mousedown', (e: MouseEvent) => {
            isResizing = true; startX = e.clientX; startY = e.clientY; startWidth = window.innerWidth; startHeight = window.innerHeight;
            document.body.classList.add('resizing');
        });
        document.addEventListener('mousemove', (e: MouseEvent) => {
            if (!isResizing) return;
            const newWidth = Math.max(320, startWidth + (e.clientX - startX));
            const newHeight = Math.max(400, startHeight + (e.clientY - startY));
            parent.postMessage({ pluginMessage: { type: 'resize', width: newWidth, height: newHeight } }, '*');
        });
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false; document.body.classList.remove('resizing');
            }
        });
    }
}

// --- Event Handlers ---

function handleComponentSelectChange(e: Event) {
    const selectedValue = (e.target as HTMLSelectElement).value;
    console.log(`[ui.ts] Component selection changed via ${e.type}: ${selectedValue}`); // Log event type
    const selectedComponentData = componentDocsData[selectedValue];
    if (selectedComponentData) {
        currentComponent = selectedComponentData;
        updateStorybookLinkUI();
        console.log(`[ui.ts] Updated currentComponent to: ${currentComponent.name}`);
    } else {
        console.warn(`[ui.ts] No documentation found for selected component: ${selectedValue}`);
    }
}

function handleOptionClick(e: Event) {
    const target = e.target as HTMLElement;
    const optionElement = target.closest('.option');
    if (!optionElement) return;

    const type = optionElement.getAttribute('data-type');
    if (!type || !currentComponent) {
        console.warn('[ui.ts] Cannot handle option click: Missing type or currentComponent');
        return;
    }

    console.log(`[ui.ts] Option clicked: ${type} for component: ${currentComponent.name}`);

    if (type === 'storybook') {
        console.log('[ui.ts] Storybook link clicked (functionality TBD)');
        // Optional: Post message to open URL if needed
        // parent.postMessage({ pluginMessage: { type: 'open-url', url: currentComponent.storybookUrl } }, '*');
        return;
    }

    // --- Display REGULAR documentation --- 
    const contentKey = type.replace(/-([a-z])/g, g => g[1].toUpperCase()) as keyof ComponentData;
    const titleMap: Record<string, string> = {
        usage: 'Usage Guidelines',
        bestPractices: 'Best Practices',
        dosAndDonts: 'Dos and Don\'ts',
        accessibility: 'Accessibility Guidelines'
    };

    const title = titleMap[contentKey] || 'Documentation';
    // Get the ORIGINAL HTML content for regular docs
    const htmlContent = componentDocsData[currentComponent.name]?.[contentKey] || sampleComponentData[contentKey] || '<p>Content not available.</p>';

    navigateToRegularContent(title, htmlContent);
}

function handleAskAiClick() {
    if (!aiQuestionInput || !currentComponent) {
        console.error('[ui.ts] Cannot ask AI: Input or component missing.', { hasInput: !!aiQuestionInput, hasComponent: !!currentComponent });
        return;
    }
    const question = aiQuestionInput.value.trim();
    if (!question) {
        aiQuestionInput.focus();
        return;
    }

    // Show loading state immediately
    showPage('content-page');
    if (contentTitle) contentTitle.textContent = `AI Query - ${currentComponent.name}`;
    if (contentBody) {
        contentBody.innerHTML = '<p>Getting AI response...</p>';
        contentBody.classList.remove('hidden');
    }
    if (aiResponseContainer) {
        aiResponseContainer.classList.add('hidden');
    }

    // Send message to code.ts
    parent.postMessage({
        pluginMessage: {
            type: 'ask-ai',
            question: question,
            componentName: currentComponent.name
        }
    }, '*');

    aiQuestionInput.value = '';
}

function handleCopyResponseClick() {
    if (!aiResponseTextArea) return;
    const textToCopy = aiResponseTextArea.value;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('[ui.ts] AI response copied to clipboard.');
            // Optional: Show temporary feedback (e.g., change button text/icon)
            const button = copyResponseButton;
            if (button) {
                const originalContent = button.innerHTML;
                button.innerHTML = 'Copied!'; // Simple text feedback
                button.disabled = true;
                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.disabled = false;
                }, 1500);
            }
        })
        .catch(err => {
            console.error('[ui.ts] Failed to copy text: ', err);
            // Optional: Show error feedback to user
        });
}

function handleBackClick() {
    showPage('main-page');
}

// --- Message Handling (from code.ts) ---
onmessage = async (event) => {
    const msg = event.data.pluginMessage;
    if (!msg) return;

    switch (msg.type) {
        case 'load-documentation':
            console.log('UI: Documentation data received:', msg.data);
            populateComponentSelector(msg.data);
            break;

        case 'ai-response':
            console.log('UI: AI response received:', msg);
            displayAiResponse(msg.componentName, msg.response, msg.error);
            break;

        case 'component-selected':
            console.log(`[ui.ts] Received component-selected: '${msg.componentName}'`);
            // Check if the select element exists AND has options before proceeding
            if (componentSelect && componentSelect.options.length > 0) {
                console.log(`[ui.ts] Selector is ready (element exists, options > 0). Attempting immediate selection.`);
                selectComponentInDropdown(msg.componentName);
            } else {
                // Log the state for debugging
                const selectExists = !!componentSelect;
                const optionsLength = componentSelect?.options?.length ?? 0;
                console.log(`[ui.ts] Selector not ready (element: ${selectExists}, options: ${optionsLength}). Storing '${msg.componentName}' as pending.`);
                pendingSelectedComponent = msg.componentName;
                // Explicitly ensure the flag reflects the deferred state
                isSelectorPopulated = false; 
            }
            break;

        default:
            console.warn('UI: Unknown message type:', msg.type);
    }
};

// --- UI Updates & Navigation ---

// NEW: Function to handle setting the dropdown value
function selectComponentInDropdown(componentName: string) {
    if (!componentSelect) return;

    console.log(`[ui.ts] Attempting to select component in dropdown: '${componentName}'`);
    let foundOption = false;
    // Iterate through options to find the matching one
    for (let i = 0; i < componentSelect.options.length; i++) {
        const option = componentSelect.options[i];
        if (option.value === componentName) {
            option.selected = true;
            foundOption = true;
            console.log(`[ui.ts] Set option with value '${componentName}' to selected.`);
            break; // Stop searching once found
        }
    }

    if (foundOption) {
        // Trigger the change event *after* successfully setting the selection
        console.log(`[ui.ts] Dispatching change event for select element.`);
        componentSelect.dispatchEvent(new Event('change', { bubbles: true })); 
    } else {
        console.warn(`[ui.ts] Option with value '${componentName}' not found in select.`);
    }
}

function populateComponentSelector(data: Record<string, ComponentData>) {
    componentDocsData = data; // Store the data
    if (!componentSelect) return;
    // Clear existing options
    componentSelect.innerHTML = '';
    isSelectorPopulated = false; // Reset flag
    pendingSelectedComponent = null; // Clear pending selection
    // Add new options
    console.log('[ui.ts] Populating component selector options:');
    for (const key in data) {
        console.log(` - Adding option: value='${key}', text='${key}'`); // Log each option being added
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        componentSelect.appendChild(option);
    }
    // Set initial component based on the first item in the data, if available
    const firstComponentKey = Object.keys(data)[0];
    if (firstComponentKey) {
        currentComponent = data[firstComponentKey];
        componentSelect.value = firstComponentKey;
        updateStorybookLinkUI();
        console.log(`[ui.ts] Initial component set to: ${firstComponentKey}`);
    } else {
        currentComponent = null; // No components available
         console.log(`[ui.ts] No components available to set initial selection.`);
    }
    
    isSelectorPopulated = true; // Set flag AFTER population
    console.log(`[ui.ts] Selector populated. isSelectorPopulated: ${isSelectorPopulated}`);

    // Try to apply any pending selection that arrived before population finished
    if (pendingSelectedComponent) {
        console.log(`[ui.ts] Applying pending selection: '${pendingSelectedComponent}'`);
        selectComponentInDropdown(pendingSelectedComponent);
        pendingSelectedComponent = null; // Clear pending
    }
}

function updateComponentSelectorUI(componentKey: string) {
     if (componentSelect && componentDocsData[componentKey]) {
        componentSelect.value = componentKey;
    }
}

function showPage(pageId: string) {
    console.log(`[ui.ts] Showing page: ${pageId}`);
    document.querySelectorAll('.page').forEach(page => {
        const pageElement = page as HTMLElement;
        if (page.id === pageId) {
            pageElement.classList.remove('hidden');
            pageElement.style.display = 'flex'; // Use flex if pages use flex layout
            pageElement.removeAttribute('inert');
        } else {
            pageElement.classList.add('hidden');
            pageElement.style.display = 'none';
            pageElement.setAttribute('inert', 'true');
        }
    });
}

function updateStorybookLinkUI() {
    if (storybookLink && currentComponent?.storybookUrl) {
        storybookLink.href = currentComponent.storybookUrl;
        // Make visible if it was hidden, or update text
        // const linkTextElement = storybookLink.querySelector('span'); // Assuming text is in a span
        // if(linkTextElement) linkTextElement.textContent = `View ${currentComponent.name} in Storybook`;
    } else if (storybookLink) {
        storybookLink.href = '#'; // Disable link
    }
}

// Function to navigate and display REGULAR HTML content
function navigateToRegularContent(title: string, htmlContent: string) {
    console.log('[ui.ts] Navigating to regular content:', title);
    if (contentTitle) contentTitle.textContent = title;
    
    // Show regular content body, hide AI area
    if (contentBody) {
        contentBody.innerHTML = htmlContent;
        contentBody.classList.remove('hidden');
    }
    if (aiResponseContainer) {
        aiResponseContainer.classList.add('hidden');
    }

    showPage('content-page');
    contentTitle?.focus(); // Focus title for accessibility
}

// Function to navigate and display AI text content in TEXTAREA
function navigateToAiContent(title: string, textContent: string, isLoading: boolean, isError: boolean) {
    console.log('[ui.ts] Navigating to AI content:', title, {isLoading, isError});
    if (contentTitle) contentTitle.textContent = title;

    // Hide regular content body, show AI area
    if (contentBody) {
        contentBody.classList.add('hidden');
    }
    if (aiResponseContainer) {
        aiResponseContainer.classList.remove('hidden');
    }

    // Update textarea and its state
    if (aiResponseTextArea) {
        aiResponseTextArea.value = textContent;
        aiResponseTextArea.classList.remove('loading', 'error'); // Clear previous states
        if (isLoading) {
            aiResponseTextArea.classList.add('loading');
        } else if (isError) {
            aiResponseTextArea.classList.add('error');
        }
    }
    
    // Show/hide copy button
    if (copyResponseButton) {
        copyResponseButton.style.display = isLoading ? 'none' : 'flex';
    }
    
    showPage('content-page');
    if (!isLoading) {
        aiResponseTextArea?.focus(); // Focus textarea when content is loaded
    }
}

function displayAiResponse(componentName: string, response: string, isError: boolean) {
    // Always show the content page
    showPage('content-page');
    
    if (contentTitle) {
        contentTitle.textContent = `AI Response - ${componentName}`;
    }
    
    if (contentBody) {
        contentBody.innerHTML = response;
        contentBody.classList.remove('hidden');
    }
    
    if (aiResponseContainer) {
        aiResponseContainer.classList.add('hidden');
    }
}
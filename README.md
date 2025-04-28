# figma-plugin-qd
# Quick Documentation 🐊

A powerful Figma plugin that combines static documentation display with AI-powered assistance for design system components.

## Features

📚 **Local Documentation**: 
  - Loads and displays static documentation (Usage, Best Practices, etc.) for design system components from a local data source (`componentDocs`).
  
🖱️ **Component Selection**: 
  - Lets users choose a component via a dropdown or automatically updates based on the current Figma canvas selection.
  
🔗 **Storybook Integration**: 
  - Provides a button to directly open the selected component's Storybook page in the browser.
  
🤖 **Local AI Queries**: 
  - Allows users to ask questions about components, sending queries to a locally running Ollama AI model (default: `llama3:8b`).

✨ **AI Formatting**: 
  - Instructs the AI to respond in a friendly, documentation-style format using plain text, bullet points, and relevant emojis.

⚡ **Response Caching**: 
  - Temporarily caches AI responses for 15 minutes to provide faster answers for repeated questions.

💬 **Integrated Display**: 
  - Shows both static docs and formatted AI responses within the plugin's UI panel.

⏳ **Prompt History**: 
  - Keeps track of recent user prompts for easy reuse and allows clearing the history.

✂️ **Copy Functionality**: 
  - Includes a button to copy the AI-generated response.

↔️ **Resizable UI**: 
  - The plugin window can be resized by the user.

🛠️ **Error Handling**: 
  - Provides specific user feedback if it cannot connect to the local Ollama service or if other errors occur.

## Installation

1. Clone this repository.
2. Install the necessary dependencies.
3. Follow the setup instructions to configure the Figma plugin within your project.

## Usage

Once the plugin is installed:
1. Open Figma.
2. Select the **Quick Documentation** from your plugin list.
3. Choose a component or let the plugin auto-select based on your current canvas selection.
4. Ask the AI questions or explore the static documentation.


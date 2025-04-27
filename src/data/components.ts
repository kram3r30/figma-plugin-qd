import { ComponentDocumentation } from '../types/documentation';

export const componentDocs: Record<string, ComponentDocumentation> = {
    Button: {
        name: "Button",
        description: "Interactive elements that trigger actions when clicked",
        preview: {
            width: 120,
            height: 40,
            backgroundColor: "#0066FF",
            borderRadius: 6
        },
        usage: `
            <p>Buttons are interactive elements that trigger actions when clicked.</p>
            <h4>Common Use Cases:</h4>
            <ul>
                <li>Form submissions</li>
                <li>Modal triggers</li>
                <li>Navigation actions</li>
                <li>Confirmation dialogs</li>
            </ul>
        `,
        bestPractices: `
            <ul>
                <li><strong>Clarity and Conciseness:</strong> Use clear, action-oriented labels (e.g., "Save Changes," "Submit Application") instead of vague terms ("OK," "Yes").</li>
                <li><strong>Consistency:</strong> Maintain consistent styling (size, color, shape) for buttons of the same type across the application.</li>
                <li><strong>Hierarchy:</strong> Use visual hierarchy (e.g., primary, secondary, tertiary buttons) to guide users towards the most important actions. Avoid multiple primary buttons in the same view.</li>
                <li><strong>Spacing:</strong> Ensure adequate spacing between adjacent buttons (at least 8px) to prevent accidental clicks.</li>
                <li><strong>Sizing:</strong> Use predefined size props (e.g., <code>x-small</code>, <code>small</code>, <code>large</code>) for consistency. Ensure touch targets are sufficiently large on mobile (min 44x44px).</li>
                <li><strong>Grouping:</strong> Group related actions using button groups or toggles where appropriate, ensuring logical order.</li>
                <li><strong>Loading States:</strong> Use the <code>loading</code> prop for asynchronous operations to provide clear feedback. Disable the button during loading to prevent multiple submissions.</li>
                <li><strong>Responsiveness:</strong> Use the <code>block</code> prop for full-width buttons on smaller screens or within constrained containers if appropriate.</li>
                <li><strong>Statefulness:</strong> Ensure buttons have clear visual states for hover, focus, active, and disabled states.</li>
            </ul>
        `,
        dosAndDonts: `
            <h4>Do:</h4>
            <ul>
                <li>Use verb-first labels for actions (e.g., "Create Account").</li>
                <li>Maintain consistent padding and sizing based on design system guidelines.</li>
                <li>Include clear loading states for asynchronous actions.</li>
                <li>Use icons thoughtfully to enhance meaning, paired with text when clarity is crucial.</li>
                <li>Apply semantic colors (e.g., using the <code>color</code> prop for success, error, warning) consistently.</li>
                <li>Include <code>type="button"</code> for buttons within forms that don't submit the form.</li>
                <li>Use appropriate variants (<code>outlined</code>, <code>text</code>, <code>plain</code>) for secondary or less emphasized actions.</li>
                <li>Implement proper focus management, especially within modals and forms.</li>
                <li>Ensure adequate contrast between button text/icons and background.</li>
            </ul>
            <h4>Don't:</h4>
            <ul>
                <li>Use generic labels like "Click Here," "Submit," or "Continue" without context.</li>
                <li>Overcrowd buttons with excessive text or complex icons.</li>
                <li>Use multiple primary buttons on one page or view.</li>
                <li>Disable buttons without providing a clear reason (e.g., via a tooltip or adjacent text).</li>
                <li>Mix button styles (variants, sizes, shapes) inconsistently within the same context.</li>
                <li>Nest buttons or other interactive elements inside a button.</li>
                <li>Use buttons for simple navigation; use links instead.</li>
                <li>Rely solely on icons without text labels for critical or uncommon actions.</li>
                <li>Forget to test button usability on touch devices.</li>
            </ul>
        `,
        accessibility: `
            <h4>Requirements:</h4>
            <ul>
                <li>Must be keyboard accessible</li>
                <li>Should have ARIA labels when needed</li>
                <li>Must have sufficient color contrast</li>
            </ul>
            <h4>WCAG Compliance:</h4>
            <ul>
                <li>Meets WCAG 2.1 Level AA requirements</li>
                <li>Ensures proper focus states</li>
                <li>Maintains minimum contrast ratios</li>
            </ul>
        `,
        storybookUrl: "https://release--647602387404abb8d86f89f6.chromatic.com/?path=/story/components-button--example",
        variants: [
            {
                name: "Primary",
                description: "Main call-to-action button",
                preview: {
                    width: 120,
                    height: 40,
                    backgroundColor: "#0066FF",
                    borderRadius: 6
                }
            },
            {
                name: "Secondary",
                description: "Less prominent actions",
                preview: {
                    width: 120,
                    height: 40,
                    backgroundColor: "#F5F5F5",
                    borderRadius: 6
                }
            },
            {
                name: "Danger",
                description: "Destructive actions",
                preview: {
                    width: 120,
                    height: 40,
                    backgroundColor: "#FF3B30",
                    borderRadius: 6
                }
            }
        ],
        codeExamples: [
            {
                language: "jsx",
                code: `<Button variant="primary">Click Me</Button>`
            },
            {
                language: "css",
                code: `.button-primary {
    padding: 8px 16px;
    border-radius: 6px;
    background: #0066FF;
    color: white;
}`
            }
        ]
    },
    Input: {
        name: "Input",
        description: "Text input fields for user data entry",
        preview: {
            width: 200,
            height: 40,
            backgroundColor: "#FFFFFF",
            borderRadius: 4
        },
        usage: `
            <p>Input fields allow users to enter and edit text or numerical data.</p>
            <h4>Common Use Cases:</h4>
            <ul>
                <li>Form fields</li>
                <li>Search boxes</li>
                <li>Email/password entry</li>
                <li>Numerical inputs</li>
            </ul>
        `,
        bestPractices: `
            <ul>
                <li><strong>Label Association:</strong> Always include visible, programmatically associated labels (using <code>for</code> attribute or wrapping).</li>
                <li><strong>Appropriate Type:</strong> Use the correct HTML5 input type (<code>email</code>, <code>password</code>, <code>number</code>, <code>tel</code>, <code>url</code>) to enable browser features and mobile keyboards.</li>
                <li><strong>Clear Feedback:</strong> Provide clear, immediate, and specific validation feedback (e.g., "Email address is required," "Password must be at least 8 characters").</li>
                <li><strong>Placeholder Sparingly:</strong> Use placeholder text only for supplementary hints (like format examples), not as a replacement for labels. Placeholders disappear on input.</li>
                <li><strong>Input Masks:</strong> Consider input masks for specific formats (e.g., phone numbers, credit cards) to guide users and reduce errors.</li>
                <li><strong>Required Fields:</strong> Clearly indicate required fields (e.g., with an asterisk and legend).</li>
                <li><strong>Helper Text:</strong> Provide concise helper text below the input for complex requirements or instructions.</li>
                <li><strong>Consistent Styling:</strong> Maintain consistent appearance (height, border, font size) across all input fields.</li>
            </ul>
        `,
        dosAndDonts: `
            <h4>Do:</h4>
            <ul>
                <li>Use clear, concise, and visible labels positioned close to the input.</li>
                <li>Clearly show validation states (error, success, warning) with both color and icons/text.</li>
                <li>Provide helpful helper text for complex fields or formatting requirements.</li>
                <li>Use the appropriate HTML5 input type for the data being collected.</li>
                <li>Indicate required fields clearly and consistently.</li>
                <li>Ensure sufficient contrast for text, borders, and feedback indicators.</li>
                <li>Design for touch targets; ensure inputs are easy to tap on mobile.</li>
            </ul>
            <h4>Don't:</h4>
            <ul>
                <li>Rely solely on placeholder text as a label.</li>
                <li>Use inputs without properly associated labels (bad for accessibility).</li>
                <li>Disable copy/paste functionality unless there's a strong security reason.</li>
                <li>Provide vague or unhelpful validation messages (e.g., "Invalid input").</li>
                <li>Use overly complex input masks that confuse users.</li>
                <li>Make optional fields look identical to required fields.</li>
                <li>Hide validation requirements until after submission attempt.</li>
                <li>Forget about handling edge cases or different data formats.</li>
            </ul>
        `,
        accessibility: `
            <h4>Requirements:</h4>
            <ul>
                <li>Must have associated labels</li>
                <li>Should support screen readers</li>
                <li>Must have clear focus states</li>
            </ul>
            <h4>WCAG Compliance:</h4>
            <ul>
                <li>Meets 3.3.2 Labels or Instructions</li>
                <li>Supports keyboard navigation</li>
                <li>Clear error identification</li>
            </ul>
        `,
        storybookUrl: "https://release--647602387404abb8d86f89f6.chromatic.com/?path=/story/components-input-input-text--example",
        variants: [
            {
                name: "Text",
                description: "Standard text input",
                preview: {
                    width: 200,
                    height: 40,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 4
                }
            },
            {
                name: "Search",
                description: "Search input with icon",
                preview: {
                    width: 200,
                    height: 40,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 20
                }
            }
        ],
        codeExamples: [
            {
                language: "jsx",
                code: `<Input
    type="text"
    label="Username"
    placeholder="Enter username"
/>`
            },
            {
                language: "css",
                code: `.input-field {
    padding: 8px 12px;
    border: 1px solid #DDD;
    border-radius: 4px;
    font-size: 16px;
}`
            }
        ]
    },
    Accordion: {
        name: "Accordion",
        description: "Collapsible content panels for organizing information",
        preview: {
            width: 250,
            height: 150,
            backgroundColor: "#FFFFFF",
            borderRadius: 6
        },
        usage: `
            <h4>Anatomy</h4>
            <img 
              src="data:image/png;base64,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AAAg0ghJAQAAAAAAAEQaISkAAAAAAACASCMkBQAAAAAAABBphKQAAAAAAAAAIo2QFAAAAAAAAECkEZICAAAAAAAAiDRCUgAAAAAAAACRRkgKAAAAAAAAINIISQEAAAAAAABEGiEpAAAAAAAAgEgjJAUAAAAAAAAQaYSkAAAAAAAAACKNkBQAAAAAAABApBGSAgAAAAAAAIg0QlIAAAAAAAAAkUZICgAAAAAAACDSCEkBAAAAAAAARBohKQAAAAAAAIBIIyQFAAAAAAAAEGmEpAAAAAAAAAAijZAUAAAAAAAAQKQRkgIAAAAAAACINEJSAAAAAAAAAJFGSAoAAAAAAAAg0ghJAQAAAAAAAEQaISkAAAAAAACASCMkBQAAAAAAABBphKQAAAAAAAAAIo2QFAAAAAAAAECkEZICAAAAAAAAiDRCUgAAAAAAAACRRkgKAAAAAAAAINIISQEAAAAAAABEGiEpAAAAAAAAgEgjJAUAAAAAAAAQaYSkAAAAAAAAACKNkBQAAAAAAABApBGSAgAAAAAAAIg0QlIAAAAAAAAAkUZICgAAAAAAACDSCEkBAAAAAAAARBohKQAAAAAAAIBIIyQFAAAAAAAAEGmEpAAAAAAAAAAijZAUAAAAAAAAQKQRkgIAAAAAAACINEJSAAAAAAAAAJFGSAoAAAAAAAAg0ghJAQAAAAAAAEQaISkAAAAAAACASCMkBQAAAAAAABBphKQAAAAAAAAAIo2QFAAAAAAAAECkEZICAAAAAAAAiDRCUgAAAAAAAACRRkgKAAAAAAAAINIISQEAAAAIAABAlBGSAgAAAAAAAIg0QlIAAAAAAAAAkUZICgAAAAAAACDSCEkBAAAAAAAARBohKQAAAAAAAIBIIyQFAAAAAAAAEGmEpAAAAAAAAAAijZAUAAAAAAAAQKQRkgIAAAAAAACINEJSAAAAAAAAAJFGSAoAAAAAAAAg0ghJAQAAAAAAAEQaISkAAAAAAACASCMkBQAAAAAAABBphKQAAAAAAAAAIo2QFAAAAAAAAECkEZICAAAAAAAAiDRCUgAAAAAAAACRRkgKAAAAAAAAINIISQEAAAAAAABEGiEpAAAAAAAAgEgjJAUAAAAAAAAQaYSkAAAAAAAAACKNkBQAAAAAAABApBGSAgAAAAAAAIg0QlIAAAAAAAAAkUZICgAAAAAAACDSCEkB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" 
              alt="Diagram showing Accordion anatomy: 1 points to the main text content area, 2 points to the subheader text, 3 points to the overall header container, 4 points to the chevron icon, and 5 points to the body slot area." 
              style="max-width: 100%; height: auto; display: block; margin-bottom: 1em; border: 1px solid var(--figma-color-border, #555); border-radius: 4px;" 
            />
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Sub Component</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Accordion</td>
                  <td>Each accordion section is made up of two primary elements, the header and body, with various elements within them</td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Header</td>
                  <td>The clickable element that triggers the expand/collapse action</td>
                  <td>Text Detail</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Header Slot</td>
                  <td>Based on text detail default variant. See the text detail component for other available properties</td>
                  <td>Text Detail</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Chevron Button Icon</td>
                  <td>Indicates the current state (expanded or collapsed) and points in the direction of the content expansion</td>
                  <td>Button Icon</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Body Slot</td>
                  <td>Use this slot to pass your own designs</td>
                  <td>Slot</td>
                </tr>
              </tbody>
            </table>
            <br/> <!-- Add some space before the next section -->
            <p>Accordions are expandable and collapsible content panels that organize information into manageable sections.</p>
            <h4>Common Use Cases:</h4>
            <ul>
                <li>FAQ sections</li>
                <li>Product specifications</li>
                <li>Navigation menus</li>
                <li>Content organization in limited spaces</li>
                <li>Settings or filter panels</li>
            </ul>
        `,
        bestPractices: `
            <ul>
                <li><strong>Descriptive Headers:</strong> Keep header titles short, clear, and descriptive enough to convey the panel's content.</li>
                <li><strong>Clear Indicators:</strong> Use standard, recognizable icons (like chevrons) to indicate the expand/collapse state clearly. Ensure the entire header is clickable.</li>
                <li><strong>Content Relevance:</strong> Only group closely related content within a single accordion panel.</li>
                <li><strong>Appropriate Use Case:</strong> Consider if accordions are the best pattern. Tabs might be better for distinct sections, and simple content blocks for short information. Ideal for FAQs or progressive disclosure.</li>
                <li><strong>Expand/Collapse Behavior:</strong> Decide if users should be able to expand multiple sections simultaneously (<code>multiple</code> prop) or only one at a time (<code>accordion</code> variant). 'Accordion' mode is often simpler for users.</li>
                <li><strong>Visual Style:</strong> Apply styling props (<code>flat</code>, <code>inset</code>, <code>popout</code>) consistently based on the context and visual hierarchy.</li>
                <li><strong>Disabled State:</strong> Use the <code>disabled</code> prop to clearly indicate sections that are not currently interactive, providing tooltips if necessary.</li>
                <li><strong>Performance:</strong> Consider lazy-loading content within panels if they contain heavy elements like images or complex components (use <code>eager</code> prop cautiously).</li>
            </ul>
        `,
        dosAndDonts: `
            <h4>Do:</h4>
            <ul>
                <li>Make headers clearly scannable and informative.</li>
                <li>Allow users to expand multiple sections if comparison is needed.</li>
                <li>Provide obvious visual cues for interaction (hover, focus states).</li>
                <li>Consider having the first or most important panel expanded by default if appropriate.</li>
                <li>Use the <code>mandatory</code> prop only if keeping at least one panel open is essential for the workflow.</li>
                <li>Apply consistent styling (<code>inset</code>, <code>flat</code>) for different levels or contexts.</li>
                <li>Ensure smooth animations for expand/collapse actions.</li>
                <li>Include <code>readonly</code> prop when panel interaction should be prevented but content visible.</li>
            </ul>
            <h4>Don't:</h4>
            <ul>
                <li>Hide critical information or primary actions inside accordions.</li>
                <li>Nest accordions deeply; this usually indicates overly complex information architecture.</li>
                <li>Write overly long or ambiguous accordion headers.</li>
                <li>Use accordions for primary site navigation, especially on larger screens.</li>
                <li>Automatically close a panel a user is actively interacting with (e.g., filling a form within it).</li>
                <li>Place main form submission buttons inside individual accordion panels.</li>
                <li>Use accordions for step-by-step processes or wizards where sequence is critical.</li>
                <li>Overload panels with excessive content; break down complex information.</li>
                <li>Forget keyboard navigation and ARIA attributes for accessibility.</li>
            </ul>
        `,
        accessibility: `
            <h4>Requirements:</h4>
            <ul>
                <li>Must be keyboard navigable and operable</li>
                <li>Should implement appropriate ARIA attributes</li>
                <li>Must provide clear focus states</li>
            </ul>
            <h4>WCAG Compliance:</h4>
            <ul>
                <li>Use aria-expanded to indicate state</li>
                <li>Ensure proper focus management</li>
                <li>Support screen reader announcements for state changes</li>
            </ul>
        `,
        storybookUrl: "https://release--647602387404abb8d86f89f6.chromatic.com/?path=/story/components-accordion-single-accordion--accordion-example",
        variants: [
            {
                name: "Default",
                description: "Standard accordion pattern",
                preview: {
                    width: 250,
                    height: 150,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 6
                }
            },
            {
                name: "Bordered",
                description: "Accordion with borders between sections",
                preview: {
                    width: 250,
                    height: 150,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 6
                }
            }
        ],
        codeExamples: [
            {
                language: "jsx",
                code: `<Accordion>
  <AccordionItem title="Section 1">
    Content for section 1
  </AccordionItem>
  <AccordionItem title="Section 2">
    Content for section 2
  </AccordionItem>
</Accordion>`
            },
            {
                language: "css",
                code: `.accordion-header {
  padding: 12px 16px;
  background: #F5F5F5;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}`
            }
        ]
    },
    Alert: {
        name: "Alert",
        description: "Informational messages that provide feedback or status updates",
        preview: {
            width: 300,
            height: 80,
            backgroundColor: "#E6F7FF",
            borderRadius: 4
        },
        usage: `
            <p>Alerts display important messages or feedback to users in response to their actions or system events.</p>
            <h4>Common Use Cases:</h4>
            <ul>
                <li>Success confirmations</li>
                <li>Error notifications</li>
                <li>Warning messages</li>
                <li>Informational updates</li>
            </ul>
        `,
        bestPractices: `
            <ul>
                <li><strong>Context and Severity:</strong> Use appropriate colors and icons (via the <code>type</code> prop: success, info, warning, error) to clearly convey the message's nature.</li>
                <li><strong>Clarity and Actionability:</strong> Keep messages clear, concise, and easy to understand. If action is needed, provide guidance or links.</li>
                <li><strong>Placement:</strong> Position alerts logically where users expect feedback (e.g., near the triggering element, top of the page for global messages). Ensure they don't obstruct critical content.</li>
                <li><strong>Dismissal:</strong> Include dismissal options (<code>closable</code> prop) for non-critical alerts. Critical alerts might require user interaction before dismissal.</li>
                <li><strong>Density and Prominence:</strong> Use props like <code>dense</code>, <code>prominent</code>, or <code>border</code> to adjust visual weight based on importance and available space.</li>
                <li><strong>Elevation and Style:</strong> Apply <code>elevation</code> or variants (<code>flat</code>, <code>outlined</code>) consistently to match the surrounding UI and indicate importance.</li>
                <li><strong>Transitions:</strong> Use subtle transitions (like <code>v-alert-transition</code>) for non-intrusive appearance/disappearance, especially for temporary alerts.</li>
                <li><strong>Timing:</strong> Use the <code>timeout</code> prop carefully for auto-dismissing alerts; ensure users have enough time to read critical information.</li>
            </ul>
        `,
        dosAndDonts: `
            <h4>Do:</h4>
            <ul>
                <li>Use standard color and icon combinations to reinforce the alert type (e.g., green checkmark for success).</li>
                <li>Provide specific instructions or next steps, especially for errors or warnings.</li>
                <li>Keep alert text concise and focused on the core message.</li>
                <li>Allow users to dismiss non-critical alerts easily (e.g., with a close button).</li>
                <li>Use the <code>border</code> prop (e.g., <code>border="start"</code>) to add subtle emphasis.</li>
                <li>Include relevant icons using <code>prepend-icon</code> or the <code>icon</code> prop for quick recognition.</li>
                <li>Control visibility programmatically (e.g., with <code>v-model</code>) for dynamic feedback.</li>
                <li>Ensure sufficient color contrast for text and icons within the alert.</li>
            </ul>
            <h4>Don't:</h4>
            <ul>
                <li>Display too many alerts simultaneously, which overwhelms the user.</li>
                <li>Rely solely on color to communicate the alert's meaning (bad for accessibility).</li>
                <li>Use alerts for minor, non-essential information (consider toasts or inline text).</li>
                <li>Write vague error messages like "An error occurred." Be specific.</li>
                <li>Use excessive or distracting animations, especially for critical alerts.</li>
                <li>Place alerts where they might be easily missed or obstruct user tasks.</li>
                <li>Make dismissible alerts the only way to access crucial follow-up information.</li>
                <li>Auto-dismiss critical error messages or alerts requiring user action too quickly.</li>
                <li>Use alerts for confirmations that could be shown inline more effectively.</li>
            </ul>
        `,
        accessibility: `
            <h4>Requirements:</h4>
            <ul>
                <li>Should use appropriate ARIA roles (alert, status, etc.)</li>
                <li>Must not rely solely on color to convey meaning</li>
                <li>Should be announced appropriately by screen readers</li>
            </ul>
            <h4>WCAG Compliance:</h4>
            <ul>
                <li>Use proper color contrast ratios</li>
                <li>Implement appropriate ARIA live regions</li>
                <li>Ensure dismissible alerts can be closed via keyboard</li>
            </ul>
        `,
        storybookUrl: "https://release--647602387404abb8d86f89f6.chromatic.com/?path=/story/components-alert--alert-example",
        variants: [
            {
                name: "Info",
                description: "General information alert",
                preview: {
                    width: 300,
                    height: 80,
                    backgroundColor: "#E6F7FF",
                    borderRadius: 4
                }
            },
            {
                name: "Success",
                description: "Positive confirmation alert",
                preview: {
                    width: 300,
                    height: 80,
                    backgroundColor: "#E6FFED",
                    borderRadius: 4
                }
            },
            {
                name: "Warning",
                description: "Cautionary alert",
                preview: {
                    width: 300,
                    height: 80,
                    backgroundColor: "#FFFBE6",
                    borderRadius: 4
                }
            },
            {
                name: "Error",
                description: "Critical error alert",
                preview: {
                    width: 300,
                    height: 80,
                    backgroundColor: "#FFF1F0",
                    borderRadius: 4
                }
            }
        ],
        codeExamples: [
            {
                language: "jsx",
                code: `<Alert type="success" closable>
  Your changes have been saved successfully.
</Alert>`
            },
            {
                language: "css",
                code: `.alert-success {
  background-color: #E6FFED;
  border: 1px solid #B7EB8F;
  padding: 12px 16px;
  border-radius: 4px;
}`
            }
        ]
    },
    "Button Icon": {
        name: "Button Icon",
        description: "Icon-only buttons for compact and visual interactions",
        preview: {
            width: 40,
            height: 40,
            backgroundColor: "#0066FF",
            borderRadius: 6
        },
        usage: `
            <p>Icon buttons provide a compact way to display interactive controls using only an icon.</p>
            <h4>Common Use Cases:</h4>
            <ul>
                <li>Toolbar actions</li>
                <li>Close buttons</li>
                <li>Toggle controls</li>
                <li>Action menus</li>
                <li>Navigation controls</li>
            </ul>
        `,
        bestPractices: `
            <ul>
                <li><strong>Recognizable Icons:</strong> Use universally understood icons from a consistent icon library. Avoid ambiguity.</li>
                <li><strong>Tooltips are Key:</strong> Always include tooltips (e.g., using <code>v-tooltip</code>) to explain the icon's function, especially for less common actions. The tooltip text should match the <code>aria-label</code>.</li>
                <li><strong>Consistent Sizing:</strong> Maintain consistent button and icon sizing within the same context (e.g., toolbars, data tables). Use <code>size</code> and <code>density</code> props effectively.</li>
                <li><strong>Clear States:</strong> Provide obvious visual feedback for hover, focus, and active states to indicate interactivity.</li>
                <li><strong>Accessibility Label:</strong> Always provide a descriptive <code>aria-label</code> attribute explaining the button's action (e.g., <code>aria-label="Edit user profile"</code>).</li>
                <li><strong>Touch Targets:</strong> Ensure icon buttons have a sufficient touch target size (minimum 44x44px effective area) for mobile usability, even if the visual size is smaller.</li>
                <li><strong>Placement:</strong> Group related icon buttons logically. Avoid scattering them across the interface.</li>
                <li><strong>Emphasis:</strong> Use appropriate variants (<code>text</code>, <code>flat</code>) for less critical actions to avoid visual clutter.</li>
            </ul>
        `,
        dosAndDonts: `
            <h4>Do:</h4>
            <ul>
                <li>Use standard, easily recognizable icons.</li>
                <li>Always include tooltips and matching <code>aria-label</code>s for clarity and accessibility.</li>
                <li>Maintain consistent spacing around icon buttons.</li>
                <li>Ensure clear interactive states (hover, focus, active).</li>
                <li>Size buttons appropriately for touch targets, especially on mobile.</li>
                <li>Use semantic colors (<code>color</code> prop) when indicating status or type (e.g., red for delete).</li>
                <li>Group related icon buttons logically, potentially using toggle components.</li>
                <li>Ensure sufficient color contrast for the icon against its background.</li>
            </ul>
            <h4>Don't:</h4>
            <ul>
                <li>Use abstract, complex, or unfamiliar icons without a visible text label nearby.</li>
                <li>Overcrowd interfaces with too many icon buttons close together.</li>
                <li>Use widely varying icon sizes or styles inconsistently.</li>
                <li>Rely solely on color changes to indicate state (e.g., toggle state).</li>
                <li>Place icon buttons too close to each other, making them hard to tap accurately.</li>
                <li>Use icon buttons for primary calls to action unless space is extremely limited and the icon is universally understood.</li>
                <li>Omit tooltips or accessible labels – this is a major accessibility failure.</li>
                <li>Mix different icon styles (e.g., outlined, filled) without a clear system.</li>
            </ul>
        `,
        accessibility: `
            <h4>Requirements:</h4>
            <ul>
                <li>Must have descriptive aria-labels</li>
                <li>Should have appropriate focus states</li>
                <li>Must be keyboard accessible</li>
            </ul>
            <h4>WCAG Compliance:</h4>
            <ul>
                <li>Include aria-label or equivalent for screen readers</li>
                <li>Maintain touch target size of at least 44x44px</li>
                <li>Ensure sufficient color contrast for the icon</li>
            </ul>
        `,
        storybookUrl: "https://release--647602387404abb8d86f89f6.chromatic.com/?path=/story/components-button--example",
        variants: [
            {
                name: "Primary",
                description: "Main action icon button",
                preview: {
                    width: 40,
                    height: 40,
                    backgroundColor: "#0066FF",
                    borderRadius: 6
                }
            },
            {
                name: "Secondary",
                description: "Less prominent icon button",
                preview: {
                    width: 40,
                    height: 40,
                    backgroundColor: "#F5F5F5",
                    borderRadius: 6
                }
            },
            {
                name: "Ghost",
                description: "Minimal visual presence icon button",
                preview: {
                    width: 40,
                    height: 40,
                    backgroundColor: "transparent",
                    borderRadius: 6
                }
            }
        ],
        codeExamples: [
            {
                language: "jsx",
                code: `<ButtonIcon 
  icon="edit"
  aria-label="Edit item"
  variant="primary"
/>`
            },
            {
                language: "css",
                code: `.button-icon {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #0066FF;
  color: white;
}`
            }
        ]
    },
    Card: {
        name: "Card",
        description: "Container for content with optional actions, header, and footer",
        preview: {
            width: 300,
            height: 200,
            backgroundColor: "#FFFFFF",
            borderRadius: 4
        },
        usage: `
            <p>Cards are versatile containers that group related content and actions together.</p>
            <h4>Common Use Cases:</h4>
            <ul>
                <li>Product displays</li>
                <li>Dashboard widgets</li>
                <li>User profile information</li>
                <li>Media galleries</li>
                <li>Summary information with actions</li>
            </ul>
        `,
        bestPractices: `
            <ul>
                <li><strong>Consistency:</strong> Maintain consistent card sizing, padding, and structure (header, content, actions) within the same list or grid view.</li>
                <li><strong>Visual Hierarchy:</strong> Use clear typography and spacing (leveraging components like <code>v-card-title</code>, <code>v-card-subtitle</code>, <code>v-card-text</code>) to guide the eye through the card's content.</li>
                <li><strong>Spacing:</strong> Ensure adequate internal padding within the card and sufficient margin between cards in a layout.</li>
                <li><strong>Responsiveness:</strong> Design cards to adapt gracefully to different screen sizes. Content should reflow, not truncate awkwardly.</li>
                <li><strong>Elevation and Borders:</strong> Use elevation or borders (via <code>elevation</code>, <code>flat</code>, <code>outlined</code> variants) purposefully to create depth, indicate interactivity (<code>hover</code> prop), or group content. Be consistent.</li>
                <li><strong>Content Structure:</strong> Use specific components like <code>v-card-item</code> for media or complex layouts and <code>v-card-actions</code> for buttons, aligning them consistently (e.g., right-aligned).</li>
                <li><strong>Actionability:</strong> Make it clear if the entire card is clickable or only specific elements within it. Use hover states effectively.</li>
                <li><strong>Content Length:</strong> Keep card content concise. For detailed information, link to a separate page or use an expansion mechanism.</li>
            </ul>
        `,
        dosAndDonts: `
            <h4>Do:</h4>
            <ul>
                <li>Maintain generous internal padding for readability.</li>
                <li>Use consistent patterns for actions across all cards in a set.</li>
                <li>Establish and maintain a clear visual hierarchy for titles, text, and metadata.</li>
                <li>Ensure cards reflow cleanly on smaller screens.</li>
                <li>Apply appropriate styling (<code>border</code>, <code>rounded</code>, <code>elevation</code>) consistently according to your design system.</li>
                <li>Consider using the <code>hover</code> prop to indicate interactive cards.</li>
                <li>Use the <code>loading</code> prop to provide feedback when card content is being fetched.</li>
                <li>Use semantic HTML (headings, paragraphs) within cards for accessibility.</li>
            </ul>
            <h4>Don't:</h4>
            <ul>
                <li>Overcrowd cards with too much text, too many images, or too many actions.</li>
                <li>Use inconsistent spacing or alignment within or between cards.</li>
                <li>Place unrelated actions within the same card.</li>
                <li>Nest cards within cards unless there's a very strong structural reason.</li>
                <li>Apply varying elevations or borders randomly to cards of equal importance.</li>
                <li>Rely solely on subtle borders without sufficient background contrast or spacing.</li>
                <li>Create excessively tall cards that require significant scrolling within the card itself.</li>
                <li>Mix text alignments (left, center, right) for similar elements within the same card set.</li>
                <li>Forget alt text for images within cards.</li>
            </ul>
        `,
        accessibility: `
            <h4>Requirements:</h4>
            <ul>
                <li>Use proper heading hierarchy within cards</li>
                <li>Ensure sufficient color contrast for all content</li>
                <li>Make all interactive elements focusable</li>
                <li>Provide clear focus states for interactive cards</li>
            </ul>
            <h4>WCAG Compliance:</h4>
            <ul>
                <li>Use semantic HTML elements within card content</li>
                <li>Maintain reading order for screen readers</li>
                <li>Ensure interactive cards have keyboard focus indicators</li>
                <li>Provide alternative text for card images</li>
            </ul>
        `,
        storybookUrl: "https://release--647602387404abb8d86f89f6.chromatic.com/?path=/story/components-card--gator-card",
        variants: [
            {
                name: "Elevated",
                description: "Card with shadow for prominence",
                preview: {
                    width: 300,
                    height: 200,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 4
                }
            },
            {
                name: "Flat",
                description: "Card without elevation",
                preview: {
                    width: 300,
                    height: 200,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 4
                }
            },
            {
                name: "Outlined",
                description: "Card with border instead of elevation",
                preview: {
                    width: 300,
                    height: 200,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 4
                }
            }
        ],
        codeExamples: [
            {
                language: "vue",
                code: `<v-card
  title="Card Title"
  subtitle="Card Subtitle"
  text="Card content goes here..."
>
  <v-card-actions>
    <v-btn>Action</v-btn>
  </v-card-actions>
</v-card>`
            },
            {
                language: "css",
                code: `.custom-card {
  max-width: 400px;
  margin: 0 auto;
}`
            }
        ]
    }
}; 
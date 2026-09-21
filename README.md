# AbleCode

AbleCode is an accessible web-based coding environment for creating, testing, and reviewing HTML applications.

It is designed to help beginners and accessibility-focused developers build simple web solutions using accessible HTML, CSS, and JavaScript.

## Features

- Accessible Code View
- AI View for basic code generation
- Live HTML preview
- Save code in the browser
- Copy code to the clipboard
- Download code as an HTML file
- Accessibility Debugger
- Voice dictation support when provided by the browser
- Keyboard-friendly controls
- Responsive design for desktop and mobile devices
- Deployable with Vercel

## Views

### Code View

Code View allows you to:

- Write and edit HTML
- Run your code in a live preview
- Save your work locally
- Copy your code
- Download your project as an HTML file

### AI View

AI View currently provides a **basic local code generator**. It creates a simple accessible HTML starting point from your description.

The basic AI View is useful for:

- Starting a project
- Creating simple forms
- Generating accessible HTML structure
- Experimenting with software ideas

It does not yet generate complete, complex applications or fully understand every idea. For more advanced code ideas, use ChatGPT to help plan or generate HTML, CSS, and JavaScript, then paste the code into AbleCode's Code View.

For example, ask ChatGPT:

> Create an accessible JavaScript quiz game in one HTML file with keyboard support and screen-reader announcements.

Then paste the generated code into Code View and test it with the live preview and debugger.

### Debugger

The Debugger checks for basic accessibility issues, including:

- Missing language attributes
- Missing page titles
- Missing viewport metadata
- Inputs without identifiers or accessible labels

The debugger is a helpful starting point but does not replace a complete accessibility audit.

## Offline and Online Use

AbleCode is a static web application and can be hosted online with Vercel.

The basic local generator does not require an OpenAI API key. However, browser features such as speech recognition may require internet access or browser support.

The project also preserves optional Vercel API files for future cloud AI integration.

## Deployment with Vercel

1. Import this repository into Vercel.
2. Select the repository root as the project root.
3. Choose **Other** as the framework preset.
4. Leave the build command empty.
5. Use `.` as the output directory.
6. Deploy the project.

For future cloud AI features, add the API key in Vercel Environment Variables. Never place an API key in frontend code or commit it to GitHub.

## Technologies

- HTML
- CSS
- JavaScript
- Web Storage API
- Browser Speech Recognition API
- Vercel hosting

## Accessibility

AbleCode uses:

- Semantic HTML
- Labels for form controls
- Keyboard-operable buttons
- Visible focus indicators
- ARIA live regions for status messages
- Responsive layouts
- Accessible headings and navigation
- High-contrast colors

## Limitations

AbleCode is an early accessible coding solution. The AI View is intentionally basic and currently uses local code generation rather than a full conversational AI model.

Generated code should always be reviewed, tested, and improved before being used in a production application.

## Project Name

AbleCode

## License

Add your preferred license before publishing the project for public use.

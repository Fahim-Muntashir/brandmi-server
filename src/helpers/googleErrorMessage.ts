// src/helpers/html.helper.ts
export const googleErrorMessage = (errorMessage: string): string => {
    return `
      <html>
        <head>
          <title>Error</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f8d7da; color: #721c24; padding: 20px; }
            .error-container { text-align: center; padding: 20px; border: 1px solid #f5c6cb; background-color: #f8d7da; }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1>Authentication Error</h1>
            <p>${errorMessage}</p>
            <button onclick="window.close()">Close</button>
          </div>
        </body>
      </html>
    `;
};

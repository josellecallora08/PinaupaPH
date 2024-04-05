module.exports.emailContent = (name, pin) => (`
<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 1000px;
            margin: auto;
            padding: 20px;
          }
          .header {
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
          }
          .content {
            padding: 20px;
            border: 1px solid #ccc;
          }
          .pin-input {
            width: 200px; /* Adjust width as needed */
            height: 60px; /* Adjust height as needed */
            text-align: center;
            font-size: 24px; /* Adjust font size as needed */
            margin: auto; /* Center the input horizontally */
            display: block; /* Make it a block element */
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset</h1>
          </div>
          <div class="content">
            <p>Hello, <span style='text-transform: capitalize;'>${name}</span>!</p>
            <p>Your password reset pin is:</p>
            <input class="pin-input" value='${pin}'>
            <p>This pin is valid for 10 minutes. If you didn't request this, you can safely ignore this email.</p>
            <p>Thank you!</p>
          </div>
        </div>
      </body>
      </html>
`)

module.exports = ({response}) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Contract Agreement</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .content {
                    font-size: 16px;
                    line-height: 1.5;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Contract Agreement</h1>
                </div>
                <div class="content">
                    <p>Dear ${response?.user_id?.name},</p>
                    <p>Please find attached your contract agreement.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 PinaupaPH. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `
}

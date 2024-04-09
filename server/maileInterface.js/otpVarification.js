const mailhtml = (OTP_CODE) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
        <div style="background-color: #f4f4f4; padding: 20px;">
            <h2 style="color: #333;">Your OTP Code</h2>
            <p style="color: #666;">Use the following OTP code to complete your verification:</p>
            <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                <h3 style="color: #333; font-size: 24px; margin-top: 0;">OTP: <span style="color: #007bff;">${OTP_CODE}</span></h3>
                <p style="color: #666; margin-bottom: 0;">This OTP code is valid for a limited time period. Do not share it with anyone.</p>
            </div>
        </div>
    </body>
    </html>`;
};

export const getEmailFormat = (resetLink: string, userName: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f7fc;
      margin: 0;
      padding: 0;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #2563eb;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .email-header h1 {
      margin: 0;
    }
    .email-body {
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    .email-body a {
    color: #ffffff
    }
    .email-body h2 {
      color: #1e3a8a;
    }
    .email-body p {
      margin: 15px 0;
    }
    .reset-link {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 20px;
      background-color:  #2563eb;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }
    .footer {
      background-color: #f4f7fc;
      color: #777;
      text-align: center;
      padding: 15px;
      font-size: 12px;
    }
    .footer a {
      color:  #1e3a8a;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="email-body">
      <h2>Hi ${userName},</h2>
      <p>We received a request to reset your password. Click the button below to reset your password.</p>
      <p>If you didn't make this request, you can ignore this email.</p>
      <a href="${resetLink}" class="reset-link">Reset Password</a>
    </div>
    <div class="footer">
      <p>If you have any issues, contact us at <a href="mailto:taskmanager.care@gmail.com">taskmanager.care@gmail.com</a></p>
    </div>
  </div>
</body>
</html>
`;
};

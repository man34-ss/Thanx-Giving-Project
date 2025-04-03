exports.templateVolunteerNotification = (volunteerName, needyName, needyPhNo, needyLocation, needyPurpose, prediction) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <title>Volunteer Alert</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 1.5em;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      color: #333333;
    }
    .highlight {
      background-color: #f7f9fc;
      padding: 15px;
      border: 1px solid #dce1e7;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .section-title {
      font-weight: bold;
      font-size: 1.2em;
      margin-bottom: 10px;
      color: #0056b3;
    }
    .footer {
      text-align: center;
      padding: 15px;
      font-size: 0.9em;
      background-color: #f7f7f7;
      border-top: 1px solid #e1e1e1;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .button {
      display: inline-block;
      margin: 20px 0;
      padding: 10px 20px;
      font-size: 1em;
      color: #ffffff;
      background-color: #007bff;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
    }
    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
    <div class="email-container">
      <!-- NGO Name -->
      <div class="header">
        Thanx-Giving
      </div>
      <!-- Email Content -->
      <div class="content">
        <p>Dear ${volunteerName},</p>
        <p>Your presence is urgently needed to assist someone in need. Please find the details below:</p>
        <!-- Highlight Section -->
        <div class="highlight">
          <p class="section-title">Details of the Needy Person:</p>
          <p><strong>Name:</strong> ${needyName}</p>
          <p><strong>Phone:</strong> ${needyPhNo}</p>
          <p><strong>Location:</strong> ${needyLocation}</p>
          <p><strong>Purpose:</strong> ${needyPurpose}</p>
          <p><strong>Level of Urgency:</strong> ${prediction}</p>
        </div>
        <!-- Call to Action -->
        <p>If you are available, kindly reach out to the above-mentioned person as soon as possible.</p>
      </div>
      <!-- Footer -->
      <div class="footer">
        <p>Thank you for being a part of our community!</p>
        <p><a href="http://localhost:3000">Visit our website</a> for more updates.</p>
      </div>
    </div>
  </body>
</html>
  `
}
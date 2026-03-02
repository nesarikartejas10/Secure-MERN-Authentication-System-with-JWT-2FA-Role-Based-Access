export const getOtpHtml = ({ email, otp }) => {
  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f7fb;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:10px;border:1px solid #e5e7eb;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#111827;padding:18px;color:#ffffff;font-size:16px;font-weight:bold;">
              Authentication App
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              <h2 style="margin:0 0 15px 0;font-size:20px;color:#111;">
                Verify your email - ${email}
              </h2>

              <p style="margin:0 0 15px 0;font-size:15px;color:#444;line-height:1.6;">
                Use the verification code below to complete your sign-in.
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:8px;padding:15px 20px;font-size:28px;font-weight:bold;letter-spacing:6px;color:#111;">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 10px 0;font-size:14px;color:#555;">
                This code will expire in <strong>5 minutes</strong>.
              </p>

              <p style="margin:0;font-size:14px;color:#555;">
                If this wasn’t initiated by you, this email can be safely ignored.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px;font-size:12px;color:#6b7280;">
              © ${new Date().getFullYear()} Authentication App. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  return html;
};

export const getVerifyEmailHtml = ({ email, token }) => {
  const appName = process.env.APP_NAME || "Authentication App";
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const verifyUrl = `${baseUrl.replace(/\/+$/, "")}/token/${encodeURIComponent(token)}`;

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f7fb;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:10px;border:1px solid #e5e7eb;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#111827;padding:18px;color:#ffffff;font-size:16px;font-weight:bold;">
              ${appName}
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              <h2 style="margin:0 0 15px 0;font-size:20px;color:#111;">
                Verify your account - ${email}
              </h2>

              <p style="margin:0 0 15px 0;font-size:15px;color:#444;line-height:1.6;">
                Thanks for registering with ${appName}. Click the button below to verify your account.
              </p>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:20px 0;">
                <tr>
                  <td align="center">
                    <a href="${verifyUrl}" target="_blank"
                      style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-size:14px;font-weight:bold;">
                      Verify Account
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:15px 0 5px 0;font-size:14px;color:#555;">
                If the button doesn’t work, copy and paste this link:
              </p>

              <p style="margin:0;font-size:13px;color:#111;word-break:break-all;">
                <a href="${verifyUrl}" target="_blank" style="color:#111827;text-decoration:underline;">
                  ${verifyUrl}
                </a>
              </p>

              <p style="margin:15px 0 0 0;font-size:14px;color:#555;">
                If this wasn’t you, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px;font-size:12px;color:#6b7280;">
              © ${new Date().getFullYear()} ${appName}. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return html;
};

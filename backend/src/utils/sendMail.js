import { createTransport } from "nodemailer";
import { config } from "../config/envConfig.js";

export const sendMail = async ({ email, subject, html }) => {
  try {
    //make transporter
    const transporter = createTransport({
      host: config.mailHost,
      port: config.mailPort,
      secure: false,
      auth: {
        user: config.mailUser,
        pass: config.mailPass,
      },
    });

    //send mail
    await transporter.sendMail({
      from: config.mailUser,
      to: email,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.log(`Failed to send email: ${error.message}`);
  }
};

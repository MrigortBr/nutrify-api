import crypto from "crypto";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export default class PasswordReset {
  id?: number;
  user_id: number;
  token?: string;
  created_at?: Date;
  expires_at?: Date;
  status: "open" | "closed" | "expired";
  name?: string;
  email?: string;

  constructor(user_id: number, status: "open" | "closed" | "expired", name?: string, email?: string) {
    this.user_id = user_id;
    this.status = status || "open";
    if (name) this.name = name;
    if (email) this.email = email;
  }

  generateToken() {
    const secretKey = process.env.SECRET_KEY || "asdaxawe12wqazcfs"; // 🔐 Use uma chave segura
    const data = `${this.email}:${this.name}:${Date.now()}`;

    this.token = crypto.createHmac("sha256", secretKey).update(data).digest("hex");
  }

  async sendEmail() {
    const templatePath = path.join(__dirname, "../../pages/email_template.html");
    let emailHtml = fs.readFileSync(templatePath, "utf-8");

    emailHtml = emailHtml
      .replace("{{name}}", this.name || "Usuario")
      .replace("{{reset_link}}", `${process.env.PAGE_RESET_EMAIL}${this.token}` || "http://localhost:3000/login/token");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nutrify.comercial25@gmail.com",
        pass: process.env.PWD_GMAIL,
      },
    });

    const mailOptions = {
      from: "nutrify.comercial25@gmail.com",
      to: this.email,
      subject: "Redefinição de Senha do nutrify",
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
  }
}

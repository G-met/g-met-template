import { Resend } from "resend";

import type { JSX } from "react";

interface EmailOptions {
  from: string;
  to: string[];
  subject: string;
  template: JSX.Element;
}

export class EmailService {
  private resend: Resend;
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }
  async sendEmail({ from, to, subject, template }: EmailOptions) {
    const { error } = await this.resend.emails.send({
      from,
      to,
      subject,
      react: template,
    });

    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}

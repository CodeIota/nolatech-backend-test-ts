import nodemailer from 'nodemailer';
import Observer from '@utils/Observer/observer.interface';

class EmailNotifier implements Observer {
  private transporter: nodemailer.Transport;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your service (e.g., SendGrid, AWS SES)
      auth: {
        user: 'your-email@gmail.com', // Replace with your credentials
        pass: 'your-email-password',
      },
    });
  }

  update(message: string): void {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'recipient@example.com', // Replace with recipient email
      subject: 'Evaluation Notification',
      text: message,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email notification error:', error);
      } else {
        console.log('Email notification sent:', info.response);
      }
    });
  }
}

export { EmailNotifier };

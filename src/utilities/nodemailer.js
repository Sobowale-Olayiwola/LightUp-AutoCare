require('dotenv').config();
const fs = require('fs/promises');
const nodemailer = require('nodemailer');

async function sendMailToClient(invoice) {
    const filePath = `./Invoice-${invoice.id}.pdf`;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.testEmail,
            pass: process.env.testEmailPassword,
        },
    });

    // send mail with defined transport object
    await transporter
        .sendMail({
            from: process.env.email, // sender address
            to: process.env.email,
            subject: `Invoice for ${invoice.model}`,
            text: 'We care about your safety',
            html: '<b>LightUp AutoCare</b>',
            attachments: [
                {
                    filename: `Invoice-${invoice.id}.pdf`,
                    path: filePath,
                },
            ],
        })
        .then(async () => {
            console.log('this should be success');
            await fs.unlink(filePath);
            console.log(`successfully deleted ${filePath}`);
        })
        .catch((error) => {
            console.error(error.message);
        });
}

module.exports = sendMailToClient;

const EventEmitter = require('events');
const { sendMail, generateToken } = require('../utilities/packages');
const BASE_URL = 'https://light-up-auto-care.herokuapp.com';

class CreatePasswordEmitter extends EventEmitter {}

const createPasswordEmitter = new CreatePasswordEmitter();
createPasswordEmitter.on('createPassword', async function (request, user) {
    const token = await generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
    });
    const emailContent = {
        from: process.env.email, // sender address
        to: user.email,
        subject: `Update profile by creating password`,
        text: `Hi ${user.name}. \n Update your password for your account by clicking this link below. This link would be valid within the next 24hrs for updating your password.\n ${BASE_URL}/createPassword?email=${user.email}&password_token=${token}`,
        html: '<b>LightUp AutoCare</b>',
    };
    const transportPayload = {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.testEmail,
            pass: process.env.testEmailPassword,
        },
    };
    await sendMail(transportPayload, emailContent).catch((error) => {
        console.error(error);
    });
});

module.exports = createPasswordEmitter;

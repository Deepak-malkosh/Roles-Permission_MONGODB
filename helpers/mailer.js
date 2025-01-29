const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({

    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure: false,
    requireTLS:true,
    auth:{
        user:process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASSWORD
    }
});


//sendMail method is responsible for send the mail
const sendMail = async(email, subject, content) =>{

    try {

        var mailOptions = {
            from:process.env.SMTP_MAIL,
            to:email,
            subject:subject,
            html:content
        };


        transporter.sendMail(mailOptions, (err, info) => {

            if (err) {
                console.log('Error sending mail:', err.message);
            } else {
                console.log('Mail has been sent', info.messageId);
            }
        }); 
        
    } catch (error) {
        console.log("error=>",error.message);
    }
}


module.exports = {
    sendMail
}


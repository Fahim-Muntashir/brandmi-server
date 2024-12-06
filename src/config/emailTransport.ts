import nodemailer from "nodemailer"

const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ahfba009@gmail.com",
        pass: "kdllgamwnexfgimy",
    },


});

export default emailTransporter
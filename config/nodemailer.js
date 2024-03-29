import nodemailer from "nodemailer";

const email = process.env.NODEMAILER_EMAIL;
const pass = process.env.NODEMAILER_PW;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass,
    },
});

export const mailOptions = {
    from: email,
    to: [email, "mette@digitaldogme.dk"],
};

export const mailOptionsForIndstilVirksomhed = {
    from: email,
    to: [email, "mette@digitaldogme.dk", "jakob@digitaldogme.dk"],
};
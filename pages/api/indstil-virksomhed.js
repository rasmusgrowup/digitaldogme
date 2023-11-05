import {mailOptions, mailOptionsForIndstilVirksomhed, transporter} from "../../config/nodemailer";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const data = req.body;
        const subject = "Ny indstilling af virksomhed til Årets Digitale Kompetenceløft";
        const message = "" +
            "Navn: " + data.name + "\n" +
            "Email: " + data.email + "\n" +
            "Telefonnummer: " + data.phone + "\n" +
            "Virksomhed/organisationens navn: " + data.company + "\n" +
            "Begrundelse: " + data.justification + "\n" +
            "Kontaktperson i virksomheden: " + data.contact + "\n" +
            "Øvrige kommentarer: " + data.comment + "";
        if (!data.name || !data.email || !data.phone || !data.company || !data.justification || !data.contact ) {
            return res.status(400).json({ message: "Data error"})
        }

        try {
            await transporter.sendMail({
                ...mailOptionsForIndstilVirksomhed,
                subject: subject,
                text: message,
                html:
                    `<div>
                        <h1 style="margin-bottom: 24px">Ny indstilling af virksomhed til Årets Digitale Kompetenceløft</h1>
                        <p style="margin-bottom: 12px">Oplysninger:</p>
                        <div style="white-space: pre-wrap">${message}</div>
                    </div>`
            })
            return res.status(200).json({ message: "Success!", success: true})
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: error.message})
        }
    }
    return res.status(400).json({ message: "Bad request"})
}

export default handler;
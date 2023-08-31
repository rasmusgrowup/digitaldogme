import {mailOptions, transporter} from "../../config/nodemailer";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const data = req.body;
        const subject = "Ny tilmelding til eventet " + data.eventTitle;
        const message = "" +
            "Navn: " + data.name + "\n" +
            "Titel: " + data.jobTitle + "\n" +
            "Virksomhed: " + data.company + "\n" +
            "Cvr.: " + data.cvr + "\n" +
            "Email: " + data.email + "";
        if (!data.name || !data.jobTitle || !data.company || !data.cvr || !data.email) {
            return res.status(400).json({ message: "Data error"})
        }

        try {
            await transporter.sendMail({
                ...mailOptions,
                subject: subject,
                text: message,
                html:
                    `<div>
                        <h1 style="margin-bottom: 24px">Ny tilmelding til eventet ${data.eventTitle}</h1>
                        <p style="margin-bottom: 12px">Oplysninger på den tilmeldte:</p>
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
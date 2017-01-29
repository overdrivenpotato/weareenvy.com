import path from 'path'
import dedent from 'dedent-js'
import express from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'

const TO = '[redacted]'
const FROM = '[redacted]'
const PASS = '[redacted]'

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: FROM,
        pass: PASS,
    }
})

const app = express()

app.use(bodyParser.json())

app.post('/signup', (req, res, next) => {
    const mailOptions = {
        from: FROM,
        to: TO,
        subject: `[WAE] ${req.body.name}`,
        text: dedent(`
            Submission type: ${req.body.type}
            Full name: ${req.body.name}
            Email: ${req.body.email}
            Link: ${req.body.link}
            Additional info: ${req.body.info || 'No additional info'}
        `),
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error)
        } else {
            console.log('Message sent: ' + info.response)
        }
    })

    res.send(null)
})

app.use('/', express.static(path.join(__dirname, '../client')))

app.listen(3000)

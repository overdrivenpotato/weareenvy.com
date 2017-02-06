import path from 'path'
import dedent from 'dedent-js'
import express from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'

const TO = process.env.TO
const FROM = process.env.FROM
const PASS = process.env.PASS

if(!(TO && FROM && PASS)) {
    console.error('The following environment variables are required:')
    console.error('    TO   - Target to send emails to')
    console.error('    FROM - The gmail account to send emails from')
    console.error('    PASS - The password for the \'FROM\' account')
    console.error(`Example:`)
    console.error(`    TO=target@gmail.com FROM=user@gmail.com PASS=userpass ${process.argv.join(' ')}`)

    process.exit(1)
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: FROM,
        pass: PASS,
    }
})

const app = express()

app.use(bodyParser.json())

app.post('/api/signup', (req, res, next) => {
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

    if(process.env.NODE_ENV == 'production') {
        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(error)
            } else {
                console.log('Message sent: ' + info.response)
            }
        })
    }

    res.send(null)
})

app.use('/_/', express.static(path.join(__dirname, '../client')))
app.get('/', (_, res) => res.sendFile(path.join(__dirname, '../client/index.html')))

app.listen(3000)

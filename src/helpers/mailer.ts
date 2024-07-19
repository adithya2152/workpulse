import nodemailer from "nodemailer"
import {google} from "googleapis"
 

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI
const REFRESH_TOKEN = process.env.NEXT_PUBLIC_REFRESH_TOKEN

const USER = process.env.NEXT_PUBLIC_USER

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
    throw new Error("Missing environment variable")
}

if (!USER) {
    throw new Error("Missing environment variable")
}

console.log("Environment variables: ", CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, USER)


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

type Props = {
    email:string,
    subject:string,
    text:string,
    html:string
}

export async function sendMail({email, subject, text, html}:Props) {
    try{

        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAUTH2',
                user: USER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            } as any
        });

        const mailoptions = {
            from:`Welcome , <${USER}>`,
            to:email,
            subject:subject,
            text:text,
            html:html
        }

        const result = await transporter.sendMail(mailoptions)
        return result

    }
    catch(error){
        console.log(error);
    }
}
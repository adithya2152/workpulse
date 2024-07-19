import {sendMail} from "@/helpers/mailer"

export async function POST(request:Request) {
    try{

        const{email , otp} = await request.json();

        console.log("Recieved" , email , otp);


        sendMail({email , subject:"Validate OTP" , text:"OTP" , html:`<h1>OTP : ${otp}</h1>`})
        .then((result) => {
       console.log(result);
        })
        .catch((error) => {
         throw error
        })
        return new Response(JSON.stringify({message:"Email sent"}) , {status:200})
    }
    catch(error){
        console.log(" Processing error ",error);
        return new Response(JSON.stringify({error:" Something went wrong"}) , {status:500})
    }
}
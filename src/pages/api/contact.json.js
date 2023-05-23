
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: import.meta.env.VITE_SMTP_HOST,
    port: import.meta.env.VITE_SMTP_PORT,
    auth: {
        user: import.meta.env.VITE_SMTP_USER,
        pass: import.meta.env.VITE_SMTP_PASS,
    }
});


function generateEmail({email,name,message}) {
    const msge =  `<div style="padding:20px">
        <h2>You have a new contact!</h2>
        <ul style="list-style-type:none">
            <li style="margin-bottom:10px">Name: ${name}</li>
            <li style="margin-bottom:10px">Email: ${email}</li>
            <li >Message: ${message}</li>
        </ul>
    </div>`;
  
  return msge;
}



export const post = async ({ request }) => {
  const data = await request.json();
  
   if (data.masterLenina) {
        return new Response(JSON.stringify({
          message: 'Boop beep bop zzzzstt good bye'
        }), {
          status: 400
        })
    }


    const info = await transporter.sendMail({
        from: `jandrade.co< ${import.meta.env.VITE_SMTP_USER}>`,
        to: `Juan Andrade <jfandtec@gmail.com>`,
        subject: 'New contact!',
        html: generateEmail(data),
    });
  
   
  
    return new Response(JSON.stringify({
      message: 'Your message has been delivered. Thanks for contacting! 😀'
    }), {
      status: 200
    })
  
}
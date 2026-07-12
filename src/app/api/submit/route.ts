import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend API Key will be injected via environment variables (.env.local)
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, ...surveyResponses } = data;

    const messageBody = `Hi ${name},\n\nThis is Opeyemi from LagChow.\n\nYou’re early.\n\nWe’re currently selecting a small group of people who will get first access to test LagChow before it opens publicly to all UNILAG students.\n\nIf selected, you’ll be among the first to:\n- Try our campus food delivery system\n- Lock in early student discounts\n- Help shape how LagChow works\n\nSelection is limited and based on your responses.\n\nWe’ll reach out to you directly via WhatsApp or email.\n\nThank you for trying this early.\n\nLet’s build this together.\n\n– Opeyemi from LagChow`;

    // 1. Send the Auto-reply to the user
    // NOTE: 'hello@chowvest.com' MUST be verified in your Resend dashboard!
    const userEmailPromise = resend.emails.send({
      from: 'Opeyemi from LagChow <hello@chowvest.com>', 
      to: email, // Sending to the dynamic user email
      subject: "LagChow – You're Early",
      text: messageBody,
    });

    // Format the responses to be readable
    const formattedResponses = Object.keys(surveyResponses)
      .sort((a, b) => {
        // Sort keys like q1, q2, q10 correctly
        const numA = parseInt(a.replace('q', ''));
        const numB = parseInt(b.replace('q', ''));
        return numA - numB;
      })
      .map((key) => {
        const val = surveyResponses[key];
        return `${key.toUpperCase()}: ${Array.isArray(val) ? val.join(', ') : val}`;
      })
      .join('\n');

    // 2. Send the notification to the team / admins
    const adminEmailPromise = resend.emails.send({
      from: 'LagChow Waitlist <hello@chowvest.com>',
      to: 'hello@chowvest.com', // As requested, send notifications to this address
      subject: `New LagChow Waitlist Submission: ${name}`,
      text: `
A new user has joined the LagChow Waitlist!

Name: ${name}
Email: ${email}

Responses:
${formattedResponses}
      `,
    });

    // Only attempt to send if RESEND_API_KEY is actually defined and valid
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith('re_')) {
      const [userRes, adminRes] = await Promise.all([userEmailPromise, adminEmailPromise]);
      
      if (userRes.error || adminRes.error) {
        console.error('Resend API Error:', userRes.error || adminRes.error);
        return NextResponse.json({ success: false, error: userRes.error || adminRes.error }, { status: 400 });
      }
      
      console.log('Successfully dispatched emails to User and Admin');
    } else {
       console.log("\n[WARNING] No RESEND_API_KEY found, simulating successful email send.");
       console.log("-> Auto Reply would be sent to:", email);
       console.log("-> Notification would be sent to: hello@chowvest.com\n");
    }

    return NextResponse.json({ success: true, message: 'Emails sent successfully.' }, { status: 200 });
  } catch (error: any) {
    console.error("Error processing Waitlist submission API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

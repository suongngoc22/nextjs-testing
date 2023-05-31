import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req, res) {
  const { receiver, subject, message } = await req.json();

  try {
    await sendgrid.send({
      to: receiver,
      from: "nnguyensuong22@gmail.com",
      subject: subject,
      text: message,
    });
    return new Response("worked", { status: 200 });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
}

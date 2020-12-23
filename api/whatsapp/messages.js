var zenvia = require('@zenvia/sdk');

const client = new zenvia.Client(process.env.WHATSAPP_TOKEN);
const whatsapp = client.getChannel('whatsapp');

const client2 = require('twilio')(
  process.env.TWILIO_ACCOUNTSID, process.env.TWILIO_AUTH_TOKEN
); 

module.exports = async (req, res) => {
  const { message, cellphone } = req.query;
  const content = new zenvia.TextContent(message);

  try {
    const response = await whatsapp.sendMessage('petalite-lasagna', cellphone, content);
    const twilioResponse = await client2.messages 
          .create({ 
            body: 'Hello! This is an editable text message. You are free to change it and write whatever you like.', 
            from: 'whatsapp:+14155238886',       
            to: 'whatsapp:+556285615483' 
          }); 
    res.send({ zenvia: response, twilio: twilioResponse });
  } catch (error) {
    res.send({ error })
  }
}

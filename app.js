const express = require('express');
const { Client, LocalAuth, Buttons } = require('whatsapp-web.js');
const colors = require('colors');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
require('dotenv').config();


const port = process.env.PORT;


const app = express();


const SESSION_FILE_PATH = './session.json';

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}



const client = new Client({
  puppeteer: {
    // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],

  },
  authStrategy: new LocalAuth({ clientId: "Client-one" }),
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  }
});


client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});




client.on('authenticated', (session) => {
  console.log('Conexión exitosa');
  sessionData = session;
  if (sessionData) {
      fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
          if (err) {
              console.error(err);
          }
      });
  }


// Mensajes 

const numbers = [

  
  // ----------------------------------------------------------------------------------------------------------


  


    // 
    "573204037757",
     
  
  
  ]
    
   
  
  
  const messages = [








    // 
     "Hola Camilo soy MED 🤖 BOT ya termine de Enviar los Mensajes ",
    ]
// Genera un código QR en la consola para escanear




  client.on('message', async (message) => {
    console.log(`Mensaje recibido de ${message.from}: ${message.body}`);
  });

  

  let messageCounter = 0;
  // Recorre el array de números de teléfono
  numbers.forEach((phoneNumber, index) => {
    // Agrega el sufijo @c.us al número de teléfono
    const phoneNumberWithSuffix = `${phoneNumber}@c.us`;
   
  
    // const randomInterval = Math.floor(Math.random() * 35) + 15; // Genera un número aleatorio entre 5 y 50 segundos
setTimeout(() => {
      client.sendMessage(phoneNumberWithSuffix, messages[index]);
      console.log(`mensaje ${++messageCounter} enviado a ${phoneNumberWithSuffix}`.red);

      }, 15 * 1000 * (index + 1));
  });
});

// 


app.listen(port, () => {
console.log(`Servidor Express escuchando en el puerto ${port}`);
client.initialize();
});


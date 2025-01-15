const express = require('express');
const path = require('path');
const NodeMediaServer = require('node-media-server');

// Configuração do servidor RTMP e WebRTC
const app = express();
const port = 5000;

// Definir o diretório onde os arquivos estáticos estão localizados (incluindo o index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para o player
app.get('/player', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor HTTP
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Configuração do NodeMediaServer (RTMP e WebRTC)
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*'
  }
};

const nms = new NodeMediaServer(config);
nms.run();


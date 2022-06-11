// Incluindo uma biblioteca
const http = require('http');
const url = require('url'); 
const queryString = require('query-string');

// Definindo o endereço / URL
const hostname = '127.0.0.1'; // IP
const port = 3000; // Porta

// Implementação da regra de negócio
const server = http.createServer((req, res) => {

  //Pegar a pergunta na url
  const params = queryString.parse(url.parse(req.url, true).search);

  //Verificar a pergunta e escolher uma resposta
  let resposta;
  if(params.pergunta == 'melhor-filme'){
    reposta = 'Sweeney Toddy';
  }else if (params.pergunta == 'pior-filme'){
    resposta = 'Monty Python';
  }else {
    resposta = 'não sei, desculpe :(';
  }
  //Retornar a resposta escolhida


  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(resposta);
});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
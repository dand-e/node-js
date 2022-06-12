// Incluindo uma biblioteca
const http = require('http');
const queryString = require('query-string');
const url = require('url');
const fs = require('fs');

// Definindo o endereço / URL
const hostname = '127.0.0.1'; // IP
const port = 3000; // Porta

// Implementação da regra de negócio
const server = http.createServer((req, res) => {

  let resposta;
  const urlparse = url.parse(req.url, true);

  //Receber informações do usuário
  const params = queryString.parse(urlparse.search);

  // Criar usuário - Atualizar o usuário
  if(urlparse.pathname == '/criar-usuario'){

    //Salvar as informações
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params) , function (err){
      if(err) throw err;
      console.log('Saved');

      // Confirma salvamento das informações
      resposta = `Hello, ${params.nome}! Dados salvos com sucesso`

      // Resposta sendo apresentada
      res.statusCode = 200; //201
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });

    
  }

  // Selecionar usuário
  else if(urlparse.pathname == '/selecionar-usuario'){
    fs.readFile('users/' + params.id + '.txt', function(err, data){
      // res.writeHead(200, {'Content-Type': 'text/html'});
      // res.write(data);
      // return res.end();
      resposta = data;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);
    })
  }

  // Remover usuário
  else if(urlparse.pathname == '/remover-usuario'){
    fs.unlink('users/' + params.id + '.txt', function(err){
      console.log('File deleted!');

      resposta = err ? 'Usuario nao encontrado' : 'Usuario removido'

      res.statusCode = 200; //204
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    })
  }
  
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end(resposta);
});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//127.0.0.1:3000/criar-usuario?nome=Felipe&idade=100&id=-1
//127.0.0.1:3000/criar-usuario?nome=Felipe&idade=29&id=-1
//127.0.0.1:3000/selecionar-usuario?id=-1
//127.0.0.1:3000/remover-usuario?id=-1
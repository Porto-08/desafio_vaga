
  

<p  align="center"  width="100%">

  

<img  width="128px"  src="images/favicon.ico"  alt="Zeztra">

  

</p>

  

  

## Desafio FullStack Zeztra
Este projeto tem proposito de um desafio proposto pelo time da Zeztra para uma vaga de Desenvolvedor Fullstack.

## Como iniciar os projetos (API e Front-end)
### API
Para iniciar a API da aplicação, primeiro você ir até a pasta da aplicação, no caso, "backend" e instalar as dependências: 
```bash
npm install
```
Em seguida, crie um arquivo .env com as seguintes variaveis: 
</br>
</br>
<strong> PORT=3000 </strong>
</br>
<strong> MONGO_URI= </strong>

Elas são necessárias para a aplicação funcionar corretamente.

Agora, dê inicio ao projeto: 
```bash
npm run dev
```
### FRONT-END
Primeiro, você precisa sair da basta "backend" e ir para a "frontend" e instalar as dependências da aplicação:
```bash
npm install
```

Agora basta inicializar o projeto: 
```bash
npm run dev
```

## Melhorias recomendadas
- Implementação do Docker em todo o projeto para mais fácil inicialização;
- Melhoria na lógica de criação de transações, implementando fila e chunk para melhor desempenho da aplicação;
- Cache para exibir dados com mais velocidade na tela do usuário


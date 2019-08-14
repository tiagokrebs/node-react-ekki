# Ekki
Projeto full-stack teste contendo MVC da aplicação Ekki.

git clone https://github.com/tiagokrebs/node-react-ekki
cd node-react-ekki
npm init
sudo npm install -g foreman
cd backend
npm init
npm install
cd ..
cd frontend
npm install
cd ..
npm start

Descrição do projeto:
Um banco está passando por uma transformação digital. A área de produto chegou na conclusão que é necessário criar uma aplicação web para reter seus clientes, onde seja possível transferir dinheiro para outras pessoas de forma fácil objetiva e sem taxas. 

MVP da solução:
- Home que liste o saldo atual da conta do usuário logado.
- Não precisa ter tela de login e senha.
- Os atributos do usuário devem ser nome, CPF e Telefone Celular.
- O saldo inicial do usuário deve ser R$ 1.000,00.
- Cada usuário/favorecido deve ter uma conta digital com número identificador, um saldo e limite de R$ 500,00.
- CRUD de contatos/favorecidos do usuário logado.
- Transferência de dinheiro do usuário para seus favorecidos.
- Tela que liste o Histórico de transferências(extrato).

Requisitos Backend:
- Desenvolvimento de API com todos os endpoints necessários para servir o frontend e features acima.
- Modelagem de banco de dados para suportar a aplicação.

Requisitos Frontend:
- Desenvolvimento das páginas para prover a experiência necessária no MVP.
- A aplicação deve ser responsiva.

Regras de negócio:
- Caso o valor da transferência seja maior que o saldo atual da conta, sinalizar o usuário que irá ser utilizado o limite da conta para completar a transação, caso não tenha limite disponível, mostrar mensagem de saldo insuficiente.
- Se for transferido em menos de 2 minutos, o mesmo valor, para o mesmo usuário, cancelar a transação anterior e manter a última.

Adicionais:
- Ser um PWA
- Levar em consideração acessibilidade

Tecnologias requeridas:
- Backend: NodeJS
- Frontend: ReactJS
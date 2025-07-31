# Fintrack - Site de Análise Financeira

Este projeto foi desenvolvido para mostrar todas suas despesas e ganhos mensais, melhorando a sua gestão sobre o próprio dinheio (diminuindo as chances de endividamentos e simplesmente confusões em relação ao que você possui ou não possui mais).

## 📸 Demonstração
Acesse uma demonstração ao vivo [aqui](https://fintrackbr.netlify.app)

### Como criar uma conta/logar em uma conta.
![opera_pZkwLfwXuW](https://github.com/user-attachments/assets/29647ec1-2c60-430f-9f82-0a9e7738e805)

### Como acessar a página do usuário. (onde é mostrado o dashboard principal, contendo informações como saldo atual, o quanto foi: gasto, ganho e economizado no mês).
![opera_EOsqNIs8rk](https://github.com/user-attachments/assets/bb7bdad0-e5ec-4b09-b4bf-af6124d6e012)

### Como criar categorias(para posterior criação de transações)/ver o histórico de transações.
![opera_voXqczcZv5](https://github.com/user-attachments/assets/6cb47d7b-e545-462f-884e-27eb26024dec)

### Como criar transações (usando as categorias criadas anteriormente) em diversas datas.
![opera_vpgczl6Jo0](https://github.com/user-attachments/assets/d5127b31-a157-4629-a4c4-70806e49a67d)

### Como filtrar transações pelo nome.
![opera_6d5hOlf4Hb](https://github.com/user-attachments/assets/50ec86bb-1c26-4275-941f-e4eaa10cc65d)

### Sistema de páginação
![opera_niHMgV0Wkm](https://github.com/user-attachments/assets/e792ae6d-1b24-4843-ad39-6c943611c929)

### Como acessar a página dos Orçamentos e criar um orçamento para uma das categorias criadas anteriormente.
![opera_Z3kQltvu4D](https://github.com/user-attachments/assets/61e3604d-03f9-42f3-af2d-4a3e26a30435)

### Como acessar a página dos Relatórios (onde o primeiro gráfico mostra a quantia de despesas de cada categoria em um determinado perído e o segundo gráfico mostra um comparativo de 2 colunas por mês, mostrando o quanto foi ganho e gasto naquele mês)
![opera_zCfbADYsbP](https://github.com/user-attachments/assets/6baeb008-e8e7-4423-87a1-fcb184cce54a)

### Como acessar a página dos Objetivos e como criar um objetivo (uma meta)
![opera_UyEB47cTJF](https://github.com/user-attachments/assets/3884267c-d835-464c-b661-f83f4f4acaa2)

### Como editar um objetivo com novas informações (qualquer valor usado em um objetivo é retirado do saldo pois tecnicamente aquela quantia está reservada)
![opera_6K7JWFb8jD](https://github.com/user-attachments/assets/ad61b016-3068-4692-9cb6-b2a664cea29a)

### Caso complete a meta antes da data limite (antes do dia final) o objetivo fica verde, é possível deletar esse objetivo (tendo em mente que o dinheiro usado nele ficara guardado como "Economia" no Dashboard principal).
![opera_CUuDVi71go](https://github.com/user-attachments/assets/390de578-b0a7-431d-81c7-f86f4f6ae07a)

### Caso NÃO complete a meta antes da data limite (antes do dia final) o objetivo fica vermelho, é possível deletar esse objetivo (tendo em mente que o dinheiro usado nele volta para o seu saldo no Dashboard principal).
![opera_mBs2SetLnM](https://github.com/user-attachments/assets/f35f9c67-5750-4b48-b2e5-467e108e6758)

### Como acessar a página das Configurações e como alterar o tema do site e a moeda utilizada pelo site (USD, BRL ou EUR)
![opera_8QqOXtPVkP](https://github.com/user-attachments/assets/955e1247-a18b-46b3-abba-3302521a81bc)

### Moeda DÓLAR (a conversão é feita automaticamente no site todo)
![chrome_qlj3VaKvzt](https://github.com/user-attachments/assets/23fb5f94-3dac-44c4-9c2c-3d6c1f1e16ae)

### Moeda EURO (a conversão é feita automaticamente no site todo)
![chrome_es5K2BXbDI](https://github.com/user-attachments/assets/c0c5ee12-66fb-48d6-af13-27218d79a3ef)

### Moeda REAL (a conversão é feita automaticamente no site todo)
![chrome_twm9CIu8Kd](https://github.com/user-attachments/assets/e580548a-eb64-4b0b-bb00-13a16b83be60)

## 🧪 Testes

Este projeto inclui testes automatizados para garantir a qualidade e estabilidade da aplicação, abrangendo testes unitários, de integração e end-to-end.

### Testes Unitários e de Integração (Jest)

Para executar os testes unitários e de integração, utilize o Jest com o seguinte comando:

```bash
npx jest
```

Para executar os testes E2E, utilized o Cypress com o seguinte comando:
```bash
npx cypress run
```

### 
## 🚀 Tecnologias Utilizadas

### Frontend
- **React**: Para o desenvolvimento do frontend interativo e responsivo com TypeScript.
- **Vite**: Ferramenta de build rápida e eficiente para desenvolvimento React.
- **TailwindCSS**: Framework CSS para estilização moderna e responsiva, incluindo plugins como tailwind-merge e tailwindcss-animate.
- **React Router**: Gerenciamento de rotas e navegação entre páginas.
- **Axios**: Cliente HTTP para realizar requisições à API backend.
- **React Query (@tanstack/react-query)**: Gerenciamento eficiente de estado e cache de dados da API.
- **React Hook Form**: Para gerenciamento e validação de formulários.
- **Zod**: Validação de esquemas para formulários e dados.
- **Sonner**: Biblioteca para exibição de notificações e mensagens ao usuário.
- **Chart.js e react-chartjs-2**: Para criação de gráficos e visualização de dados.
- **Lucide-react e react-icons**: Ícones para a interface.
- **Cypress**: Testes end-to-end para garantir qualidade da aplicação.
- **Jest e Testing Library**: Testes unitários e de integração.
- **ESLint**: Ferramenta para análise estática de código e garantia de qualidade.

### Backend
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para criação da API REST e gerenciamento de rotas.
- **Prisma ORM**: ORM para modelagem e interação com banco de dados.
- **Bcryptjs**: Criptografia segura de senhas dos usuários.
- **JWT (JSON Web Tokens)**: Autenticação e autorização de usuários.
- **CORS**: Middleware para permitir requisições de diferentes origens.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Express Validator**: Validação de dados nas requisições da API.
- **Multer-storage-cloudinary e Cloudinary**: Upload e armazenamento de imagens na nuvem.
- **Cookie-parser**: Manipulação de cookies.
- **Nodemon**: Ferramenta para reinício automático do servidor durante desenvolvimento.
- **Jest e Supertest**: Testes unitários e de integração para backend.

## ⚙️ Funcionalidades

- **Autenticação Completa**: Cadastro e login de usuários com validação e segurança.
- **Gerenciamento de Metas Financeiras**: Criação, leitura, atualização e exclusão de objetivos financeiros vinculados a usuários.
- **Transações Relacionadas a Metas**: Registro e controle de transações financeiras associadas às metas.
- **Gráficos Relacionados a Gastos e Ganhos**: Gráficos claros e intuitivos mostrando informações de gastos e ganhos por categoria ou período de tempo.
- **Interface Responsiva e Acessível**: Design adaptável para diferentes dispositivos e uso de componentes acessíveis.
- **Validação Robusta de Formulários**: Uso de Zod e React Hook Form para garantir integridade dos dados.
- **Rotas Protegidas**: Acesso restrito a funcionalidades específicas para usuários autenticados.
- **Testes Automatizados**: Cobertura de testes unitários, integração e end-to-end para garantir qualidade e estabilidade.

**OBS:**
- Este projeto foi desenvolvido com fins educacionais e para demonstração de habilidades em desenvolvimento web fullstack.

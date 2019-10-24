Desafio 2: Gympoint
===================

<p align="left">
  <a href="#sobre-o-desafio">Sobre o desafio</a><br>
  <a href="#criar-aplicacao">Criar Aplicação</a><br>
  <a href="#adicionar-a-dependencia-do-express">Adicionar a dependencia do express</a><br>
  <a href="#adicionar-depencia-nodemon">Adicionar depencia "nodemon"</a><br>
  <a href="#Sucrase">Sucrase</a><br>
  <a href="#editor-config">Editor Config</a><br>
  <a href="#eslint-e-prettier">Eslint e Prettier</a><br>
  <a href="#docker-e-postgres">Docker E Postgres</a><br>
  <a href="#sequelize">Sequelize</a><br>
  <a href="#crypt-senha">Crypt Senha</a><br>
  <a href="#jwt">JWT</a><br>
</p>

## Sobre o desafio

A aplicação de gerenciador de academia, o **Gympoint**.


## Criar aplicação 
executar no terminal:
```
yarn init -y
```
*Irá criar o arquivo package.json*
> O arquivo package.json contém todas as dependências
> quando tiver tudo declarado e alguem precisar executar, baixar as dependencias, 
> utilizar o unico comando:
```
yarn
```

## Adicionar a dependencia do express
```
yarn add express
```
**O framework do express, fornece mecanismo para:**
* Gerencia as requisições de diferentes requisições e rotas e URLs.
* Definir as configurações comuns da aplicação web, como a porta a ser usada para conexão e a localização 
dos modelos que são usados para renderizar a resposta.
* Adicionar em qualquer ponto da requisição um "middleware" para interceptar processar ou pré-processar
e tratamentar à mesma.
> Adicionar mecanismo para resposta em json no express:
```javascript
const express =  require('express');
const server = express();
server.use(express.json());
server.listen(3333); //porta onde irá executar a aplicação node
```

## Adicionar depencia "nodemon"
```
yarn add nodemon -D
```
** -D adicionar apenas em modo de desenvolvimento ** 
> O nodemon fica monitorando as modificações e reinicia o servidor node 
---

## Sucrase
> Ao invés de utilizar o:
```javascript
require('arquivo');
```
> Permite utilizar da seguinte forma:
```javascript
import Alias from 'arquivo';
```
> E no lugar de:
```javascript
module.exports
```
> alterar para:
```javascript
export default
```
**Instalação:**
```
yarn add sucrase -D
```
**Configuração**

1. Criar na raiz do projeto o arquivo nodemon.json
2. Adicionar ao arquivo nodemon o seguinte:

```javascript
{
    "execMap": {
        "js": "node -r sucrase/register"
    }
}
```

3. no arquivo package.json adicionar o seguinte na chave "scripts":

```javascript
{
	"dev": "nodemon src/server.js",
	"dev:debug": "nodemon --inspect src/server.js"
} 
```

4. Para ativar o modo debug com o sucrase no vscode:

a. Acessar a area de debug do vscode

b. clicar em Add configuration...

c. no arquivo gerado "launch.json" substituir pelo seguinte conteudo:
```javascript
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Launch Program",
            "restart": true,
            "protocol": "inspector"
        }
    ]
}
```
d. executar o comando:
```
yarn dev:debug
```
e. play na area de debug

----

## Editor Config

**Plugin do VSCode**
[Links with title](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig "Editor Config")
>O plugin tenta substituir as configurações do user/workspace pelas encontradas em .editorconfig
a. Instalar o Editor Config
b. Na raiz do projeto criar o arquivo: .editoconfig
c. Adicionar o seguinte código:
```javascript
root = true

[*]
indent_style = space
indent_size = 4
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```
---- 

## Eslint e Prettier
>Realiza correções autómaticas do código
**Plugin do VSCode**
[Links with title](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint "Eslint")
a. Instalar o plugin no vscode, buscar por Eslint
b. Abrir o arquivo settings.json do vscode, *Não é o default*
>No mac combinação de teclas de atalho: Command+Shift+P
>Buscar por "json"
c. Adicionar no settings.json:
```javascript
"eslint.autoFixOnSave": true,
"eslint.validate": [
    {
        "language": "javascript",
        "autoFix": true,
    },
    {
        "language": "javascriptreact",
        "autoFix": true
    }
]
```

d. Instalara o Eslint no projeto:
```
yarn add eslint -D
```

**Configurar eslint**

```
yarn eslint --init
```

e. definir:
* To check syntax, find problems, and enforce code style
* JavaScript modules (import/export) 
* None of these
* Node
* Use a popular style guide
* Airbnb (https://github.com/airbnb/javascript) 
* JavaScript 
* Yes

d. Será instalado via npm e criado o arquivo package.json.lock, deve remover o arquivo package.json.lock e executar o comando:
```
yarn
```
f. Instalar o prettier (Deixa o código mais "bonito")
```
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```
g. no arquivo: .eslint.js na chave rules adicionar o seguinte:
```javascript
{
	"prettier/prettier": "error"
	"class-methods-use-this": "off",
	"no-param-reassign": "off",
	"camelcase": "off",
	"no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
}
```
h. No arquivo: .eslint.js na chave extends add: 'prettier'
e adicionar uma nova chave "plugins": 
```javascript
extends: [
	'airbnb-base',
	'prettier'
],
plugins: ['prettier'],
```

i. Como algumas regras do prettier estão em conflitos com do airbcnc é necessário realizar mais um procedimento:

* Criar na raiz do projeto o arquivo .prettierrc
* Adicionar o seguinte:
```javascript
{
    "singleQuote" : true,
    "trailingComma": "es5"
}
```

>Para corrigir (identação, virgula, ponto e virgula, espaços...) em vários arquivos em um diretorio:
```
yarn eslint --fix src --ext .js
```
----

## Docker E Postgres

**Instalação:**
1. buscar no google docker ce
2. [Link para Mac:](https://docs.docker.com/docker-for-mac/install/ "Docker ce")

>Será necessário ter ou criar uma conta

>Caso o so não seja compativel instale o legacy do docker:
>https://docs.docker.com/toolbox/toolbox_install_mac/
>https://github.com/docker/toolbox/releases

3. Realizar instalação

>No caso do legacy no mac:
>Alterar arquivo:
```
nano ~/.docker/config.json
```
>remover:
```js
"credsStore" : "desktop",
```
>Salvar

>Executar comando para efetuar login:
```
docker login --username carromesa
```

**Instalar base postgres:**
```
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
```
**Detalhes:**
>-p  X:Y

>-p = porta

>X = porta na minha máquina, escolher alguma disponível.

>Y = Porta equivalente no docker para emparelhar com a porta X.

>postgres:ZZ

>ZZ = versão da base de dados

----
**Comandos Docker**

* parar docker:
```
docker stop <nome do docker>
```

* Mostrar todos os docker mesmo os que estão parados
```
docker ps -a 
```

* Mostrar apenas os docker em execução
```
docker ps
```

* Iniciar o container:
```
docker start <nome do docker>
```

* Ver log do docker:
```
docker log <nome do docker>
```

----

## Sequelize

**Instalação**
```
yarn add sequelize
```
Cli para executar alguns comandos como migrate e seeds
```
yarn add sequelize-cli
```

a. criar na raiz do projeto um arquivo com o nome .sequelizerc e add o conteudo:

```js
const { resolve } = require('path');


module.exports = {
    config: resolve(__dirname, 'src', 'config', 'database.js'),
    'models-path': resolve(__dirname, 'src', 'app', 'models'),
    'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
    'seeders-path': resolve(__dirname, 'src', 'database', 'seeders'),
}
```

>Não dá para utilizar o import e export default pois o sucrase não atinge esse arquivo.

Conforme docs do sequelize instalar os scripts necessários para conectar ao postgres

```
yarn add pg pg-hstore
```

b. Criar o migration:
```
yarn sequelize migration:create --name=create-users
```

c. Irá criar um arquivo de migration, o qual deve ser ajustado.
depois para verificar se deu tudo certo executar o comando:
* para gerar as tabelas:
```
yarn sequelize db:migrate
```

* para desfazer a migration:
```
yarn sequelize db:migrate:undo
```

* Hooks, chama uma determinada ação antes ou depois de uma chamada a base de dados
Ex.:
```js
this.addHook('beforeSave', async user => {
    if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
    }
});
return this;
```
* Ex. completo:
```js
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );
        this.addHook('beforeSave', async user => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}
export default User;
```

---
## Crypt Senha
**Instalação**
```
yarn add bcryptjs
```
**Utilização**
```js
//bcrypt.hash('valor', strong); //quanto maior o valor mais processamento utiliza.
const hash = bcrypt.hash('valor', 8); // gera a senha crypt

bcrypt.compare('valor sem crypt', hash); //testa o valor, retorno boolean


```

---
## JWT
**Gera token**
>Utilizado para gerar token a partir de um valor e ainda no lado servidor discriptografa para recuperar o valor

**Instalação**
```
yarn add jsonwebtoken
```

#### Exemplo de utilização (Gerar token):
```js
import jwt from 'jsonwebtoken';

//gerar token
const id = 12;
jwt.sign({ id }, 'numeroqualqueraqui', {
    expiresIn: '7d',
});
```

#### Exemplo de utilização (Obter valor original):

```js
//decodar token:
//fazer no middleware
import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // promise from node js para utilizar async no export

const authHeader = req.headers.authorization;
if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
}

const [, token] = authHeader.split(' ');

try {
    const decoded = await promisify(jwt.verify)(token, 'numeroqualqueraqui');
    console.log(decoded);
    req.userId = decoded.id;
    return next();
} catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
}

```

---

## Estrutura do projeto

Pastas:
* src
	* app
		* controllers
		* middlewares
		* models
	* config
	* database 
		* migrations   

---

## Yup

**Instalação**
```
yarn add yup
```

**Como utilizar**

```js
import * as Yup from 'yup';
//...
const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
        .email()
        .required(),
    idade: Yup.number().required(),
    peso: Yup.number().required(),
    altura: Yup.number().required(),
});

if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validations fails' });
}
```

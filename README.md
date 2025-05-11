# Aplicativo Mobile - Controle de Gastos

**Atividade Prática (60%) - Módulo 1**  
Aula 09 — 05/05/2025  
Professor: Luiz Augusto Grein

---

## 📱 Sobre o Projeto

Este é um aplicativo mobile para controle de gastos pessoais, desenvolvido em **React Native** com **Expo** e **Firebase (Auth + Firestore)**.  
Cada usuário pode cadastrar, visualizar, editar e remover seus próprios gastos, além de acessar e atualizar os dados do seu perfil.

---

## ⚙️ Funcionalidades

- **Cadastro de usuário:** e-mail, senha, nome e telefone
- **Login:** com e-mail e senha
- **Recuperação de senha:** via e-mail (recurso padrão do Firebase)
- **Adicionar, listar, editar e excluir gastos**
- **Exibição do total de gastos no topo da tela**
- **Listagem de gastos ordenada e agrupada por data**
- **Tela "Minha Conta" com dados do usuário logado**
- **Acesso restrito aos dados do próprio usuário**

---

## 🗂️ Estrutura do Firestore

### users

- `id` (uid)
- `name`
- `email`
- `phone`

### expenses

- `id`
- `userId` (referência ao usuário)
- `description`
- `value`
- `date`

---

## ▶️ Como Rodar o Projeto

### 1. Pré-requisitos

- Node.js instalado
- Expo CLI (instala automaticamente com o comando `npx expo`)

### 2. Configuração das Variáveis de Ambiente

1. Renomeie o arquivo `.env.example` para `.env`.
2. Preencha com suas credenciais do Firebase:

- REACT_APP_FIREBASE_API_KEY=SUACHAVE
- REACT_APP_FIREBASE_PROJECT_ID=SEUPROJECTID

### 3. Instale as dependências

Abra o terminal na pasta do projeto e execute:

- `npm install`

### 4. Rode o projeto

No terminal, execute:

- `npx expo start`

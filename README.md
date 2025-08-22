# Documentação Painel Fin-X 🩺

Projeto voltado para gerenciamento de solicitações cirúrgicas.

## 💻 Techs utilizadas

- Node 22.11.0
- Vue 3
- Vuetify ^3.9.1
- Axios
- Pinia
- VueUse

## 💿 Instalação

- Clone este repositório.
- Garanta que está utilizando a mesma versão do Node especificada.
- Execute os comandos:

```
npm i         # Instala as dependências
npm run dev   # Compila e inicia o servidor de desenvolvimento

Importante: mantenha sua branch na main (após aceitar o PR).
```

## ✨ Funcionalidades 

⚡ **Visualização otimizada de dados:**
Interface construída para lidar com grande volume de dados sem perda de desempenho. Permite visualizar informações de pacientes, médicos e indicadores cirúrgicos.

🔍 **Filtros dinâmicos:**
Pesquise facilmente por médico ou paciente para encontrar solicitações específicas.

📄 **Paginação:**
Navegue pelos registros de forma simples e organizada.

🛠 **Virtual List:**
Para cenários com altíssimo volume de dados, é usada uma lista virtual que renderiza apenas os itens visíveis no viewport, garantindo máxima performance

## 🪶 API

Para simular o contrato e os dados reais, foi utilizado um arquivo JSON com a estrutura esperada pela aplicação.
Com o auxílio de uma IA, foram gerados 1.000 registros para testar a aplicação sob grande volume de dados, avaliando desempenho, comportamento da interface e experiência do usuário.

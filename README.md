<div align="center">

# 💸 Delator: o melhor amigo do universitário!

> Site de análise comportamental de gastos e controle financeiro para universitários de baixa renda.

</div>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Screenshots](#-screenshots)
- [Tecnologias](#-tecnologias)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Time](#-time)
- [Licença](#-licença)

---

## 🎯 Visão Geral

**Delator** é um web app de controle financeiro universitário desenvolvido para o **Hackathon Elas+ Tech 2026 — Ada & Artemisia & CAIXA**, com foco em universitários de baixa renda que precisam entender para onde vai seu dinheiro de forma visual, acessível e sem pressão.

### O Problema

A maioria das ferramentas financeiras existentes exibe números, não narrativas. O resultado é que pessoas com menos familiaridade com finanças veem planilhas e gráficos frios que não respondem a pergunta mais importante: **"Por que meu dinheiro some todo mês?"**

### A Solução

**Delator** transforma transações brutas em **insights comportamentais**: identifica o "vilão" do mês, classifica o perfil de consumo do usuário em arquétipos reconhecíveis, revela padrões semanais de gastos e alerta sobre categorias em crescimento.

---

## ✨ Funcionalidades

| Tela             | Funcionalidade            | Descrição                                                                |
| ---------------- | ------------------------- | ------------------------------------------------------------------------ |
| **Transações**   | Listagem com filtros      | Histórico mensal com filtro por categoria           |
| **Dashboard**    | Visão geral do mês        | KPIs, gráfico de pizza por categoria e destaque do vilão                 |
| **Vilão do Mês** | Análise da pior categoria | Detalhamento da categoria que mais cresceu, com comparação mensal        |
| **Insights**     | Perfil comportamental     | Arquétipo de consumo, padrão semanal, categoria em crescimento e alertas |

---

## 📸 Screenshots


### Dashboard principal com visão mensal:

<img width="1914" height="864" alt="Screenshot_6" src="https://github.com/user-attachments/assets/21fbbdd1-46a9-44c5-9559-30a87ee02bb2" />

### Insights do usuário alertando sobre padrões de consumo, categorias de gastos e outros alertas:

<img width="1914" height="865" alt="Screenshot_7" src="https://github.com/user-attachments/assets/bb587e0d-73af-49e6-9140-227bf14ff3b4" />


---

## 🛠 Tecnologias

### Frontend

| Tecnologia                                    | Versão | Uso                                 |
| --------------------------------------------- | ------ | ----------------------------------- |
| [React](https://react.dev/)                   | 19.2   | Biblioteca JS para criação de UI    |
| [TypeScript](https://www.typescriptlang.org/) | 6.0.2  | Tipagem estática                    |
| [Vite](https://vitejs.dev/)                   | 8.0.10 | Build tool e dev server             |
| [Tailwind CSS](https://tailwindcss.com/)      | 4.2    | Estilização utilitária              |
| [shadcn/ui](https://ui.shadcn.com/)           | 4.7    | Componentes acessíveis com Tailwind |
| [Recharts](https://recharts.org/)             | 3.8    | Gráficos                            |

## Por que essas escolhas?

#### 1️⃣ Tailwind CSS v4 + shadcn/ui

`Tailwind v4` foi escolhido como base de estilização porque metade do time tem experiência intermediária em CSS e não pode gerenciar arquivos `.module.css` de forma sustentável em um prazo de hackathon. Com Tailwind, não há contexto extra para manter porque toda a estilização acontece inline no JSX. Já a biblioteca `shadcn/ui` complementa o Tailwind entregando componentes React completamente tipados com acessibilidade embutida (ARIA, foco, teclado).

> [!NOTE]
> **Nota de instalação:** Recharts funciona nativamente via `<ChartContainer>` do shadcn: basta instalar o componente de chart pelo CLI do shadcn.

#### 2️⃣ Recharts

Recharts foi escolhido por ser **React-first**: a API é declarativa em JSX (`<BarChart>`, `<PieChart>`) e se integra naturalmente ao modelo mental do time. Tipos TypeScript são nativos (sem `@types/recharts`), o que elimina erros de autocompletar. A biblioteca cobre todos os tipos de gráfico necessários no projeto (pizza, barras) em uma única dependência, e tem a maior adoção no ecossistema React.

> [!IMPORTANT]
> O projeto utiliza dados mockados em módulos TypeScript local (`src/data/`). Não há servidor, banco de dados ou autenticação nesta versão.

---

## 📂 Estrutura de Pastas

```
src/
├── components/   # Componentes React reutilizáveis (botões, cards, inputs, etc.)
│   ├── ui/       # Componentes de UI atômicos (badge, button, card, etc.)
│   └── lib/      # Utilitários e helpers específicos de componentes
├── contexts/     # Contextos React para gerenciamento de estado global (ex: BudgetContext, MonthContext)
├── data/         # Dados mockados em módulos TypeScript (sem backend nesta versão)
├── pages/        # Telas completas da aplicação (Transações, Dashboard, Vilão, Insights)
├── services/     # Serviços para lógica de negócio e manipulação de dados (ex: budgetService, transactionService)
├── styles/       # Tokens de design, variáveis CSS e estilos globais
├── types/        # Interfaces e tipos TypeScript compartilhados entre módulos
├── utils/        # Funções utilitárias puras (formatação, cálculos, helpers)
├── App.tsx       # Componente raiz com configuração de rotas
└── main.tsx      # Entry point (monta o React no DOM)

```

---

## 👩‍💻 Time

Desenvolvido com 💚 no **Hackathon Elas+ Tech 2026 — Ada & Artemisia & CAIXA**

| Nome                  | Papel             | GitHub                                            | LinkedIn                                                                                                         |
| --------------------- | ----------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Isabelli Mocci**    | Frontend ·        | [isabellimocci](https://github.com/isabellimocci) | [/in/isabellimocci](https://www.linkedin.com/in/isabellimocci)                                                   |
| **Taisa Soares**      | Gestão · Frontend | [taisasoares](https://github.com/taisasoares)     | [/in/taisasoares](https://www.linkedin.com/in/taisasoares)                                                       |
| **Fabianne Costa**    | Frontend ·        | [AnneCosta](https://github.com/AnneCosta)         | [/in/fabiannecosta](https://www.linkedin.com/in/fabiannecosta)                                                   |
| **Joyce Pereira**     | Frontend ·        | [joyceps44](https://github.com/joyceps44)         | [/in/joycepereirasantos](https://www.linkedin.com/in/joycepereirasantos)                                         |
| **Priscila Oliveira** | Frontend ·        | [PriOliverS](https://github.com/PriOliverS)       | [/in/priscila-soares-de-oliveira-47aa06233/](https://www.linkedin.com/in/priscila-soares-de-oliveira-47aa06233/) |

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para detalhes.

---

<div align="center">

[⬆ Voltar ao topo](#-consumer-insight-intelligence)

</div>

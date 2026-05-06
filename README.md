<div align="center">

# 💸 Consumer Insight Intelligence

> App de controle financeiro universitário com análise comportamental de gastos.

</div>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Screenshots](#-screenshots)
- [Tecnologias](#-tecnologias)
- [Time](#-time)
- [Licença](#-licença)

---

## 🎯 Visão Geral

**Consumer Insight Intelligence** é um app de controle financeiro universitário desenvolvido para o **Hackathon Elas+Tech 2026 — Ada & Artemisia**, com foco em jovens universitários que precisam entender para onde vai seu dinheiro de forma visual, acessível e sem julgamentos.

### O Problema

A maioria das ferramentas financeiras existentes exibe números, não narrativas. O resultado é que pessoas com menos familiaridade com finanças veem planilhas e gráficos frios que não respondem a pergunta mais importante: **"Por que meu dinheiro some todo mês?"**

### A Solução

Fluxo transforma transações brutas em **insights comportamentais**: identifica o "vilão" do mês, classifica o perfil de consumo da usuária em arquétipos reconhecíveis, revela padrões semanais de gasto e alerta sobre categorias em crescimento consistente. Mais espelho financeiro do que calculadora.

---

## ✨ Funcionalidades

| Tela | Funcionalidade | Descrição |
|------|---------------|-----------|
| **Transações** | Listagem com filtros | Histórico mensal com filtro por categoria e busca por texto |
| **Dashboard** | Visão geral do mês | KPIs, gráfico de pizza por categoria e destaque do vilão |
| **Vilão do Mês** | Análise da pior categoria | Detalhamento da categoria que mais cresceu, com comparação mensal |
| **Insights** | Perfil comportamental | Arquétipo de consumo, padrão semanal, categoria em crescimento e alertas |

---

## 📸 Screenshots

```
[Dashboard]          [Vilão do Mês]
[Transações]         [Insights]
```

---

## 🛠 Tecnologias

### Frontend

| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev/) | 19.2 | Biblioteca JS para criação de UI |
| [TypeScript](https://www.typescriptlang.org/) | 6.0.2 | Tipagem estática |
| [Vite](https://vitejs.dev/) | 8.0.10 | Build tool e dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.2 | Estilização utilitária |
| [shadcn/ui](https://ui.shadcn.com/) | 4.7 | Componentes acessíveis com Tailwind |
| [Recharts](https://recharts.org/) | 3.8 | Gráficos |

## Por que essas escolhas?

#### 1️⃣ Tailwind CSS v4 + shadcn/ui

`Tailwind v4` foi escolhido como base de estilização porque metade do time tem experiência intermediária em CSS e não pode gerenciar arquivos `.module.css` de forma sustentável em um prazo de hackathon. Com Tailwind, não há contexto extra para manter porque toda a estilização acontece inline no JSX. Já a biblioteca `shadcn/ui` complementa o Tailwind entregando componentes React completamente tipados com acessibilidade embutida (ARIA, foco, teclado).

>[!NOTE]
> **Nota de instalação:** Recharts funciona nativamente via `<ChartContainer>` do shadcn: basta instalar o componente de chart pelo CLI do shadcn.

---

#### 2️⃣ Recharts

Recharts foi escolhido por ser **React-first**: a API é declarativa em JSX (`<BarChart>`, `<PieChart>`) e se integra naturalmente ao modelo mental do time. Tipos TypeScript são nativos (sem `@types/recharts`), o que elimina erros de autocompletar. A biblioteca cobre todos os tipos de gráfico necessários no projeto (pizza, barras, linha) em uma única dependência, e tem a maior adoção no ecossistema React.

> [!IMPORTANT]
> O projeto utiliza dados mockados em JSON local (`src/data/`). Não há servidor, banco de dados ou autenticação nesta versão.

---

## 👩‍💻 Time

Desenvolvido com 💜 no **Hackathon Elas+Tech 2026 — Ada & Artemisia**

| Nome | Papel | GitHub | LinkedIn |
|---|---|---|---|
| **Isabelli Mocci** | Frontend ·  | [@isabelli](https://github.com/isabellimocci) | [/in/isabellimocci](https://linkedin.com/in/isabellimocci) |
| **Taisa** | Gestão ·  | [@taisa](https://github.com) | [/in/taisa](https://linkedin.com/in/taisa) |
| **Fabianne** | Frontend ·  | [@fabianne](https://github.com) | [/in/fabianne](https://linkedin.com/in/fabianne) |
| **Joyce** | Frontend ·  | [@joyce](https://github.com) | [/in/joyce](https://linkedin.com/in/joyce) |
| **Priscila** | Frontend ·  | [@priscila](https://github.com) | [/in/priscila](https://linkedin.com/in/priscila) |

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para detalhes.

---

<div align="center">

[⬆ Voltar ao topo](#-consumer-insight-intelligence)

</div>

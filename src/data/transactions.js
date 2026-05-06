
export const mockData = [
  {
    month: "03/2025",
    transactions: [
      // Alimentação — frequência alta, valores pequenos
      { id: "t001", date: "03/03/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - McDonald's", amount: 42.90 },
      { id: "t002", date: "05/03/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - Burguer King", amount: 38.50 },
      { id: "t003", date: "08/03/2025", category: "Alimentação", subcategory: "Restaurante", description: "Restaurante Temakeria", amount: 67.00 },
      { id: "t004", date: "12/03/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - Pizza Hut", amount: 55.90 },
      { id: "t005", date: "18/03/2025", category: "Alimentação", subcategory: "Mercado", description: "Mercado Extra", amount: 134.70 },
      { id: "t006", date: "24/03/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - Subway", amount: 32.00 },
      { id: "t007", date: "28/03/2025", category: "Alimentação", subcategory: "Lanchonete", description: "Bob's - shopping", amount: 29.90 },

      // Transporte — ainda controlado
      { id: "t008", date: "04/03/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - faculdade", amount: 18.50 },
      { id: "t009", date: "07/03/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - shopping", amount: 22.00 },
      { id: "t010", date: "14/03/2025", category: "Transporte", subcategory: "Combustível", description: "Posto Shell", amount: 120.00 },
      { id: "t011", date: "21/03/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - trabalho", amount: 19.90 },
      { id: "t012", date: "27/03/2025", category: "Transporte", subcategory: "Uber/99", description: "99 - volta da festa", amount: 31.00 },

      // Lazer — moderado
      { id: "t013", date: "02/03/2025", category: "Lazer", subcategory: "Cinema", description: "Cinemark - ingresso", amount: 36.00 },
      { id: "t014", date: "15/03/2025", category: "Lazer", subcategory: "Bar", description: "Bar do Alemão - saída", amount: 78.00 },
      { id: "t015", date: "22/03/2025", category: "Lazer", subcategory: "Jogo", description: "Steam - jogo em promoção", amount: 49.90 },

      // Assinaturas
      { id: "t016", date: "01/03/2025", category: "Assinaturas", subcategory: "Streaming", description: "Netflix", amount: 39.90 },
      { id: "t017", date: "01/03/2025", category: "Assinaturas", subcategory: "Streaming", description: "Spotify", amount: 21.90 },
      { id: "t018", date: "10/03/2025", category: "Assinaturas", subcategory: "Serviço digital", description: "iCloud 50GB", amount: 4.90 },

      // Compras
      { id: "t019", date: "09/03/2025", category: "Compras", subcategory: "Roupas", description: "Shein - blusa", amount: 64.00 },
      { id: "t020", date: "20/03/2025", category: "Compras", subcategory: "Eletrônicos", description: "Americanas - cabo USB", amount: 29.90 },

      // Saúde
      { id: "t021", date: "11/03/2025", category: "Saúde", subcategory: "Farmácia", description: "Drogasil - medicamentos", amount: 58.40 },
      { id: "t022", date: "25/03/2025", category: "Saúde", subcategory: "Academia", description: "Smart Fit - mensalidade", amount: 99.90 },

      // Educação
      { id: "t023", date: "06/03/2025", category: "Educação", subcategory: "Curso online", description: "Udemy - curso de React", amount: 27.90 },
      { id: "t024", date: "17/03/2025", category: "Educação", subcategory: "Material", description: "Amazon - livro técnico", amount: 89.90 },
      { id: "t025", date: "29/03/2025", category: "Educação", subcategory: "Curso online", description: "Alura - assinatura mensal", amount: 89.90 },
    ],
  },

  {
    month: "04/2025",
    transactions: [
      // Alimentação — frequência cresce
      { id: "t026", date: "01/04/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - Burguer King", amount: 45.90 },
      { id: "t027", date: "03/04/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - Outback", amount: 89.90 },
      { id: "t028", date: "07/04/2025", category: "Alimentação", subcategory: "Lanchonete", description: "Padaria perto do trabalho", amount: 24.50 },
      { id: "t029", date: "10/04/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - Spoleto", amount: 52.00 },
      { id: "t030", date: "15/04/2025", category: "Alimentação", subcategory: "Mercado", description: "Carrefour", amount: 148.20 },
      { id: "t031", date: "20/04/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - Sushi", amount: 97.00 },
      { id: "t032", date: "26/04/2025", category: "Alimentação", subcategory: "Restaurante", description: "Frango Assado - almoço", amount: 41.00 },

      // Transporte — subindo visivelmente
      { id: "t033", date: "01/04/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - faculdade manhã", amount: 21.00 },
      { id: "t034", date: "03/04/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - faculdade tarde", amount: 23.50 },
      { id: "t035", date: "05/04/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - shopping", amount: 28.90 },
      { id: "t036", date: "09/04/2025", category: "Transporte", subcategory: "Combustível", description: "Posto Ipiranga", amount: 130.00 },
      { id: "t037", date: "12/04/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - trabalho", amount: 26.00 },
      { id: "t038", date: "16/04/2025", category: "Transporte", subcategory: "Uber/99", description: "99 - consulta médica", amount: 19.90 },
      { id: "t039", date: "19/04/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - faculdade", amount: 24.00 },
      { id: "t040", date: "23/04/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - volta da festa", amount: 42.00 },
      { id: "t041", date: "28/04/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - aeroporto", amount: 67.00 },

      // Lazer — também subindo
      { id: "t042", date: "05/04/2025", category: "Lazer", subcategory: "Bar", description: "Bar Brahma - saída com amigos", amount: 112.00 },
      { id: "t043", date: "13/04/2025", category: "Lazer", subcategory: "Cinema", description: "Cinemark - ingresso + pipoca", amount: 68.00 },
      { id: "t044", date: "22/04/2025", category: "Lazer", subcategory: "Show", description: "Ingresso - show sertanejo", amount: 140.00 },

      // Assinaturas
      { id: "t045", date: "01/04/2025", category: "Assinaturas", subcategory: "Streaming", description: "Netflix", amount: 39.90 },
      { id: "t046", date: "01/04/2025", category: "Assinaturas", subcategory: "Streaming", description: "Spotify", amount: 21.90 },
      { id: "t047", date: "01/04/2025", category: "Assinaturas", subcategory: "Serviço digital", description: "iCloud 50GB", amount: 4.90 },

      // Compras — impulso começando
      { id: "t048", date: "08/04/2025", category: "Compras", subcategory: "Roupas", description: "Shein - vestido + acessórios", amount: 138.00 },
      { id: "t049", date: "18/04/2025", category: "Compras", subcategory: "Beleza", description: "Sephora - maquiagem", amount: 189.90 },

      // Saúde
      { id: "t050", date: "04/04/2025", category: "Saúde", subcategory: "Academia", description: "Smart Fit - mensalidade", amount: 99.90 },
      { id: "t051", date: "17/04/2025", category: "Saúde", subcategory: "Farmácia", description: "Drogasil - vitaminas", amount: 74.80 },

      // Educação
      { id: "t052", date: "10/04/2025", category: "Educação", subcategory: "Curso online", description: "Alura - assinatura mensal", amount: 89.90 },
    ],
  },

  {
    month: "05/2025",
    transactions: [
      // ━━━ SEMANA 1 (01–07/05) — Concentração de gastos ━━━
      { id: "t053", date: "01/05/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - Burguer King", amount: 49.90 },
      { id: "t054", date: "03/05/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - Pizza Hut", amount: 74.90 },
      { id: "t055", date: "05/05/2025", category: "Alimentação", subcategory: "Lanchonete", description: "Padaria - café e pão de queijo", amount: 18.50 },
      { id: "t056", date: "07/05/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - Outback", amount: 98.00 },

      { id: "t057", date: "01/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - faculdade manhã", amount: 27.00 },
      { id: "t058", date: "02/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - faculdade tarde", amount: 29.50 },
      { id: "t059", date: "03/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - shopping com amigas", amount: 34.00 },
      { id: "t060", date: "04/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - trabalho", amount: 31.00 },
      { id: "t061", date: "05/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - faculdade", amount: 28.00 },
      { id: "t062", date: "06/05/2025", category: "Transporte", subcategory: "Combustível", description: "Posto Shell - tanque cheio", amount: 160.00 },
      { id: "t063", date: "07/05/2025", category: "Transporte", subcategory: "Uber/99", description: "99 - festa aniversário", amount: 52.00 },

      { id: "t064", date: "04/05/2025", category: "Compras", subcategory: "Roupas", description: "Shein - compra impulsiva madrugada", amount: 212.00 },

      // ━━━ SEMANA 2 (08–14/05) — Ainda pesada ━━━
      { id: "t065", date: "09/05/2025", category: "Alimentação", subcategory: "Delivery", description: "iFood - Sushi Leblon", amount: 118.00 },
      { id: "t066", date: "12/05/2025", category: "Alimentação", subcategory: "Restaurante", description: "Dia das Mães - restaurante", amount: 187.00 },

      { id: "t067", date: "08/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - faculdade manhã", amount: 29.00 },
      { id: "t068", date: "09/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - faculdade tarde", amount: 31.50 },
      { id: "t069", date: "10/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - shopping", amount: 36.00 },
      { id: "t070", date: "11/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - trabalho", amount: 33.00 },
      { id: "t071", date: "12/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - Dia das Mães jantar", amount: 48.00 },
      { id: "t072", date: "13/05/2025", category: "Transporte", subcategory: "Uber/99", description: "99 - volta da balada", amount: 61.00 },
      { id: "t073", date: "14/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - faculdade", amount: 27.50 },

      { id: "t074", date: "11/05/2025", category: "Compras", subcategory: "Beleza", description: "Sephora - perfume importado", amount: 349.00 },

      // ━━━ SEMANA 3 (15–21/05) — Esfria bastante ━━━
      { id: "t075", date: "15/05/2025", category: "Assinaturas", subcategory: "Streaming", description: "Netflix", amount: 39.90 },
      { id: "t076", date: "15/05/2025", category: "Assinaturas", subcategory: "Streaming", description: "Spotify", amount: 21.90 },
      { id: "t077", date: "15/05/2025", category: "Assinaturas", subcategory: "Serviço digital", description: "iCloud 50GB", amount: 4.90 },

      { id: "t078", date: "19/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - emergência médica", amount: 24.00 },

      { id: "t079", date: "17/05/2025", category: "Alimentação", subcategory: "Mercado", description: "Mercado Extra - compras da semana", amount: 112.30 },

      { id: "t080", date: "16/05/2025", category: "Saúde", subcategory: "Academia", description: "Smart Fit - mensalidade", amount: 99.90 },
      { id: "t081", date: "20/05/2025", category: "Saúde", subcategory: "Farmácia", description: "Drogasil - remédio urgente", amount: 43.60 },

      { id: "t082", date: "18/05/2025", category: "Educação", subcategory: "Curso online", description: "Alura - assinatura mensal", amount: 89.90 },

      // ━━━ SEMANA 4 (22–31/05) — Quase nada ━━━
      { id: "t083", date: "26/05/2025", category: "Alimentação", subcategory: "Mercado", description: "Atacadão - compras do mês", amount: 89.40 },

      { id: "t084", date: "24/05/2025", category: "Lazer", subcategory: "Bar", description: "Cerveja com amigos - racha", amount: 35.00 },

      { id: "t085", date: "28/05/2025", category: "Compras", subcategory: "Roupas", description: "AliExpress - capinha e acessórios", amount: 67.00 },

      { id: "t086", date: "29/05/2025", category: "Transporte", subcategory: "Uber/99", description: "Uber - última corrida do mês", amount: 19.00 },
    ],
  },
]
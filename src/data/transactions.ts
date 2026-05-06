import type { MonthData, TransactionId } from '../types'

const tid = (id: string) => id as TransactionId

export const mockData: MonthData[] = [
  {
    month: '02/2026',
    transactions: [
      // Alimentação
      {
        id: tid('t001'),
        date: '03/02/2026',
        category: 'Alimentação',
        subcategory: 'Delivery',
        description: "iFood - McDonald's",
        amount: 42.9,
      },
      {
        id: tid('t002'),
        date: '05/02/2026',
        category: 'Alimentação',
        subcategory: 'Delivery',
        description: 'iFood - Burguer King',
        amount: 38.5,
      },
      {
        id: tid('t003'),
        date: '08/02/2026',
        category: 'Alimentação',
        subcategory: 'Restaurante',
        description: 'Restaurante Temakeria',
        amount: 67.0,
      },
      {
        id: tid('t004'),
        date: '12/02/2026',
        category: 'Alimentação',
        subcategory: 'Delivery',
        description: 'iFood - Pizza Hut',
        amount: 55.9,
      },
      {
        id: tid('t005'),
        date: '18/02/2026',
        category: 'Alimentação',
        subcategory: 'Mercado',
        description: 'Mercado Extra',
        amount: 134.7,
      },
      {
        id: tid('t006'),
        date: '24/02/2026',
        category: 'Alimentação',
        subcategory: 'Delivery',
        description: 'iFood - Subway',
        amount: 32.0,
      },
      {
        id: tid('t007'),
        date: '28/02/2026',
        category: 'Alimentação',
        subcategory: 'Lanchonete',
        description: "Bob's - shopping",
        amount: 29.9,
      },

      // Transporte — Uber/99 domina desde março
      {
        id: tid('t008'),
        date: '04/02/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - faculdade',
        amount: 18.5,
      },
      {
        id: tid('t009'),
        date: '07/02/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - shopping',
        amount: 22.0,
      },
      {
        id: tid('t010'),
        date: '11/02/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - trabalho',
        amount: 21.0,
      },
      {
        id: tid('t011'),
        date: '14/02/2026',
        category: 'Transporte',
        subcategory: 'Combustível',
        description: 'Posto Shell',
        amount: 60.0,
      },
      {
        id: tid('t012'),
        date: '21/02/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - trabalho',
        amount: 19.9,
      },
      {
        id: tid('t013'),
        date: '27/02/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: '99 - volta da festa',
        amount: 31.0,
      },

      // Lazer
      {
        id: tid('t014'),
        date: '02/02/2026',
        category: 'Lazer',
        subcategory: 'Cinema',
        description: 'Cinemark - ingresso',
        amount: 36.0,
      },
      {
        id: tid('t015'),
        date: '15/02/2026',
        category: 'Lazer',
        subcategory: 'Bar',
        description: 'Bar do Alemão - saída',
        amount: 78.0,
      },
      {
        id: tid('t016'),
        date: '22/02/2026',
        category: 'Lazer',
        subcategory: 'Jogo',
        description: 'Steam - jogo em promoção',
        amount: 49.9,
      },

      // Assinaturas
      {
        id: tid('t017'),
        date: '01/02/2026',
        category: 'Assinaturas',
        subcategory: 'Streaming',
        description: 'Netflix',
        amount: 39.9,
      },
      {
        id: tid('t018'),
        date: '01/02/2026',
        category: 'Assinaturas',
        subcategory: 'Streaming',
        description: 'Spotify',
        amount: 21.9,
      },
      {
        id: tid('t019'),
        date: '10/02/2026',
        category: 'Assinaturas',
        subcategory: 'Serviço digital',
        description: 'iCloud 50GB',
        amount: 4.9,
      },

      // Compras
      {
        id: tid('t020'),
        date: '09/02/2026',
        category: 'Compras',
        subcategory: 'Roupas',
        description: 'Shein - blusa',
        amount: 64.0,
      },
      {
        id: tid('t021'),
        date: '20/02/2026',
        category: 'Compras',
        subcategory: 'Eletrônicos',
        description: 'Americanas - cabo USB',
        amount: 29.9,
      },

      // Saúde
      {
        id: tid('t022'),
        date: '11/02/2026',
        category: 'Saúde',
        subcategory: 'Farmácia',
        description: 'Drogasil - medicamentos',
        amount: 58.4,
      },
      {
        id: tid('t023'),
        date: '25/02/2026',
        category: 'Saúde',
        subcategory: 'Academia',
        description: 'Smart Fit - mensalidade',
        amount: 99.9,
      },

      // Educação
      {
        id: tid('t024'),
        date: '06/02/2026',
        category: 'Educação',
        subcategory: 'Curso online',
        description: 'Udemy - curso de React',
        amount: 27.9,
      },
      {
        id: tid('t025'),
        date: '17/02/2026',
        category: 'Educação',
        subcategory: 'Material',
        description: 'Amazon - livro técnico',
        amount: 89.9,
      },
      {
        id: tid('t026'),
        date: '28/02/2026',
        category: 'Educação',
        subcategory: 'Curso online',
        description: 'Alura - assinatura mensal',
        amount: 89.9,
      },
    ],
  },

  {
    month: '03/2026',
    transactions: [
      // Alimentação
      {
        id: tid('t027'),
        date: '01/03/2026',
        category: 'Alimentação',
        subcategory: 'Delivery',
        description: 'iFood - Burguer King',
        amount: 45.9,
      },
      {
        id: tid('t028'),
        date: '03/03/2026',
        category: 'Alimentação',
        subcategory: 'Delivery',
        description: 'iFood - Outback',
        amount: 89.9,
      },
      {
        id: tid('t029'),
        date: '07/03/2026',
        category: 'Alimentação',
        subcategory: 'Lanchonete',
        description: 'Padaria perto do trabalho',
        amount: 24.5,
      },
      {
        id: tid('t030'),
        date: '10/03/2026',
        category: 'Alimentação',
        subcategory: 'Delivery',
        description: 'iFood - Spoleto',
        amount: 52.0,
      },
      {
        id: tid('t031'),
        date: '15/03/2026',
        category: 'Alimentação',
        subcategory: 'Mercado',
        description: 'Carrefour',
        amount: 148.2,
      },
      {
        id: tid('t032'),
        date: '20/03/2026',
        category: 'Alimentação',
        subcategory: 'Delivery',
        description: 'iFood - Sushi',
        amount: 97.0,
      },
      {
        id: tid('t033'),
        date: '26/03/2026',
        category: 'Alimentação',
        subcategory: 'Restaurante',
        description: 'Frango Assado - almoço',
        amount: 41.0,
      },

      // Transporte — crescendo, Uber/99 dominando
      {
        id: tid('t034'),
        date: '01/03/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - faculdade manhã',
        amount: 21.0,
      },
      {
        id: tid('t035'),
        date: '03/03/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - faculdade tarde',
        amount: 23.5,
      },
      {
        id: tid('t036'),
        date: '05/03/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - shopping',
        amount: 28.9,
      },
      {
        id: tid('t037'),
        date: '09/03/2026',
        category: 'Transporte',
        subcategory: 'Combustível',
        description: 'Posto Ipiranga',
        amount: 130.0,
      },
      {
        id: tid('t038'),
        date: '12/03/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - trabalho',
        amount: 26.0,
      },
      {
        id: tid('t039'),
        date: '16/03/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: '99 - consulta médica',
        amount: 19.9,
      },
      {
        id: tid('t040'),
        date: '19/03/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - faculdade',
        amount: 24.0,
      },
      {
        id: tid('t041'),
        date: '23/03/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - volta da festa',
        amount: 42.0,
      },
      {
        id: tid('t042'),
        date: '28/03/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - aeroporto',
        amount: 67.0,
      },

      // Lazer
      {
        id: tid('t043'),
        date: '05/03/2026',
        category: 'Lazer',
        subcategory: 'Bar',
        description: 'Bar Brahma - saída com amigos',
        amount: 112.0,
      },
      {
        id: tid('t044'),
        date: '13/03/2026',
        category: 'Lazer',
        subcategory: 'Cinema',
        description: 'Cinemark - ingresso + pipoca',
        amount: 68.0,
      },
      {
        id: tid('t045'),
        date: '22/03/2026',
        category: 'Lazer',
        subcategory: 'Show',
        description: 'Ingresso - show sertanejo',
        amount: 140.0,
      },

      // Assinaturas
      {
        id: tid('t046'),
        date: '01/03/2026',
        category: 'Assinaturas',
        subcategory: 'Streaming',
        description: 'Netflix',
        amount: 39.9,
      },
      {
        id: tid('t047'),
        date: '01/03/2026',
        category: 'Assinaturas',
        subcategory: 'Streaming',
        description: 'Spotify',
        amount: 21.9,
      },
      {
        id: tid('t048'),
        date: '01/03/2026',
        category: 'Assinaturas',
        subcategory: 'Serviço digital',
        description: 'iCloud 50GB',
        amount: 4.9,
      },

      // Compras
      {
        id: tid('t049'),
        date: '08/03/2026',
        category: 'Compras',
        subcategory: 'Roupas',
        description: 'Shein - vestido + acessórios',
        amount: 138.0,
      },
      {
        id: tid('t050'),
        date: '18/03/2026',
        category: 'Compras',
        subcategory: 'Beleza',
        description: 'Sephora - maquiagem',
        amount: 189.9,
      },

      // Saúde
      {
        id: tid('t051'),
        date: '04/03/2026',
        category: 'Saúde',
        subcategory: 'Academia',
        description: 'Smart Fit - mensalidade',
        amount: 99.9,
      },
      {
        id: tid('t052'),
        date: '17/03/2026',
        category: 'Saúde',
        subcategory: 'Farmácia',
        description: 'Drogasil - vitaminas',
        amount: 74.8,
      },

      // Educação
      {
        id: tid('t053'),
        date: '10/03/2026',
        category: 'Educação',
        subcategory: 'Curso online',
        description: 'Alura - assinatura mensal',
        amount: 89.9,
      },
    ],
  },

  {
    month: '04/2026',
    transactions: [
      // Alimentação
      {
        id: tid('t054'),
        date: '01/04/2026',
        category: 'Alimentação',
        subcategory: 'Delivery',
        description: 'iFood - Burguer King',
        amount: 49.9,
      },
      {
        id: tid('t055'),
        date: '05/04/2026',
        category: 'Alimentação',
        subcategory: 'Lanchonete',
        description: 'Padaria - café e pão de queijo',
        amount: 18.5,
      },
      {
        id: tid('t056'),
        date: '07/04/2026',
        category: 'Alimentação',
        subcategory: 'Delivery',
        description: 'iFood - Outback',
        amount: 72.0,
      },

      // Transporte semana 1 — muito pesado
      {
        id: tid('t057'),
        date: '01/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - faculdade manhã',
        amount: 34.0,
      },
      {
        id: tid('t058'),
        date: '02/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - faculdade tarde',
        amount: 37.0,
      },
      {
        id: tid('t059'),
        date: '03/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - shopping com amigas',
        amount: 42.0,
      },
      {
        id: tid('t060'),
        date: '03/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - ida ao trabalho extra',
        amount: 48.0,
      },
      {
        id: tid('t061'),
        date: '04/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - trabalho',
        amount: 39.0,
      },
      {
        id: tid('t092'),
        date: '04/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - ida ao aeroporto buscar amiga',
        amount: 78.0,
      },
      {
        id: tid('t062'),
        date: '05/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - faculdade',
        amount: 36.0,
      },
      {
        id: tid('t063'),
        date: '06/04/2026',
        category: 'Transporte',
        subcategory: 'Combustível',
        description: 'Posto Shell - tanque cheio',
        amount: 160.0,
      },
      {
        id: tid('t064'),
        date: '06/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: '99 - volta tarde do trabalho',
        amount: 54.0,
      },
      {
        id: tid('t065'),
        date: '07/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: '99 - festa aniversário',
        amount: 62.0,
      },

      // Compra por impulso semana 1
      {
        id: tid('t066'),
        date: '04/04/2026',
        category: 'Compras',
        subcategory: 'Roupas',
        description: 'Shein - compra impulsiva madrugada',
        amount: 212.0,
      },

      // Alimentação
      {
        id: tid('t067'),
        date: '12/04/2026',
        category: 'Alimentação',
        subcategory: 'Restaurante',
        description: 'Dia das Mães - restaurante',
        amount: 187.0,
      },

      // Transporte semana 2 — ainda pesado
      {
        id: tid('t068'),
        date: '08/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - faculdade manhã',
        amount: 36.0,
      },
      {
        id: tid('t069'),
        date: '08/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - reunião presencial',
        amount: 48.0,
      },
      {
        id: tid('t070'),
        date: '09/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - faculdade tarde',
        amount: 39.5,
      },
      {
        id: tid('t071'),
        date: '10/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - shopping',
        amount: 44.0,
      },
      {
        id: tid('t072'),
        date: '10/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - consulta longe',
        amount: 67.0,
      },
      {
        id: tid('t073'),
        date: '11/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - trabalho',
        amount: 41.0,
      },
      {
        id: tid('t074'),
        date: '12/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - Dia das Mães jantar',
        amount: 58.0,
      },
      {
        id: tid('t075'),
        date: '13/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: '99 - volta da balada',
        amount: 73.0,
      },
      {
        id: tid('t076'),
        date: '13/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: '99 - ida ao shopping',
        amount: 33.0,
      },
      {
        id: tid('t077'),
        date: '14/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - faculdade',
        amount: 27.5,
      },

      // Compra por impulso semana 2
      {
        id: tid('t078'),
        date: '11/04/2026',
        category: 'Compras',
        subcategory: 'Beleza',
        description: 'Sephora - perfume importado',
        amount: 349.0,
      },

      // Assinaturas fixas
      {
        id: tid('t079'),
        date: '15/04/2026',
        category: 'Assinaturas',
        subcategory: 'Streaming',
        description: 'Netflix',
        amount: 39.9,
      },
      {
        id: tid('t080'),
        date: '15/04/2026',
        category: 'Assinaturas',
        subcategory: 'Streaming',
        description: 'Spotify',
        amount: 21.9,
      },
      {
        id: tid('t081'),
        date: '15/04/2026',
        category: 'Assinaturas',
        subcategory: 'Serviço digital',
        description: 'iCloud 50GB',
        amount: 4.9,
      },

      // Transporte semana 3 — caiu muito
      {
        id: tid('t082'),
        date: '19/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - emergência médica',
        amount: 24.0,
      },

      // Alimentação semana 3
      {
        id: tid('t083'),
        date: '17/04/2026',
        category: 'Alimentação',
        subcategory: 'Mercado',
        description: 'Mercado Extra - compras da semana',
        amount: 112.3,
      },

      // Saúde
      {
        id: tid('t084'),
        date: '16/04/2026',
        category: 'Saúde',
        subcategory: 'Academia',
        description: 'Smart Fit - mensalidade',
        amount: 99.9,
      },
      {
        id: tid('t085'),
        date: '20/04/2026',
        category: 'Saúde',
        subcategory: 'Farmácia',
        description: 'Drogasil - remédio urgente',
        amount: 43.6,
      },

      // Educação
      {
        id: tid('t086'),
        date: '18/04/2026',
        category: 'Educação',
        subcategory: 'Curso online',
        description: 'Alura - assinatura mensal',
        amount: 89.9,
      },

      // FIX: Compra por impulso semana 3
      {
        id: tid('t087'),
        date: '20/04/2026',
        category: 'Compras',
        subcategory: 'Roupas',
        description: 'AliExpress - roupas sem necessidade',
        amount: 98.0,
      },

      // Alimentação básica
      {
        id: tid('t088'),
        date: '26/04/2026',
        category: 'Alimentação',
        subcategory: 'Mercado',
        description: 'Atacadão - compras do mês',
        amount: 89.4,
      },

      // Lazer mínimo
      {
        id: tid('t089'),
        date: '24/04/2026',
        category: 'Lazer',
        subcategory: 'Bar',
        description: 'Cerveja com amigos - racha',
        amount: 35.0,
      },

      // Compra por impulso semana 4
      {
        id: tid('t090'),
        date: '28/04/2026',
        category: 'Compras',
        subcategory: 'Eletrônicos',
        description: 'Mercado Livre - fone bluetooth impulsivo',
        amount: 67.0,
      },

      // Transporte mínimo semana 4
      {
        id: tid('t091'),
        date: '29/04/2026',
        category: 'Transporte',
        subcategory: 'Uber/99',
        description: 'Uber - última corrida do mês',
        amount: 19.0,
      },
    ],
  },
]

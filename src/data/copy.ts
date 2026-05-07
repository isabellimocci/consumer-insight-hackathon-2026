export const APP_COPY = {
  villainPhrases: {
    alimentacao: `Alimentação cresceu este mês. Cozinhar em casa pode ser seu superpoder`,
    transporte: `Transporte subiu. Carona ou ônibus podem poupar uma grana.`,
    lazer: `Lazer aumentou. Diversão não precisa custar caro.`,
    assinaturas: `Assinaturas cresceram. Hora de revisar o que você realmente usa.`,
    compras: `Compras explodiram. Lista de desejos ajuda a filtrar impulsos.`,
    saude: `Saúde subiu. Prevenção costuma custar menos que remédio.`,
    educacao: `Educação cresceu. Investimento em conhecimento tem retorno.`,
  },

  economyTemplate: (times: number, saved: string) =>
    `Se você tivesse feito ${times} a menos por semana, teria sobrado ${saved} no bolso.`,

  archetypes: {
    acumulador: {
      name: 'O Acumulador',
      icon: '🐿️',
      description:
        'Compra tudo que vê, mas sempre acha que é investimento. Seu quarto é quase um estoque.',
    },
    gastadora_impulsiva: {
      name: 'Gastadora Impulsiva',
      icon: '💸',
      description: 'Decide no calor do momento e depois pensa “ok, foi isso mesmo?"',
    },
    consumidora_equilibrada: {
      name: 'Consumidora Equilibrada',
      icon: '⚖️',
      description: 'Você gasta, mas sabe se localizar e não deixa uma categoria mandar em tudo.',
    },
    mente_planejamento: {
      name: 'Mente de Planejamento',
      icon: '🗓️',
      description: 'Você pensa no “eu do futuro” antes de gastar e evita sustos no fim do mês.',
    },
  },

  concentrationInsights: {
    high: (categoria: string) => `${categoria} dominou o mês e não pediu licença.`,
    medium: (categoria: string) => `${categoria} tá levando uma fatia generosa.`,
    low: (categoria: string) => `${categoria} tá só beliscando seu orçamento. `,
    neutral: (categoria: string) => `O gasto com ${categoria} está dentro do esperado.`,
  },

  weeklyBehavior: {
    inicio_gastoalto:
      'Você gastou no começo como quem disse: ‘depois eu vejo’ (spoiler: depois chega).',
    final_gastoalto:
      'O gasto guardou energia pro final e soltou tudo na reta final. Um ‘modo cautela’ nos últimos dias já faz diferença.',
    constante:
      'Você gastou bem distribuído: sem sustos, sem picos. Isso é ótimo pra manter o controle.',
  },
}

import { describe, expect, it } from 'vitest'

import { mockData } from '../data/transactions'
import type { Transaction, TransactionId } from '../types'
import { getPercentageByCategory, getTotalByCategory } from './aggregations'

const tid = (id: string) => id as TransactionId

const tx = (id: string, category: Transaction['category'], amount: number): Transaction => ({
  id: tid(id),
  date: '01/01/2026',
  category,
  subcategory: '',
  description: '',
  amount,
})

describe('getTotalByCategory', () => {
  it('retorna array vazio para lista vazia', () => {
    expect(getTotalByCategory([])).toEqual([])
  })

  it('agrega corretamente uma única categoria', () => {
    const result = getTotalByCategory([tx('1', 'Alimentação', 100)])
    expect(result).toHaveLength(1)
    expect(result[0].total).toBe(100)
    expect(result[0].count).toBe(1)
  })

  it('ordena por total decrescente', () => {
    const txs = [tx('1', 'Lazer', 50), tx('2', 'Alimentação', 200), tx('3', 'Transporte', 100)]
    const result = getTotalByCategory(txs)
    expect(result[0].category).toBe('Alimentação')
    expect(result[1].category).toBe('Transporte')
    expect(result[2].category).toBe('Lazer')
  })
})

describe('getPercentageByCategory', () => {
  it('retorna array vazio para lista vazia', () => {
    expect(getPercentageByCategory([])).toEqual([])
  })

  it('transação única resulta em 100% para a categoria', () => {
    const result = getPercentageByCategory([tx('1', 'Alimentação', 500)])
    expect(result).toHaveLength(1)
    expect(result[0].percentage).toBe(100)
  })

  it('percentuais têm no máximo 1 casa decimal', () => {
    const txs = [tx('1', 'Alimentação', 1), tx('2', 'Transporte', 2), tx('3', 'Lazer', 3)]
    const result = getPercentageByCategory(txs)
    for (const item of result) {
      const decimals = (item.percentage.toString().split('.')[1] ?? '').length
      expect(decimals).toBeLessThanOrEqual(1)
    }
  })

  it('nenhum percentual ultrapassa 100', () => {
    const txs = [tx('1', 'Alimentação', 300), tx('2', 'Transporte', 150), tx('3', 'Lazer', 50)]
    const result = getPercentageByCategory(txs)
    for (const item of result) {
      expect(item.percentage).toBeLessThanOrEqual(100)
    }
  })

  it('soma dos percentuais é 100 ±0.1 para 2 categorias', () => {
    const txs = [tx('1', 'Alimentação', 300), tx('2', 'Transporte', 200)]
    const result = getPercentageByCategory(txs)
    const total = Math.round(result.reduce((s, i) => s + i.percentage, 0) * 10) / 10
    expect(total).toBeGreaterThanOrEqual(99.9)
    expect(total).toBeLessThanOrEqual(100.1)
  })

  it('soma dos percentuais é 100 ±0.1 para muitas categorias', () => {
    const txs = [
      tx('1', 'Alimentação', 401.9),
      tx('2', 'Transporte', 172.4),
      tx('3', 'Lazer', 163.9),
      tx('4', 'Assinaturas', 66.7),
      tx('5', 'Compras', 93.9),
      tx('6', 'Saúde', 158.3),
      tx('7', 'Educação', 207.7),
    ]
    const result = getPercentageByCategory(txs)
    const total = Math.round(result.reduce((s, i) => s + i.percentage, 0) * 10) / 10
    expect(total).toBeGreaterThanOrEqual(99.9)
    expect(total).toBeLessThanOrEqual(100.1)
  })

  it('preserva total correto de cada categoria', () => {
    const txs = [tx('1', 'Alimentação', 300), tx('2', 'Transporte', 200)]
    const result = getPercentageByCategory(txs)
    const alimentacao = result.find((r) => r.category === 'Alimentação')
    const transporte = result.find((r) => r.category === 'Transporte')
    expect(alimentacao?.total).toBe(300)
    expect(transporte?.total).toBe(200)
  })

  it('percentuais corretos para proporção simples (60/40)', () => {
    const txs = [tx('1', 'Alimentação', 60), tx('2', 'Transporte', 40)]
    const result = getPercentageByCategory(txs)
    const alimentacao = result.find((r) => r.category === 'Alimentação')
    const transporte = result.find((r) => r.category === 'Transporte')
    expect(alimentacao?.percentage).toBe(60)
    expect(transporte?.percentage).toBe(40)
  })
})

describe('getPercentageByCategory — dados dos 3 meses', () => {
  for (const monthData of mockData) {
    it(`soma é 100 ±0.1 em ${monthData.month}`, () => {
      const result = getPercentageByCategory(monthData.transactions)
      const total = Math.round(result.reduce((s, i) => s + i.percentage, 0) * 10) / 10
      expect(total).toBeGreaterThanOrEqual(99.9)
      expect(total).toBeLessThanOrEqual(100.1)
    })

    it(`nenhum percentual acima de 100 em ${monthData.month}`, () => {
      const result = getPercentageByCategory(monthData.transactions)
      for (const item of result) {
        expect(item.percentage).toBeLessThanOrEqual(100)
      }
    })

    it(`percentuais com 1 casa decimal em ${monthData.month}`, () => {
      const result = getPercentageByCategory(monthData.transactions)
      for (const item of result) {
        const decimals = (item.percentage.toString().split('.')[1] ?? '').length
        expect(decimals).toBeLessThanOrEqual(1)
      }
    })
  }
})

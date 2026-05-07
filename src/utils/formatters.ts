export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(
    new Date(year, month - 1, day),
  )
}

export function formatMonthLabel(monthStr: string): string {
  const [year, month] = monthStr.split('-').map(Number)
  const formatted = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(
    new Date(year, month - 1, 1),
  )
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export function formatShortMonth(monthStr: string): string {
  const [year, month] = monthStr.split('-').map(Number)
  const label = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(
    new Date(year, month - 1, 1),
  )
  return label.replace('.', '').replace(/^./, (c) => c.toUpperCase())
}

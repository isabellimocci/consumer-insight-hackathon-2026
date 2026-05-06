import {
  getAllMonthsData,
  getAvailableMonths,
  getTransactionsByMonth,
} from '@services/transactionService'

export default function DashboardPage() {
  console.log(getAllMonthsData())
  console.log(getTransactionsByMonth('04/2026'))
  console.log(getAvailableMonths())

  return <h1>Dashboard</h1>
}

import { useMonth } from '@contexts/useMonth'

export default function DashboardPage() {
  const { selectedMonth } = useMonth()

  return (
    <div style={{ padding: '1rem', fontFamily: 'monospace' }}>
      <h1>Dashboard</h1>

      <div
        style={{
          marginTop: '1rem',
          border: '1px solid #ccc',
          padding: '1rem',
          borderRadius: '8px',
        }}
      >
        <p>
          <strong>selectedMonth:</strong> {selectedMonth}
        </p>
      </div>
    </div>
  )
}

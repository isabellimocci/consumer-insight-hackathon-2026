import { useMonth } from '@contexts/useMonth'

export default function DashboardPage() {
  const { selectedMonth, setSelectedMonth, availableMonths } = useMonth()

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
        <p>
          <strong>availableMonths:</strong> {availableMonths.join(', ')}
        </p>

        <div style={{ marginTop: '0.5rem' }}>
          {availableMonths.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              style={{
                marginRight: '0.5rem',
                padding: '0.25rem 0.75rem',
                fontWeight: selectedMonth === month ? 'bold' : 'normal',
                background: selectedMonth === month ? '#000' : '#eee',
                color: selectedMonth === month ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

import useApiCollection from '../hooks/useApiCollection.js'

function formatCell(value, key) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.map((item) => formatCell(item, key)).join(', ') || '—'
  }

  if (typeof value === 'object') {
    return value.name || value.username || value._id || JSON.stringify(value)
  }

  if (key === 'date') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString()
  }

  return value
}

export default function CollectionPage({ title, apiUrl, columns }) {
  const { items, loading, error } = useApiCollection(apiUrl, title)

  return (
    <section>
      <h1 className="h2 mb-4">{title}</h1>

      {loading && <p role="status">Loading {title.toLowerCase()}...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="text-secondary">No {title.toLowerCase()} found.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                {columns.map(({ key, label }) => (
                  <th key={key} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id || item.id || index}>
                  {columns.map(({ key }) => (
                    <td key={key}>{formatCell(item[key], key)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

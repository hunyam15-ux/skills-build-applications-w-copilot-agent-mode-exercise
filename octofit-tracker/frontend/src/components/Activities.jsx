import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'type', label: 'Activity' },
  { key: 'user', label: 'User' },
  { key: 'duration', label: 'Duration (min)' },
  { key: 'distance', label: 'Distance (km)' },
  { key: 'calories', label: 'Calories' },
  { key: 'date', label: 'Date' },
]

export default function Activities() {
  return (
    <CollectionPage
      columns={columns}
      endpoint="activities"
      title="Activities"
    />
  )
}

import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'members', label: 'Members' },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  return (
    <CollectionPage columns={columns} endpoint="teams" title="Teams" />
  )
}

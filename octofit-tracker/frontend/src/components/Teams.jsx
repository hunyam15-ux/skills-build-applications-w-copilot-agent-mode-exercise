import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'members', label: 'Members' },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  return <CollectionPage apiUrl={apiUrl} columns={columns} title="Teams" />
}

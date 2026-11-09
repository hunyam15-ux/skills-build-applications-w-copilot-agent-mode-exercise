import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team' },
]

export default function Users() {
  return <CollectionPage apiUrl={apiUrl} columns={columns} title="Users" />
}

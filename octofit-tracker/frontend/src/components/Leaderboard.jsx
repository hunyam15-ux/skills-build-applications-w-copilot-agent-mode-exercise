import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'User' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
]

export default function Leaderboard() {
  return (
    <CollectionPage apiUrl={apiUrl} columns={columns} title="Leaderboard" />
  )
}

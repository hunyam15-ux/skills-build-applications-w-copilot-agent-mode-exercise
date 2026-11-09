import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'User' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
]

export default function Leaderboard() {
  return (
    <CollectionPage
      columns={columns}
      endpoint="leaderboard"
      title="Leaderboard"
    />
  )
}

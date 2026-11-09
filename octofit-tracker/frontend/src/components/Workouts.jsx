import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'activityType', label: 'Activity' },
  { key: 'duration', label: 'Duration (min)' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'description', label: 'Description' },
]

export default function Workouts() {
  return (
    <CollectionPage apiUrl={apiUrl} columns={columns} title="Workouts" />
  )
}

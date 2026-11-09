import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'activityType', label: 'Activity' },
  { key: 'duration', label: 'Duration (min)' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'description', label: 'Description' },
]

export default function Workouts() {
  return (
    <CollectionPage columns={columns} endpoint="workouts" title="Workouts" />
  )
}

//hooks
import ProjectList from '../../component/ProjectList'
import { useCollection } from '../../hooks/useCollection'

//styles
import './Dashboard.css'

export default function Dashboard() {
  const { documents, error } = useCollection('projects')
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {documents && <ProjectList projects={documents} />}
    </div>
  )
}

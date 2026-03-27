import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import AIReview from './pages/AIReview'
import TrackChanges from './pages/TrackChanges'
import StakeholderReview from './pages/StakeholderReview'
import Publish from './pages/Publish'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="upload" element={<Upload />} />
        <Route path="policies/:id/review" element={<AIReview />} />
        <Route path="policies/:id/changes" element={<TrackChanges />} />
        <Route path="policies/:id/stakeholders" element={<StakeholderReview />} />
        <Route path="policies/:id/publish" element={<Publish />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

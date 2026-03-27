import { useNavigate, useParams } from 'react-router-dom'
import { Clock, ChevronRight } from 'lucide-react'
import WorkflowStepper from '../components/WorkflowStepper'
import { versions, diffBefore, diffAfter } from '../data/mockData'

function DiffPane({ content, added, label, color, dotColor }) {
  const lines = content.split('\n')
  const otherLines = added ? [] : diffAfter.split('\n')

  return (
    <div className={`flex-1 flex flex-col ${added ? '' : 'border-r border-gray-200'}`}>
      <div className={`px-5 py-3 border-b border-gray-200 ${added ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${dotColor}`} />
          <span className="text-sm font-semibold text-gray-700">{label}</span>
        </div>
      </div>
      <div className={`flex-1 p-5 overflow-auto font-mono text-xs leading-relaxed ${added ? 'bg-green-50' : 'bg-red-50'}`}>
        {lines.map((line, i) => {
          const isNew = added && line.trim() && !diffBefore.split('\n').includes(line)
          return (
            <div key={i} className={`py-0.5 px-1 rounded ${isNew ? 'bg-green-200' : ''}`}>
              {isNew && <span className="text-green-600 font-bold mr-1">+</span>}
              {line || '\u00a0'}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function TrackChanges() {
  const navigate = useNavigate()
  const { id }   = useParams()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Track Changes</h1>
        <p className="text-gray-500 text-sm mt-1">Step 3 of 5 — Review all modifications before sending for stakeholder review</p>
      </div>

      <WorkflowStepper currentStep={3} />

      <div className="flex gap-6 h-[55vh]">
        {/* Diff Viewer */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex">
          <DiffPane content={diffBefore} added={false} label="Before (v2.0)" dotColor="bg-red-400" />
          <DiffPane content={diffAfter}  added={true}  label="After (v2.1)"  dotColor="bg-green-400" />
        </div>

        {/* Version History */}
        <div className="w-72 flex-shrink-0 flex flex-col gap-3 overflow-auto">
          <h2 className="font-semibold text-gray-900">Version History</h2>
          {versions.map((v) => (
            <div key={v.id} className={`bg-white rounded-xl border p-4 flex-shrink-0 ${v.isCurrent ? 'border-lrn-gold ring-1 ring-lrn-gold' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lrn-navy">v{v.version}</span>
                  {v.isCurrent && <span className="text-xs bg-lrn-gold text-white px-2 py-0.5 rounded-full">Current</span>}
                </div>
                <Clock size={13} className="text-gray-400" />
              </div>
              <div className="text-xs text-gray-500 mb-1.5">{v.date} &bull; {v.author}</div>
              <p className="text-xs text-gray-700 leading-relaxed">{v.changes}</p>
            </div>
          ))}

          {/* Summary Box */}
          <div className="bg-lrn-navy text-white rounded-xl p-4 flex-shrink-0">
            <h3 className="font-semibold mb-3 text-sm">Change Summary</h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'Lines added',            value: '+8',    color: 'text-green-400' },
                { label: 'Lines removed',          value: '-0',    color: 'text-red-400' },
                { label: 'Sections modified',      value: '1',     color: 'text-white' },
                { label: 'AI suggestions applied', value: '3 / 5', color: 'text-lrn-gold' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-blue-200">{label}</span>
                  <span className={`font-bold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button onClick={() => navigate(`/policies/${id}/review`)} className="text-sm text-gray-500 hover:text-gray-700">← Back to AI Review</button>
        <button
          onClick={() => navigate(`/policies/${id}/stakeholders`)}
          className="flex items-center gap-2 px-6 py-2.5 bg-lrn-gold text-white rounded-xl font-semibold hover:bg-lrn-gold-dark transition-colors shadow-sm"
        >
          Send for Stakeholder Review <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

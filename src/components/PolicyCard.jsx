import { Link } from 'react-router-dom'
import { FileText, ChevronRight } from 'lucide-react'

const statusConfig = {
  uploaded:           { label: 'Uploaded',           color: 'bg-blue-100 text-blue-700' },
  review:             { label: 'AI Review',           color: 'bg-purple-100 text-purple-700' },
  'stakeholder-review': { label: 'Stakeholder Review', color: 'bg-amber-100 text-amber-700' },
  published:          { label: 'Published',           color: 'bg-green-100 text-green-700' },
}

const stepRoutes = {
  1: (id) => `/policies/${id}/review`,
  2: (id) => `/policies/${id}/review`,
  3: (id) => `/policies/${id}/changes`,
  4: (id) => `/policies/${id}/stakeholders`,
  5: (id) => `/policies/${id}/publish`,
}

export default function PolicyCard({ policy }) {
  const config = statusConfig[policy.status] || statusConfig.uploaded
  const route  = stepRoutes[policy.step]?.(policy.id) || `/policies/${policy.id}/review`

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-lrn-navy/10 flex items-center justify-center">
          <FileText size={20} className="text-lrn-navy" />
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.color}`}>
          {config.label}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{policy.title}</h3>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">{policy.description}</p>
      <div className="text-xs text-gray-400 mb-4">
        {policy.department} &bull; v{policy.version} &bull; {policy.owner}
      </div>
      <Link
        to={route}
        className="flex items-center justify-between w-full px-4 py-2 bg-lrn-navy text-white text-sm rounded-lg hover:bg-lrn-navy-light transition-colors"
      >
        <span>{policy.step >= 5 ? 'View Policy' : 'Continue Workflow'}</span>
        <ChevronRight size={16} />
      </Link>
    </div>
  )
}

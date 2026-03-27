import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Zap, AlertTriangle, Info, CheckCircle, ChevronRight, ExternalLink } from 'lucide-react'
import WorkflowStepper from '../components/WorkflowStepper'
import { aiSuggestions, policies, policyText } from '../data/mockData'

const severityConfig = {
  high:   { Icon: AlertTriangle, color: 'text-red-500',    bg: 'bg-red-50 border-red-200',    label: 'High Priority' },
  medium: { Icon: Info,          color: 'text-amber-500',  bg: 'bg-amber-50 border-amber-200', label: 'Medium' },
  low:    { Icon: Info,          color: 'text-blue-500',   bg: 'bg-blue-50 border-blue-200',   label: 'Low' },
}

const badgeColor = { GDPR: 'bg-blue-600', SOX: 'bg-red-600', FCPA: 'bg-purple-600', LRN: 'bg-lrn-gold' }

export default function AIReview() {
  const navigate = useNavigate()
  const { id }   = useParams()
  const [accepted,  setAccepted]  = useState({})
  const [dismissed, setDismissed] = useState({})

  const policy       = policies.find(p => p.id === id)
  const title        = policy?.title || 'New Policy'
  const active       = aiSuggestions.filter(s => !dismissed[s.id])
  const acceptedCount = Object.values(accepted).filter(Boolean).length

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 text-sm mt-1">Step 2 of 5 — AI-powered review against regulations and LRN best practices</p>
      </div>

      <WorkflowStepper currentStep={2} />

      {/* Summary Bar */}
      <div className="flex items-center gap-6 bg-lrn-navy text-white rounded-xl px-6 py-4 mb-6 shadow-sm">
        <Zap size={22} className="text-lrn-gold flex-shrink-0" />
        <div className="flex-1">
          <span className="font-semibold">AI Analysis Complete</span>
          <span className="text-blue-200 text-sm ml-2">Analyzed against 12 regulations and LRN's global compliance database</span>
        </div>
        <div className="flex gap-8 text-sm">
          <div className="text-center">
            <div className="text-xl font-bold text-red-400">{active.filter(s => s.severity === 'high').length}</div>
            <div className="text-blue-300 text-xs">High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-amber-400">{active.filter(s => s.severity === 'medium').length}</div>
            <div className="text-blue-300 text-xs">Medium</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">{acceptedCount}</div>
            <div className="text-blue-300 text-xs">Accepted</div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 h-[58vh]">
        {/* Policy Text Viewer */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Policy Document</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">v2.1 Draft</span>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{policyText}</pre>
          </div>
        </div>

        {/* Suggestions Panel */}
        <div className="w-96 flex-shrink-0 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">AI Suggestions</h2>
            <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">{active.length} remaining</span>
          </div>
          <div className="flex-1 overflow-auto space-y-3 pr-1">
            {aiSuggestions.map((s) => {
              const cfg        = severityConfig[s.severity]
              const isAccepted = accepted[s.id]
              const isDismissed = dismissed[s.id]
              return (
                <div key={s.id} className={`rounded-xl border p-4 transition-all ${
                  isDismissed ? 'opacity-30 border-gray-200 bg-gray-50'
                  : isAccepted ? 'border-green-300 bg-green-50'
                  : cfg.bg
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold text-white px-2 py-0.5 rounded ${badgeColor[s.badge] || 'bg-gray-500'}`}>{s.badge}</span>
                    <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                    {isAccepted && <CheckCircle size={14} className="text-green-500 ml-auto" />}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 italic mb-2">{s.section}</p>
                  <div className="text-xs mb-3 space-y-1.5">
                    <div className="line-through text-gray-400 bg-red-50 px-2 py-1 rounded">{s.current}</div>
                    <div className="text-gray-800 bg-green-50 px-2 py-1 rounded border border-green-200">{s.suggested}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                    <ExternalLink size={11} />
                    <span className="italic truncate">{s.source}</span>
                  </div>
                  {!isDismissed && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAccepted(a => ({ ...a, [s.id]: !a[s.id] }))}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          isAccepted ? 'bg-green-500 text-white' : 'bg-lrn-navy text-white hover:bg-lrn-navy-light'
                        }`}
                      >
                        {isAccepted ? '✓ Accepted' : 'Accept'}
                      </button>
                      <button
                        onClick={() => setDismissed(d => ({ ...d, [s.id]: true }))}
                        className="flex-1 py-1.5 rounded-lg text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="text-sm text-gray-500 hover:text-gray-700">← Back to Dashboard</button>
        <button
          onClick={() => navigate(`/policies/${id || 'new'}/changes`)}
          className="flex items-center gap-2 px-6 py-2.5 bg-lrn-gold text-white rounded-xl font-semibold hover:bg-lrn-gold-dark transition-colors shadow-sm"
        >
          Apply Changes & Track <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

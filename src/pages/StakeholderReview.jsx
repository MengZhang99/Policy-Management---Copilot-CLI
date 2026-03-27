import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle, XCircle, Clock, MessageSquare, Send, ChevronRight, UserPlus } from 'lucide-react'
import WorkflowStepper from '../components/WorkflowStepper'
import { reviewers as initialReviewers } from '../data/mockData'

const statusConfig = {
  approved:           { Icon: CheckCircle,    color: 'text-green-500',  bg: 'bg-green-100',  label: 'Approved' },
  rejected:           { Icon: XCircle,        color: 'text-red-500',    bg: 'bg-red-100',    label: 'Rejected' },
  'changes-requested':{ Icon: MessageSquare,  color: 'text-amber-500',  bg: 'bg-amber-100',  label: 'Changes Requested' },
  pending:            { Icon: Clock,          color: 'text-gray-400',   bg: 'bg-gray-100',   label: 'Pending' },
}

export default function StakeholderReview() {
  const navigate  = useNavigate()
  const { id }    = useParams()
  const [reviewerList, setReviewerList] = useState(initialReviewers)
  const [comment, setComment]           = useState('')
  const [newEmail, setNewEmail]         = useState('')
  const [sent, setSent]                 = useState(false)
  const [messages, setMessages]         = useState([
    { id: 1, author: 'Amanda Torres', side: 'left',  text: 'GDPR additions look solid. Did we get DPO sign-off on the retention schedule?', date: 'Mar 13' },
    { id: 2, author: 'Sarah Johnson',  side: 'right', text: 'Yes — DPO confirmed on Mar 12. See the attached email thread.', date: 'Mar 13' },
    { id: 3, author: 'James Wright',   side: 'left',  text: 'SOX 302 language matches our existing cert template. Good to go from Legal.', date: 'Mar 14' },
  ])

  const approvedCount = reviewerList.filter(r => r.status === 'approved').length
  const allApproved   = reviewerList.every(r => r.status === 'approved')

  const markAs = (reviewerId, status, commentText) => {
    setReviewerList(prev => prev.map(r =>
      r.id === reviewerId ? { ...r, status, comment: commentText, date: 'Mar 15, 2024' } : r
    ))
  }

  const sendMessage = () => {
    if (!comment.trim()) return
    setMessages(m => [...m, { id: Date.now(), author: 'Sarah Johnson', side: 'right', text: comment, date: 'Mar 15' }])
    setComment('')
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Stakeholder Review</h1>
        <p className="text-gray-500 text-sm mt-1">Step 4 of 5 — Collect approvals from stakeholders before publishing</p>
      </div>

      <WorkflowStepper currentStep={4} />

      {/* Progress Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-900">Approval Progress</span>
          <span className="text-sm text-gray-500">{approvedCount} of {reviewerList.length} approved</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(approvedCount / reviewerList.length) * 100}%` }}
          />
        </div>
        {allApproved && (
          <div className="flex items-center gap-2 mt-3 text-green-600 text-sm font-semibold">
            <CheckCircle size={16} />
            All stakeholders have approved — ready to publish!
          </div>
        )}
      </div>

      <div className="flex gap-6">
        {/* Reviewer List */}
        <div className="flex-1 space-y-3">
          <h2 className="font-semibold text-gray-900">Reviewers</h2>
          {reviewerList.map((r) => {
            const cfg = statusConfig[r.status]
            return (
              <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-lrn-navy flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {r.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="font-semibold text-gray-900">{r.name}</span>
                        <span className="text-sm text-gray-500 ml-2">&bull; {r.role}</span>
                      </div>
                      <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                        <cfg.Icon size={12} />
                        {cfg.label}
                      </span>
                    </div>
                    {r.comment && (
                      <div className="bg-gray-50 rounded-lg p-3 mt-2 text-sm text-gray-700 border border-gray-100">
                        <MessageSquare size={12} className="inline mr-1.5 text-gray-400" />
                        {r.comment}
                        <div className="text-xs text-gray-400 mt-1">{r.date}</div>
                      </div>
                    )}
                    {r.status === 'pending' && (
                      <div className="mt-3 flex gap-2 flex-wrap">
                        <button onClick={() => markAs(r.id, 'approved', 'Approved via demo portal.')}
                          className="text-xs px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                          ✓ Approve (demo)
                        </button>
                        <button onClick={() => markAs(r.id, 'changes-requested', 'Please clarify escalation in Section 7.')}
                          className="text-xs px-3 py-1.5 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition-colors font-medium">
                          Request Changes (demo)
                        </button>
                        {!sent
                          ? <button onClick={() => setSent(true)} className="text-xs px-3 py-1.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 flex items-center gap-1">
                              <Send size={11} /> Send Reminder
                            </button>
                          : <span className="text-xs text-green-600 self-center font-medium">✓ Reminder sent</span>
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Add Reviewer */}
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-4">
            <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <UserPlus size={15} className="text-gray-400" /> Add Reviewer
            </div>
            <div className="flex gap-2">
              <input type="email" placeholder="reviewer@company.com" value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lrn-navy" />
              <button className="px-4 py-2 bg-lrn-navy text-white text-sm rounded-lg hover:bg-lrn-navy-light transition-colors font-medium">
                Invite
              </button>
            </div>
          </div>
        </div>

        {/* Discussion Thread */}
        <div className="w-80 flex-shrink-0 flex flex-col">
          <h2 className="font-semibold text-gray-900 mb-3">Discussion</h2>
          <div className="bg-white rounded-xl border border-gray-200 flex-1 flex flex-col overflow-hidden" style={{ maxHeight: '460px' }}>
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`text-xs rounded-xl p-3 max-w-[90%] ${
                  m.side === 'left'
                    ? 'bg-lrn-navy text-white rounded-tl-none'
                    : 'bg-gray-100 text-gray-800 rounded-tr-none ml-auto'
                }`}>
                  <div className="font-semibold mb-1">{m.author}</div>
                  {m.text}
                  <div className={`text-xs mt-1 ${m.side === 'left' ? 'text-blue-300' : 'text-gray-400'}`}>{m.date}</div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100 flex gap-2">
              <input type="text" placeholder="Add a comment..."
                value={comment} onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lrn-navy" />
              <button onClick={sendMessage} className="p-2 bg-lrn-navy text-white rounded-lg hover:bg-lrn-navy-light transition-colors">
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button onClick={() => navigate(`/policies/${id}/changes`)} className="text-sm text-gray-500 hover:text-gray-700">← Back to Track Changes</button>
        <button
          onClick={() => navigate(`/policies/${id}/publish`)}
          className="flex items-center gap-2 px-6 py-2.5 bg-lrn-gold text-white rounded-xl font-semibold hover:bg-lrn-gold-dark transition-colors shadow-sm"
        >
          Proceed to Publish <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle, Globe, Mail, Bell, Users } from 'lucide-react'
import WorkflowStepper from '../components/WorkflowStepper'

const checklist = [
  { label: 'Document uploaded',            done: true },
  { label: 'AI review completed',          done: true },
  { label: 'Changes tracked & approved',   done: true },
  { label: 'CCO compliance approval',      done: true },
  { label: 'Legal sign-off received',      done: true },
  { label: 'All stakeholders approved',    done: false },
]

export default function Publish() {
  const navigate = useNavigate()
  const { id }   = useParams()
  const [published,  setPublished]  = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [options, setOptions] = useState({ notifyAll: true, requireAck: true, scheduleTraining: false })

  const handlePublish = () => {
    setPublishing(true)
    setTimeout(() => { setPublishing(false); setPublished(true) }, 2400)
  }

  if (published) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <Globe size={48} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Policy Published! 🎉</h1>
        <p className="text-gray-500 text-lg mb-1">Code of Conduct v2.1 is now live</p>
        <p className="text-gray-400 text-sm mb-10">
          Notification sent to <strong>847 employees</strong> across all departments
        </p>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { value: '847', label: 'Employees notified', color: 'bg-green-50 border-green-200 text-green-700' },
            { value: 'v2.1', label: 'Version published',  color: 'bg-blue-50 border-blue-200 text-blue-700' },
            { value: '100%', label: 'Compliance score',   color: 'bg-purple-50 border-purple-200 text-purple-700' },
          ].map(({ value, label, color }) => (
            <div key={label} className={`border rounded-xl p-5 ${color}`}>
              <div className="text-3xl font-bold mb-1">{value}</div>
              <div className="text-sm">{label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-10 py-3.5 bg-lrn-navy text-white rounded-xl font-semibold hover:bg-lrn-navy-light transition-colors shadow-md text-base"
        >
          Return to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Publish Policy</h1>
        <p className="text-gray-500 text-sm mt-1">Step 5 of 5 — Final review and publish to all employees</p>
      </div>

      <WorkflowStepper currentStep={5} />

      <div className="grid grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Publication Summary</h2>
            <div className="space-y-0">
              {[
                { label: 'Policy',                  value: 'Code of Conduct' },
                { label: 'Version',                 value: '2.1' },
                { label: 'Department',              value: 'Human Resources' },
                { label: 'Owner',                   value: 'Sarah Johnson' },
                { label: 'Effective Date',          value: 'April 1, 2024' },
                { label: 'AI Suggestions Applied',  value: '3 of 5' },
                { label: 'Stakeholder Approvals',   value: '2 of 4' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2.5 border-b border-gray-100 last:border-0 text-sm">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Pre-Publication Checklist</h2>
            <div className="space-y-2.5">
              {checklist.map(({ label, done }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <CheckCircle size={16} className={done ? 'text-green-500' : 'text-gray-300'} />
                  <span className={done ? 'text-gray-700' : 'text-gray-400'}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Publication Options</h2>
            <div className="space-y-3">
              {[
                { key: 'notifyAll',        Icon: Bell,         label: 'Notify all employees via email', desc: '847 recipients across all departments' },
                { key: 'requireAck',       Icon: Users,        label: 'Require employee acknowledgment', desc: 'Track read receipts & signatures' },
                { key: 'scheduleTraining', Icon: CheckCircle,  label: 'Auto-assign compliance training', desc: 'LRN course modules assigned on publish' },
              ].map(({ key, Icon, label, desc }) => (
                <label key={key} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={options[key]}
                    onChange={e => setOptions(o => ({ ...o, [key]: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 accent-lrn-navy" />
                  <div>
                    <div className="text-sm font-medium text-gray-800 flex items-center gap-1.5">
                      <Icon size={13} className="text-lrn-navy" /> {label}
                    </div>
                    <div className="text-xs text-gray-400">{desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Email Preview */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">Employee Notification Preview</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-lrn-navy px-6 py-4">
              <div className="text-blue-200 text-xs mb-1">From: noreply@lrn.com &bull; To: All Employees</div>
              <div className="text-white font-bold text-sm">📋 Updated Policy: Code of Conduct — Action Required</div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-lrn-gold rounded-lg flex items-center justify-center shadow-sm">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">LRN Policy Management</div>
                  <div className="text-gray-400 text-xs">On behalf of HR &amp; Compliance</div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">Dear [Employee Name],</p>
              <p className="text-sm text-gray-700 mb-3">
                Our <strong>Code of Conduct</strong> has been updated to <strong>version 2.1</strong>,
                effective <strong>April 1, 2024</strong>.
              </p>
              <p className="text-sm font-medium text-gray-800 mb-2">Key updates include:</p>
              <ul className="text-sm text-gray-700 mb-4 space-y-1 pl-3">
                <li>&bull; Enhanced GDPR data transparency requirements (Art. 13)</li>
                <li>&bull; Updated SOX Section 302 financial disclosure obligations</li>
                <li>&bull; Clarified third-party FCPA compliance expectations</li>
              </ul>
              <p className="text-sm text-gray-700 mb-5">
                Please review and acknowledge by <strong>April 14, 2024</strong>.
              </p>
              <div className="flex gap-3">
                <div className="flex-1 py-2.5 bg-lrn-gold text-white text-sm font-semibold rounded-lg text-center cursor-pointer hover:bg-lrn-gold-dark transition-colors">
                  Read &amp; Acknowledge
                </div>
                <div className="py-2.5 px-4 border border-gray-300 text-gray-600 text-sm rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  View Summary
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
                LRN Policy Management &bull; <span className="hover:underline cursor-pointer">Unsubscribe</span> &bull; <span className="hover:underline cursor-pointer">Help</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button onClick={() => navigate(`/policies/${id}/stakeholders`)} className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Stakeholder Review
        </button>
        <button
          onClick={handlePublish}
          disabled={publishing}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all shadow-md ${
            publishing ? 'bg-gray-400 cursor-not-allowed' : 'bg-lrn-gold hover:bg-lrn-gold-dark'
          }`}
        >
          {publishing ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Publishing...
            </>
          ) : (
            <>
              <Globe size={18} />
              Publish to All Employees
            </>
          )}
        </button>
      </div>
    </div>
  )
}

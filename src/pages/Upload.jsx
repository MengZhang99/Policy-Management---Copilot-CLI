import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload as UploadIcon, FileText, CheckCircle, Zap } from 'lucide-react'
import WorkflowStepper from '../components/WorkflowStepper'

export default function Upload() {
  const navigate = useNavigate()
  const [dragOver, setDragOver]   = useState(false)
  const [file, setFile]           = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded]   = useState(false)
  const [form, setForm] = useState({ title: '', department: '', owner: '', effectiveDate: '', category: '' })

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  const handleUpload = () => {
    setUploading(true)
    setTimeout(() => { setUploading(false); setUploaded(true) }, 2200)
  }

  const isReady = file && form.title && form.department && form.owner

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload New Policy</h1>
        <p className="text-gray-500 text-sm mt-1">Step 1 of 5 — Upload your policy document to begin the review workflow</p>
      </div>

      <WorkflowStepper currentStep={1} />

      {!uploaded ? (
        <div className="space-y-6">
          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
              dragOver ? 'border-lrn-gold bg-amber-50 scale-[1.01]'
              : file   ? 'border-green-400 bg-green-50'
              : 'border-gray-300 bg-white hover:border-lrn-navy hover:bg-blue-50'
            }`}
          >
            {file ? (
              <div className="flex flex-col items-center">
                <FileText size={44} className="text-green-500 mb-3" />
                <p className="font-semibold text-gray-900 text-lg">{file.name}</p>
                <p className="text-sm text-gray-500 mt-1">{(file.size / 1024).toFixed(1)} KB &bull; Ready to upload</p>
                <button onClick={() => setFile(null)} className="mt-3 text-sm text-red-500 hover:underline">Remove file</button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <UploadIcon size={44} className="text-gray-300 mb-4" />
                <p className="font-semibold text-gray-700 text-lg">Drag & drop your policy document here</p>
                <p className="text-sm text-gray-400 mt-2">Supports PDF, DOCX, DOC &bull; Up to 25 MB</p>
                <label className="mt-5 px-5 py-2.5 bg-lrn-navy text-white text-sm rounded-lg cursor-pointer hover:bg-lrn-navy-light transition-colors font-medium">
                  Browse Files
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
                </label>
              </div>
            )}
          </div>

          {/* Metadata Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-5">Policy Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Policy Title *</label>
                <input type="text" placeholder="e.g. Code of Conduct" value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lrn-navy" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lrn-navy">
                  <option value="">Select department</option>
                  <option>Human Resources</option>
                  <option>Legal &amp; Compliance</option>
                  <option>Finance</option>
                  <option>IT &amp; Security</option>
                  <option>Operations</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Policy Owner *</label>
                <input type="text" placeholder="e.g. Sarah Johnson" value={form.owner}
                  onChange={e => setForm({ ...form, owner: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lrn-navy" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lrn-navy">
                  <option value="">Select category</option>
                  <option>Ethics &amp; Compliance</option>
                  <option>Data &amp; Privacy</option>
                  <option>Financial Controls</option>
                  <option>Health &amp; Safety</option>
                  <option>IT Security</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                <input type="date" value={form.effectiveDate}
                  onChange={e => setForm({ ...form, effectiveDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lrn-navy" />
              </div>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={!isReady || uploading}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all text-base ${
              isReady && !uploading ? 'bg-lrn-gold hover:bg-lrn-gold-dark shadow-md' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Uploading &amp; scanning policy...
              </span>
            ) : 'Upload Policy & Start AI Review →'}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-14 text-center shadow-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={44} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Policy Uploaded Successfully!</h2>
          <p className="text-gray-500 mb-2 text-base">"{form.title}" has been uploaded and scanned.</p>
          <div className="flex items-center justify-center gap-2 text-purple-600 font-medium mb-8">
            <Zap size={18} />
            <span>AI found <strong>5 suggestions</strong> based on current regulations and LRN expertise</span>
          </div>
          <button
            onClick={() => navigate('/policies/new/review')}
            className="px-10 py-3.5 bg-lrn-gold text-white rounded-xl font-semibold hover:bg-lrn-gold-dark transition-colors shadow-md text-base"
          >
            Review AI Suggestions →
          </button>
        </div>
      )}
    </div>
  )
}

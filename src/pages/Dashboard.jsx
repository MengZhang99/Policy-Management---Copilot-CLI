import { Link } from 'react-router-dom'
import { Upload, CheckCircle, Clock, BookOpen, TrendingUp, Zap, AlertCircle } from 'lucide-react'
import PolicyCard from '../components/PolicyCard'
import { policies, stats, recentActivity } from '../data/mockData'

const activityIcon = {
  publish:  { Icon: CheckCircle, color: 'text-green-500' },
  approve:  { Icon: CheckCircle, color: 'text-blue-500' },
  ai:       { Icon: Zap,         color: 'text-purple-500' },
  upload:   { Icon: Upload,      color: 'text-lrn-navy' },
  changes:  { Icon: AlertCircle, color: 'text-amber-500' },
}

export default function Dashboard() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Policy Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage, review, and publish your company policies</p>
        </div>
        <Link
          to="/upload"
          className="flex items-center gap-2 px-5 py-2.5 bg-lrn-gold text-white rounded-xl font-semibold hover:bg-lrn-gold-dark transition-colors shadow-sm"
        >
          <Upload size={18} />
          Upload New Policy
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Policies',    value: stats.total,     Icon: BookOpen,   color: 'text-lrn-navy',    bg: 'bg-blue-50' },
          { label: 'Published',         value: stats.published, Icon: CheckCircle,color: 'text-green-600',   bg: 'bg-green-50' },
          { label: 'In Review',         value: stats.inReview,  Icon: Clock,      color: 'text-amber-600',   bg: 'bg-amber-50' },
          { label: 'Compliance Score',  value: '94%',           Icon: TrendingUp, color: 'text-purple-600',  bg: 'bg-purple-50' },
        ].map(({ label, value, Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Policy Grid */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Policies</h2>
            <button className="text-sm text-lrn-navy hover:underline font-medium">View all 24</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {policies.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {recentActivity.map((item) => {
              const { Icon, color } = activityIcon[item.type] || activityIcon.upload
              return (
                <div key={item.id} className="px-4 py-3">
                  <div className="flex gap-3">
                    <Icon size={15} className={`${color} mt-0.5 flex-shrink-0`} />
                    <div>
                      <div className="text-sm text-gray-800">
                        <span className="font-medium">{item.action}</span>
                        {' — '}
                        <span className="text-gray-600">{item.policy}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.user} &bull; {item.time}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

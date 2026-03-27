const steps = [
  { id: 1, label: 'Upload' },
  { id: 2, label: 'AI Review' },
  { id: 3, label: 'Track Changes' },
  { id: 4, label: 'Stakeholder Review' },
  { id: 5, label: 'Publish' },
]

export default function WorkflowStepper({ currentStep }) {
  return (
    <div className="flex items-start mb-8">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
              step.id < currentStep
                ? 'bg-green-500 border-green-500 text-white'
                : step.id === currentStep
                ? 'bg-lrn-gold border-lrn-gold text-white shadow-md'
                : 'bg-white border-gray-300 text-gray-400'
            }`}>
              {step.id < currentStep ? '✓' : step.id}
            </div>
            <div className={`text-xs mt-1.5 font-medium whitespace-nowrap ${
              step.id === currentStep ? 'text-lrn-gold'
              : step.id < currentStep ? 'text-green-600'
              : 'text-gray-400'
            }`}>
              {step.label}
            </div>
          </div>
          {idx < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-3 mb-5 ${step.id < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

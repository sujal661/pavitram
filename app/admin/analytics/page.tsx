export const metadata = {
  title: "Analytics | Admin",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Deep Analytics</h1>
        <p className="text-sm text-zinc-400 mt-1">Detailed breakdowns from PostHog, GA4, and Microsoft Clarity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Microsoft Clarity</h3>
          <p className="text-zinc-400 max-w-sm mb-6">View heatmaps and session recordings to understand user behavior and frustration points.</p>
          <a 
            href="https://clarity.microsoft.com" 
            target="_blank" 
            rel="noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Open Clarity Dashboard
          </a>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">PostHog Analytics</h3>
          <p className="text-zinc-400 max-w-sm mb-6">Track feature flags, deep user flows, and create complex funnels.</p>
          <a 
            href="https://us.posthog.com" 
            target="_blank" 
            rel="noreferrer"
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Open PostHog Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

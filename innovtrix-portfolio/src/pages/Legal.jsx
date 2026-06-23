export default function Legal({ mode }) {
  const isPrivacy = mode === 'privacy'

  return (
    <div className="font-sans min-h-[70vh] bg-slate-950 px-6 py-20">
      <div className="max-w-3xl mx-auto glass-card p-8 lg:p-12 border-white/5 bg-slate-900/40">
        
        {isPrivacy ? (
          <div>
            <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
            <p className="text-slate-400 text-xs mb-4">Last Updated: June 22, 2026</p>
            
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
              <p>
                At Innovtrix Studio, we respect your privacy. This policy outlines how we gather, store, and process client information when you request project proposals or submit contact forms.
              </p>
              
              <h3 className="text-lg font-semibold text-white mt-8">1. Information We Collect</h3>
              <p>
                We only collect name details, corporate phone numbers, business email addresses, company names, and estimated budget selections. We collect this data strictly to customize website proposals.
              </p>

              <h3 className="text-lg font-semibold text-white mt-8">2. Use of Collected Data</h3>
              <p>
                We leverage your business info to contact you regarding web builds. We do not sell, rent, or lease your personal information to third parties.
              </p>

              <h3 className="text-lg font-semibold text-white mt-8">3. Security Infrastructure</h3>
              <p>
                We use secure database encryption protocols and TLS data transmissions to store client lead information securely, preventing unauthorized access.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
            <p className="text-slate-400 text-xs mb-4">Last Updated: June 22, 2026</p>
            
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
              <p>
                Welcome to Innovtrix. By accessing our public portfolio site or utilizing our lead forms, you agree to comply with these terms.
              </p>

              <h3 className="text-lg font-semibold text-white mt-8">1. Use of Website Content</h3>
              <p>
                All designs, graphics, and layout files displayed in our portfolio section are the intellectual property of Innovtrix Studio. You may not replicate or scrape these portfolios for commercial purposes.
              </p>

              <h3 className="text-lg font-semibold text-white mt-8">2. Project Consultation Agreements</h3>
              <p>
                Submitting a proposal request does not bind Innovtrix to build the project. A legally binding development contract is only established after signing a statement of work (SOW).
              </p>

              <h3 className="text-lg font-semibold text-white mt-8">3. Limitation of Liability</h3>
              <p>
                Innovtrix provides estimates and resources based on current market rates. We are not liable for business changes occurring prior to executing a formal development agreement.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

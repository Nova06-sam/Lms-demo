import React, { useState, useRef } from "react";
import { FiCheck, FiGlobe } from "react-icons/fi";
import BackToDashboard from "../../../../common/backDashboard/BackDashboard";

const TABS = ["Branding", "Colors", "Advanced", "Features", "Domain"];

const WhiteLabelSettings = () => {
  const [activeTab, setActiveTab] = useState("Branding");
  const tabRefs = useRef({});

  const focusTabByIndex = (index) => {
    const clamped = ((index % TABS.length) + TABS.length) % TABS.length;
    const tab = TABS[clamped];
    setActiveTab(tab);
    const el = tabRefs.current[tab];
    if (el) el.focus();
  };

  const handleTabKeyDown = (e, tab) => {
    switch (e.key) {
      case "ArrowRight": e.preventDefault(); focusTabByIndex(TABS.indexOf(tab) + 1); break;
      case "ArrowLeft": e.preventDefault(); focusTabByIndex(TABS.indexOf(tab) - 1); break;
      case "Home": e.preventDefault(); focusTabByIndex(0); break;
      case "End": e.preventDefault(); focusTabByIndex(TABS.length - 1); break;
      default: break;
    }
  };

  return (

    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      {/* Back button */}
      <BackToDashboard />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-24 sm:pb-12 space-y-6 sm:space-y-8">
        <section>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-1">
            White-Label Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Customize the platform branding and appearance.</p>
        </section>

        {/* Tabs */}
        <section
          role="tablist"
          aria-label="White-label settings tabs"
          className="bg-slate-100 rounded-full px-1.5 py-1 flex items-center gap-1 text-sm overflow-x-auto whitespace-nowrap -mx-4 sm:mx-0 pl-4 sm:pl-2 pr-4 sm:pr-2 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-100/70"
        >
          {TABS.map((tab) => {
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                ref={(el) => (tabRefs.current[tab] = el)}
                id={`tab-${tab.toLowerCase()}`}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${tab.toLowerCase()}`}
                tabIndex={active ? 0 : -1}
                onKeyDown={(e) => handleTabKeyDown(e, tab)}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 transition-colors ${active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </section>

        {activeTab === "Branding" && (
          <section id="panel-branding" role="tabpanel" aria-labelledby="tab-branding">
            <BrandingTab />
          </section>
        )}
        {activeTab === "Colors" && (
          <section id="panel-colors" role="tabpanel" aria-labelledby="tab-colors">
            <ColorsTab />
          </section>
        )}
        {activeTab === "Advanced" && (
          <section id="panel-advanced" role="tabpanel" aria-labelledby="tab-advanced">
            <AdvancedTab />
          </section>
        )}
        {activeTab === "Features" && (
          <section id="panel-features" role="tabpanel" aria-labelledby="tab-features">
            <FeaturesTab />
          </section>
        )}
        {activeTab === "Domain" && (
          <section id="panel-domain" role="tabpanel" aria-labelledby="tab-domain">
            <DomainTab />
          </section>
        )}
      </main>
    </div>
  );
};

/* ---------- BRANDING TAB ---------- */
const BrandingTab = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">Brand Identity</h2>
          <p className="text-xs sm:text-sm text-slate-500">Customize your platform branding</p>
        </div>

        <div className="space-y-4 sm:space-y-5 text-sm">
          <div className="space-y-2">
            <label className="font-medium text-slate-800">Brand Name</label>
            <input type="text" defaultValue="Wrench Wise LMS" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-slate-800">Logo/Icon</label>
            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-xl">🔧</span>
              <input type="text" placeholder="Use an emoji or paste a logo URL" className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400" />
            </div>
            <p className="text-xs text-slate-400">Use an emoji or paste a logo URL for best results</p>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-slate-800">Tagline</label>
            <input type="text" defaultValue="Transform your learning experience" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-slate-800">Welcome Message</label>
            <textarea rows={4} defaultValue="Welcome to our learning platform. Start your journey today!" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>

        <div>
          <button className="w-full rounded-full bg-blue-600 text-white text-sm font-medium py-3.5 hover:bg-blue-700 transition-colors">Save Brand Changes</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8 space-y-5">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">Live Preview</h2>
          <p className="text-xs sm:text-sm text-slate-500">See how your branding looks</p>
        </div>

        <div className="rounded-3xl bg-indigo-50 border border-indigo-100 px-6 md:px-8 py-8 md:py-10 space-y-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl">🔧</div>
            <div>
              <p className="font-semibold text-blue-600">Wrench Wise LMS</p>
              <p className="text-xs text-slate-500 mt-0.5">Learning Platform</p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="h-2 rounded-full bg-blue-500 w-4/5" />
            <div className="h-2 rounded-full bg-indigo-200 w-3/5" />
            <div className="h-2 rounded-full bg-indigo-200 w-2/5" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- COLORS TAB ---------- */
const COLOR_PRESETS = [
  { label: "Blue", className: "bg-blue-600", hex: "#2563EB" },
  { label: "Emerald", className: "bg-emerald-500", hex: "#10B981" },
  { label: "Purple", className: "bg-violet-500", hex: "#8B5CF6" },
  { label: "Orange", className: "bg-orange-500", hex: "#F97316" },
];

const ColorsTab = () => {
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]);
  const [hexValue, setHexValue] = useState(selectedColor.hex);

  const handlePresetClick = (preset) => {
    setSelectedColor(preset);
    setHexValue(preset.hex);
  };

  const handleHexChange = (e) => setHexValue(e.target.value);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">Color Scheme</h2>
          <p className="text-xs sm:text-sm text-slate-500">Customize your platform&apos;s colors</p>
        </div>

        <div className="space-y-6 text-sm">
          <div className="space-y-2">
            <p className="font-medium text-slate-800">Primary Color</p>
            <div className="flex items-center gap-3">
              <div className={`h-12 w-16 rounded-3xl border-4 border-slate-100 ${selectedColor.className}`} />
              <input type="text" value={hexValue} onChange={handleHexChange} className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-medium text-slate-800">Quick Color Presets</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COLOR_PRESETS.map((c) => {
                const isActive = c.label === selectedColor.label;
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => handlePresetClick(c)}
                    className={`rounded-3xl border bg-white px-4 py-4 flex flex-col items-center gap-2 transition ${isActive ? "border-blue-500 shadow-sm" : "border-slate-200 hover:border-blue-500"
                      }`}
                  >
                    <span className={`h-8 w-8 rounded-full ${c.className}`} />
                    <span className="text-xs font-medium text-slate-700">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <button className="w-full rounded-full bg-blue-600 text-white text-sm font-medium py-3.5 hover:bg-blue-700 transition-colors">
            Apply Color Scheme
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">Color Preview</h2>
          <p className="text-xs sm:text-sm text-slate-500">See your colors in action</p>
        </div>

        <div className="space-y-5 text-sm">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl text-white flex items-center justify-center ${selectedColor.className}`}>
              <FiCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Primary Buttons</p>
              <p className="text-xs text-slate-500">Main call-to-action color</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 space-y-3">
            <div className={`h-2 rounded-full w-full ${selectedColor.className}`} />
            <div className="h-2 rounded-full bg-indigo-200 w-4/5" />
            <p className="text-xs text-slate-500">Progress bars and indicators</p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- ADVANCED TAB ---------- */
const AdvancedTab = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">Advanced Customization</h2>
          <p className="text-xs sm:text-sm text-slate-500">Fine-tune your platform&apos;s appearance</p>
        </div>

        <div className="space-y-5 text-sm">
          <div className="space-y-2">
            <p className="font-medium text-slate-800">Header Style</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-blue-500 bg-indigo-50 px-4 py-4 text-center">
                <div className="h-6 rounded-xl bg-indigo-100 mb-3" />
                <p className="text-xs font-medium text-slate-800">Solid</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-center">
                <div className="h-6 rounded-xl bg-slate-100 mb-3" />
                <p className="text-xs font-medium text-slate-800">Transparent</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-slate-800">Sidebar Style</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-blue-500 bg-indigo-50 px-4 py-4 text-center">
                <div className="flex items-center gap-1 mb-3">
                  <div className="h-6 w-4 rounded-lg bg-slate-100" />
                  <div className="h-6 flex-1 rounded-lg bg-indigo-100" />
                </div>
                <p className="text-xs font-medium text-slate-800">Compact</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-center">
                <div className="flex items-center gap-1 mb-3">
                  <div className="h-6 w-6 rounded-lg bg-slate-100" />
                  <div className="h-6 flex-1 rounded-lg bg-indigo-100" />
                </div>
                <p className="text-xs font-medium text-slate-800">Wide</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-slate-800">Border Radius</p>
            <select className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>None (0px)</option>
              <option>Small (4px)</option>
              <option>Medium (8px)</option>
              <option>Large (16px)</option>
              <option>Extra Large (24px)</option>
            </select>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-slate-800">Animation Style</p>
            <select className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>None</option>
              <option>Smooth</option>
              <option>Bounce</option>
              <option>Snappy</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">Typography</h2>
          <p className="text-xs sm:text-sm text-slate-500">Customize fonts and text styles</p>
        </div>

        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <p className="font-medium text-slate-800">Heading Font</p>
            <select className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>Inter (Default)</option>
              <option>Poppins</option>
              <option>Montserrat</option>
              <option>Roboto</option>
              <option>Open Sans</option>
            </select>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-slate-800">Body Font</p>
            <select className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>Nunito (Default)</option>
              <option>Open Sans</option>
              <option>Source Sans Pro</option>
              <option>Lato</option>
              <option>Work Sans</option>
            </select>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-slate-800">Font Size Scale</p>
            <select className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 space-y-1">
          <p className="font-semibold text-slate-900">Preview</p>
          <p className="text-xs sm:text-sm text-slate-500">
            This is how your text will look with the selected typography settings.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ---------- FEATURES TAB ---------- */
const FeaturesTab = () => {
  const featureRow = (title, desc, enabled = true) => (
    <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl md:rounded-3xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3.5 sm:py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5 break-words">{desc}</p>
      </div>
      <div className={`shrink-0 w-11 h-6 rounded-full flex items-center px-1 ${enabled ? "bg-blue-600" : "bg-slate-200"}`}>
        <div className={`h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
      </div>
    </div>
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">Platform Features</h2>
          <p className="text-xs sm:text-sm text-slate-500">Enable or disable platform features</p>
        </div>

        <div className="space-y-3">
          {featureRow("Discussion Forums", "Allow students to interact", true)}
          {featureRow("Live Chat Support", "24/7 customer support", true)}
          {featureRow("Certificates", "Automated certificate generation", true)}
          {featureRow("Mobile App", "Native mobile applications", false)}
          {featureRow("Offline Mode", "Download content for offline viewing", false)}
          {featureRow("AI Assistant", "AI-powered learning assistant", true)}
          {featureRow("Advanced Analytics", "Detailed learning analytics", true)}
          {featureRow("Multi-language", "Support for multiple languages", false)}
        </div>
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">Monetization</h2>
          <p className="text-xs sm:text-sm text-slate-500">Configure revenue streams</p>
        </div>

        <div className="space-y-5 text-sm">
          <div className="space-y-2">
            <p className="font-medium text-slate-800">Platform Fee (%)</p>
            <input type="number" defaultValue={10} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            <p className="text-xs text-slate-500">Percentage taken from each course sale</p>
          </div>

          <div className="space-y-3">
            <p className="font-medium text-slate-800">Subscription Plans</p>
            {["Basic Plan", "Pro Plan", "Enterprise"].map((plan, idx) => (
              <div key={plan} className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl md:rounded-3xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3.5 sm:py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{plan}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {idx === 0 && "$9.99/month"}
                    {idx === 1 && "$19.99/month"}
                    {idx === 2 && "Custom pricing"}
                  </p>
                </div>
                <div className={`shrink-0 w-11 h-6 rounded-full flex items-center px-1 ${idx < 2 ? "bg-blue-600" : "bg-slate-200"}`}>
                  <div className={`h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform ${idx < 2 ? "translate-x-5" : "translate-x-0"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button className="w-full rounded-full bg-blue-600 text-white text-sm font-medium py-3.5 hover:bg-blue-700 transition-colors">
            Configure Payment Gateway
          </button>
        </div>
      </div>
    </section>
  );
};

/* ---------- DOMAIN TAB ---------- */
const DomainTab = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">Custom Domain</h2>
          <p className="text-xs sm:text-sm text-slate-500">Set up your custom domain</p>
        </div>

        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <p className="font-medium text-slate-800">Domain Name</p>
            <input type="text" placeholder="learn.yourcompany.com" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            <p className="text-xs text-slate-500">Add a CNAME record pointing to your platform</p>
          </div>

          <div className="space-y-2 mt-4">
            <p className="font-medium text-slate-800">SSL Certificate</p>
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-3 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-700">SSL Certificate Active</span>
            </div>
          </div>

          <div className="pt-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white text-sm font-medium px-5 py-3 hover:bg-blue-700 transition-colors">
              <FiGlobe className="w-4 h-4" />
              <span>Set Custom Domain</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">SEO Settings</h2>
          <p className="text-xs sm:text-sm text-slate-500">Optimize for search engines</p>
        </div>

        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <p className="font-medium text-slate-800">Meta Title</p>
            <input type="text" defaultValue="Best Online Learning Platform" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <p className="font-medium text-slate-800">Meta Description</p>
            <textarea rows={4} defaultValue="Transform your skills with our comprehensive online courses..." className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <p className="font-medium text-slate-800">Keywords</p>
            <input type="text" defaultValue="online learning, courses, education" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>

        <div className="pt-3">
          <button className="w-full rounded-full bg-slate-100 border border-slate-200 text-sm font-medium text-slate-800 py-3 hover:bg-slate-200 transition-colors">
            Generate SEO Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhiteLabelSettings;

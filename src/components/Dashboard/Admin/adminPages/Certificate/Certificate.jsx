import React from "react";
import { FiArrowLeft, FiClock, FiCheckCircle, FiEye, FiDownload } from "react-icons/fi";
import BackToDashboard from "../../../../common/backDashboard/BackDashboard";

const certificateStats = [
  { title: "Total Certificates", value: "456", subtitle: "All time issued", icon: <FiCheckCircle className="w-4 h-4" /> },
  { title: "Pending Verification", value: "1", subtitle: "Awaiting admin review", icon: <FiClock className="w-4 h-4" /> },
  { title: "Issued This Month", value: "89", subtitle: "+15% from last month", icon: <FiCheckCircle className="w-4 h-4" /> },
  { title: "Verification Rate", value: "95%", subtitle: "Average processing time: 2 days", icon: <FiCheckCircle className="w-4 h-4" /> },
];

const tracks = [
  { name: "Frontend Development", iconBg: "bg-blue-500", totalStudents: 234, certified: 183, completion: 78 },
  { name: "Backend Development", iconBg: "bg-green-500", totalStudents: 189, certified: 123, completion: 65 },
  { name: "Data Structures & Algorithms", iconBg: "bg-purple-500", totalStudents: 156, certified: 81, completion: 52 },
  { name: "Full Stack Developer", iconBg: "bg-amber-400", totalStudents: 98, certified: 44, completion: 45, subtitle: "Prerequisites: Frontend + Backend + DSA" },
];

const verificationQueue = [
  { name: "Alice Johnson", program: "Full Stack Developer - Course Completion", status: "Pending Verification", statusColor: "bg-amber-100 text-amber-700", buttonLabel: "Approve", buttonColor: "bg-blue-600 hover:bg-emerald-600", completedOn: "Completed on Nov 3, 2025", progress: "Progress: 100%", avatarColor: "bg-indigo-200 text-indigo-700", initials: "Al" },
  { name: "Bob Smith", program: "Frontend Development - Module Completion", status: "Approved", statusColor: "bg-emerald-100 text-emerald-700", buttonLabel: "Issue Certificate", buttonColor: "bg-blue-600 hover:bg-emerald-600", completedOn: "Completed on Nov 2, 2025", progress: "Progress: 100%", avatarColor: "bg-emerald-200 text-emerald-700", initials: "Bo" },
  { name: "Carol Davis", program: "Backend Development - Module Completion", status: "Issued", statusColor: "bg-blue-100 text-blue-700", buttonLabel: "Download", buttonColor: "bg-slate-100 hover:bg-emerald-50 text-slate-800", completedOn: "Completed on Nov 1, 2025", progress: "Progress: 100%", avatarColor: "bg-pink-200 text-pink-700", initials: "Ca", showDownloadIcon: true },
];

const templateFeatures = [
  "Auto-populated student data",
  "Program & module names",
  "Digital signature support",
  "QR code verification",
];

const CertificateGeneration = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-10 space-y-6 sm:space-y-8">
        {/* Back button */}
        <BackToDashboard/>

        {/* Title */}
        <section>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-1">
            Certification Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage certification hierarchy and verify student completions
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {certificateStats.map((card) => (
            <div key={card.title} className="bg-white rounded-3xl border border-slate-200 shadow-sm px-4 sm:px-5 py-3 sm:py-4">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <p className="text-xs sm:text-sm text-slate-500">{card.title}</p>
                <div className="text-slate-400">{card.icon}</div>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-semibold text-slate-900 mb-1">{card.value}</p>
                <p className="text-[11px] sm:text-xs text-slate-500">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Certification hierarchy */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Certification Hierarchy</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Progressive certification path: Frontend → Backend → DSA → Full Stack
            </p>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {tracks.map((track) => (
              <div key={track.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-2xl ${track.iconBg} flex items-center justify-center text-white text-lg sm:text-xl`}>⭕</div>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900">{track.name}</h3>
                    {track.subtitle && <p className="text-[11px] sm:text-xs text-slate-500 mt-1">{track.subtitle}</p>}

                    <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-6">
                      <div>
                        <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Total Students</p>
                        <p className="text-sm sm:text-base font-medium text-slate-900">{track.totalStudents}</p>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Certified</p>
                        <p className="text-sm sm:text-base font-medium text-slate-900">{track.certified}</p>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Completion</p>
                        <p className="text-sm sm:text-base font-medium text-slate-900">{track.completion}%</p>
                      </div>

                      <div className="sm:ml-auto">
                        <button className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-slate-300 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 transition-colors">
                          <FiEye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>

                    <div className="w-full h-2 rounded-full bg-blue-100 overflow-hidden mt-4">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${track.completion}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verification queue */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Certificate Verification Queue</h2>
            <p className="text-xs sm:text-sm text-slate-500">Review and approve certificate requests</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {verificationQueue.map((item) => (
              <div key={item.name} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 sm:px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full ${item.avatarColor} flex items-center justify-center text-[11px] sm:text-xs font-semibold`}>{item.initials}</div>
                  <div className="space-y-1">
                    <p className="text-sm sm:text-base font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs sm:text-sm text-slate-500">{item.program}</p>
                    <div className="flex flex-wrap gap-3 text-[11px] sm:text-xs text-slate-500 mt-1">
                      <span>✅ {item.completedOn}</span>
                      <span>{item.progress}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2 sm:gap-3">
                  <span className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium ${item.statusColor}`}>{item.status}</span>

                  <div className="flex flex-wrap md:justify-end gap-2 sm:gap-3">
                    {item.status === "Pending Verification" && (
                      <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-full text-xs sm:text-sm hover:bg-emerald-600 transition-colors flex items-center gap-2">
                        <FiCheckCircle className="w-4 h-4" />
                        {item.buttonLabel}
                      </button>
                    )}
                    {item.status === "Approved" && (
                      <button className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white rounded-full flex items-center gap-2 ${item.buttonColor}`}>
                        <FiCheckCircle className="w-4 h-4" />
                        {item.buttonLabel}
                      </button>
                    )}
                    {item.status === "Issued" && (
                      <button className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full flex items-center gap-2 ${item.buttonColor}`}>
                        {item.showDownloadIcon && <FiDownload className="w-4 h-4" />}
                        {item.buttonLabel}
                      </button>
                    )}
                    <button className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-slate-300 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-400 transition-colors">
                      <FiEye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Template settings */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Certificate Template Settings</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">Configure certificate design and digital signatures</p>
            <h3 className="text-xs sm:text-sm font-semibold text-slate-800 mb-3 sm:mb-4">Template Features</h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-700">
              {templateFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 w-4 h-4" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="border border-slate-200 rounded-3xl bg-slate-50 p-8 sm:p-10 flex flex-col items-center justify-center">
              <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">Certificate Preview</p>
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl sm:text-3xl">
                  🎖️
                </div>
                <p className="text-sm sm:text-base font-medium text-slate-800 text-center">Certificate of Completion</p>
                <p className="text-xs sm:text-sm text-slate-500">Preview template</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2">
                Edit Template
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CertificateGeneration;

import React from "react";
import AdminSidebar from "./Nav/Dashboard";
import AdminNavbar from "./Nav/Navbar";
const AdminDashboard = () => {
  return (
    <main>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="space-y-8 p-5 mt-20 ml-70">
          {/* HERO */}
          <section>
            <div className="relative overflow-hidden rounded-3xl bg-blue-600 text-white p-6 sm:p-8">
              <div className="max-w-xl">
                <p className="text-2xl sm:text-3xl font-semibold mb-2">
                  Welcome back, Michael! 👋
                </p>
                <p className="text-sm sm:text-base text-blue-100">
                  Your platform is performing excellently today.
                </p>
              </div>

              {/* Right icon box (hidden on small screens) */}
              <div className="hidden md:flex absolute inset-y-0 right-0 items-center pr-10">
                <div className="h-24 w-24 lg:h-28 lg:w-28 rounded-3xl bg-blue-500/40 border border-blue-300/40 flex items-center justify-center">
                  <div className="h-14 w-14 lg:h-16 lg:w-16 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center">
                    <div className="flex items-end gap-1">
                      <span className="w-2 h-3 bg-white rounded-full opacity-70" />
                      <span className="w-2 h-5 bg-white rounded-full opacity-80" />
                      <span className="w-2 h-8 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TOP STATS */}
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {/* Card template */}
            {[
              { title: "Total Users", value: "15,420", bg: "bg-blue-50", emoji: "👤", delta: "+12%" },
              { title: "Total Courses", value: "1,247", bg: "bg-emerald-50", emoji: "📘", delta: "+8%" },
              { title: "Total Revenue", value: "$892,540", bg: "bg-yellow-50", emoji: "$", delta: "+15%" },
              { title: "Active Subscriptions", value: "8,934", bg: "bg-purple-50", emoji: "🛡️", delta: "+5%" },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-500 mb-2">{c.title}</p>
                <div className="flex items-end justify-between gap-3">
                  <p className="text-2xl sm:text-3xl font-semibold">{c.value}</p>
                  <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full ${c.bg} flex items-center justify-center`}>
                    <span className="text-lg sm:text-xl">{c.emoji}</span>
                  </div>
                </div>
                <p className="mt-4 text-[11px] sm:text-xs font-medium text-emerald-600">
                  {c.delta} from last month
                </p>
              </div>
            ))}
          </section>

          {/* RECENT USERS / COURSE APPROVALS */}
          <section className="grid gap-6 lg:grid-cols-2">
            {/* Recent Users */}
            <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6">
              <div className="mb-1">
                <p className="text-base sm:text-lg font-semibold">Recent Users</p>
                <p className="text-xs sm:text-sm text-slate-500">Latest user registrations</p>
              </div>

              <div className="mt-4 space-y-4">
                {[
                  { initials: "AJ", name: "Alice Johnson", email: "alice@example.com", role: "student", state: "active", colors: "bg-slate-200 text-slate-700" },
                  { initials: "BS", name: "Bob Smith", email: "bob@example.com", role: "instructor", state: "active", colors: "bg-slate-300 text-slate-800" },
                  { initials: "CD", name: "Carol Davis", email: "carol@example.com", role: "student", state: "pending", colors: "bg-slate-300 text-slate-800" },
                ].map((u) => (
                  <div key={u.email} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full ${u.colors} flex items-center justify-center text-xs sm:text-sm font-semibold`}>
                        {u.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-[11px] sm:text-xs text-slate-700">
                        {u.role}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[11px] sm:text-xs ${u.state === "active" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                        }`}>
                        {u.state}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Approvals */}
            <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6">
              <div className="mb-1 flex items-center justify-between">
                <div>
                  <p className="text-base sm:text-lg font-semibold">Course Approvals</p>
                  <p className="text-xs sm:text-sm text-slate-500">Courses awaiting review</p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {[
                  { title: "Advanced Machine Learning", by: "Dr. Jane Smith", date: "Submitted Dec 10, 2024", state: "pending" },
                  { title: "React Native Development", by: "Mike Johnson", date: "Submitted Dec 8, 2024", state: "approved" },
                ].map((c) => (
                  <div key={c.title} className="border border-slate-100 rounded-2xl px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">{c.title}</p>
                      <p className="text-xs text-slate-500">by {c.by}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{c.date}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {c.state === "pending" ? (
                        <>
                          <span className="px-3 py-1 rounded-full bg-slate-100 text-[11px] sm:text-xs text-slate-600">pending</span>
                          <button className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-600 text-sm sm:text-lg">✓</button>
                          <button className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-rose-300 flex items-center justify-center text-rose-500 text-sm sm:text-lg">✕</button>
                        </>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-blue-600 text-[11px] sm:text-xs text-white">approved</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

    </main>
  );
};

export default AdminDashboard;

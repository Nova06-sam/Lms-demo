import AdminSidebar from "../../Nav/Dashboard";
import AdminNavbar from "../../Nav/Navbar";
const Reports = () => {
  return (
    <main>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />

        <div className="bg-slate-50 p-6 ml-70 mt-10 text-slate-900">
          <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-10">
            <section className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-1">
                Reports Management
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Manage advanced reports and analytics for your learning platform
              </p>
            </section>

            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm px-5 py-10 sm:px-8 sm:py-12 lg:px-16 lg:py-16 flex items-center justify-center">
              <div className="text-center max-w-2xl mx-auto">
                <div className="text-4xl sm:text-5xl mb-5 sm:mb-6" aria-hidden="true">🚧</div>
                <h2 className="text-lg sm:text-2xl font-semibold text-slate-900 mb-3">
                  Reports Management Coming Soon
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-500">
                  Advanced reports management features will be available in the next update.
                  You&apos;ll be able to track learner performance, course engagement, and
                  certification trends in one place.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </main>
  );
};

export default Reports;

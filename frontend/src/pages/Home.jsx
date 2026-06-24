import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          AI Study Productivity Analyzer
        </h1>

        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200">
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24">
        <h1 className="text-5xl font-bold mb-6">
          Study Smarter, Not Harder
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Track study sessions, analyze productivity,
          and get AI-powered insights.
        </p>

        <Link to="/register">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">
              Study Tracking
            </h3>
            <p>
              Log daily study sessions and track learning habits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">
              Analytics Dashboard
            </h3>
            <p>
              View detailed productivity reports and trends.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">
              Productivity Score
            </h3>
            <p>
              Measure efficiency based on focus and consistency.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">
              AI Insights
            </h3>
            <p>
              Get smart recommendations to improve study habits.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">

        <h1 className="text-3xl font-extrabold text-blue-600 tracking-wide">
          StudyAI
        </h1>

        <div className="space-x-4">

          <Link to="/login">
            <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Register
            </button>
          </Link>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="relative">

        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
          alt="Study Analytics"
          className="w-full h-[500px] object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Study Smarter,
            <br />
            Not Harder
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mb-8">
            Track study sessions, analyze productivity,
            achieve academic goals and improve learning
            performance through intelligent analytics.
          </p>

          <div className="flex gap-4">

            <Link to="/register">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition">
                Get Started
              </button>
            </Link>

            <Link to="/login">
              <button className="bg-white text-black px-8 py-3 rounded-xl font-semibold">
                Login
              </button>
            </Link>

          </div>

        </div>

      </section>

      {/* About */}
      <section className="py-16 bg-white">

        <div className="max-w-5xl mx-auto text-center px-8">

          <h2 className="text-4xl font-bold mb-6">
            About StudyAI
          </h2>

          <p className="text-lg text-gray-600 leading-8">
            StudyAI is a full-stack productivity platform
            designed to help students manage study sessions,
            monitor focus levels, analyze learning trends,
            track goals and improve academic performance
            through data-driven insights.
          </p>

        </div>

      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-600 text-white">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">

          <div>
            <h2 className="text-5xl font-bold">24/7</h2>
            <p className="mt-2">Study Tracking</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">AI</h2>
            <p className="mt-2">Smart Insights</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">Cloud</h2>
            <p className="mt-2">MongoDB Storage</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">100%</h2>
            <p className="mt-2">Goal Monitoring</p>
          </div>

        </div>

      </section>

      {/* Features */}
      <section className="py-20 px-10">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose StudyAI?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold mb-3">
              Study Tracking
            </h3>
            <p>
              Record study sessions with subject,
              duration, focus level and notes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold mb-3">
              Analytics Dashboard
            </h3>
            <p>
              Visualize study performance through
              charts and productivity metrics.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-semibold mb-3">
              Goal Management
            </h3>
            <p>
              Set study goals and track completion
              progress in real time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-semibold mb-3">
              AI Insights
            </h3>
            <p>
              Receive intelligent recommendations
              based on your study habits.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-2xl font-semibold mb-3">
              Productivity Analysis
            </h3>
            <p>
              Measure focus, consistency and
              learning effectiveness.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-5xl mb-4">☁️</div>
            <h3 className="text-2xl font-semibold mb-3">
              Cloud Storage
            </h3>
            <p>
              Securely store study records using
              MongoDB cloud database.
            </p>
          </div>

        </div>

      </section>

      {/* How It Works */}
      <section className="bg-white py-20 px-10">

        <h2 className="text-4xl font-bold text-center mb-14">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">

          <div>
            <div className="text-6xl mb-4">1️⃣</div>
            <h3 className="font-bold text-xl mb-2">
              Register
            </h3>
            <p>Create your account.</p>
          </div>

          <div>
            <div className="text-6xl mb-4">2️⃣</div>
            <h3 className="font-bold text-xl mb-2">
              Track Sessions
            </h3>
            <p>Record study activities daily.</p>
          </div>

          <div>
            <div className="text-6xl mb-4">3️⃣</div>
            <h3 className="font-bold text-xl mb-2">
              Analyze
            </h3>
            <p>Monitor productivity reports.</p>
          </div>

          <div>
            <div className="text-6xl mb-4">4️⃣</div>
            <h3 className="font-bold text-xl mb-2">
              Improve
            </h3>
            <p>Use insights to study better.</p>
          </div>

        </div>

      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">

        <h2 className="text-4xl font-bold mb-4">
          Ready to Improve Your Productivity?
        </h2>

        <p className="text-lg mb-8">
          Join StudyAI and start tracking your learning journey today.
        </p>

        <div className="flex justify-center gap-4">

          <Link to="/register">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold">
              Register Now
            </button>
          </Link>

          <Link to="/login">
            <button className="border border-white px-8 py-3 rounded-xl font-bold">
              Login
            </button>
          </Link>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 text-center">

        <h2 className="text-3xl font-bold mb-4">
          StudyAI
        </h2>

        <p className="text-gray-300 mb-4">
          AI Powered Study Productivity Analyzer
        </p>

        <p className="text-gray-400">
          Built with React.js • Flask • MongoDB • Tailwind CSS • Recharts
        </p>

      </footer>

    </div>
  );
}
export default Home;


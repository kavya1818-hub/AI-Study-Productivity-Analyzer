import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/register", {
        name,
        email,
        password,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="hidden lg:block relative">

        <img
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
          alt="Study"
          className="w-full h-screen object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-16 text-white">

          <h1 className="text-6xl font-bold mb-4">
            StudyAI
          </h1>

          <p className="text-xl mb-10 max-w-lg">
            Create your account and start tracking
            your study productivity with AI-powered
            insights and analytics.
          </p>

          <div className="space-y-5 text-lg">

            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <span>Track Every Study Session</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <span>Monitor Learning Progress</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <span>Achieve Personal Goals</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <span>Receive Smart AI Insights</span>
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center bg-slate-100">

        <div className="bg-white w-[500px] p-12 rounded-3xl shadow-2xl">

          <div className="text-center mb-8">

            <div className="text-6xl mb-4">
              🚀
            </div>

            <h2 className="text-4xl font-bold text-blue-600">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Join StudyAI and start learning smarter
            </p>

          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-blue-500"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-blue-500"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-blue-500"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold transition duration-300"
            >
              Create Account
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { register, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error message
    setErrorMessage("");

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Check if terms are accepted
    if (!formData.termsAccepted) {
      setErrorMessage("Please accept the terms and conditions");
      return;
    }

    // Register user
    const result = await register(
      formData.fullName,
      formData.email,
      formData.password
    );

    if (result.success) {
      // Successfully registered, will redirect via the useEffect
    } else {
      setErrorMessage(result.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
      {/* Left side with signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 order-2 lg:order-1">
        <div className="w-full max-w-md">
          {/* Mobile logo - only visible on small screens */}
          <div className="flex flex-col items-center mb-10 lg:hidden">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#2ea043] to-[#34d399] flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1 text-center bg-gradient-to-r from-[#2ea043] to-[#34d399] bg-clip-text text-transparent">
              AI Travel Agent
            </h1>
          </div>

          {/* Signup form */}
          <div className="bg-[#111111]/70 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              Create Account
            </h2>

            {/* Error message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-5">
                <label
                  htmlFor="fullName"
                  className="block text-gray-400 mb-2 text-sm"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-white/5 text-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#2ea043]/50 transition-all duration-200"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-gray-400 mb-2 text-sm"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 text-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#2ea043]/50 transition-all duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block text-gray-400 mb-2 text-sm"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 text-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#2ea043]/50 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-5">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-400 mb-2 text-sm"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white/5 text-gray-300 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#2ea043]/50 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Terms */}
              <div className="flex items-start mb-6">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 rounded-sm border-2 border-gray-600 bg-transparent checked:bg-[#2ea043] checked:border-[#2ea043] focus:ring-[#2ea043] focus:ring-offset-gray-900"
                  required
                />
                <label
                  htmlFor="termsAccepted"
                  className="ml-2 text-gray-400 text-sm"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-[#34d399] hover:text-[#2ea043] transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-[#34d399] hover:text-[#2ea043] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#2ea043] to-[#34d399] text-white rounded-xl px-5 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <>
                    Create Account
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Login link */}
            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#34d399] hover:text-[#2ea043] transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with illustration */}
      <div className="hidden lg:flex lg:w-1/2 order-1 lg:order-2 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#0a0a0a] border-l border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2ea043]/5 via-transparent to-[#34d399]/5"></div>
        {/* Ambient glow effects */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#2ea043]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#34d399]/20 rounded-full blur-3xl"></div>

        {/* Centered app logo and branding */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative">
            {/* Logo with glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2ea043]/40 to-[#34d399]/40 rounded-xl blur-xl transform scale-150 animate-pulse"></div>
            <div className="relative w-24 h-24 rounded-xl bg-gradient-to-br from-[#2ea043] to-[#34d399] flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center bg-gradient-to-r from-[#2ea043] to-[#34d399] bg-clip-text text-transparent">
            AI Travel Agent
          </h1>
          <p className="text-gray-400 text-center max-w-md px-6">
            Create an account to access your personal travel assistant and plan
            your next adventure with AI-powered recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

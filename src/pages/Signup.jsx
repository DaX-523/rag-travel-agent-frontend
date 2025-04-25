import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation could be added here
    console.log(formData);
  };

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
      {/* Left side with signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 order-2 lg:order-1">
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
            <form onSubmit={handleSubmit}>
              {/* Full Name field */}
              <div className="mb-5">
                <label
                  htmlFor="fullName"
                  className="block text-gray-400 mb-2 text-sm"
                >
                  Full Name
                </label>
                <div className="relative">
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
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email field */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-gray-400 mb-2 text-sm"
                >
                  Email
                </label>
                <div className="relative">
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
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password field */}
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block text-gray-400 mb-2 text-sm"
                >
                  Password
                </label>
                <div className="relative">
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
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Confirm Password field */}
              <div className="mb-5">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-400 mb-2 text-sm"
                >
                  Confirm Password
                </label>
                <div className="relative">
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
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 rounded-sm border-2 border-gray-600 bg-transparent checked:bg-[#2ea043] checked:border-[#2ea043] focus:ring-[#2ea043] focus:ring-offset-gray-900"
                    required
                  />
                </div>
                <label
                  htmlFor="termsAccepted"
                  className="ml-2 text-sm text-gray-400"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-[#34d399] hover:text-[#2ea043] transition-colors"
                  >
                    Terms and Conditions
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
                className="w-full bg-gradient-to-r from-[#2ea043] to-[#34d399] text-white rounded-xl px-5 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
              >
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
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <div className="px-4 text-sm text-gray-500">OR</div>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Social signup options */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl px-4 py-3 text-sm font-medium transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl px-4 py-3 text-sm font-medium transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                  />
                </svg>
                Facebook
              </button>
            </div>

            {/* Sign in option */}
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#34d399] hover:text-[#2ea043] transition-colors font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with 3D effect */}
      <div className="-mt-24 hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#0a0a0a] border-l border-white/5 relative overflow-hidden order-1 lg:order-2">
        <div className=" absolute inset-0 bg-gradient-to-br from-[#2ea043]/5 via-transparent to-[#34d399]/5"></div>
        {/* Ambient glow effects */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#2ea043]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#34d399]/20 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2ea043] to-[#34d399] flex items-center justify-center mb-8 shadow-lg shadow-[#2ea043]/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 text-center bg-gradient-to-r from-[#2ea043] to-[#34d399] bg-clip-text text-transparent">
            Join Our Community
          </h1>
          <p className="text-gray-400 text-center max-w-md mb-8">
            Create your account today and unlock the full potential of our
            AI-powered travel assistant.
          </p>

          {/* Features list */}
          <div className="w-full max-w-md space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2ea043]/20 to-[#34d399]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#34d399]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">
                  Personalized Recommendations
                </h3>
                <p className="text-gray-400 text-sm">
                  Get customized travel suggestions based on your preferences
                  and travel history.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2ea043]/20 to-[#34d399]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#34d399]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">
                  Save Your Conversations
                </h3>
                <p className="text-gray-400 text-sm">
                  Access your travel plans and past conversations anytime,
                  anywhere.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2ea043]/20 to-[#34d399]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#34d399]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">
                  Seamless Syncing
                </h3>
                <p className="text-gray-400 text-sm">
                  Your preferences and history sync across all your devices
                  automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
      {/* Left side with 3D effect */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#0a0a0a] border-r border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2ea043]/5 via-transparent to-[#34d399]/5"></div>
        {/* Ambient glow effects */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#2ea043]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#34d399]/20 rounded-full blur-3xl"></div>

        {/* Centered app logo and branding */}
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
            AI Travel Agent
          </h1>
          <p className="text-gray-400 text-center max-w-md">
            Your intelligent companion for planning perfect trips, finding
            hidden gems, and creating unforgettable travel experiences.
          </p>

          {/* Decorative elements */}
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2ea043]/20 to-[#34d399]/20 rounded-xl blur-lg"></div>
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-md">
              <p className="text-gray-300 italic">
                "The AI Travel Agent helped me plan my dream vacation in
                minutes. I couldn't be happier with the recommendations!"
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2ea043] to-[#34d399]"></div>
                <div className="ml-3">
                  <p className="text-white font-medium">Sarah Johnson</p>
                  <p className="text-gray-400 text-sm">Travel Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
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

          {/* Login form */}
          <div className="bg-[#111111]/70 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-gray-400 text-sm">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-[#34d399] hover:text-[#2ea043] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Remember me */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-2 border-gray-600 bg-transparent checked:bg-[#2ea043] checked:border-[#2ea043] focus:ring-[#2ea043] focus:ring-offset-gray-900"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-gray-400 text-sm"
                >
                  Remember me
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2ea043] to-[#34d399] text-white rounded-xl px-5 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
              >
                Login
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

            {/* Social login options */}
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

            {/* Sign up option */}
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#34d399] hover:text-[#2ea043] transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React from 'react';
import Link from 'next/link';


export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display">

      {/* Desktop Left Side - Hero/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0f1323] flex-col justify-end pb-24 px-16 overflow-hidden">

        {/* Background Pattern/Image */}
        <div className="absolute inset-0" style={{ backgroundImage: "url('/images/sri_sri_ravi_shankar_official_picture.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        {/* Dark Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        <div className="relative z-10 text-white max-w-lg">
           <h1 className="text-5xl font-bold mb-6 leading-tight">Vedic Dharma Sansthan ERP</h1>
           <p className="text-lg text-slate-300 leading-relaxed italic">
             "Seva (service) isn't just physical action but a way to dissolve the ego and connect with the Divine"
           </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-16 relative">
        <div className="w-full max-w-md space-y-8">

            <div className="text-center lg:text-left space-y-2">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
                <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in.</p>
            </div>

            <form className="space-y-6 mt-8">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <div className="relative">
                        <input
                          type="email"
                          autoComplete="email"
                          className="w-full px-4 py-3 pl-11 rounded-xl bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none font-medium"
                          placeholder="Enter your email"
                        />
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                        <a href="#" className="text-xs font-bold text-primary hover:text-primary/80">Forgot password?</a>
                    </div>
                    <div className="relative">
                        <input
                          type="password"
                          autoComplete="current-password"
                          className="w-full px-4 py-3 pl-11 rounded-xl bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none font-medium"
                          placeholder="••••••••"
                        />
                         <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                    </div>
                </div>

                <div className="pt-2">
                    <Link href="/accountant/dashboard" className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.98] transition-all">
                        Sign In
                    </Link>
                </div>
            </form>

            <div className="relative mt-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background-light dark:bg-background-dark px-2 text-slate-400 font-semibold tracking-wider">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-card-dark">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Google</span>
                </button>
                 <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-card-dark">
                    <img src="https://www.svgrepo.com/show/448234/microsoft.svg" className="w-5 h-5" alt="Microsoft" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Microsoft</span>
                </button>
            </div>

             <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
                Don't have an account? <a href="#" className="font-bold text-primary hover:text-primary/80">Contact Admin</a>
            </p>
        </div>
      </div>
    </div>
  );
}

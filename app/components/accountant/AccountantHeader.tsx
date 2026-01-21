'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AccountantHeader() {
    const pathname = usePathname();

    const getPageTitle = (path: string) => {
        if (path.includes('/dashboard')) return 'Dashboard';
        if (path.includes('/expenses')) return 'Expense Booking';
        return 'Accountant Portal';
    };

    return (
        <header className="sticky top-0 z-30 flex items-center bg-white/80 dark:bg-background-dark/90 backdrop-blur-md p-4 md:px-8 border-b border-[#dfe2e1] dark:border-white/10 justify-between h-16">
          <div className="flex items-center gap-3">
             {/* Mobile Only Back Button/Logo */}
             <div className="md:hidden flex items-center gap-2">
                {pathname !== '/accountant/dashboard' ? (
                     <Link href="/accountant/dashboard" className="flex items-center justify-center p-1 -ml-2 rounded-full text-slate-500 hover:text-black dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
                     </Link>
                ) : (
                    <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                         <Image
                           src="/images/gemini_logo_transparent.png"
                           alt="VDS ERP Logo"
                           width={24}
                           height={24}
                           className="object-contain"
                         />
                    </div>
                )}

                {pathname !== '/accountant/dashboard' && (
                     <div className="bg-primary/10 rounded-full p-1 border border-primary/20">
                         <Image
                           src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNI47XRhT5A-zXWPUa6t3PvxqCPFbmVV4aESMvjpOPLq5iO1NkF9zboeSBXtkEAJrHJhJVJ_9iiyOm1khOg65wRiR63i_-UlZutgXI96DcTN2YzPh65MB_vyK2a_Kl1HEQjKfxpEu08a1X63Wz2Vi6xHDlIJIhwSguF0NzrtyTBkFOiSGLbvCHPpU4pc6UIQfKwkp6awpWdseZbPioduEzoEtoLcemqGwNhJ7EMIMgJ-FdQcpnE49ONXOcYKWeq-pngHd1JX_qEOk9"
                           alt="User Avatar"
                           width={32}
                           height={32}
                           className="rounded-full"
                         />
                     </div>
                )}
             </div>

            <div>
              <h1 className="text-[#141515] dark:text-white text-lg md:text-xl font-bold leading-tight tracking-tight">{getPageTitle(pathname)}</h1>
              <p className="text-[10px] md:text-xs text-primary font-bold uppercase tracking-widest hidden md:block">Accountant Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-4">
            <div className="flex items-center gap-2">
                <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-primary">notifications</span>
                </button>
                <div className="hidden md:flex size-10 bg-purple-100 rounded-full items-center justify-center text-purple-700 font-bold">
                    A
                </div>
            </div>
          </div>
        </header>
    );
}

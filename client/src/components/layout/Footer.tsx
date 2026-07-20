export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/10 dark:border-slate-800/10 pt-12 pb-8 px-4 w-full">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 text-left">

        {/* Left Section */}
        <div className="space-y-4 max-w-lg">
          <div>
            <div className="flex items-center select-none">
              <img
                src="/logo/Xmedia_logo.png"
                alt="X-Media Logo"
                className="hidden dark:block h-14 w-auto object-contain"
              />
              <img
                src="/logo/logo_light.png"
                alt="X-Media Logo"
                className="block dark:hidden h-14 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2 font-medium">
              Open source Twitter/X video downloader. No popups, no fake buttons, no tracking. One paste, every quality.
            </p>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            built by{' '}
            <a
              href="https://codewithdhruba.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1da1f2] hover:underline font-semibold transition-colors"
            >
              @codewithdhruba
            </a>{' '}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start md:items-end gap-6 text-xs font-semibold">
          <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400">
            <a
              href="https://x.com/codewithdhruba"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>@codewithdhruba</span>
            </a>
            <a
              href="https://github.com/codewithdhruba01/X-Downloader"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/codewithdhruba01/X-Downloader#local-installation--setup"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Self-host
            </a>
          </div>

          <p className="text-slate-400 dark:text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} X-Media
          </p>
        </div>

      </div>
    </footer>
  );
}

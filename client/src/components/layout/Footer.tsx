export default function Footer() {
  return (
    <footer className="mt-16 text-center text-xs text-slate-400 dark:text-slate-500 pt-8 border-t border-slate-200/10 dark:border-slate-800/10 px-4">
      <p>&copy; {new Date().getFullYear()} X-Media Extractor. All rights reserved.</p>
      <p className="mt-1 font-medium">Created with React, Express, TypeScript, and Tailwind CSS.</p>
    </footer>
  );
}

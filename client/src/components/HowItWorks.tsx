import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Copy the post link',
      description: 'On the post with the video, tap Share, then Copy link. Works with x.com, twitter.com, and mirror links from Discord.',
    },
    {
      number: 2,
      title: 'Paste it above',
      description: 'The preview appears in about a second, with every available quality and its file size listed.',
    },
    {
      number: 3,
      title: 'Pick a size',
      description: "The video saves straight from Twitter's CDN to your device with a clean filename. No watermark, ever.",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 text-left">
      <div className="mb-8">
        <span className="text-[#1da1f2] font-semibold text-xs tracking-wider uppercase">
          how it works
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mt-2">
          Three steps, no accounts
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: step.number * 0.1 }}
            className="glass-panel rounded-3xl p-8 border border-slate-200/20 dark:border-slate-800/40 bg-white/5 dark:bg-[#0f0f12]/60 hover:border-slate-350/30 dark:hover:border-slate-800/80 transition-all duration-300 flex flex-col"
          >
            {/* Circular Step Number */}
            <div className="w-8 h-8 rounded-full bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center text-[#1da1f2] font-bold text-sm mb-6">
              {step.number}
            </div>

            {/* Title */}
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-3">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

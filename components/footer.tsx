export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 bg-[#0a0a0f] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black border-2 border-white flex items-center justify-center text-white font-bold">
              AI
            </div>
            <span className="text-lg font-bold text-white">
              AI Visualization Designer
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#about" className="hover:text-primary transition-colors">
              关于
            </a>
            <a href="#projects" className="hover:text-primary transition-colors">
              项目
            </a>
            <a href="#skills" className="hover:text-primary transition-colors">
              技能
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              联系
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {currentYear} All rights reserved.
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600">
            Built with Next.js · Tailwind CSS · Three.js · GSAP
          </p>
        </div>
      </div>
    </footer>
  )
}

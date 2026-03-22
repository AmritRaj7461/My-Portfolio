import socialLinks from "../data/socials"

const SocialLinks = () => {
  return (
    <div className="fixed left-6 bottom-1/2 translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {socialLinks.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          className="w-10 h-10 flex items-center justify-center rounded-full
                     bg-slate-800 text-white hover:bg-cyan-400 hover:text-slate-900
                     transition-all duration-300"
        >
          <span className="text-lg">{item.icon}</span>
        </a>
      ))}
    </div>
  )
}

export default SocialLinks

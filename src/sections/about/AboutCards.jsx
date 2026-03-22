import AboutCard from "./AboutCard"
import aboutData from "./data"

const AboutCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 perspective-1000">
      {aboutData.map((item) => (
        <AboutCard key={item.id} {...item} />
      ))}
    </div>
  )
}

export default AboutCards
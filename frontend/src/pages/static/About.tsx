import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AboutHero from '../../components/about/AboutHero';
import MissionValues from '../../components/about/MissionValues';
import Team from '../../components/about/Team';
import Testimonials from '../../components/about/Testimonials';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <AboutHero />
      <MissionValues />
      <Team />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default About;
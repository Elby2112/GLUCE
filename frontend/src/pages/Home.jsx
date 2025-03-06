import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Description from "../components/Description";
import FinalFile from "../components/newFile";
import About from "../components/about";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <HeroSection>
        <Navbar />
      </HeroSection>
      <Description />
      <About />
      <FinalFile />
      <Footer />
    </div>
  );
};

export default Home;

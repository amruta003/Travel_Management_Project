
import "./LandingPage.css";
import Navbar from "../../../components/Navbar/Navbar";
import Destination from "../../../components/Destinations/Destination";
import Itinerary from "../../../components/Itineraries/Itinerary";
import Footer from "../../../components/Footer/Footer";
import PakageSection from "../Packages/PackageSection";
import ServicesSection from "../../../components/ServicesSection/ServicesSection"
// import Login from "../../auth/Login/Login";

function LandingPage() {

  return (
    <>
      <Navbar />

      <Destination />

      <PakageSection />

      <Itinerary />

      <ServicesSection />

      <Footer />
    </>
  );
}

export default LandingPage;

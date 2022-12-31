import Header from "../../components/header/Header";
import HeroSection from "../../components/landing/HeroSection";
import FeatureSections from "../../components/landing/FeatureSections";
import TeamSection from "../../components/landing/TeamSection";
import Footer from "../../components/footer/Footer";

const LandingPage = () => {
    return (
        <span>
            {/* Header */}
            <Header></Header>

            <HeroSection></HeroSection>

            {/* Feature Sections */}
            <FeatureSections></FeatureSections>

            {/* Team Section */}
            <TeamSection></TeamSection>

            {/* Footer */}
            <Footer></Footer>
        </span>
    )
}

export default LandingPage;
import LegalPage from "../components/legalpage";
import { TERMS } from "../content/legal";
import termsHero from "../assets/images/hero1.png";

export default function Terms() {
    return (
        <LegalPage
            doc={TERMS}
            related={{ title: "Privacy Policy", path: "/privacy-policy" }}
            heroImage={termsHero}
            heroPosition="center 40%"
        />
    );
}

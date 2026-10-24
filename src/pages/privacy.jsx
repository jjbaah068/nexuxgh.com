import LegalPage from "../components/legalpage";
import { PRIVACY_POLICY } from "../content/legal";
import privacyHero from "../assets/images/privacy.jpg";

export default function Privacy() {
    return (
        <LegalPage
            doc={PRIVACY_POLICY}
            related={{ title: "Terms & Conditions", path: "/terms" }}
            heroImage={privacyHero}
            heroPosition="center 35%"
        />
    );
}

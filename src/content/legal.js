// Content for the legal pages. Each section has an id (used for the
// table of contents), a title and a list of blocks:
//   "string"                      → paragraph
//   { label: "...", text: "..." } → paragraph with a bold lead-in

export const PRIVACY_POLICY = {
    slug: "privacy-policy",
    eyebrow: "Public Privacy Notice",
    title: "Privacy Policy",
    effectiveDate: "October 2026",
    seoTitle: "Privacy Policy | Nexux Marketing Technology Agency",
    metaDescription:
        "How Nexux Marketing Technology Agency collects, uses, shares and protects personal information under Ghana's Data Protection Act, 2012 (Act 843).",
    intro:
        "We respect the privacy of people who visit our website and interact with our business. This policy describes our intended data-handling practices. Statements about tools and safeguards must be verified against Nexux’s actual operations before publication.",
    sections: [
        {
            id: "about",
            title: "About this Privacy Policy",
            blocks: [
                "This policy explains how Nexux Marketing Technology Agency (“Nexux”, “we”, “us” or “our”) collects, uses, discloses, stores and protects personal information when you visit nexuxgh.com, contact us or interact with our business.",
                "Responsible organisation: [confirm registered legal name and business address]. Privacy contact: info@nexuxgh.com. This policy is intended to reflect applicable Ghanaian data-protection requirements, including the Data Protection Act, 2012 (Act 843).",
            ],
        },
        {
            id: "information-we-collect",
            title: "Information we may collect",
            blocks: [
                { label: "Information you provide", text: "Name, email address, telephone number, organisation, role, project brief, enquiry details and other information you choose to share." },
                { label: "Business interactions", text: "Correspondence, proposals, meeting notes, contracts, billing contacts and transaction records where applicable." },
                { label: "Website and technical information", text: "IP address, device/browser information, pages visited, referring pages and cookie identifiers, but only to the extent collected by tools actually enabled on our website." },
                { label: "Social interactions", text: "Public profile information and messages when you engage with Nexux on social media. Please do not send sensitive personal information unless necessary and agreed." },
            ],
        },
        {
            id: "how-we-use",
            title: "How and why we use information",
            blocks: [
                "We use relevant information to respond to enquiries; assess prospective projects; prepare proposals; deliver and administer agreed services; communicate with clients, suppliers and partners; maintain business records; protect our systems; comply with legal obligations; and improve the website.",
                "Where we send promotional messages, we will use an appropriate lawful basis and provide a way to opt out. We will not assume that submitting an enquiry constitutes consent to unrelated marketing.",
            ],
        },
        {
            id: "lawful-processing",
            title: "Lawful and fair processing",
            blocks: [
                "We process personal information for specified, legitimate purposes and on a lawful basis appropriate to the circumstances, including consent where required, steps requested before a contract, performance of a contract, legal obligations and other grounds permitted by applicable law. We seek to collect only information reasonably needed for those purposes.",
            ],
        },
        {
            id: "cookies",
            title: "Cookies, analytics and embedded tools",
            blocks: [
                "The website may use essential cookies and, if configured, analytics, embedded media or marketing technologies. The exact tools, purposes, providers, cookie durations and available choices must be confirmed by our technical team and disclosed in the live website notice.",
                "Non-essential cookies or similar tracking will be subject to the notices and choices required by applicable law. Browser settings may also allow you to restrict certain cookies, although doing so may affect website functionality.",
            ],
        },
        {
            id: "sharing",
            title: "When we share information",
            blocks: [
                "We may share necessary information with authorised staff, contractors, hosting providers, email and productivity providers, analytics or marketing platforms, payment or accounting providers (if used), and professional advisers who support our operations. We may also disclose information when legally required or reasonably necessary to protect rights and security.",
                "We do not sell personal information as a business model. Any service provider handling personal information for us should be subject to appropriate confidentiality and data-protection obligations.",
            ],
        },
        {
            id: "client-data",
            title: "Client data handled on behalf of clients",
            blocks: [
                "For certain agency or technology projects, Nexux may process personal information on behalf of a client, such as information in a client website, campaign or CRM system. In those circumstances, the client may determine the purposes of processing and Nexux may act as a processor under written instructions. The parties should agree separate data-processing terms addressing roles, security, subprocessors, retention and return or deletion of data.",
            ],
        },
        {
            id: "international-transfers",
            title: "International service providers and transfers",
            blocks: [
                "Some service providers may host or access information outside Ghana. Where international transfers occur, we will assess the applicable legal requirements and use appropriate contractual, technical or organisational safeguards. The countries and providers involved should be confirmed before publication.",
            ],
        },
        {
            id: "retention",
            title: "How long we keep information",
            blocks: [
                "We keep personal information only for as long as reasonably necessary for the relevant purpose, including handling enquiries, delivering services, meeting accounting and legal obligations, resolving disputes and maintaining appropriate business records. Retention periods vary by record type and will be set out in Nexux’s internal retention schedule. When no longer needed, information will be securely deleted or anonymised where appropriate.",
            ],
        },
        {
            id: "security",
            title: "Information security",
            blocks: [
                "We use reasonable technical and organisational measures designed to protect personal information against unauthorised access, loss, alteration and disclosure. Measures should reflect the actual tools and controls Nexux operates. No online transmission or storage method can be guaranteed completely secure.",
            ],
        },
        {
            id: "your-rights",
            title: "Your rights and choices",
            blocks: [
                "Subject to applicable law, you may request information about the personal data we hold, seek access or correction of inaccurate information, raise an objection or complaint, and exercise other rights available under Ghanaian law. Where processing relies on consent, you may withdraw that consent where legally applicable.",
                "To make a request, email info@nexuxgh.com. We may need to verify your identity and may retain information where the law requires or permits it. You may also contact Ghana’s Data Protection Commission about concerns regarding personal-data processing.",
            ],
        },
        {
            id: "children",
            title: "Children",
            blocks: [
                "Our website and business services are intended primarily for organisations and adult business contacts. We do not knowingly seek personal information from children through the website. If we learn that information about a child has been collected inappropriately, we will take appropriate steps under applicable law.",
            ],
        },
        {
            id: "external-sites",
            title: "External websites and social platforms",
            blocks: [
                "Links to third-party sites and interactions on independent social platforms are governed by those organisations’ own privacy practices. Please review their policies when using their services.",
            ],
        },
        {
            id: "changes",
            title: "Changes to this policy",
            blocks: [
                "We may update this policy to reflect changes in our practices, technologies or legal obligations. The updated policy will be posted on our website with a revised effective date.",
            ],
        },
        {
            id: "contact",
            title: "Contact",
            blocks: ["For privacy questions or requests, contact info@nexuxgh.com."],
        },
    ],
};

export const TERMS = {
    slug: "terms",
    eyebrow: "Website Terms",
    title: "Terms & Conditions",
    effectiveDate: "October 2026",
    seoTitle: "Terms & Conditions | Nexux Marketing Technology Agency",
    metaDescription:
        "The terms that apply to visitors of the Nexux website, and how separate client engagements with Nexux are contracted.",
    intro:
        "Please read these Terms & Conditions before using the Nexux website. They explain the rules that apply to website visitors and clarify how separate client engagements are contracted.",
    sections: [
        {
            id: "who-we-are",
            title: "Who we are",
            blocks: [
                "Nexux Marketing Technology Agency (“Nexux”, “we”, “us” or “our”) operates the website at https://nexuxgh.com.",
            ],
        },
        {
            id: "acceptance",
            title: "Acceptance and scope",
            blocks: [
                "These Terms & Conditions govern access to and use of our public website and its content. By using the website, you agree to comply with these terms to the extent permitted by applicable law. If you do not agree, please discontinue use.",
                "These website terms do not, on their own, create a contract for marketing, design, software development or other paid agency services. Client engagements are governed by separately approved quotations, statements of work and/or service agreements. Where a signed client agreement conflicts with these website terms on project matters, the client agreement governs those matters.",
            ],
        },
        {
            id: "permitted-use",
            title: "Permitted website use",
            blocks: [
                "You may browse and use the website for lawful informational and business-enquiry purposes. You must not attempt unauthorised access, disrupt the website, introduce malicious code, scrape it in a way that harms our services, misrepresent your identity or infringe the rights of Nexux or others.",
            ],
        },
        {
            id: "website-content",
            title: "Website content and service information",
            blocks: [
                "We aim to keep the website accurate and useful, but descriptions, portfolio examples, capabilities and indicative prices may change. Unless expressly stated in a signed agreement, website content is general information and does not constitute a binding offer, guarantee of results or professional advice.",
            ],
        },
        {
            id: "enquiries",
            title: "Enquiries and communications",
            blocks: [
                "When contacting us, provide information that is accurate and that you have the right to share. Sending an enquiry does not require Nexux to accept a project. Please avoid sending passwords, payment-card details or highly sensitive personal information through ordinary enquiry forms.",
            ],
        },
        {
            id: "client-projects",
            title: "Client projects and commercial arrangements",
            blocks: [
                "Project deliverables, timelines, revision allowances, fees, deposits, payment milestones, expenses, approvals, cancellation arrangements, support and acceptance procedures will be agreed separately in writing. Changes outside an agreed scope may require a revised quotation or timeline. No specific internal price list is incorporated into these public website terms.",
            ],
        },
        {
            id: "intellectual-property",
            title: "Intellectual property",
            blocks: [
                "Unless otherwise indicated, the Nexux name, logo, website design, text, graphics and original website content are owned by Nexux or licensed to us. You may view them for normal website use, but must not reproduce, republish, sell or commercially exploit them without permission, except where permitted by law.",
                "Ownership and licence rights for work produced for clients—including designs, code, third-party assets, editable files and pre-existing tools—must be expressly addressed in the relevant client agreement.",
            ],
        },
        {
            id: "third-parties",
            title: "External links and third-party services",
            blocks: [
                "Our website may link to third-party sites or integrate external services. We do not control their content, availability, terms or privacy practices. Third-party hosting, advertising platforms, plugins and software used in client projects may also be subject to separate provider terms and fees, as set out in project agreements.",
            ],
        },
        {
            id: "privacy",
            title: "Privacy and cookies",
            blocks: [
                "How we handle personal information is explained in our separate Privacy Policy. Cookie or tracking notices will reflect the technologies actually deployed on the website.",
            ],
        },
        {
            id: "availability",
            title: "Website availability and security",
            blocks: [
                "We take reasonable steps to maintain the website, but cannot guarantee uninterrupted access, complete accuracy or freedom from all technical errors and security risks. We may temporarily suspend or restrict access for maintenance, security or misuse.",
            ],
        },
        {
            id: "liability",
            title: "Liability",
            blocks: [
                "To the extent permitted by Ghanaian law, Nexux will not be liable for indirect or consequential losses arising solely from reliance on general website information or inability to access the public website. Nothing in these terms excludes rights or liabilities that cannot lawfully be excluded, including liability for fraud or other non-excludable obligations. Liability relating to paid services is addressed in the relevant client agreement.",
            ],
        },
        {
            id: "changes",
            title: "Changes to the website and terms",
            blocks: [
                "We may update the website and these terms from time to time. The current version will be posted here with an updated effective date. Material changes may be highlighted where appropriate.",
            ],
        },
        {
            id: "governing-law",
            title: "Governing law and dispute resolution",
            blocks: [
                "These terms are governed by the laws of the Republic of Ghana, subject to applicable mandatory protections. Please contact us first to discuss any concern. If a dispute cannot be resolved amicably, it may be referred to the competent courts of Ghana, subject to applicable law.",
            ],
        },
        {
            id: "contact",
            title: "Contact",
            blocks: ["For questions about these terms, email info@nexuxgh.com."],
        },
    ],
};

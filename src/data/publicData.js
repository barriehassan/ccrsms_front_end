import { FaTrashAlt, FaCity, FaFileInvoiceDollar, FaBuilding } from "react-icons/fa";

export const servicesData = [
    {
        id: "business-license",
        title: "Online Payment for Business License",
        icon: FaFileInvoiceDollar,
        shortDesc: "Renew or apply for your business operation license securely online.",
        fullDesc: "Ensure your business remains compliant with local regulations by applying for or renewing your business license through our secure online portal. We provide a streamlined process that saves you time and allows you to focus on running your business. You can track the status of your application, receive digital certificates, and access payment history.",
        features: ["Quick Application", "Secure Payment Gateway", "Instant Receipt Generation", "Digital Certificate Download"],
        price: "Varies by Business Type",
        steps: [
            { num: 1, title: "Create or Login Account", desc: "Log in to your citizen portal. If you don't have one, register securely." },
            { num: 2, title: "Fill Application Form", desc: "Enter your business details, address, and type of operation correcty." },
            { num: 3, title: "Upload Documents", desc: "Attach necessary documents (Registration Cert, Tax ID, etc)." },
            { num: 4, title: "Make Payment", desc: "Pay the required fee using our Stripe-secured gateway." },
            { num: 5, title: "Receive License", desc: "Upon approval, download your digital license instantly." }
        ]
    },
    {
        id: "waste-collection",
        title: "Waste Collection Services",
        icon: FaTrashAlt,
        shortDesc: "Schedule pickups and manage waste disposal payments.",
        fullDesc: "Keep our city clean with our reliable waste collection services. Schedule regular pickups, report missed collections, or request special disposal for large items. Our eco-friendly approach ensures proper recycling and waste management practices are followed.",
        features: ["Residential & Commercial Pickup", "Recycling Support", "Bulky Item Removal", "Schedule Management"],
        price: "Monthly Subscription",
        steps: [
            { num: 1, title: "Select Service Type", desc: "Choose between residential or commercial needs." },
            { num: 2, title: "Set Address & Schedule", desc: "Pin your location and choose preferred pickup days." },
            { num: 3, title: "Review Pricing", desc: "See the monthly subscription cost based on volume." },
            { num: 4, title: "Subscribe & Pay", desc: "Securely pay your first month's fee to activate service." },
            { num: 5, title: "Bin Delivery", desc: "We will deliver your branded waste bins within 24 hours." }
        ]
    },
    {
        id: "city-rate",
        title: "City Rate Payment",
        icon: FaCity,
        shortDesc: "Pay your annual city maintenance rates conveniently.",
        fullDesc: "Contribution to the city's maintenance is now easier than ever. Pay your city rates online to support infrastructure development, street lighting, and public space maintenance. View your assessment, check due dates, and manage your account history.",
        features: ["Annual Assessment View", "Installment Options", "Historical Records", "Automated Reminders"],
        price: "Based on Property Value",
        steps: [
            { num: 1, title: "Property Search", desc: "Enter your Property ID or Address to find your assessment." },
            { num: 2, title: "Verify Assessment", desc: "Check the current year's rate and any arrears." },
            { num: 3, title: "Select Payment Amount", desc: "Pay in full or choose an installment plan." },
            { num: 4, title: "Secure Payment", desc: "Complete transaction via Card or Mobile Money." },
            { num: 5, title: "Get Receipt", desc: "Receive an official digital receipt for tax purposes." }
        ]
    },
    {
        id: "local-tax",
        title: "Local Tax Payment",
        icon: FaBuilding,
        shortDesc: "Fulfill your local tax obligations with ease.",
        fullDesc: "Fulfil your civic duty by paying local taxes through our integrated platform. This revenue supports schools, emergency services, and community projects. Our system ensures transparency and provides detailed breakdowns of how your contributions help the community.",
        features: ["Tax Calculator", "Secure Transactions", "Instant Proof of Payment", "Support for Multiple Payment Methods"],
        price: "Calculated Rate",
        steps: [
            { num: 1, title: "Enter Taxpayer ID", desc: "Identify yourself with your TIN (Tax Identification Number)." },
            { num: 2, title: "Declare Income/Revenue", desc: "If applicable, submit self-assessment declarations." },
            { num: 3, title: "Calculate Tax", desc: "The system automatically computes your liability." },
            { num: 4, title: "Payment", desc: "Pay securely and instantly online." },
            { num: 5, title: "Certification", desc: "Download your Tax Clearance Certificate." }
        ]
    }
];

export const developersData = [
    {
        id: 1,
        name: "Shadrach Hingston",
        role: "Frontend Engineer",
        image: "images/shadrach.jpeg",
        bio: "Expert in React and Tailwind CSS, focusing on creating beautiful and intuitive interfaces."
    },
    {
        id: 2,
        name: "Hassan Barrie",
        role: "Backend Engineer",
        image: "/images/hassan.jpeg",
        bio: "Specializes in database architecture, API security, and server performance."
    },
    {
        id: 3,
        name: "Susan Kamara",
        role: "Design Specialist (UI/UX)",
        image: "/images/susan.jpeg",
        bio: "Passionate about designing scalable web applications and optimizing user experiences."
    },
    {
        id: 4,
        name: "Alvin Macarthy",
        role: "QA Engineer",
        image: "/images/alvin.jpeg",
        bio: "Ensures the highest quality of software through rigorous testing and automation."
    },
    {
        id: 5,
        name: "Mohamed Fofanah",
        role: "DevOps Engineer",
        image: "/images/mohamed.jpeg",
        bio: "Manages deployment pipelines, cloud infrastructure, and system reliability."
    },
    {
        id: 6,
        name: "Mohamed Lamin Kamara",
        role: "Product Manager",
        image: "",
        bio: "Oversees product strategy, ensuring features align with user needs and council goals."
    }
];

export const faqs = [
    {
        question: "How do I register for an account?",
        answer: "Click on the 'Register' button on the top right, fill in your personal details including your NIN and phone number, and submit the form."
    },
    {
        question: "Can I report issues anonymously?",
        answer: "Yes, you can choose to submit complaints without revealing your identity, though providing contact info helps us update you on progress."
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit cards, mobile money (Orange Money, Africell Money), and direct bank transfers."
    },
    {
        question: "How long does it take to process a business license?",
        answer: "Online applications are typically processed within 3-5 business days."
    }
];

export const wardsData = [
    { id: "WR-399", area: "Allen Town 2", pop: "26,657", desc: "This Ward consists of the entire Allen Town 2 Area." },
    { id: "WR-400", area: "Allen Town 1, Mayenkineh", pop: "17,767", desc: "This Ward consists of the following Areas; Allen Town 1 and some parts of Mayenkineh Area (EA 16, 18 & 44)." },
    { id: "WR-401", area: "Mayenkineh", pop: "22,066", desc: "This Ward consists of some parts of Mayenkineh Areas (EA 1-15, 17, 19-43)." },
    { id: "WR-402", area: "Pamuronko", pop: "20,759", desc: "The Wards consists of some parts of Pamuronko Area (EA 1-24)." },
    { id: "WR-403", area: "Old Wharf, Bottom Oku, Tasso Island", pop: "22,048", desc: "This Ward consists of the following Areas: Old Wharf, Bottom Oku and Tasso Island." },
    { id: "WR-404", area: "Robis", pop: "20,896", desc: "This Ward consists of the entire Robis Area." },
    { id: "WR-405", area: "Industrial Estate", pop: "24,664", desc: "This consists of the entire Industrial Estate Area." },
    { id: "WR-406", area: "Congo Water 2", pop: "24,147", desc: "This Ward consists of the entire Congo Water 2 Area." },
    { id: "WR-407", area: "Congo Water 1", pop: "19,824", desc: "This Ward consists of the entire Congo water 1 Area." },
    { id: "WR-408", area: "Rokupa", pop: "17,376", desc: "This Ward consists of parts of Rokupa Area (EA 1-24 & 28-32)." },
    { id: "WR-409", area: "Portee, Rokupa", pop: "17,126", desc: "This Ward consists of the entire Portee area and some parts of Rokupa Area (EA 25-27)." },
    { id: "WR-410", area: "Kuntolo, Jalloh Terrace", pop: "17,112", desc: "This Ward consists of the entire Kuntolo and some parts of Jalloh Terrace Areas (EA 7,12 & 13)." },
    { id: "WR-411", area: "Thunder Hill, Jalloh Terrace", pop: "17,199", desc: "This Ward consists of the entire Thunder Hill and some parts of Jalloh Terrace Area (EA 35-38)." },
    { id: "WR-412", area: "Jalloh Terrace", pop: "16,955", desc: "This Ward consists of some parts of Jalloh Terrace Area (EA 1-6, 8-11 and 14-34)." },
    { id: "WR-413", area: "Grassfield, Kissy Bye Pass Terminal", pop: "27,287", desc: "This Ward consists of Grassfield Area and some part of Kissy Bye Pass Terminal Area (EA7-20)." },
    { id: "WR-414", area: "Lowcost, Kissy Mess Mess", pop: "26,838", desc: "This Ward consists of the lowcost and Kissy Mess Mess Areas." },
    { id: "WR-415", area: "Kissy Bye Pass Terminal/Dock Yard", pop: "16,909", desc: "This Ward consists of some parts of Kissy Bye Pass Terminal (EA1-6) and part of Kissy Bye Pass Dock Yard Areas (EA 6-16 & 24-30)." },
    { id: "WR-416", area: "Shell, Kissy Mental", pop: "27,488", desc: "This Ward consists of Shell Area and Kissy Mental Area." },
    { id: "WR-417", area: "Kissy Bye Pass Dock Yard", pop: "16,544", desc: "This Ward consists of some parts of Kissy Bye Pass Dock Yard Area (EA 1-5, 17-23 & 31-43)." },
    { id: "WR-418", area: "Mamba Ridge 2, Mamba Ridge 1", pop: "24,859", desc: "This Ward consists of Mamba Ridge 2 and some parts of Mamba Ridge 1 Areas (EA2-18)." },
    { id: "WR-419", area: "Kissy Brook 2, Mamba Ridge 1", pop: "24,506", desc: "This Ward consists of Kissy Brook 2 and some parts of Mamba Ridge 1 Area (EA 1, 19-34)." },
    { id: "WR-420", area: "Cline Town, Ashobi Corner, Kissy Brook 1", pop: "20,179", desc: "This Ward consists of entire Cline Town Area, part of Ashobi Corner (EA 1), and parts of Kissy Brook 1 (EA 1-6)." },
    { id: "WR-421", area: "Quarry, Ashobi Corner, Kissy Brook 1", pop: "26,849", desc: "This Ward consists of the following Areas the entire Quarry, part of Ashobi corner (EA 2-30) and parts of Kissy Brook 1 (EA 7-13)." },
    { id: "WR-422", area: "Fourah Bay", pop: "21,669", desc: "This Ward consists of the entire Fourah Bay Area." },
    { id: "WR-423", area: "Kossoh Town", pop: "19,663", desc: "This Ward consists of part of Kossoh Town Area (EA 1-10, 12-27, 29, 32-39)." },
    { id: "WR-424", area: "Magazine Section, Kossoh Town", pop: "19,178", desc: "This Ward consists of entire Magazine Section and part of Kossoh Town Area (EA 11, 28, 30, 31, 40-43)." },
    { id: "WR-425", area: "Ginger Hall", pop: "21,173", desc: "This Ward consists of the entire Ginger Hall Area." },
    { id: "WR-426", area: "Foullah Town", pop: "22,063", desc: "This Ward consists of the entire Foullah Town Area." },
    { id: "WR-427", area: "Susan’s Bay, Mountain Regent", pop: "20,569", desc: "This Ward consists of the entire Susan’s Bay Area and part of Mountain Regent Area (EA1-8)." },
    { id: "WR-428", area: "Tower Hill, Mountain Regent", pop: "19,592", desc: "This Ward consists of the entire Tower Hill Area and parts of Mountain Regent Area (EA 9-37)." },
    { id: "WR-429", area: "Albert Academy, Sorie Town", pop: "22,338", desc: "This Ward consists of Albert Academy and Sorie Town Areas." },
    { id: "WR-430", area: "Sanders Brook, Kroo Town", pop: "27,247", desc: "This Ward consists of Sanders Brook and some part of Kroo Town Areas (EA 1-24, 33, 38-45)." },
    { id: "WR-431", area: "Kingtom, Connaught Hospital, Ascension Town", pop: "26,659", desc: "This Ward consists of three Areas: Kingtom, Connaught Hospital and some part of Ascension Town (EA 1-5)." },
    { id: "WR-432", area: "Ascension Town, Brookfields, Kroo Town", pop: "23,108", desc: "This Ward consists of four Areas: part of Ascension Town (EA 6-22), Brookfields, and Some parts of Brookfields Red-Pump (EA 1-5), and some Parts of Kroo Town (EA 25-32 & 34-37)." },
    { id: "WR-433", area: "Brookfields Congo Town, Brookfields Red-Pump", pop: "25,319", desc: "This Ward consists of two Areas: Brookfields Congo Town and some parts of Brookfields Red-Pump (EA 6-24)." },
    { id: "WR-434", area: "Sumaila Town, George Brook", pop: "25,150", desc: "This Ward consists of two Areas: Sumaila Town and some parts of George Brook (EAs 1, 3, 6-15, 27-34, 46-51, 67 & 68)." },
    { id: "WR-435", area: "New England/Hennesson Street, George Brook", pop: "24,634", desc: "This Ward consists of two Areas: New England/Hennesson Street and some parts of George Brook (Dworzak) (EA 2, 4-5, 16-26, 35-45, 52-66, and 69)." },
    { id: "WR-436", area: "New England /Hill Cut, Hill Station", pop: "25,809", desc: "This Ward consists of two Areas: New England /Hill Cut and some parts of Hill Station (EA 3-12, 16-33 and 35)." },
    { id: "WR-437", area: "Willberforce, Hill Station", pop: "26,585", desc: "This Ward consists of two Areas: Willberforce and some parts Hill Station (EA 1, 2, 13-15 & 34)." },
    { id: "WR-438", area: "Congo Town", pop: "19,479", desc: "This Ward consists of Congo Town Area." },
    { id: "WR-439", area: "Tengbeh Town", pop: "21,256", desc: "This Ward consists of Tengbeh Town Area." },
    { id: "WR-440", area: "Murray Town", pop: "18,784", desc: "This Ward consists of Murray Town Area." },
    { id: "WR-441", area: "Cockle Bay/Collegiate, Cockerill/Aberdeen", pop: "24,045", desc: "This Ward consists of two Areas: Cockle Bay/Collegiate and some part of Cockerill/Aberdeen (EA 1-5)." },
    { id: "WR-442", area: "Pipeline/Wilkinson Road, Cockerill/Aberdeen, Lumley", pop: "21,937", desc: "This Ward consists of three Areas: Pipeline/Wilkinson Road, some parts of Cockerill/Aberdeen (EA 6-21) and some part of Lumley (EA 56-60)." },
    { id: "WR-443", area: "Aberdeen", pop: "18,806", desc: "This Ward consists of Aberdeen Area." },
    { id: "WR-444", area: "Lumley", pop: "21,395", desc: "This Ward consists of some parts of Lumley Area (EA 1-35, 37-38, and 48-55)." },
    { id: "WR-445", area: "Malama/Kamayama, Lumley", pop: "20,333", desc: "This Ward consists of two Areas: Malama/Kamayama and some part of Lumley (EA 36 and 39-47)." },
    { id: "WR-446", area: "Juba/ Kaningo", pop: "23,573", desc: "This Ward consists of Juba/ Kaningo Area." }
];

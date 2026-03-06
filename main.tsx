import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Menu,
  X,
  Globe, 
  Layers, 
  Cpu, 
  Radio, 
  Beaker, 
  Users, 
  Zap, 
  ChevronRight,
  Monitor
} from 'lucide-react';

// --- Image Fallback Component ---
function ImageWithFallback(props: any) {
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  )
}

// --- Animation Utilities ---

const FadeIn = ({ children, delay = 0, direction = "up", className = "", fullWidth = false }: any) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction as keyof typeof directions] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 1, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`${className} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </motion.div>
  );
};

const Atmosphere = () => (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[30%] -right-[10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-gray-100 to-transparent blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-gray-200 to-transparent blur-[100px]"
      />
      <motion.div
        animate={{
          x: ["-12%", "12%", "-12%"],
          opacity: [0.04, 0.14, 0.04],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[18%] left-1/2 h-28 w-[70vw] -translate-x-1/2 rotate-6 bg-gradient-to-r from-transparent via-white to-transparent blur-3xl"
      />
      <motion.div
        animate={{
          x: ["14%", "-14%", "14%"],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[12%] left-1/2 h-24 w-[62vw] -translate-x-1/2 -rotate-3 bg-gradient-to-r from-transparent via-gray-100 to-transparent blur-3xl"
      />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(17,24,39,0.45) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );

const SectionDivider = ({ tone = "light" }: any) => (
  <div className={`relative h-14 overflow-hidden ${tone === "dark" ? "bg-[#050505]" : "bg-transparent"}`}>
    <div
      className={`absolute left-1/2 top-1/2 h-px w-[min(88%,72rem)] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r ${
        tone === "dark"
          ? "from-transparent via-white/15 to-transparent"
          : "from-transparent via-black/10 to-transparent"
      }`}
    />
    <motion.div
      animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.15, 0.9] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
        tone === "dark"
          ? "bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.35)]"
          : "bg-black/70 shadow-[0_0_18px_rgba(0,0,0,0.18)]"
      }`}
    />
  </div>
);

const PremiumButton = ({ children, variant = "dark", className = "", ...props }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -1 }}
    whileTap={{ scale: 0.985 }}
    className={`group relative overflow-hidden rounded-full px-8 py-4 font-medium transition-all duration-500 ${
      variant === "dark"
        ? "bg-black text-white shadow-[0_20px_45px_rgba(0,0,0,0.18)] hover:shadow-[0_26px_55px_rgba(0,0,0,0.24)]"
        : "border border-gray-200 bg-white/90 text-black shadow-[0_16px_35px_rgba(15,23,42,0.08)] hover:border-gray-300"
    } ${className}`}
    {...props}
  >
    <span
      className={`pointer-events-none absolute inset-[1px] rounded-full ${
        variant === "dark"
          ? "bg-gradient-to-b from-white/10 to-transparent"
          : "bg-gradient-to-b from-white to-gray-50/40"
      }`}
    />
    <span
      className={`pointer-events-none absolute inset-y-0 left-0 w-24 -translate-x-[160%] -skew-x-12 bg-gradient-to-r transition-transform duration-700 ease-out group-hover:translate-x-[220%] ${
        variant === "dark"
          ? "from-transparent via-white/20 to-transparent"
          : "from-transparent via-white/90 to-transparent"
      }`}
    />
    <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
  </motion.button>
);
type ServiceSuite = 'business' | 'intel';
type SuitePillar = { label: string };
type Offering = {
  name: string;
  category: string;
  engagement: string;
  timing?: string;
  outcome: string;
  bullets: string[];
};
type OfferingGroup = { title: string; items: Offering[] };
type ChartRow = {
  service: string;
  category: string;
  engagement: string;
  timing?: string;
  outcome: string;
};
type PackageTier = { name: string; summary: string[] };

const BUSINESS_PILLARS: SuitePillar[] = [
  { label: "Launch & Web Presence" },
  { label: "Sales System (CRM + Pipelines)" },
  { label: "Lead Generation + Outreach Engine" },
  { label: "Social Growth Engine" },
  { label: "Retention (Loyalty + Referrals)" },
  { label: "Subscriptions + Membership Revenue" },
  { label: "Online Clubs / Communities" },
  { label: "Team & Operations OS" },
  { label: "Robbocopo (Business AI Robot)" },
  { label: "Dashboards + Reporting" },
  { label: "Support, Training + Maintenance" }
];

const BUSINESS_GROUPS: OfferingGroup[] = [
  {
    title: "One-Time Build & Setup",
    items: [
      {
        name: "Website & Conversion Build",
        category: "Launch",
        engagement: "One-time",
        outcome: "More leads, bookings, and a conversion-ready web presence.",
        bullets: [
          "High-converting website or landing page structure",
          "Service, offer, and pricing layout designed for clarity",
          "Booking, call, and WhatsApp conversion touchpoints",
          "Basic SEO, analytics, and trust-building sections"
        ]
      },
      {
        name: "Booking & Payments Setup",
        category: "Launch",
        engagement: "One-time",
        outcome: "A smoother booking and payment flow that reduces no-shows.",
        bullets: [
          "Booking logic for slots, staff, and confirmations",
          "Payment links or checkout routing where relevant",
          "Automated reminders and confirmation sequences"
        ]
      },
      {
        name: "CRM & Sales Pipeline Setup",
        category: "Sales System",
        engagement: "One-time",
        outcome: "Leads tracked cleanly from first contact through repeat revenue.",
        bullets: [
          "Pipeline stages from new lead to repeat customer",
          "Customer tags, segments, and lead routing",
          "Lead capture forms tied into basic follow-up logic"
        ]
      },
      {
        name: "Pitch Builder",
        category: "Sales Enablement",
        engagement: "One-time",
        outcome: "Proposal flows that help higher-value deals close faster.",
        bullets: [
          "Proposal mini-site template for cleaner presentations",
          "Package tiers and add-ons positioned for decision-making",
          "Case study, testimonial, and next-step structure"
        ]
      },
      {
        name: "Outreach System Setup",
        category: "Growth",
        engagement: "One-time",
        outcome: "A repeatable outreach machine across email, WhatsApp, and DM.",
        bullets: [
          "Messaging frameworks and outreach scripts",
          "Cold, warm, and reactivation sequence templates",
          "Follow-up workflow tied back into CRM visibility"
        ]
      },
      {
        name: "Social Growth Engine Setup",
        category: "Growth",
        engagement: "One-time",
        outcome: "Consistent content and promotional execution month after month.",
        bullets: [
          "Content calendar and campaign structure",
          "Post, story, and banner template system",
          "Caption frameworks and seasonal promotion themes"
        ]
      },
      {
        name: "Loyalty & Referral System Setup",
        category: "Retention",
        engagement: "One-time",
        outcome: "Higher repeat visits and stronger referral momentum.",
        bullets: [
          "QR-based joining or rewards entry flow",
          "Points, stamps, or tiered reward logic",
          "Referral tracking and inactive customer win-back flow"
        ]
      },
      {
        name: "Memberships & Subscriptions Setup",
        category: "Revenue",
        engagement: "One-time",
        outcome: "Recurring revenue infrastructure for packaged offers and access.",
        bullets: [
          "Membership tiers with clear benefits and rules",
          "Billing and renewal reminder structure",
          "Member access flow for ongoing value delivery"
        ]
      },
      {
        name: "Online Club / Community Setup",
        category: "Community",
        engagement: "One-time",
        outcome: "A customer club that increases retention and audience lock-in.",
        bullets: [
          "Community hub setup for updates, exclusives, and events",
          "Private content access rules",
          "Challenge, giveaway, and referral engagement mechanics"
        ]
      },
      {
        name: "Team & Task Management Setup",
        category: "Ops OS",
        engagement: "One-time",
        outcome: "Clearer internal execution with structure, roles, and accountability.",
        bullets: [
          "Workspace setup for teams, roles, and permissions",
          "Task boards and SOP libraries",
          "Onboarding checklists and operational workflows"
        ]
      },
      {
        name: "Robbocopo Setup",
        category: "AI",
        engagement: "One-time",
        outcome: "An AI front desk and internal assistant for qualification and routing.",
        bullets: [
          "Branded assistant identity, tone, and knowledge setup",
          "Lead qualification and capture logic",
          "Sales, support, and booking routing flows"
        ]
      }
    ]
  },
  {
    title: "Monthly Retainers",
    items: [
      {
        name: "Growth Ops Retainer",
        category: "Optimization",
        engagement: "Monthly",
        outcome: "Continuous campaign improvement and sharper performance over time.",
        bullets: [
          "Promo planning and execution guidance",
          "Funnel improvements and offer testing",
          "Conversion reviews, reporting, and asset refreshes"
        ]
      },
      {
        name: "Lead Gen & Outreach Ops Retainer",
        category: "Growth",
        engagement: "Monthly",
        outcome: "More meetings and sales through disciplined outbound execution.",
        bullets: [
          "Lead list building and segmentation",
          "Sequence deployment and follow-up management",
          "Booking optimization and pipeline reporting"
        ]
      },
      {
        name: "Social Engine Retainer",
        category: "Marketing",
        engagement: "Monthly",
        outcome: "Steady brand output with stronger campaign consistency.",
        bullets: [
          "Monthly content calendar delivery",
          "Content pack production and campaign copy",
          "Community engagement planning"
        ]
      },
      {
        name: "CRM & Automation Retainer",
        category: "Systems",
        engagement: "Monthly",
        outcome: "Stable systems with ongoing maintenance and upgrades.",
        bullets: [
          "CRM upkeep and pipeline improvements",
          "Automation monitoring and tuning",
          "Workflow updates, templates, and team support"
        ]
      },
      {
        name: "Robbocopo Care Plan",
        category: "AI",
        engagement: "Monthly",
        outcome: "Ongoing assistant quality, expansion, and refinement.",
        bullets: [
          "Knowledge base and flow updates",
          "Quality checks and scenario expansion",
          "Performance review and script refinement"
        ]
      }
    ]
  },
  {
    title: "Add-Ons & Upgrades",
    items: [
      {
        name: "Gamification Add-on",
        category: "Experience",
        engagement: "Optional Module",
        outcome: "Interactive campaigns that drive attention, repeat visits, and reward loops.",
        bullets: [
          "Spin, scratch, trivia, or challenge mechanics",
          "Leaderboards and reward logic",
          "Giveaway automation tied to engagement"
        ]
      },
      {
        name: "Multi-Branch / Franchise Add-on",
        category: "Scale",
        engagement: "Optional Module",
        outcome: "More control and consistency across multiple locations or operators.",
        bullets: [
          "Branch-level dashboards and role access",
          "Location reporting and playbooks",
          "Standardized offers and campaign logic"
        ]
      },
      {
        name: "Advanced Analytics Add-on",
        category: "Analytics",
        engagement: "Optional Module",
        outcome: "Clearer visibility into performance, bottlenecks, and growth levers.",
        bullets: [
          "KPI dashboards for leads, bookings, and conversion",
          "Monthly insight summaries and recommendations",
          "Campaign attribution where data is available"
        ]
      },
      {
        name: "Integrations Add-on",
        category: "Systems",
        engagement: "Optional Module",
        outcome: "Connected tools so data, messaging, and reporting stay aligned.",
        bullets: [
          "Booking, POS, forms, and messaging sync",
          "CRM-linked data imports and exports",
          "Reporting flows across your operating stack"
        ]
      },
      {
        name: "Brand Pack Add-on",
        category: "Creative",
        engagement: "Optional Module",
        outcome: "Campaign-ready visuals that keep promotions sharp and consistent.",
        bullets: [
          "Brand refresh assets and template kit",
          "Menus, posters, and story-ready layouts",
          "Visual system support for recurring campaigns"
        ]
      }
    ]
  }
];

const BUSINESS_CHART_ROWS: ChartRow[] = [
  { service: "Website & Conversion Build", category: "Launch", engagement: "One-time", outcome: "More leads and bookings" },
  { service: "Booking & Payments Setup", category: "Launch", engagement: "One-time", outcome: "Fewer no-shows and smoother sales" },
  { service: "CRM & Pipeline Setup", category: "Sales System", engagement: "One-time", outcome: "Leads tracked through to close" },
  { service: "Pitch Builder", category: "Sales Enablement", engagement: "One-time", outcome: "Faster closing via proposals" },
  { service: "Outreach System Setup", category: "Growth", engagement: "One-time", outcome: "Repeatable outreach machine" },
  { service: "Social Engine Setup", category: "Growth", engagement: "One-time", outcome: "Consistent content and promotions" },
  { service: "Loyalty & Referral Setup", category: "Retention", engagement: "One-time", outcome: "Higher repeat visits" },
  { service: "Memberships Setup", category: "Revenue", engagement: "One-time", outcome: "Subscription income" },
  { service: "Online Club Setup", category: "Community", engagement: "One-time", outcome: "Audience lock-in" },
  { service: "Team & Task Setup", category: "Ops OS", engagement: "One-time", outcome: "Structure and execution" },
  { service: "Robbocopo Setup", category: "AI", engagement: "One-time", outcome: "AI receptionist and assistant" },
  { service: "Growth Ops Retainer", category: "Optimization", engagement: "Monthly", outcome: "Continuous improvement" },
  { service: "Lead+Outreach Ops Retainer", category: "Growth", engagement: "Monthly", outcome: "More meetings and sales" },
  { service: "Social Retainer", category: "Marketing", engagement: "Monthly", outcome: "Output and consistency" },
  { service: "CRM & Automation Retainer", category: "Systems", engagement: "Monthly", outcome: "Stability and upgrades" },
  { service: "Robbocopo Care Plan", category: "AI", engagement: "Monthly", outcome: "Quality and expansion" }
];

const BUSINESS_PACKAGES: PackageTier[] = [
  {
    name: "Suite Lite",
    summary: [
      "Website",
      "Booking",
      "Basic CRM",
      "Analytics"
    ]
  },
  {
    name: "Suite Pro",
    summary: [
      "Suite Lite foundation",
      "Outreach System",
      "Pitch Builder",
      "Social Engine Setup"
    ]
  },
  {
    name: "Suite Elite",
    summary: [
      "Suite Pro foundation",
      "Loyalty and Referral",
      "Memberships and Online Club",
      "Robbocopo and Team Ops"
    ]
  },
  {
    name: "Enterprise",
    summary: [
      "Multi-branch support",
      "Advanced dashboards",
      "Custom workflows",
      "Governance structure"
    ]
  }
];

const INTEL_PILLARS: SuitePillar[] = [
  { label: "Market & Competitor Intelligence" },
  { label: "Customer Demand & Trend Intelligence" },
  { label: "Revenue & Sales Intelligence" },
  { label: "Operations & Efficiency Intelligence" },
  { label: "AI Transformation & Governance" },
  { label: "Ongoing Intel Subscriptions" }
];

const INTEL_GROUPS: OfferingGroup[] = [
  {
    title: "One-Time Intel Packs",
    items: [
      {
        name: "Visio Intel Snapshot",
        category: "Diagnostic",
        engagement: "One-time",
        timing: "3-5 days",
        outcome: "Fast clarity with ranked opportunities and a 30-day action path.",
        bullets: [
          "Quick competitor view across local and category players",
          "Top opportunities ranked by likely impact",
          "30-day action plan with KPI targets",
          "Sales, follow-up, and WhatsApp script pack"
        ]
      },
      {
        name: "Market Map & Competitor Benchmark",
        category: "Market Intel",
        engagement: "One-time",
        timing: "7-10 days",
        outcome: "Stronger positioning through deeper competitive visibility.",
        bullets: [
          "Competitor database and positioning scan",
          "Offer and pricing benchmark review",
          "Review mining for pain points and winning patterns",
          "Market gap recommendations on where to win"
        ]
      },
      {
        name: "Customer Demand & Trend Radar",
        category: "Demand Intel",
        engagement: "One-time",
        timing: "7-10 days",
        outcome: "Sharper offers and better-timed campaigns based on demand signals.",
        bullets: [
          "Demand signal analysis across customer interest",
          "Seasonality and peak-time insight windows",
          "90-day promotional direction",
          "Persona and buying-trigger summary"
        ]
      },
      {
        name: "Revenue Leak Audit",
        category: "Revenue Intel",
        engagement: "One-time",
        timing: "7-10 days",
        outcome: "Find where revenue is lost and where conversion can improve next.",
        bullets: [
          "Revenue leak map across the customer journey",
          "Conversion lift recommendations for offers and timing",
          "Retention and win-back guidance",
          "KPI scoreboard and measurement framework"
        ]
      },
      {
        name: "Pricing & Packaging Lab",
        category: "Revenue Intel",
        engagement: "One-time",
        timing: "5-7 days",
        outcome: "Clearer packages, healthier margins, and smarter promotional guardrails.",
        bullets: [
          "Pricing model and margin review",
          "Package recommendations across key tiers",
          "Upsell and cross-sell mapping",
          "Discounting guardrails that protect profit"
        ]
      },
      {
        name: "Sales Messaging & Script Pack",
        category: "Sales Intel",
        engagement: "One-time",
        timing: "3-5 days",
        outcome: "Stronger messaging that reduces drop-off and speeds up closes.",
        bullets: [
          "Inbound, outbound, and follow-up scripts",
          "Objection handling frameworks",
          "DM and email messaging support",
          "A first-message to booked flow"
        ]
      }
    ]
  },
  {
    title: "AI Transformation",
    items: [
      {
        name: "AI Adoption Roadmap",
        category: "AI Strategy",
        engagement: "One-time",
        timing: "10-14 days",
        outcome: "A phased AI plan ranked by ROI, effort, and operational relevance.",
        bullets: [
          "AI opportunity map across the business",
          "30, 60, and 90-day adoption priorities",
          "Tool-stack recommendations with scalability in mind",
          "Role-based staff enablement guidance"
        ]
      },
      {
        name: "AI Governance & Policy Pack",
        category: "AI Governance",
        engagement: "One-time",
        timing: "7-10 days",
        outcome: "Safer AI usage with policy, controls, and mandatory review guardrails.",
        bullets: [
          "AI usage policy and staff guidelines",
          "Data handling and output safety rules",
          "Risk register with mitigation direction",
          "Approval flow recommendations where human review is required"
        ]
      }
    ]
  },
  {
    title: "Ongoing Intel Subscriptions",
    items: [
      {
        name: "Competitor Watch",
        category: "Intel Subscription",
        engagement: "Subscription",
        timing: "Monthly",
        outcome: "Stay current on market moves and what to adjust next.",
        bullets: [
          "Competitor changes across offers, pricing, and promos",
          "Market movement summaries",
          "Recommended response actions",
          "Script updates where needed"
        ]
      },
      {
        name: "Trend Alerts",
        category: "Intel Subscription",
        engagement: "Subscription",
        timing: "Weekly / Bi-weekly",
        outcome: "Stay early on the trends shaping offers, promos, and content timing.",
        bullets: [
          "Local and category trend bulletins",
          "Promo ideas with suggested timing",
          "Fast notes on what is working now"
        ]
      },
      {
        name: "Visio Intel Partnership",
        category: "Retainer",
        engagement: "Retainer",
        timing: "Monthly",
        outcome: "A long-term AI and data partner for ongoing clarity and guidance.",
        bullets: [
          "Monthly intel report and scoreboard",
          "Strategy call with execution guidance",
          "KPI framework updates",
          "Quarterly repositioning recommendations"
        ]
      }
    ]
  }
];

const INTEL_CHART_ROWS: ChartRow[] = [
  { service: "Intel Snapshot", category: "Diagnostic", engagement: "One-time", timing: "3-5 days", outcome: "Fast clarity and top actions" },
  { service: "Competitor Benchmark", category: "Market Intel", engagement: "One-time", timing: "7-10 days", outcome: "Beat competitors with positioning" },
  { service: "Demand & Trend Radar", category: "Demand Intel", engagement: "One-time", timing: "7-10 days", outcome: "Better offers and campaign timing" },
  { service: "Revenue Leak Audit", category: "Revenue Intel", engagement: "One-time", timing: "7-10 days", outcome: "Higher conversion and repeat" },
  { service: "Pricing & Packaging Lab", category: "Revenue Intel", engagement: "One-time", timing: "5-7 days", outcome: "Higher margin and clear tiers" },
  { service: "Sales Script Pack", category: "Sales Intel", engagement: "One-time", timing: "3-5 days", outcome: "Close faster with fewer drop-offs" },
  { service: "AI Adoption Roadmap", category: "AI Strategy", engagement: "One-time", timing: "10-14 days", outcome: "AI plan ranked by ROI" },
  { service: "AI Governance Pack", category: "AI Governance", engagement: "One-time", timing: "7-10 days", outcome: "Safe use, policy, and control" },
  { service: "Competitor Watch", category: "Intel Subscription", engagement: "Subscription", timing: "Monthly", outcome: "Always know market moves" },
  { service: "Trend Alerts", category: "Intel Subscription", engagement: "Subscription", timing: "Weekly / Bi-weekly", outcome: "Stay early and stay relevant" },
  { service: "Intel Partnership", category: "Retainer", engagement: "Retainer", timing: "Monthly", outcome: "Ongoing AI and data partnership" }
];

const INTEL_EDITIONS = [
  "Beauty / Hair / Makeup Edition",
  "Dental / Aesthetics / Clinics Edition",
  "Hospitality / Restaurants Edition",
  "Private Schools Edition"
];

const INTEL_STANDARD_INPUTS = [
  "Business name, location(s), and current services or offers",
  "Ideal customer and typical value band, if known",
  "Competitor names, if available",
  "Any existing metrics they can share"
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100 py-0' : 'bg-transparent border-transparent py-2'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center"
          >
            <a href="#" className="flex items-center gap-2 group">
                <span className="font-extrabold text-2xl tracking-widest text-black uppercase group-hover:tracking-[0.2em] transition-all duration-500">VisioCorp</span>
            </a>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide"
          >
            <a href="#products" className="text-gray-500 hover:text-black transition-colors">Products</a>
            <a href="#services" className="text-gray-500 hover:text-black transition-colors">Services</a>
            <a href="#divisions" className="text-gray-500 hover:text-black transition-colors">Divisions</a>
            <a href="#media" className="text-gray-500 hover:text-black transition-colors">MirageMirror</a>
            <a href="#radio" className="text-gray-500 hover:text-black transition-colors">Radio</a>
            <a href="#about" className="text-gray-500 hover:text-black transition-colors">About</a>
            <a href="#login" className="text-white bg-black px-5 py-2.5 rounded-full ml-4 hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all active:scale-95">Login</a>
          </motion.div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 hover:text-gray-600 transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 font-medium">
              <a href="#products" className="block text-gray-600 hover:text-black hover:translate-x-1 transition-transform">Products</a>
              <a href="#services" className="block text-gray-600 hover:text-black hover:translate-x-1 transition-transform">Services</a>
              <a href="#divisions" className="block text-gray-600 hover:text-black hover:translate-x-1 transition-transform">Divisions</a>
              <a href="#media" className="block text-gray-600 hover:text-black hover:translate-x-1 transition-transform">MirageMirror</a>
              <a href="#radio" className="block text-gray-600 hover:text-black hover:translate-x-1 transition-transform">Radio</a>
              <a href="#about" className="block text-gray-600 hover:text-black hover:translate-x-1 transition-transform">About</a>
              <div className="pt-4 border-t border-gray-100">
                <a href="#login" className="block text-black font-semibold hover:translate-x-1 transition-transform">Login</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TaglineRotator = () => {
    const taglines = [
        "See beyond what the eyes can see.",
        "Seek insight.",
        "See beyond the mirage."
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % taglines.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-8 overflow-hidden relative mb-2">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="absolute w-full text-center md:text-left text-gray-500 font-semibold tracking-[0.15em] uppercase text-xs md:text-sm"
                >
                    {taglines[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const Hero = ({ 
    title = "Think Ahead. See Ahead.",
    subtitle = "VisioCorp builds AI systems, creative tools, and culture products for the next era of African excellence.",
}) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 50]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden mix-blend-multiply">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div style={{ opacity, y }} className="relative z-10">
                <TaglineRotator />
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
                    className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-black mb-8 mt-4 leading-[1.05]"
                >
                    {title.split('.').map((part, i, arr) => (
                        part && <span key={i} className="block">{part}{i < arr.length - 1 || title.endsWith('.') ? '.' : ''}</span>
                    ))}
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="text-xl md:text-2xl text-gray-600 mb-12 max-w-lg leading-relaxed font-light"
                >
                    {subtitle}
                </motion.p>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <PremiumButton variant="dark" className="group">
                        Get Visio Creative Suite v1 
                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </PremiumButton>
                    <PremiumButton variant="light" className="group backdrop-blur-sm">
                        Explore the Corporation
                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </PremiumButton>
                </motion.div>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative lg:h-[650px] w-full"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-50 rounded-[2rem] overflow-hidden group">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full"
                    >
                        <ImageWithFallback 
                            src="/IMG_6662.jpg" 
                            alt="VisioCorp"
                            className="w-full h-full object-cover opacity-90 transition-opacity duration-1000 group-hover:opacity-100"
                        />
                    </motion.div>
                     <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
                     <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/5 mix-blend-overlay"></div>
                </div>
            </motion.div>
        </div>
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 1.5,
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeOut"
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-gray-400"
        >
            <span className="text-sm font-semibold mb-2 uppercase tracking-wide">Scroll to explore</span>
            <ArrowRight size={24} className="rotate-90" />
        </motion.div>
      </div>
    </section>
  );
};

const ShippingOrb = ({ title, subtitle, status, description, image, index }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="group relative z-10 flex w-full max-w-[15.5rem] flex-col items-center text-center"
    >
        <div className="relative mb-6 flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-black/10 via-transparent to-black/5 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full border border-black/10 bg-white shadow-sm" />
            <div className="absolute inset-3 rounded-full border border-dashed border-black/10 opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90" />
            <div className="absolute inset-5 rounded-full border border-black/10 bg-white/85 p-2 shadow-[0_28px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_36px_80px_rgba(15,23,42,0.18)]">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-black/10">
                    <ImageWithFallback src={image} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_38%)] opacity-80" />
                </div>
            </div>
            <div className="absolute inset-[2.25rem] rounded-full ring-1 ring-inset ring-white/60 opacity-70" />
            <span className={`absolute right-2 top-4 inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm backdrop-blur-md ${
                status === 'Now Shipping' ? 'bg-black/90 text-white' : 
                status === 'Beta' ? 'bg-white/90 text-black border border-gray-200' :
                'bg-gray-100/90 text-gray-400'
            }`}>
                {status}
            </span>
        </div>
        <div className="relative rounded-[1.5rem] border border-black/5 bg-white/85 px-5 py-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)] backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-[0.22em]">{subtitle}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black transition-all duration-300 group-hover:gap-3">
                Explore <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
        </div>
    </motion.div>
);

const ShippingCore = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative flex h-60 w-60 items-center justify-center"
    >
        <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-black/10 via-gray-100 to-transparent blur-3xl"
        />
        <div className="absolute inset-3 rounded-full border border-dashed border-black/10" />
        <div className="absolute inset-8 rounded-full border border-black/10 bg-white/70 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.12)]" />
        <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-black text-white shadow-[0_28px_70px_rgba(15,23,42,0.28)]">
            <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/60">Source</span>
            <span className="mt-2 text-xl font-bold tracking-tight">Visio Core</span>
            <span className="mt-3 px-3 text-center text-[11px] leading-relaxed text-white/65">
                Central intelligence node
            </span>
        </div>
    </motion.div>
);

const SuiteSwitcher = ({
    activeSuite,
    setActiveSuite
}: {
    activeSuite: ServiceSuite;
    setActiveSuite: (suite: ServiceSuite) => void;
}) => {
    const suites = [
        {
            id: 'business' as ServiceSuite,
            label: "Visio Business Suite",
            description: "Upgradeable Business OS"
        },
        {
            id: 'intel' as ServiceSuite,
            label: "Visio Intel",
            description: "Powered by Visio Research Labs"
        }
    ];

    return (
        <div className="inline-flex flex-col sm:flex-row gap-2 p-2 bg-white border border-gray-200 rounded-3xl shadow-sm">
            {suites.map((suite) => {
                const isActive = suite.id === activeSuite;

                return (
                    <button
                        key={suite.id}
                        type="button"
                        onClick={() => setActiveSuite(suite.id)}
                        aria-pressed={isActive}
                        className={`text-left rounded-2xl px-5 py-4 transition-all min-w-[230px] ${
                            isActive
                                ? 'bg-black text-white shadow-lg'
                                : 'bg-white text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        <span className="block text-sm font-semibold tracking-wide">{suite.label}</span>
                        <span className={`block text-xs mt-1 ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
                            {suite.description}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

const ServicePillars = ({ pillars }: { pillars: SuitePillar[] }) => (
    <div className="flex flex-wrap gap-3">
        {pillars.map((pillar) => (
            <span
                key={pillar.label}
                className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700"
            >
                {pillar.label}
            </span>
        ))}
    </div>
);

const OfferingCard = ({ item }: { item: Offering }) => (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
        <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase bg-gray-100 text-gray-700">
                {item.category}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase bg-black text-white">
                {item.engagement}
            </span>
            {item.timing && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase bg-gray-50 text-gray-500 border border-gray-200">
                    {item.timing}
                </span>
            )}
        </div>
        <h4 className="text-xl font-bold text-black mb-3">{item.name}</h4>
        <p className="text-gray-600 leading-relaxed mb-6">{item.outcome}</p>
        <div className="space-y-3">
            {item.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-black shrink-0"></span>
                    <span>{bullet}</span>
                </div>
            ))}
        </div>
    </div>
);

const OfferingGroupSection = ({ title, items }: OfferingGroup) => (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
                <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">Offerings</span>
                <h3 className="text-3xl font-bold text-black mt-2">{title}</h3>
            </div>
            <p className="text-sm text-gray-500 max-w-2xl">
                Tailored engagements designed to slot into the right part of a client&apos;s growth, operations, or intelligence stack.
            </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item) => (
                <OfferingCard key={item.name} item={item} />
            ))}
        </div>
    </div>
);

const ServiceChartList = ({
    title,
    description,
    rows,
    showTiming = false,
    timingLabel = "Turnaround / Cadence"
}: {
    title: string;
    description: string;
    rows: ChartRow[];
    showTiming?: boolean;
    timingLabel?: string;
}) => (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
                <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">Snapshot</span>
                <h3 className="text-3xl font-bold text-black mt-2">{title}</h3>
            </div>
            <p className="text-sm text-gray-500 max-w-2xl">{description}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            {rows.map((row) => (
                <div key={row.service} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <h4 className="text-lg font-bold text-black mb-4">{row.service}</h4>
                    <div className={`grid gap-4 ${showTiming ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">Category</p>
                            <p className="text-sm text-gray-700">{row.category}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">Engagement</p>
                            <p className="text-sm text-gray-700">{row.engagement}</p>
                        </div>
                        {showTiming && (
                            <div>
                                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">{timingLabel}</p>
                                <p className="text-sm text-gray-700">{row.timing}</p>
                            </div>
                        )}
                        <div className={showTiming ? 'sm:col-span-3' : 'sm:col-span-2'}>
                            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">Outcome</p>
                            <p className="text-sm text-gray-700">{row.outcome}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const PackageTierCard = ({ tier }: { tier: PackageTier }) => (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <h4 className="text-2xl font-bold text-black mb-5">{tier.name}</h4>
        <div className="space-y-3">
            {tier.summary.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-black shrink-0"></span>
                    <span>{item}</span>
                </div>
            ))}
        </div>
    </div>
);

const StandardInputsPanel = ({ items }: { items: string[] }) => (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">Starting Inputs</span>
        <h3 className="text-3xl font-bold text-black mt-2 mb-3">Standard Client Inputs</h3>
        <p className="text-gray-500 mb-6">What we need to start generating useful analysis, direction, and recommendations.</p>
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-black shrink-0"></span>
                    <span>{item}</span>
                </div>
            ))}
        </div>
    </div>
);

const ServicesCTA = ({ supportingCopy }: { supportingCopy: string }) => (
    <div className="bg-black text-white rounded-3xl p-8 md:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-3xl">
                <span className="text-white/60 font-medium tracking-widest uppercase text-xs">Custom-Scoped Engagements</span>
                <h3 className="text-3xl md:text-4xl font-bold mt-3 mb-3">Book Consultation</h3>
                <p className="text-gray-300 leading-relaxed">{supportingCopy}</p>
            </div>
            <button
                type="button"
                className="group inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
                Book Consultation
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    </div>
);

const BusinessSuitePanel = () => (
    <div className="space-y-16">
        <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)] gap-8">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">Visio Business Suite</span>
                <h3 className="text-4xl font-bold text-black mt-3 mb-3">Upgradeable Business OS</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Website + Sales + CRM + Growth + Team Ops + Memberships + Community + Robbocopo.
                </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">Scope</span>
                <h3 className="text-2xl font-bold text-black mt-3 mb-3">Built around the client</h3>
                <p className="text-gray-600 leading-relaxed">
                    Every Business Suite engagement is tailored to the operating model, growth goals, and complexity of the business.
                </p>
            </div>
        </div>

        <div className="space-y-5">
            <div>
                <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">Service Pillars</span>
                <h3 className="text-3xl font-bold text-black mt-2">Business stack coverage</h3>
            </div>
            <ServicePillars pillars={BUSINESS_PILLARS} />
        </div>

        {BUSINESS_GROUPS.map((group) => (
            <OfferingGroupSection key={group.title} {...group} />
        ))}

        <ServiceChartList
            title="Business Suite Service Chart"
            description="A compact scan of the core Business Suite offer stack for quick navigation and qualification."
            rows={BUSINESS_CHART_ROWS}
        />

        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">Packages</span>
                    <h3 className="text-3xl font-bold text-black mt-2">Easy-to-sell tiers</h3>
                </div>
                <p className="text-sm text-gray-500 max-w-2xl">
                    Package scope is still tailored to each client, but these tiers make the offering easier to understand and scope.
                </p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                {BUSINESS_PACKAGES.map((tier) => (
                    <PackageTierCard key={tier.name} tier={tier} />
                ))}
            </div>
        </div>

        <ServicesCTA supportingCopy="We scope every build around your business model, goals, and operating complexity." />
    </div>
);

const IntelSuitePanel = () => (
    <div className="space-y-16">
        <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)] gap-8">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">Visio Intel</span>
                <h3 className="text-4xl font-bold text-black mt-3 mb-2">Powered by Visio Research Labs</h3>
                <p className="text-lg text-gray-600 leading-relaxed">Your Data + AI Partner for sharper decisions, stronger timing, and better strategic direction.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">Positioning</span>
                <h3 className="text-2xl font-bold text-black mt-3 mb-3">Strategy, analysis, and guidance</h3>
                <p className="text-gray-600 leading-relaxed">
                    Visio Intel is focused on intelligence, recommendations, prioritization, and governance guidance, not implementation delivery.
                </p>
            </div>
        </div>

        <div className="space-y-5">
            <div>
                <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">Service Pillars</span>
                <h3 className="text-3xl font-bold text-black mt-2">Intelligence coverage</h3>
            </div>
            <ServicePillars pillars={INTEL_PILLARS} />
        </div>

        {INTEL_GROUPS.map((group) => (
            <OfferingGroupSection key={group.title} {...group} />
        ))}

        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">Industry Editions</span>
                    <h3 className="text-3xl font-bold text-black mt-2">Tailored sector variants</h3>
                </div>
                <p className="text-sm text-gray-500 max-w-2xl">
                    Any core Intel pack can be scoped as an industry edition with sector-specific analysis priorities.
                </p>
            </div>
            <div className="flex flex-wrap gap-3">
                {INTEL_EDITIONS.map((edition) => (
                    <span
                        key={edition}
                        className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700"
                    >
                        {edition}
                    </span>
                ))}
            </div>
        </div>

        <ServiceChartList
            title="Visio Intel Service Chart"
            description="A quick-scan view of the available diagnostics, subscriptions, and advisory paths."
            rows={INTEL_CHART_ROWS}
            showTiming={true}
        />

        <StandardInputsPanel items={INTEL_STANDARD_INPUTS} />

        <ServicesCTA supportingCopy="Book a consultation to scope the right intel pack, advisory path, or ongoing partnership." />
    </div>
);

const ShippingSection = ({ product1Image, product2Image, product3Image }: any) => {
    const products = [
        {
            title: "Visio Creative Suite v1",
            subtitle: "The Main Offer",
            status: "Now Shipping",
            description: "Your complete identity and rollout operating system. Includes PR AI Assistant, Artist Portal, and Outreach tools.",
            image: product1Image
        },
        {
            title: "Robocorpo",
            subtitle: "Automation",
            status: "Beta",
            description: "Rent an online robot that works for you. Automate admin, research, and outreach tasks instantly.",
            image: product2Image
        },
        {
            title: "HGA Radio (Vol 1)",
            subtitle: "Media Product",
            status: "Now Shipping",
            description: "A curated auditory experience. Listen to the sounds of the future corporation.",
            image: product3Image
        }
    ];

    return (
        <section id="products" className="py-32 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-4">Now Shipping</h2>
                        <p className="text-gray-500 text-lg">The latest deployments from the Visio factories.</p>
                    </div>
                    <a href="#" className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase hover:text-black text-gray-400 transition-colors group">
                        View Full Catalogue <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </FadeIn>
                <div className="relative lg:hidden mx-auto mt-4 max-w-sm">
                    <div className="pointer-events-none absolute left-1/2 top-20 bottom-20 w-px -translate-x-1/2 bg-gradient-to-b from-black/10 via-black/20 to-transparent" />
                    <div className="mb-10 flex justify-center">
                        <ShippingCore />
                    </div>
                    <div className="space-y-12">
                        {products.map((p, i) => (
                            <div key={i} className="flex justify-center">
                                <ShippingOrb {...p} index={i} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative mt-6 hidden lg:block h-[74rem]">
                    <div className="pointer-events-none absolute inset-0">
                        <svg viewBox="0 0 1200 1120" className="h-full w-full">
                            <defs>
                                <linearGradient id="shippingCable" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(17,24,39,0.05)" />
                                    <stop offset="50%" stopColor="rgba(17,24,39,0.22)" />
                                    <stop offset="100%" stopColor="rgba(17,24,39,0.05)" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d="M600 360 C520 285 430 220 255 190"
                                fill="none"
                                stroke="url(#shippingCable)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M600 360 C690 270 790 230 948 228"
                                fill="none"
                                stroke="url(#shippingCable)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 1, delay: 0.08, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M600 335 C600 515 600 670 600 910"
                                fill="none"
                                stroke="url(#shippingCable)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 1, delay: 0.16, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>

                    <div className="absolute left-1/2 top-[31%] -translate-x-1/2 -translate-y-1/2">
                        <ShippingCore />
                    </div>
                    <div className="absolute left-[3%] top-[3%]">
                        <ShippingOrb {...products[0]} index={0} />
                    </div>
                    <div className="absolute right-[3%] top-[8%]">
                        <ShippingOrb {...products[1]} index={1} />
                    </div>
                    <div className="absolute left-1/2 top-[66%] -translate-x-1/2">
                        <ShippingOrb {...products[2]} index={2} />
                    </div>
                </div>
            </div>
        </section>
    );
};

const ServicesSection = () => {
    const [activeSuite, setActiveSuite] = useState<ServiceSuite>('business');

    return (
        <section id="services" className="py-24 bg-gray-50 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mb-10">
                    <span className="text-gray-400 font-medium tracking-widest uppercase text-sm">Services</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mt-3 mb-5">
                        Upgradeable Business Systems + Strategic Intelligence
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Visio offers operating systems for growth, sales, and execution alongside intelligence-led advisory for sharper
                        decisions. Every engagement is custom-scoped and billed according to the client context, technical scope, and
                        growth goals.
                    </p>
                </div>

                <SuiteSwitcher activeSuite={activeSuite} setActiveSuite={setActiveSuite} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSuite}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.25 }}
                        className="mt-10"
                    >
                        {activeSuite === 'business' ? <BusinessSuitePanel /> : <IntelSuitePanel />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

const ProcessStep = ({ number, title, desc, index }: any) => (
    <FadeIn delay={index * 0.2} className="flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-0 text-left md:text-center group">
        <div className="relative mb-6 md:mb-10">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileInView={{ scale: [0, 1], opacity: [0, 1] }}
                viewport={{ once: true, margin: "-10%" }}
                className="absolute inset-0 bg-black rounded-full opacity-5 group-hover:scale-100 transition-transform duration-500 ease-out"
            />
            <motion.div 
                whileHover={{ y: -5, x: 2, rotate: 3, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="shrink-0 w-16 h-16 rounded-full border border-gray-200 bg-white flex items-center justify-center font-bold text-xl shadow-sm group-hover:border-black group-hover:shadow-md transition-all duration-300 relative z-10"
            >
                {number}
            </motion.div>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
            <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">{desc}</p>
        </div>
    </FadeIn>
)

const ProcessSection = () => {
    return (
        <section className="py-32 bg-gray-50/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gray-200"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <FadeIn className="text-center mb-24">
                    <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs block mb-4">Operating Procedure</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-6">How Visio Works</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Our fundamental methodology for generating value and cultural insight.</p>
                </FadeIn>
                
                <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
                    <div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-px bg-gray-200 -z-10 overflow-hidden">
                        <motion.div 
                            initial={{ x: "-100%" }}
                            whileInView={{ x: "0%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="w-full h-full bg-black/20"
                        />
                    </div>
                    
                    <ProcessStep 
                        index={0}
                        number="1"
                        title="Collect Signal"
                        desc="We monitor data streams and cultural shifts to identify opportunities before they manifest."
                    />
                    <ProcessStep 
                        index={1}
                        number="2"
                        title="Create Strategy"
                        desc="Visio Intel processes signal into actionable plans using advanced models."
                    />
                    <ProcessStep 
                        index={2}
                        number="3"
                        title="Deploy Outcomes"
                        desc="Launch products, campaigns, and narratives with precision timing."
                    />
                </div>
            </div>
        </section>
    )
}

const EcosystemBranch = ({ icon: Icon, title, items, colorClass, index }: any) => (
    <FadeIn delay={index * 0.2} className="flex flex-col items-center w-full">
        <div className="hidden md:block w-px h-12 bg-white/10 mb-6 relative overflow-hidden">
            <motion.div 
                initial={{ y: "-100%" }}
                whileInView={{ y: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent"
            />
        </div>
        <motion.div 
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 rounded-2xl w-full text-center transition-all duration-300 group cursor-default"
        >
            <motion.div 
                whileHover={{ scale: 1.2, rotate: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 ${colorClass}`}
            >
                <Icon size={26} />
            </motion.div>
            <h3 className="font-bold text-lg mb-4 text-white tracking-wide">{title}</h3>
            <ul className="text-sm text-gray-400 space-y-3">
                {items.map((item: string, i: number) => (
                    <li key={i} className="group-hover:text-gray-300 transition-colors">{item}</li>
                ))}
            </ul>
        </motion.div>
    </FadeIn>
);

const EcosystemMap = () => {
    return (
        <section className="py-32 bg-[#0a0a0a] text-white relative overflow-hidden">
             <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
             <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">The Ecosystem</h2>
                    <p className="text-gray-400 text-lg">Structured for clarity. Built for scale.</p>
                </FadeIn>
                
                <div className="relative max-w-5xl mx-auto">
                    <div className="flex flex-col items-center">
                        <FadeIn delay={0}>
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="border border-white/20 bg-white/10 px-10 py-5 rounded-xl backdrop-blur-md mb-6 md:mb-12 relative shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                            >
                                <span className="font-extrabold text-2xl tracking-[0.2em] uppercase text-white shadow-sm">VisioCorp</span>
                            </motion.div>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full relative pt-8 md:pt-0">
                             <div className="hidden md:block absolute top-0 left-[16.66%] right-[16.66%] h-px bg-white/10">
                                <motion.div 
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="w-full h-full bg-white/30 origin-center"
                                />
                             </div>
                             
                             <EcosystemBranch 
                                index={1}
                                icon={Zap}
                                title="Products"
                                colorClass="bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                items={["Creative Suite v1", "Robocorpo", "Studio Camp"]}
                             />
                             <EcosystemBranch 
                                index={2}
                                icon={Layers}
                                title="Divisions"
                                colorClass="bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                items={["Research Labs", "AdvancedAfricaAI", "VisioClub", "VM International"]}
                             />
                             <EcosystemBranch 
                                index={3}
                                icon={Radio}
                                title="Media / Mythos"
                                colorClass="bg-pink-500/10 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.2)]"
                                items={["MirageMirror", "HGA Radio"]}
                             />
                        </div>
                    </div>
                </div>
             </div>
        </section>
    )
}

const DivisionItem = ({ name, desc, status, icon: Icon, index }: any) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex items-start gap-6 p-6 md:p-8 hover:bg-gray-50 transition-all duration-300 group border-b border-gray-100 last:border-0 cursor-pointer"
    >
        <motion.div 
            whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="shrink-0 w-16 h-16 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-900 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm"
        >
            <Icon size={26} />
        </motion.div>
        <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors">{name}</h3>
                {status && (
                    <span className="text-[10px] uppercase font-bold tracking-[0.15em] px-2.5 py-1 bg-gray-100 text-gray-500 rounded-md border border-gray-200">
                        {status}
                    </span>
                )}
            </div>
            <p className="text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors">{desc}</p>
        </div>
        <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                <ArrowRight size={18} className="text-black" />
            </div>
        </div>
    </motion.div>
)

const DivisionsSection = () => {
    return (
        <section id="divisions" className="py-32 bg-white relative">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn className="text-center mb-20">
                    <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs block mb-4">Structure</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-black">Active Divisions</h2>
                </FadeIn>
                
                <FadeIn delay={0.2} className="relative border border-gray-200 rounded-3xl shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl overflow-hidden">
                    <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent" />
                    <DivisionItem 
                        index={0}
                        name="Visio Research Labs 🧪" 
                        desc="Experiments, prototypes, papers, and case studies pushing the boundaries of what's possible."
                        status="Research"
                        icon={Beaker}
                    />
                     <DivisionItem 
                        index={1}
                        name="AdvancedAfricaAI" 
                        desc="Sovereign enterprise AI direction, models, and large-scale data systems."
                        status="Coming Soon"
                        icon={Cpu}
                    />
                     <DivisionItem 
                        index={2}
                        name="VisioClub" 
                        desc="Membership, perks, early access, and community for the corporation's elite."
                        status="Waitlist"
                        icon={Users}
                    />
                     <DivisionItem 
                        index={3}
                        name="Corpo" 
                        desc="Fashion identity, drops, and the official Visio lookbook."
                        status="In Development"
                        icon={Monitor}
                    />
                     <DivisionItem 
                        index={4}
                        name="VM International" 
                        desc="Global operations, partnerships, and ventures holding."
                        status="Restricted"
                        icon={Globe}
                    />
                </FadeIn>
            </div>
        </section>
    )
}

const Newsletter = () => (
    <section className="py-32 bg-gray-50 border-t border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-200 rounded-full blur-[80px] opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-200 rounded-full blur-[80px] opacity-50 translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
            <FadeIn>
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-black/10 rotate-3">
                    <Radio size={28} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Join the Corporation Updates</h2>
                <p className="text-gray-500 mb-10 text-lg">Receive intelligence, product drops, and research papers directly to your inbox.</p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="flex-1 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                    />
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-900 transition-colors shadow-lg shadow-black/10 whitespace-nowrap"
                    >
                        Subscribe
                    </motion.button>
                </form>
                <p className="text-xs text-gray-400 mt-6 uppercase tracking-widest font-medium">No spam. Only signal.</p>
            </FadeIn>
        </div>
    </section>
)

const Footer = () => {
    return (
        <footer className="bg-[#050505] text-white py-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn fullWidth>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                        <div className="col-span-2 lg:col-span-2 pr-8 md:pr-16">
                            <div className="flex items-center gap-2 mb-8">
                                <span className="font-extrabold text-2xl tracking-[0.2em] uppercase text-white">VisioCorp</span>
                            </div>
                            <p className="text-gray-400 mb-8 max-w-sm text-sm leading-loose">
                                Think Ahead. See Ahead. Building the next era of African excellence through intelligence, design, and cultural engineering.
                            </p>
                            <div className="flex gap-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"></div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.15em]">Products</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors block">Visio Creative Suite</a></li>
                                <li><a href="#" className="hover:text-white transition-colors block">Robocorpo</a></li>
                                <li><a href="#" className="hover:text-white transition-colors block">Studio Camp</a></li>
                                <li><a href="#" className="hover:text-white transition-colors block">HGA Radio</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.15em]">Divisions</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors block">Research Labs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors block">AdvancedAfricaAI</a></li>
                                <li><a href="#" className="hover:text-white transition-colors block">VisioClub</a></li>
                                <li><a href="#" className="hover:text-white transition-colors block">VM International</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.15em]">Corporate</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors block">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors block">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors block">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors block">Legal</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-medium tracking-wide">
                        <div>&copy; {new Date().getFullYear()} VISIOCORP. ALL RIGHTS RESERVED.</div>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-gray-300 transition-colors">PRIVACY POLICY</a>
                            <a href="#" className="hover:text-gray-300 transition-colors">TERMS OF SERVICE</a>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </footer>
    )
}


// --- Transition Video Section ---
const TransitionVideo = () => (
    <section className="relative w-full overflow-hidden bg-black">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-full"
        >
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
            >
                <source src="/Assets/transition video 1.mp4" type="video/mp4" />
            </video>
        </motion.div>
    </section>
);

// --- Main Export ---

export default function LandingPage({
    heroTitle = "Think Ahead. See Ahead",
    heroSubtitle = "VisioCorp builds AI systems, creative tools, and culture products for the next era of African excellence.",
    heroImage = "/IMG_6662.jpg",
    product1Image = "/Assets/Visio Pr Ai Assistant.png",
    product2Image = "/Assets/Studio Camp.png",
    product3Image = "/Assets/HGA Radio.jpg"
}: any) {
  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-black selection:text-white relative overflow-x-hidden">
      <Atmosphere />
      <Navbar />
      <Hero 
        title={heroTitle} 
        subtitle={heroSubtitle} 
        imageUrl={heroImage}
      />
      <TransitionVideo />
      <ShippingSection 
        product1Image={product1Image}
        product2Image={product2Image}
        product3Image={product3Image}
      />
      <ServicesSection />
      <SectionDivider />
      <ProcessSection />
      <SectionDivider />
      <EcosystemMap />
      <SectionDivider tone="dark" />
      <DivisionsSection />
      <SectionDivider />
      <Newsletter />
      <Footer />
    </div>
  );
}

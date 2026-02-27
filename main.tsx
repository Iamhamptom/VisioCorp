import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Play, 
  ExternalLink,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { defineProperties } from "figma:react";

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

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-widest text-black uppercase">VisioCorp</span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <a href="#products" className="text-gray-500 hover:text-black transition-colors">Products</a>
            <a href="#divisions" className="text-gray-500 hover:text-black transition-colors">Divisions</a>
            <a href="#media" className="text-gray-500 hover:text-black transition-colors">MirageMirror</a>
            <a href="#radio" className="text-gray-500 hover:text-black transition-colors">Radio</a>
            <a href="#about" className="text-gray-500 hover:text-black transition-colors">About</a>
            <a href="#login" className="text-gray-900 ml-4 hover:text-gray-600 transition-colors">Login</a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 hover:text-gray-600">
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
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 font-medium">
              <a href="#products" className="block text-gray-600 hover:text-black">Products</a>
              <a href="#divisions" className="block text-gray-600 hover:text-black">Divisions</a>
              <a href="#media" className="block text-gray-600 hover:text-black">MirageMirror</a>
              <a href="#radio" className="block text-gray-600 hover:text-black">Radio</a>
              <a href="#about" className="block text-gray-600 hover:text-black">About</a>
              <div className="pt-4 border-t border-gray-100">
                <a href="#login" className="block text-black font-semibold">Login</a>
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
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-8 overflow-hidden relative">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-full text-center md:text-left text-gray-400 font-medium tracking-wide uppercase text-sm md:text-base"
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
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
                <TaglineRotator />
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black mb-8 mt-4 leading-none"
                >
                    {title.split('.').map((part, i) => (
                        part && <span key={i} className="block">{part}.</span>
                    ))}
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-600 mb-10 max-w-lg leading-relaxed font-light"
                >
                    {subtitle}
                </motion.p>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group">
                    Get Visio Creative Suite v1 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                    <button className="bg-white text-black border border-gray-200 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all">
                    Explore the Corporation
                    </button>
                </motion.div>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative lg:h-[600px] w-full"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-50 rounded-2xl overflow-hidden">
                    <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1525770473232-8ad750e600ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGZ1dHVyaXN0aWMlMjBjb3Jwb3JhdGUlMjBhcmNoaXRlY3R1cmUlMjBzaWx2ZXIlMjB3aGl0ZXxlbnwxfHx8fDE3NzA1MTM5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                        alt="VisioCorp HQ Abstract"
                        className="w-full h-full object-cover opacity-80 mix-blend-multiply grayscale"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ title, subtitle, status, description, image, color = "bg-black" }: any) => (
    <div className="group relative bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300 overflow-hidden flex flex-col h-full">
        <div className="absolute top-4 right-4 z-10">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase ${
                status === 'Now Shipping' ? 'bg-black text-white' : 
                status === 'Beta' ? 'bg-gray-100 text-gray-800' :
                'bg-gray-50 text-gray-400'
            }`}>
                {status}
            </span>
        </div>
        <div className="h-64 overflow-hidden bg-gray-50 relative">
             <ImageWithFallback src={image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">{subtitle}</p>
            <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{description}</p>
            <div className="mt-auto">
                <button className="text-black font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                    Explore <ArrowRight size={16} />
                </button>
            </div>
        </div>
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
        <section id="products" className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl font-bold text-black tracking-tight mb-2">Now Shipping</h2>
                        <p className="text-gray-500">The latest deployments from the Visio factories.</p>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-gray-600 transition-colors">
                        View Full Catalogue <ChevronRight size={16} />
                    </a>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((p, i) => (
                        <ProductCard key={i} {...p} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProcessStep = ({ number, title, desc }: any) => (
    <div className="flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-0 text-left md:text-center group">
        <div className="shrink-0 w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:border-black transition-colors md:mb-6">
            {number}
        </div>
        <div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">{desc}</p>
        </div>
    </div>
)

const ProcessSection = () => {
    return (
        <section className="py-24 bg-gray-50 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-black tracking-tight mb-4">How Visio Works</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Our fundamental operating procedure for generating value and insight.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-px bg-gray-200 -z-10"></div>
                    
                    <ProcessStep 
                        number="1"
                        title="Collect Signal"
                        desc="We monitor data streams and cultural shifts to identify opportunities before they manifest."
                    />
                    <ProcessStep 
                        number="2"
                        title="Create Strategy"
                        desc="Visio Intel processes signal into actionable plans using advanced models."
                    />
                    <ProcessStep 
                        number="3"
                        title="Deploy Outcomes"
                        desc="Launch products, campaigns, and narratives with precision timing."
                    />
                </div>
            </div>
        </section>
    )
}

const EcosystemMap = () => {
    return (
        <section className="py-24 bg-black text-white overflow-hidden">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">The Ecosystem</h2>
                    <p className="text-gray-400">Structured for clarity. Built for scale.</p>
                </div>
                
                <div className="relative max-w-4xl mx-auto">
                    {/* Tree visual - Abstracted with simple CSS */}
                    <div className="flex flex-col items-center">
                        {/* Root */}
                        <div className="border border-white/20 bg-white/5 px-8 py-4 rounded-lg backdrop-blur-sm mb-12 relative">
                            <span className="font-bold text-xl tracking-widest uppercase">VisioCorp</span>
                            <div className="absolute top-full left-1/2 w-px h-12 bg-white/20 -translate-x-1/2"></div>
                        </div>

                        {/* Branches */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative">
                            {/* Horizontal Connector */}
                             <div className="hidden md:block absolute top-0 left-[16.66%] right-[16.66%] h-px bg-white/20 -translate-y-[1px]"></div>
                             
                             {/* Branch 1 */}
                             <div className="flex flex-col items-center">
                                <div className="hidden md:block w-px h-8 bg-white/20 mb-4"></div>
                                <div className="border border-white/10 bg-white/5 p-6 rounded-lg w-full text-center hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400">
                                        <Zap size={20} />
                                    </div>
                                    <h3 className="font-bold mb-2">Products</h3>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>Creative Suite v1</li>
                                        <li>Robocorpo</li>
                                        <li>Studio Camp</li>
                                    </ul>
                                </div>
                             </div>

                             {/* Branch 2 */}
                             <div className="flex flex-col items-center">
                                <div className="hidden md:block w-px h-8 bg-white/20 mb-4"></div>
                                <div className="border border-white/10 bg-white/5 p-6 rounded-lg w-full text-center hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400">
                                        <Layers size={20} />
                                    </div>
                                    <h3 className="font-bold mb-2">Divisions</h3>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>Research Labs</li>
                                        <li>AdvancedAfricaAI</li>
                                        <li>VisioClub</li>
                                        <li>VM International</li>
                                    </ul>
                                </div>
                             </div>

                             {/* Branch 3 */}
                             <div className="flex flex-col items-center">
                                <div className="hidden md:block w-px h-8 bg-white/20 mb-4"></div>
                                <div className="border border-white/10 bg-white/5 p-6 rounded-lg w-full text-center hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-400">
                                        <Radio size={20} />
                                    </div>
                                    <h3 className="font-bold mb-2">Media / Mythos</h3>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>MirageMirror</li>
                                        <li>HGA Radio</li>
                                    </ul>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    )
}

const DivisionItem = ({ name, desc, status, icon: Icon }: any) => (
    <div className="flex items-start gap-6 p-6 rounded-xl hover:bg-gray-50 transition-colors group border-b border-gray-100 last:border-0">
        <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 group-hover:bg-black group-hover:text-white transition-colors">
            <Icon size={24} />
        </div>
        <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                {status && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gray-200 text-gray-600 rounded-sm">
                        {status}
                    </span>
                )}
            </div>
            <p className="text-gray-500 leading-relaxed">{desc}</p>
        </div>
        <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
            <ArrowRight size={20} />
        </div>
    </div>
)

const DivisionsSection = () => {
    return (
        <section id="divisions" className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-gray-400 font-medium tracking-widest uppercase text-sm">Structure</span>
                    <h2 className="text-4xl font-bold text-black mt-2">Active Divisions</h2>
                </div>
                
                <div className="border border-gray-100 rounded-2xl shadow-sm bg-white overflow-hidden">
                    <DivisionItem 
                        name="Visio Research Labs 🧪" 
                        desc="Experiments, prototypes, papers, and case studies pushing the boundaries of what's possible."
                        status="Research"
                        icon={Beaker}
                    />
                     <DivisionItem 
                        name="AdvancedAfricaAI" 
                        desc="Sovereign enterprise AI direction, models, and large-scale data systems."
                        status="Coming Soon"
                        icon={Cpu}
                    />
                     <DivisionItem 
                        name="VisioClub" 
                        desc="Membership, perks, early access, and community for the corporation's elite."
                        status="Waitlist"
                        icon={Users}
                    />
                     <DivisionItem 
                        name="Corpo" 
                        desc="Fashion identity, drops, and the official Visio lookbook."
                        status="In Development"
                        icon={Monitor}
                    />
                     <DivisionItem 
                        name="VM International" 
                        desc="Global operations, partnerships, and ventures holding."
                        status="Restricted"
                        icon={Globe}
                    />
                </div>
            </div>
        </section>
    )
}

const Newsletter = () => (
    <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Join the Corporation Updates</h2>
            <p className="text-gray-500 mb-8">Receive intelligence, product drops, and research papers directly to your inbox.</p>
            <div className="flex gap-2">
                <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Subscribe
                </button>
            </div>
        </div>
    </section>
)

const Footer = () => {
    return (
        <footer className="bg-black text-white py-16 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-2 pr-8">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="font-extrabold text-2xl tracking-widest uppercase">VisioCorp</span>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-xs text-sm leading-relaxed">
                            Think Ahead. See Ahead. Building the next era of African excellence through intelligence and design.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Products</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Visio Creative Suite</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Robocorpo</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Studio Camp</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">HGA Radio</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Divisions</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Research Labs</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">AdvancedAfricaAI</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">VisioClub</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">VM International</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Corporate</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <div>&copy; {new Date().getFullYear()} VisioCorp. All rights reserved.</div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// --- Main Export ---

export default function LandingPage({ 
    heroTitle, 
    heroSubtitle, 
    heroImage,
    product1Image,
    product2Image,
    product3Image
}: any) {
  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-black selection:text-white">
      <Navbar />
      <Hero 
        title={heroTitle} 
        subtitle={heroSubtitle} 
        imageUrl={heroImage}
      />
      <ShippingSection 
        product1Image={product1Image}
        product2Image={product2Image}
        product3Image={product3Image}
      />
      <ProcessSection />
      <EcosystemMap />
      <DivisionsSection />
      <Newsletter />
      <Footer />
    </div>
  );
}

// --- Property Definitions ---
defineProperties(LandingPage, {
  heroTitle: {
    label: "Hero Title",
    type: "string",
    defaultValue: "Think Ahead. See Ahead"
  },
  heroSubtitle: {
    label: "Hero Subtitle",
    type: "string",
    defaultValue: "VisioCorp builds AI systems, creative tools, and culture products for the next era of African excellence."
  },
  heroImage: {
    label: "Hero Image",
    type: "image",
    defaultValue: "https://images.unsplash.com/photo-1525770473232-8ad750e600ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGZ1dHVyaXN0aWMlMjBjb3Jwb3JhdGUlMjBhcmNoaXRlY3R1cmUlMjBzaWx2ZXIlMjB3aGl0ZXxlbnwxfHx8fDE3NzA1MTM5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  product1Image: {
    label: "Product 1 Image",
    type: "image",
    defaultValue: "https://images.unsplash.com/photo-1634836023845-eddbfe9937da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMGRhc2hib2FyZCUyMHVpJTIwZGFyayUyMG1vZGV8ZW58MXx8fHwxNzcwNTE1MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  product2Image: {
    label: "Product 2 Image",
    type: "image",
    defaultValue: "https://images.unsplash.com/photo-1733670752261-1cfaf1c84f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMDNkJTIwZ2VvbWV0cmljJTIwc2hhcGUlMjByb2JvdHxlbnwxfHx8fDE3NzA1MTUyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  product3Image: {
    label: "Product 3 Image",
    type: "image",
    defaultValue: "https://images.unsplash.com/photo-1759912804199-a104b710a308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHNvdW5kJTIwd2F2ZSUyMHZpc3VhbGl6YXRpb24lMjBmdXR1cmlzdGljfGVufDF8fHx8MTc3MDUxNTIyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
});

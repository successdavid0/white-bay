'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

const contactMethods = [
  {
    icon: <Phone size={24} />,
    title: 'Call Us',
    description: 'Speak with our reservations team',
    value: SITE_CONFIG.contact.phone,
    href: `tel:${SITE_CONFIG.contact.phone}`,
    color: 'from-ocean-500 to-ocean-600',
  },
  {
    icon: <Mail size={24} />,
    title: 'Email Us',
    description: 'Send us your inquiries',
    value: SITE_CONFIG.contact.email,
    href: `mailto:${SITE_CONFIG.contact.email}`,
    color: 'from-teal-400 to-teal-500',
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'WhatsApp',
    description: 'Chat with us directly',
    value: 'Message on WhatsApp',
    href: `https://wa.me/${SITE_CONFIG.contact.whatsapp}`,
    color: 'from-green-500 to-green-600',
  },
  {
    icon: <MapPin size={24} />,
    title: 'Visit Us',
    description: 'Find us at our location',
    value: SITE_CONFIG.contact.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.contact.address)}`,
    color: 'from-gold-400 to-gold-500',
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&q=80"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-500/60 via-navy-500/40 to-sand-100" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold-400 font-accent text-sm tracking-widest uppercase mb-4 block"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl text-white text-shadow-lg mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            We&apos;d love to hear from you. Our team is always ready to assist 
            with your inquiries and reservation needs.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-sand-100">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <StaggerItem key={index}>
                <motion.a
                  href={method.href}
                  target={method.title === 'Visit Us' || method.title === 'WhatsApp' ? '_blank' : undefined}
                  rel={method.title === 'Visit Us' || method.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="block group bg-white p-6 rounded-2xl shadow-lg shadow-navy-500/5 hover:shadow-2xl hover:shadow-navy-500/10 transition-all duration-500"
                >
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 bg-gradient-to-r',
                    method.color
                  )}>
                    {method.icon}
                  </div>
                  <h3 className="font-heading text-xl text-navy-500 mb-1">{method.title}</h3>
                  <p className="text-navy-500/60 text-sm mb-2">{method.description}</p>
                  <p className="text-ocean-500 font-accent text-sm group-hover:underline">
                    {method.value}
                  </p>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection direction="left">
              <div className="bg-sand-100 rounded-3xl p-8 md:p-12">
                <h2 className="font-heading text-3xl text-navy-500 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-navy-500/60 mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto bg-teal-400 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-white" />
                    </div>
                    <h3 className="font-heading text-2xl text-navy-500 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-navy-500/60">
                      Thank you for reaching out. We&apos;ll respond to your inquiry shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-ocean-500 font-accent hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-navy-500 font-accent text-sm mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-navy-500 font-accent text-sm mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-navy-500 font-accent text-sm mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-navy-500 font-accent text-sm mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors appearance-none"
                        >
                          <option value="">Select a subject</option>
                          <option value="reservation">Reservation Inquiry</option>
                          <option value="general">General Question</option>
                          <option value="feedback">Feedback</option>
                          <option value="corporate">Corporate/Events</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-navy-500 font-accent text-sm mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={cn(
                        'w-full py-4 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-accent font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-ocean-500/30 transition-all',
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:shadow-ocean-500/40'
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Map & Info */}
            <AnimatedSection direction="right">
              <div className="h-full flex flex-col">
                {/* Map */}
                <div className="flex-1 min-h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-navy-500/10 mb-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.5481073668283!2d-80.13005492397576!3d25.786647977343186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6823cd5c5c1%3A0xd0a32a90f86bea36!2sMiami%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1703000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Operating Hours */}
                <div className="bg-gradient-to-r from-navy-500 to-navy-600 rounded-3xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gold-400 rounded-xl flex items-center justify-center">
                      <Clock size={24} className="text-navy-500" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl">Operating Hours</h3>
                      <p className="text-white/60 text-sm">Our team is here to help</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Reception</span>
                      <span className="font-accent">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Reservations</span>
                      <span className="font-accent">8:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Concierge</span>
                      <span className="font-accent">7:00 AM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Room Service</span>
                      <span className="font-accent">24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 bg-sand-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase mb-4 block">
              <Sparkles size={16} className="inline mr-2" />
              Quick Help
            </span>
            <h2 className="font-heading text-4xl text-navy-500 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-navy-500/70 mb-12">
              Find quick answers to common questions about your stay at WhiteBay Resort.
            </p>

            <div className="space-y-4 text-left">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      className="bg-white rounded-2xl overflow-hidden shadow-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className="font-accent font-medium text-navy-500">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-ocean-500"
        >
          ▼
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-navy-500/70">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

// FAQ Data
const faqs = [
  {
    question: 'What is the check-in and check-out time?',
    answer: 'Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out can be arranged based on availability.',
  },
  {
    question: 'Is airport transfer available?',
    answer: 'Yes, we offer complimentary airport transfers for guests staying in our suites and villas. Standard room guests can request transfers at an additional fee.',
  },
  {
    question: 'Are pets allowed at the resort?',
    answer: 'We welcome small pets in designated pet-friendly rooms. Please inform us at the time of booking, and a pet fee will apply.',
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'Free cancellation up to 48 hours before check-in. Cancellations within 48 hours are subject to one night\'s charge.',
  },
];


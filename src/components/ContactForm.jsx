// ============================================================
// CONTACTFORM.JSX — Simple Contact Form (Day 3)
// ============================================================
// A standalone contact form component with form validation.
// This is a simpler alternative to the ContactSection's
// inline form — used for learning form basics.
//
// WHAT YOU WILL LEARN:
// - useState for managing form data (object state)
// - Controlled inputs (value + onChange pattern)
// - Form submission with e.preventDefault()
// - Conditional rendering for validation messages
// - Dynamic className for error styling
// - Async functions and try/catch/finally
//
// CONCEPTS COVERED:
// - Object destructuring in event handlers
// - Spread operator for updating state: { ...prev, [name]: value }
// - Ternary expressions in className
// - Conditional rendering with && operator
//
// ============================================================

// STEP 1: Import useState from "react"

/* --- YOUR IMPORTS GO HERE --- */

// STEP 2: Create and export the ContactForm component
// export default function ContactForm() { ... }
//
// STEP 3: State variables (4 total)
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", email: "", message: ""
//   });
//
// STEP 4: Event handlers
//
//   handleChange — updates formData when user types
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     };
//     DISCUSSION: What does { ...prev, [name]: value } do?
//     It creates a copy of the previous state and updates
//     only the field that changed (computed property name).
//
//   handleSubmit — validates and "sends" the form
//     - Call e.preventDefault() to stop page reload
//     - Set submitted to true (shows validation errors)
//     - Check if all fields are filled
//     - Set loading to true, simulate sending, show success/error
//
//   sendEmail — simulates an API call
//     const sendEmail = async (data) => {
//       console.log("Email would be sent with:", data);
//       return new Promise((resolve) => setTimeout(resolve, 1000));
//     };
//
// STEP 5: Build the JSX
//   <form onSubmit={handleSubmit} className="...">
//     - <h2> title
//     - Message display (success or error)
//     - Input fields: firstName, lastName (2-column grid)
//     - Input field: email (full width, col-span-2)
//     - Textarea: message (full width, col-span-2)
//     - Submit button (disabled when loading)
//
//   Each input should be a CONTROLLED INPUT:
//     <input
//       type="text"
//       name="firstName"
//       value={formData.firstName}
//       onChange={handleChange}
//       className={`... ${submitted && !formData.firstName ? "border-red" : "border-normal"}`}
//     />
//
//   Show validation error below each input:
//     {submitted && !formData.firstName && (
//       <p className="text-red-700 text-sm">First name is required</p>
//     )}

/* --- YOUR COMPONENT CODE GOES HERE --- */

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "./ui/ScrollReveal";
import Separator from "./ui/Separator";
import Input, { Textarea } from "./ui/Input";
import Button from "./ui/Button";

const contactChannels = [
    {
        name: "Visit Our Roastery",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
            </svg>
        ),
        gradient: "from-amber-700 to-amber-500",
        accentColor: "var(--amber)",
        detail: "Beans Place, Strasburg, CO 80136",
        action: "Get Directions",
        href: "https://maps.google.com/?q=Beans+Place+Strasburg+CO"
    },
    {
        name: "Opening Hours",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        gradient: "from-yellow-700 to-yellow-500",
        accentColor: "#ca8a04",
        detail: "Mon–Fri: 7am–6pm  |  Sat–Sun: 8am–4pm",
        action: "Plan Your Visit",
        href: "#contact"
    },
    {
        name: "Email Us",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
            </svg>
        ),
        gradient: "from-orange-700 to-orange-500",
        accentColor: "#c2410c",
        detail: "hello@thebeansplace.com",
        action: "Send Email",
        href: "mailto:hello@thebeansplace.com"
    },
    {
        name: "Call Us",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
            </svg>
        ),
        gradient: "from-stone-700 to-stone-500",
        accentColor: "#78716c",
        detail: "(303) 555-BEAN",
        action: "Call Now",
        href: "tel:+13035552326"
    }
];
/* Tilt card with mouse tracking */
function TiltCard({ children, className, href, target, rel }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(
        useTransform(y, [-0.5, 0.5], [6, -6], { stiffness: 200, damping: 20 })
    );
    const rotateY = useSpring(
        useTransform(x, [-0.5, 0.5], [-6, 6], { stiffness: 200, damping: 20 })
    );

    function handleMouse(e) {
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleLeave() {
        x.set(0);
        y.set(0);
    }

    const Tag = href ? motion.a : motion.div;

    return (
        <Tag
            ref={ref}
            href={href}
            target={target}
            rel={rel}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouse}
            style={{ rotateX, rotateY, transformPerspective: 600 }}
            className={className}>
            {children}
        </Tag>
    );
}

/* Contact form with animations */
function ContactFormInline() {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: ""});
    const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'
    const [touched, setTouched] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value }))
    };
    
    const handleBlur = (e) => {
        setTouched((prev) => ({...prev, [e.target.name]: true}))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, subject: true, message: true });
        
        if(!formData.name || !formData.email || !formData.message) return;
        
        setStatus("sending");
        try {
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setStatus("sent");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTouched({});
            setTimeout(() => setStatus(null), 4000)
        } catch {
            setStatus("error");
            setTimeout(() => setStatus(null), 4000)
        }
    };
    
    return(
        <motion.form
            onSubmit={handleSubmit}
            className="contact-form-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            {/* Form Header */}
            <div className="mb-6">
                <h3 className="contact-form-title">
                    Send a Message
                </h3>
                <p className="contact-form-subtitle">
                    We'd love to hear from you. Fill out the form and we'll get back within 24 hours.
                </p>
            </div>
            
            <div className="contact-form-grid">
                <Input
                    label="Your Name"
                    id="contact-name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && !formData.name ? "Name is required" : undefined }
                />
                
                <Input 
                    label="Email Address"
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && !formData.email ? "Email is required" : undefined }
                />
                
            </div>
            
            <div className="mt-4">
                <Input 
                    label="Subject"
                    id="contact-subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                />
            </div>
            
            <div className="mt-4">
                <TextArea 
                    label="Message"
                    id="contact-message"
                    name="message"
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message && !formData.message ? "Message is required" : undefined}
                />
            </div>
            
        </motion.form>
        
        
    );
}

import type { Locale } from "./localizedRoutes";
import type { HomePageData } from "./queries";

// Home page content used when the Sanity fetch fails or returns null, and the
// seed for the `homePage-{locale}` documents (studio/scripts/seed-content.ts).
// Testimonials are placeholders until the client sends real ones.
const ES: HomePageData = {
	hero: {
		eyebrow: "Turismo médico de calidad",
		titleStart: "“Tu cuerpo tiene más años",
		titleAccent: "por vivir. Vívelos mejor.”",
		subtitle:
			"Conectamos pacientes con especialistas médicos líderes en Bogotá, con atención de clase mundial a un precio justo.",
		ctaPrimaryLabel: "Agendar consulta",
		ctaSecondaryLabel: "Ver especialidades",
	},
	// Hidden until the client sends real figures (the band renders only when set).
	stats: [],
	processEyebrow: "Proceso",
	processTitle: "Tu viaje médico, paso a paso",
	journey: [
		{
			icon: "Phone",
			title: "Consulta inicial",
			body: "Evaluamos tu caso y te orientamos sobre las mejores opciones disponibles.",
		},
		{
			icon: "ClipboardCheck",
			title: "Plan personalizado",
			body: "Diseñamos un plan médico adaptado a tus necesidades y presupuesto.",
		},
		{
			icon: "Stethoscope",
			title: "Atención médica",
			body: "Recibes tratamiento con nuestros especialistas certificados internacionalmente.",
		},
		{
			icon: "HeartPulse",
			title: "Seguimiento",
			body: "Acompañamiento post-tratamiento para garantizar tu recuperación óptima.",
		},
	],
	whyUsEyebrow: "Por qué elegirnos",
	whyUsTitle: "La mejor opción para tu salud",
	whyUsSubtitle:
		"Nos comprometemos con tu bienestar en cada etapa del proceso.",
	whyUsBadgeText: "Especialistas certificados",
	reasons: [
		{
			icon: "ShieldCheck",
			title: "Calidad certificada",
			body: "Todos nuestros especialistas cuentan con certificaciones internacionales y amplia experiencia.",
		},
		{
			icon: "Award",
			title: "Precios transparentes",
			body: "Sin costos ocultos. Recibes un presupuesto detallado antes de iniciar cualquier tratamiento.",
		},
		{
			icon: "HeartPulse",
			title: "Acompañamiento integral",
			body: "Desde la consulta inicial hasta tu recuperación, estamos contigo en cada paso.",
		},
	],
	testimonialsEyebrow: "Testimonios",
	testimonialsTitle: "Lo que dicen nuestros pacientes",
	testimonials: [
		{
			name: "María González",
			detail: "Cirugía de cadera, Bogotá",
			rating: 5,
			text: "El servicio fue excepcional. Me ayudaron a encontrar el mejor especialista y coordinaron todo el proceso. Recuperé mi movilidad y calidad de vida gracias a Scope Health.",
		},
		{
			name: "Carlos Restrepo",
			detail: "Implantes dentales, Medellín",
			rating: 5,
			text: "Increíble experiencia. El proceso fue sencillo, transparente y el resultado superó todas mis expectativas. Lo recomiendo ampliamente a quienes buscan calidad.",
		},
		{
			name: "Ana Martínez",
			detail: "Cirugía ocular, Cali",
			rating: 5,
			text: "Nunca imaginé que acceder a tratamiento de clase mundial fuera tan fácil. El equipo de Scope Health me guió en cada paso con profesionalismo y calidez.",
		},
	],
	ctaEyebrow: "Agenda tu consulta",
	ctaTitle: "Comienza tu viaje hacia una mejor salud hoy",
	ctaSubtitle:
		"Contáctanos y recibe asesoría personalizada sin costo de nuestros especialistas.",
	ctaPrimaryLabel: "Agendar consulta",
	ctaPhone: "+57 310 344 5645",
};

const EN: HomePageData = {
	hero: {
		eyebrow: "Quality medical tourism",
		titleStart: "“Your body has more years",
		titleAccent: "to live. Live them better.”",
		subtitle:
			"We connect patients with leading medical specialists in Bogotá, offering world-class care at a fair price.",
		ctaPrimaryLabel: "Book a consultation",
		ctaSecondaryLabel: "See specialties",
	},
	// Hidden until the client sends real figures (the band renders only when set).
	stats: [],
	processEyebrow: "How it works",
	processTitle: "Your medical journey, step by step",
	journey: [
		{
			icon: "Phone",
			title: "First consultation",
			body: "We review your case and walk you through the best options available.",
		},
		{
			icon: "ClipboardCheck",
			title: "Personalized plan",
			body: "We build a medical plan around your needs and your budget.",
		},
		{
			icon: "Stethoscope",
			title: "Treatment",
			body: "You're treated by our internationally certified specialists.",
		},
		{
			icon: "HeartPulse",
			title: "Follow-up",
			body: "We stay with you after treatment to make sure you recover well.",
		},
	],
	whyUsEyebrow: "Why choose us",
	whyUsTitle: "The right choice for your health",
	whyUsSubtitle: "We're committed to your wellbeing at every stage.",
	whyUsBadgeText: "Certified specialists",
	reasons: [
		{
			icon: "ShieldCheck",
			title: "Certified quality",
			body: "All our specialists hold international certifications and extensive experience.",
		},
		{
			icon: "Award",
			title: "Transparent pricing",
			body: "No hidden costs. You get a detailed quote before any treatment begins.",
		},
		{
			icon: "HeartPulse",
			title: "Full support",
			body: "From your first consultation to your recovery, we're with you at every step.",
		},
	],
	testimonialsEyebrow: "Testimonials",
	testimonialsTitle: "What our patients say",
	testimonials: [
		{
			name: "María González",
			detail: "Hip surgery, Bogotá",
			rating: 5,
			text: "The service was exceptional. They helped me find the right specialist and coordinated the whole process. I got my mobility and quality of life back thanks to Scope Health.",
		},
		{
			name: "Carlos Restrepo",
			detail: "Dental implants, Medellín",
			rating: 5,
			text: "An incredible experience. The process was simple and transparent, and the result exceeded all my expectations. I highly recommend it to anyone looking for quality care.",
		},
		{
			name: "Ana Martínez",
			detail: "Eye surgery, Cali",
			rating: 5,
			text: "I never imagined world-class treatment could be so easy to access. The Scope Health team guided me through every step with professionalism and warmth.",
		},
	],
	ctaEyebrow: "Book your consultation",
	ctaTitle: "Start your journey to better health today",
	ctaSubtitle:
		"Get in touch for free, personalized guidance from our specialists.",
	ctaPrimaryLabel: "Book a consultation",
	ctaPhone: "+57 310 344 5645",
};

export const HOME_FALLBACK: Record<Locale, HomePageData> = { es: ES, en: EN };

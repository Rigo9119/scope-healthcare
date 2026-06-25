import type { HomePageData } from "./queries";

// Inline content used when the Sanity fetch fails or returns null.
export const FALLBACK: HomePageData = {
	hero: {
		eyebrow: "Turismo médico de calidad",
		titleStart: "Tu salud en las",
		titleAccent: "mejores manos del mundo",
		subtitle:
			"Conectamos pacientes con los mejores especialistas médicos internacionales, garantizando atención de clase mundial al mejor precio.",
		ctaPrimaryLabel: "Agendar consulta",
		ctaSecondaryLabel: "Ver especialidades",
	},
	stats: [
		{ value: "25+", label: "Años de experiencia", icon: "Award" },
		{ value: "40k+", label: "Pacientes atendidos", icon: "UserRound" },
		{ value: "120", label: "Especialistas", icon: "Stethoscope" },
		{ value: "4.9", label: "Calificación promedio", icon: "Star" },
	],
	specialtiesEyebrow: "Especialidades",
	specialtiesTitle: "Áreas de atención médica",
	specialtiesSubtitle:
		"Contamos con especialistas certificados en las principales ramas de la medicina.",
	specialtiesLinkLabel: "Más información",
	specialties: [
		{
			icon: "Smile",
			title: "Odontología",
			body: "Tratamientos dentales de alta calidad con tecnología de punta.",
		},
		{
			icon: "Sparkles",
			title: "Estética",
			body: "Procedimientos estéticos certificados con los mejores resultados.",
		},
		{
			icon: "Bone",
			title: "Ortopedia",
			body: "Cirugías ortopédicas de precisión y rehabilitación avanzada.",
		},
		{
			icon: "Eye",
			title: "Oftalmología",
			body: "Corrección visual y tratamientos oculares de última generación.",
		},
		{
			icon: "HeartPulse",
			title: "Cardiología",
			body: "Diagnóstico y tratamiento cardiovascular de excelencia.",
		},
		{
			icon: "Baby",
			title: "Pediatría",
			body: "Atención integral para los más pequeños con especialistas certificados.",
		},
		{
			icon: "Scale",
			title: "Bariátrica",
			body: "Cirugías de pérdida de peso con acompañamiento nutricional.",
		},
		{
			icon: "Microscope",
			title: "Oncología",
			body: "Tratamientos oncológicos con tecnología de vanguardia.",
		},
	],
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
	whyUsBadgeText: "Satisfacción garantizada",
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
	ctaPhone: "+57 (1) 000 0000",
};

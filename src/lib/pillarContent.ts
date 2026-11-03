// ─── Pillar item content ───────────────────────────────────────────────────────
// Rich content for each pillar item page (wireframe 1.2 / 2.2 / 3.2), sourced
// from the client's content doc ("scope healthcare_pagina web.docx"). Lives in
// Sanity as `pillarItem` documents (`pillarItem-{slug}-{locale}`); this file is
// the fallback when Sanity is unreachable AND the seed for those documents
// (`scripts/seed-sanity.ts`). Every block is optional: the item page renders
// only what an item has, so thin items still look finished.

import type { Locale } from "./localizedRoutes";

export interface PillarItemContent {
	/** Short uppercase descriptor line, e.g. "Salud metabólica · Bienestar". */
	tagline?: string;
	/** One or two sentences: page subtitle, card text and meta description. */
	summary: string;
	intro?: string[];
	/** "¿Cuándo consultar?" / "¿Para quién es?" block. */
	audience?: { title: string; body: string };
	/** Bulleted lists, e.g. "Condiciones que atendemos", "Procedimientos". */
	lists?: Array<{ title: string; items: string[] }>;
	/** Priced programs (e.g. Scope Vital 6M), rendered as cards with steps. */
	programs?: Array<{
		name: string;
		subtitle?: string;
		description?: string;
		steps?: Array<{ title: string; details?: string[]; price?: string }>;
		features?: string[];
	}>;
	/** Numbered experience steps (e.g. Living Medical). */
	steps?: Array<{ title: string; subtitle?: string; body: string }>;
	/** "Enfoque SCOPE" callout. */
	approach?: { title: string; body: string };
	/** Overrides the default booking band at the bottom of the page. */
	cta?: { eyebrow?: string; title: string; body?: string; label: string };
}

export type PillarContentMap = Record<string, PillarItemContent>;

const APPROACH = { es: "Enfoque SCOPE", en: "The Scope approach" };
const WHEN = { es: "¿Cuándo consultar?", en: "When to see us" };
const FOR_WHO = { es: "¿Para quién es?", en: "Who is it for?" };
const CONDITIONS = {
	es: "Condiciones que atendemos",
	en: "Conditions we treat",
};
const PROCEDURES = {
	es: "Procedimientos y servicios",
	en: "Procedures and services",
};
const INCLUDES = { es: "Qué incluye", en: "What's included" };

// Shared steps of the gastric-balloon programs (6M / 12M only differ in the
// placement price), as printed on the client's "Scope Vital" flyers. English
// prices add a rounded USD figure (≈ 3,200 COP/USD, Nov 2026).
function vitalProgram(
	locale: Locale,
	months: 6 | 12,
	placementPrice: string,
): NonNullable<PillarItemContent["programs"]>[number] {
	const es = locale === "es";
	return {
		name: `Scope Vital ${months}M`,
		subtitle: es ? "Nueva versión de ti" : "A new version of you",
		description: es
			? "Un camino integral, seguro y acompañado para transformar tu salud y tu vida."
			: "A comprehensive, safe and supported path to transform your health and your life.",
		steps: [
			{
				title: es ? "Valoración" : "Assessment",
				details: [
					es
						? "Consulta con médico especialista en Gastroenterología"
						: "Consultation with a gastroenterology specialist",
				],
				price: es ? "$0" : "Included",
			},
			{
				title: es ? "Colocación" : "Placement",
				details: es
					? [
							"Endoscopia exploratoria previa a la inserción",
							"Endoscopia de inserción de balón gástrico bajo sedación",
						]
					: [
							"Exploratory endoscopy before insertion",
							"Gastric balloon insertion endoscopy under sedation",
						],
				price: placementPrice,
			},
			{
				title: es ? "Seguimiento" : "Follow-up",
				details: es
					? [
							"Atención de enfermería en casa durante 2 días (2 visitas)",
							"Valoración y educación nutricional",
						]
					: [
							"At-home nursing care for 2 days (2 visits)",
							"Nutritional assessment and education",
						],
				price: es ? "$0" : "Included",
			},
			{
				title: es ? "Retiro" : "Removal",
				details: [
					es
						? "Acompañamiento médico especializado continuo"
						: "Continuous specialized medical support",
				],
				price: es ? "$1.500.000 COP" : "COP 1,500,000 (≈ USD 470)",
			},
		],
		features: es
			? [
					"Atención personalizada en cada etapa de tu proceso",
					"Enfermeras entrenadas para brindarte seguridad y confianza",
					"Asesoría nutricional con planes personalizados",
					"Soporte online 24 h",
				]
			: [
					"Personalized care at every stage",
					"Trained nurses for your safety and peace of mind",
					"Nutritional guidance with personalized plans",
					"24/7 online support",
				],
	};
}

const ES: PillarContentMap = {
	// ── Scope Clinic ──────────────────────────────────────────────────────────
	gastroenterologia: {
		summary:
			"Evaluamos, diagnosticamos y tratamos las enfermedades del tubo digestivo y sus órganos anexos: esófago, estómago, intestino delgado, colon, recto, hígado, vías biliares y páncreas.",
		intro: [
			"Desde una endoscopia de rutina hasta el seguimiento de una enfermedad digestiva crónica, el objetivo es el mismo: encontrar la causa real, no solo calmar el síntoma.",
		],
		audience: {
			title: WHEN.es,
			body: "Reflujo o acidez persistente, dolor abdominal recurrente, cambios en el hábito intestinal (diarrea o estreñimiento crónico), sangrado digestivo, distensión abdominal, pérdida de peso sin causa aparente, o antecedentes familiares de enfermedad inflamatoria intestinal o cáncer colorrectal son razones suficientes para una valoración especializada, con un enfoque preventivo y personalizado.",
		},
		lists: [
			{
				title: CONDITIONS.es,
				items: [
					"Enfermedad por reflujo gastroesofágico (ERGE)",
					"Gastritis, úlcera péptica e infección por Helicobacter pylori",
					"Síndrome de intestino irritable y otros trastornos funcionales digestivos",
					"Enfermedad inflamatoria intestinal (colitis ulcerativa, enfermedad de Crohn)",
					"Enfermedad hepática grasa, hepatitis y otras afecciones del hígado",
					"Cálculos biliares y enfermedades de la vía pancreatobiliar",
					"Pólipos colónicos y tamización de cáncer colorrectal",
				],
			},
			{
				title: PROCEDURES.es,
				items: [
					"Endoscopia digestiva alta diagnóstica",
					"Colonoscopia",
					"Polipectomía endoscópica",
					"Toma de biopsias dirigidas",
					"Pruebas para detección de Helicobacter pylori",
					"Enteroscopia con balón diagnóstica y terapéutica",
					"Estudio de intestino delgado con videocápsula",
					"pH-metría esofágica",
					"Ultrasonido endoscópico diagnóstico y terapéutico",
					"Manejo de patología anorrectal, como hemorroides y fisuras",
				],
			},
		],
		approach: {
			title: APPROACH.es,
			body: "Creemos en la transparencia diagnóstica: te explicamos qué encontramos, qué significa y qué opciones de manejo existen, sin tecnicismos innecesarios, pero sin omitir información relevante para tu decisión. El seguimiento clínico es parte del tratamiento, no un paso adicional.",
		},
	},
	urologia: {
		summary:
			"Atendemos el sistema urinario de hombres y mujeres (riñones, uréteres, vejiga) y el aparato reproductor masculino, desde la consulta preventiva hasta el manejo de condiciones crónicas y el acompañamiento en procesos oncológicos.",
		intro: [
			"La urología es, por naturaleza, una especialidad que combina lo clínico con lo quirúrgico: muchas condiciones se resuelven con manejo médico, y solo cuando es necesario se llega a una intervención.",
		],
		audience: {
			title: WHEN.es,
			body: "Dolor lumbar o en el flanco, sangre en la orina, ardor o dificultad para orinar, infecciones urinarias que se repiten, síntomas asociados al crecimiento de la próstata (chorro débil, levantarse varias veces en la noche a orinar), disfunción eréctil, dificultades de fertilidad o, simplemente, el chequeo preventivo que corresponde a partir de cierta edad o por antecedentes familiares.",
		},
		lists: [
			{
				title: CONDITIONS.es,
				items: [
					"Infecciones urinarias recurrentes",
					"Litiasis renal y de vías urinarias (cálculos)",
					"Hiperplasia prostática benigna",
					"Tamización y detección temprana de cáncer de próstata, vejiga y riñón",
					"Incontinencia urinaria",
					"Disfunción eréctil",
					"Varicocele e infertilidad masculina",
				],
			},
			{
				title: PROCEDURES.es,
				items: [
					"Cistoscopia diagnóstica",
					"Vasectomía",
					"Inyección de toxina botulínica intravesical",
					"Biopsia o mapeo de vejiga",
					"Retiro de catéter ureteral (doble J)",
					"Antígeno prostático específico (PSA) y tacto rectal",
					"Manejo médico y seguimiento de litiasis urinaria",
				],
			},
		],
		approach: {
			title: APPROACH.es,
			body: "Muchas consultas urológicas involucran temas que no siempre son fáciles de hablar; por eso priorizamos la privacidad, el trato directo y sin juicios, y una explicación honesta de cada opción de manejo, quirúrgica o no. Nos especializamos en tecnologías soportadas bajo sedación que reducen significativamente el dolor y la incomodidad.",
		},
	},
	"medicina-fisica-deporte": {
		summary:
			"Prevención, diagnóstico, tratamiento y rehabilitación de las lesiones relacionadas con la actividad física, y optimización del rendimiento y la salud de quienes entrenan.",
		audience: {
			title: WHEN.es,
			body: "Deportistas de alto rendimiento, deportistas aficionados, personas activas y cualquiera que esté por iniciar un plan de ejercicio y quiera hacerlo con una valoración médica previa.",
		},
		lists: [
			{
				title: CONDITIONS.es,
				items: [
					"Lesiones osteomusculares relacionadas con la actividad física (esguinces, tendinopatías, desgarros musculares)",
					"Lesiones articulares y ligamentarias por sobreuso o trauma deportivo",
					"Dolor musculoesquelético asociado al entrenamiento",
					"Procesos de recuperación y readaptación deportiva tras lesión o cirugía",
				],
			},
			{
				title: PROCEDURES.es,
				items: [
					"Valoración médico-deportiva y chequeo precompetitivo",
					"Evaluación biomecánica",
					"Diagnóstico y manejo de lesiones deportivas",
					"Planes de recuperación funcional y readaptación al deporte",
					"Terapias complementarias según indicación clínica (por ejemplo, ondas de choque)",
				],
			},
		],
		approach: {
			title: APPROACH.es,
			body: "Cada plan de recuperación se diseña según el deporte, el nivel de exigencia y los objetivos reales del paciente: no hay protocolos genéricos. El objetivo no es solo tratar la lesión, sino entender por qué ocurrió y cómo prevenir que se repita. Del regreso seguro a la actividad física al mejor rendimiento posible: valoramos, tratamos y acompañamos.",
		},
	},
	reumatologia: {
		summary:
			"Diagnóstico y manejo de las enfermedades del sistema musculoesquelético y del tejido conectivo, con particular atención a las condiciones inflamatorias y autoinmunes.",
		audience: {
			title: WHEN.es,
			body: "Dolor articular persistente, rigidez matutina prolongada, inflamación articular recurrente, fatiga inexplicada acompañada de dolor muscular o articular, o antecedentes familiares de enfermedad autoinmune.",
		},
		lists: [
			{
				title: CONDITIONS.es,
				items: [
					"Artritis reumatoide",
					"Lupus eritematoso sistémico",
					"Espondiloartritis y espondilitis anquilosante",
					"Osteoartritis (artrosis)",
					"Fibromialgia",
					"Gota y otras artropatías",
					"Osteoporosis",
					"Síndrome de Sjögren y otras enfermedades autoinmunes",
				],
			},
			{
				title: "Servicios",
				items: [
					"Consulta especializada en reumatología, virtual o presencial",
					"Evaluación del dolor articular y muscular",
					"Educación al paciente y acompañamiento continuo",
					"Infiltraciones articulares guiadas",
					"Biopsia de glándula salival menor para el diagnóstico de enfermedades autoinmunes (síndrome de Sjögren)",
				],
			},
		],
		approach: {
			title: APPROACH.es,
			body: "Detrás del dolor articular, la fatiga o la inflamación hay personas que buscan respuestas, alivio y acompañamiento. Por eso ofrecemos una atención personalizada, con una escucha cercana y humana, acompañando a cada paciente en la búsqueda de su diagnóstico y de un tratamiento integral que mejore su calidad de vida y le permita recuperar movilidad, bienestar y confianza.",
		},
	},
	psicologia: {
		summary:
			"El componente emocional de una condición médica rara vez se atiende solo y, sin embargo, casi siempre determina si un tratamiento funciona o no.",
		intro: [
			"Nuestro acompañamiento psicológico se enfoca en la adherencia al tratamiento, el manejo del componente emocional de las enfermedades crónicas o el dolor persistente, y el trabajo sobre la relación de cada paciente con su cuerpo, su alimentación o su actividad física, según el programa.",
		],
	},
	nutricion: {
		summary:
			"Un plan de alimentación no sirve de mucho si no está diseñado para la condición específica que se está tratando.",
		intro: [
			"Nuestro apoyo nutricional incluye valoración del estado nutricional y la composición corporal, diseño de planes de alimentación personalizados (no genéricos) y reeducación alimentaria a largo plazo, siempre en coordinación con el médico tratante de cada programa.",
		],
	},

	// ── Scope Ageless ─────────────────────────────────────────────────────────
	"peso-saludable": {
		tagline: "Salud metabólica · Composición corporal · Bienestar integral",
		summary:
			"Un enfoque médico, personalizado y sostenible para alcanzar un peso saludable y mejorar tu bienestar a largo plazo.",
		intro: [
			"Es un proceso supervisado, con metas realistas y medibles, y con la honestidad de decir cuándo el plan necesita ajustarse en lugar de insistir en algo que no está funcionando.",
			"En SCOPE AGELESS entendemos el peso corporal como parte de un contexto más amplio de salud. Los hábitos de vida, la composición corporal, los factores metabólicos, el entorno, el descanso y las condiciones individuales pueden influir en la evolución del peso y en el bienestar de cada persona.",
			"Nuestro programa está diseñado para acompañar a quienes desean mejorar su salud metabólica, gestionar su peso de manera responsable y desarrollar hábitos sostenibles, a través de una estrategia individualizada basada en la valoración profesional y la evidencia clínica.",
		],
		audience: {
			title: FOR_WHO.es,
			body: "Para personas con sobrepeso u obesidad que buscan un proceso médicamente supervisado, para quienes ya intentaron dietas genéricas sin resultados sostenidos, y para quienes tienen dolor articular relacionado con el exceso de peso y necesitan que su plan de actividad física se diseñe teniendo eso en cuenta desde el inicio.",
		},
		programs: [
			{
				name: "PreCare Scope",
				subtitle: "Pre-procedimiento",
				description:
					"Tu seguridad y bienestar empiezan antes del procedimiento. PreCare Scope garantiza una evaluación completa y personalizada para que tu procedimiento sea seguro, efectivo y exitoso.",
				steps: [
					{
						title: "Valoración médica inicial",
						details: [
							"Historia clínica detallada",
							"Evaluación del índice de masa corporal (IMC)",
							"Exámenes médicos previos (laboratorios, ecografía, endoscopia si es necesario)",
							"Descartar contraindicaciones",
						],
					},
				],
				features: [
					"Estrategias personalizadas",
					"Educación nutricional durante todo el proceso",
					"Seguridad y tecnología avanzada",
					"Ambiente cómodo y confiable",
				],
			},
			vitalProgram("es", 6, "$6.500.000 COP"),
			vitalProgram("es", 12, "$8.500.000 COP"),
			{
				name: "Gastroplastia endoscópica",
				description:
					"Pregunta por este procedimiento en tu valoración inicial.",
			},
		],
	},
	"bienestar-longevidad": {
		summary:
			"Fuerza, movilidad, autonomía y energía: es lo que de verdad determina la calidad de los años que vienen.",
		intro: [
			"No hay atajos ni fórmulas mágicas; hay evaluación rigurosa, un plan ajustado a la evidencia disponible y seguimiento real en el tiempo.",
			"El Programa de Bienestar y Longevidad de SCOPE AGELESS está diseñado para acompañar a cada persona en el cuidado integral de su salud, promoviendo hábitos sostenibles, prevención y estrategias personalizadas que favorezcan un envejecimiento saludable.",
		],
		audience: {
			title: FOR_WHO.es,
			body: "Para adultos que quieren ser proactivos con su proceso de envejecimiento en lugar de reactivos (típicamente a partir de los 40 años), para quienes empiezan a notar pérdida de fuerza, movilidad o energía, y para quienes ya tienen un diagnóstico articular, óseo o metabólico y quieren manejarlo con una mirada integrada, en vez de fragmentada entre especialistas que no se comunican entre sí.",
		},
		lists: [
			{
				title: INCLUDES.es,
				items: [
					"Valoración funcional integral (fuerza, movilidad, equilibrio, capacidad aeróbica)",
					"Evaluación de salud ósea y articular",
					"Valoración de longevidad cutánea",
					"Valoración metabólica y de composición corporal",
					"Plan personalizado que integra todas las áreas, con metas medibles",
					"Seguimiento periódico y ajuste del plan según la evolución",
				],
			},
		],
	},
	"estetica-capilar": {
		tagline: "Medicina estética · Salud cutánea · Restauración capilar",
		summary:
			"Resultados naturales, decisiones informadas: así entendemos la medicina estética.",
		intro: [
			"Nuestra medicina estética busca resultados naturales: preservar, mejorar y restaurar la apariencia y la funcionalidad de la piel y el cuerpo mediante procedimientos no quirúrgicos sustentados en evidencia clínica y ejecutados bajo criterio médico.",
		],
		audience: {
			title: WHEN.es,
			body: "Cuando buscas cuidar la salud y la apariencia de tu piel, prevenir o tratar signos de envejecimiento, mejorar la firmeza o la textura corporal, o simplemente quieres una valoración profesional antes de decidir qué procedimiento (si alguno) tiene sentido para ti.",
		},
		lists: [
			{
				title: "Tratamientos",
				items: [
					"Valoración dermatológica y del estado de la piel",
					"Biorrevitalización",
					"Bioestimulación de colágeno",
					"Toxina botulínica",
					"Ácido hialurónico",
					"Peelings químicos",
					"Tratamientos corporales para composición y firmeza",
				],
			},
		],
	},
	"enfoque-deportivo": {
		summary:
			"Optimización del rendimiento físico y recuperación con un enfoque de medicina deportiva.",
	},
	"prevencion-ejecutiva": {
		summary:
			"Chequeos preventivos integrales diseñados para agendas exigentes y vidas de alto rendimiento.",
		lists: [
			{
				title: INCLUDES.es,
				items: [
					"Check-ups preventivos",
					"Coordinación integral del viaje",
					"Hoteles, transporte y acompañamiento",
					"Paquetes para pacientes internacionales",
				],
			},
		],
	},

	// ── Live by Scope ─────────────────────────────────────────────────────────
	"living-medical": {
		tagline: "Atención médica · Coordinación personalizada · Acompañamiento",
		summary:
			"Una experiencia que comienza antes de tu llegada: atención y acompañamiento para pacientes que viajan desde otras ciudades o países para acceder a servicios de salud.",
		intro: [
			"Acceder a servicios de salud fuera de tu ciudad o país implica mucho más que programar una cita. Significa tomar decisiones importantes, organizar un viaje y confiar tu bienestar a un equipo que comprenda tus necesidades.",
			"Por eso creamos LIVING MEDICAL, nuestro programa de acompañamiento y coordinación para pacientes que desean acceder a nuestros servicios desde otras ciudades de Colombia o desde el exterior. A través de una atención personalizada, facilitamos la coordinación de las consultas, la planificación de la visita y la orientación durante las diferentes etapas del proceso, para que cada paciente cuente con información clara y un punto de contacto que lo acompañe.",
			"Desde el primer acercamiento hasta el seguimiento posterior a la atención, buscamos que cada paso esté organizado de acuerdo con tus necesidades, tu plan de atención y las condiciones de tu viaje. Más que llegar a una cita, queremos ayudarte a vivir una experiencia de atención coordinada, cercana y pensada para ti.",
		],
		steps: [
			{
				title: "Coordinación integral del viaje",
				body: "Conocemos tus necesidades, orientamos el proceso inicial y coordinamos la revisión de la información necesaria para planificar tu atención antes del viaje.",
			},
			{
				title: "Planificación de tu visita",
				subtitle: "Hoteles, transporte y acompañamiento",
				body: "Te orientamos sobre la programación de consultas, los tiempos previstos y los aspectos que debes tener en cuenta para organizar tu desplazamiento.",
			},
			{
				title: "Acompañamiento durante tu estancia",
				subtitle: "Soporte y asistencia 24/7",
				body: "Facilitamos la comunicación y la coordinación de las actividades previstas en tu plan de atención, según los servicios acordados y tus necesidades particulares.",
			},
			{
				title: "Continuidad después de tu atención",
				subtitle: "Turismo y planes de recuperación",
				body: "Te orientamos sobre los controles, las indicaciones de seguimiento y las opciones de continuidad asistencial, de acuerdo con las recomendaciones del equipo tratante y las posibilidades de atención presencial o remota.",
			},
		],
		cta: {
			eyebrow: "Living Medical",
			title: "Tu próximo paso comienza aquí.",
			body: "Cuéntanos desde dónde vienes y qué tipo de atención estás buscando. Nuestro equipo te orientará sobre los siguientes pasos para planificar tu experiencia.",
			label: "Planificar mi visita",
		},
	},
	telemedicina: {
		tagline:
			"Atención médica virtual · Accesibilidad · Continuidad del cuidado",
		summary:
			"Consultas médicas a distancia con la misma calidad y cercanía, dondequiera que estés.",
	},
	financiamiento: {
		summary:
			"Opciones de pago flexibles para que accedas a tu tratamiento sin barreras.",
	},
};

const EN: PillarContentMap = {
	// ── Scope Clinic ──────────────────────────────────────────────────────────
	gastroenterologia: {
		summary:
			"We assess, diagnose and treat diseases of the digestive tract and its related organs: esophagus, stomach, small intestine, colon, rectum, liver, bile ducts and pancreas.",
		intro: [
			"From a routine endoscopy to the follow-up of a chronic digestive disease, the goal is the same: find the real cause, not just ease the symptom.",
		],
		audience: {
			title: WHEN.en,
			body: "Persistent reflux or heartburn, recurring abdominal pain, changes in bowel habits (chronic diarrhea or constipation), digestive bleeding, bloating, unexplained weight loss, or a family history of inflammatory bowel disease or colorectal cancer are all good reasons to see a specialist.",
		},
		lists: [
			{
				title: CONDITIONS.en,
				items: [
					"Gastroesophageal reflux disease (GERD)",
					"Gastritis, peptic ulcer and Helicobacter pylori infection",
					"Irritable bowel syndrome and other functional digestive disorders",
					"Inflammatory bowel disease (ulcerative colitis, Crohn's disease)",
					"Fatty liver disease, hepatitis and other liver conditions",
					"Gallstones and pancreatobiliary diseases",
					"Colon polyps and colorectal cancer screening",
				],
			},
			{
				title: PROCEDURES.en,
				items: [
					"Diagnostic upper endoscopy",
					"Colonoscopy",
					"Endoscopic polypectomy",
					"Targeted biopsies",
					"Helicobacter pylori testing",
					"Diagnostic and therapeutic balloon enteroscopy",
					"Small-bowel capsule endoscopy",
					"Esophageal pH monitoring",
					"Diagnostic and therapeutic endoscopic ultrasound",
					"Management of anorectal conditions such as hemorrhoids and fissures",
				],
			},
		],
		approach: {
			title: APPROACH.en,
			body: "We believe in diagnostic transparency: we explain what we found, what it means and what your treatment options are, in plain language and without leaving out anything you need to decide. Follow-up is part of the treatment, not an add-on.",
		},
	},
	urologia: {
		summary:
			"We care for the urinary system of men and women (kidneys, ureters, bladder) and the male reproductive system, from preventive check-ups to chronic-condition management and support through cancer care.",
		intro: [
			"Urology naturally combines clinical and surgical care: many conditions are resolved with medical treatment, and surgery is considered only when truly necessary.",
		],
		audience: {
			title: WHEN.en,
			body: "Lower-back or flank pain, blood in the urine, burning or difficulty urinating, recurring urinary infections, symptoms of an enlarged prostate (weak stream, getting up several times at night), erectile dysfunction, fertility difficulties or simply the preventive check-up recommended from a certain age or because of family history.",
		},
		lists: [
			{
				title: CONDITIONS.en,
				items: [
					"Recurrent urinary tract infections",
					"Kidney and urinary stones",
					"Benign prostatic hyperplasia",
					"Screening and early detection of prostate, bladder and kidney cancer",
					"Urinary incontinence",
					"Erectile dysfunction",
					"Varicocele and male infertility",
				],
			},
			{
				title: PROCEDURES.en,
				items: [
					"Diagnostic cystoscopy",
					"Vasectomy",
					"Intravesical botulinum toxin injection",
					"Bladder biopsy or mapping",
					"Ureteral (double-J) stent removal",
					"Prostate-specific antigen (PSA) and digital rectal exam",
					"Medical management and follow-up of urinary stones",
				],
			},
		],
		approach: {
			title: APPROACH.en,
			body: "Many urology visits involve topics that aren't always easy to talk about, so we prioritize privacy, direct and judgment-free care, and an honest explanation of every treatment option, surgical or not. Many of our procedures are performed under sedation, which greatly reduces pain and discomfort.",
		},
	},
	"medicina-fisica-deporte": {
		summary:
			"Prevention, diagnosis, treatment and rehabilitation of injuries related to physical activity, plus optimizing the performance and health of those who train.",
		audience: {
			title: WHEN.en,
			body: "Elite athletes, amateur athletes, active people and anyone about to start an exercise plan who wants a medical assessment first.",
		},
		lists: [
			{
				title: CONDITIONS.en,
				items: [
					"Musculoskeletal injuries related to physical activity (sprains, tendinopathies, muscle tears)",
					"Joint and ligament injuries from overuse or sports trauma",
					"Training-related musculoskeletal pain",
					"Recovery and return-to-sport after injury or surgery",
				],
			},
			{
				title: PROCEDURES.en,
				items: [
					"Sports-medicine assessment and pre-participation check-up",
					"Biomechanical assessment",
					"Diagnosis and management of sports injuries",
					"Functional recovery and return-to-sport plans",
					"Complementary therapies as clinically indicated (e.g. shockwave therapy)",
				],
			},
		],
		approach: {
			title: APPROACH.en,
			body: "Every recovery plan is designed around the sport, the level of demand and the patient's real goals: there are no generic protocols. We don't just treat the injury: we work out why it happened and how to keep it from happening again. Whether your goal is a safe return to activity or your best performance, we assess, treat and support you.",
		},
	},
	reumatologia: {
		summary:
			"Diagnosis and management of diseases of the musculoskeletal system and connective tissue, with particular attention to inflammatory and autoimmune conditions.",
		audience: {
			title: WHEN.en,
			body: "Persistent joint pain, prolonged morning stiffness, recurring joint swelling, unexplained fatigue with muscle or joint pain, or a family history of autoimmune disease.",
		},
		lists: [
			{
				title: CONDITIONS.en,
				items: [
					"Rheumatoid arthritis",
					"Systemic lupus erythematosus",
					"Spondyloarthritis and ankylosing spondylitis",
					"Osteoarthritis",
					"Fibromyalgia",
					"Gout and other arthropathies",
					"Osteoporosis",
					"Sjögren's syndrome and other autoimmune diseases",
				],
			},
			{
				title: "Services",
				items: [
					"Specialist rheumatology consultation, online or in person",
					"Assessment of joint and muscle pain",
					"Patient education and ongoing support",
					"Guided joint injections",
					"Minor salivary gland biopsy for diagnosing autoimmune disease (Sjögren's syndrome)",
				],
			},
		],
		approach: {
			title: APPROACH.en,
			body: "Behind joint pain, fatigue or inflammation is a person looking for answers, relief and support. We listen closely and stay with each patient from diagnosis through comprehensive treatment, to improve their quality of life and help them regain mobility, wellbeing and confidence.",
		},
	},
	psicologia: {
		summary:
			"The emotional side of a medical condition is rarely addressed on its own, yet it almost always determines whether a treatment works.",
		intro: [
			"Our psychological support focuses on treatment adherence, the emotional side of chronic illness or persistent pain, and each patient's relationship with their body, their eating or their physical activity, depending on the program.",
		],
	},
	nutricion: {
		summary:
			"A nutrition plan only works if it's designed for the condition being treated.",
		intro: [
			"Our nutritional support includes assessment of nutritional status and body composition, personalized (never generic) meal plans and long-term nutrition re-education, always coordinated with the treating physician of each program.",
		],
	},

	// ── Scope Ageless ─────────────────────────────────────────────────────────
	"peso-saludable": {
		tagline: "Metabolic health · Body composition · Whole-person wellbeing",
		summary:
			"A medical, personalized and sustainable approach to reaching a healthy weight and improving your long-term wellbeing.",
		intro: [
			"A medically supervised process with realistic, measurable goals, and the honesty to adjust the plan when something isn't working.",
			"At Scope Ageless we see body weight as part of a wider health picture. Lifestyle, body composition, metabolic factors, environment, rest and individual conditions can all influence how weight evolves and how each person feels.",
			"Our program supports people who want to improve their metabolic health, manage their weight responsibly and build sustainable habits, through an individualized strategy based on professional assessment and clinical evidence.",
		],
		audience: {
			title: FOR_WHO.en,
			body: "For people with overweight or obesity who want a medically supervised process, for those who have tried generic diets without lasting results, and for those with weight-related joint pain who need their activity plan designed with that in mind from day one.",
		},
		programs: [
			{
				name: "PreCare Scope",
				subtitle: "Pre-procedure",
				description:
					"Your safety and wellbeing start before the procedure. PreCare Scope ensures a complete, personalized assessment so your procedure is safe, effective and successful.",
				steps: [
					{
						title: "Initial medical assessment",
						details: [
							"Detailed medical history",
							"Body mass index (BMI) assessment",
							"Preliminary medical tests (labs, ultrasound, endoscopy if needed)",
							"Ruling out contraindications",
						],
					},
				],
				features: [
					"Personalized strategies",
					"Nutrition education throughout the process",
					"Safety and advanced technology",
					"A comfortable, trustworthy setting",
				],
			},
			vitalProgram("en", 6, "COP 6,500,000 (≈ USD 2,000)"),
			vitalProgram("en", 12, "COP 8,500,000 (≈ USD 2,650)"),
			{
				name: "Endoscopic gastroplasty",
				description: "Ask about this procedure at your initial assessment.",
			},
		],
	},
	"bienestar-longevidad": {
		summary:
			"Strength, mobility, independence and energy: that's what truly shapes the quality of the years ahead.",
		intro: [
			"No shortcuts or magic formulas: just a rigorous assessment, an evidence-based plan and real follow-up over time.",
			"The Scope Ageless Wellness & Longevity Program supports each person in caring for their health as a whole, promoting sustainable habits, prevention and personalized strategies for healthy aging.",
		],
		audience: {
			title: FOR_WHO.en,
			body: "For adults who want to be proactive rather than reactive about aging (typically from age 40), for those starting to notice a loss of strength, mobility or energy, and for those who already have a joint, bone or metabolic diagnosis and want to manage it with an integrated view instead of one split across specialists who don't talk to each other.",
		},
		lists: [
			{
				title: INCLUDES.en,
				items: [
					"Comprehensive functional assessment (strength, mobility, balance, aerobic capacity)",
					"Bone and joint health assessment",
					"Skin longevity assessment",
					"Metabolic and body-composition assessment",
					"A personalized plan that integrates every area, with measurable goals",
					"Regular follow-up and plan adjustments as you progress",
				],
			},
		],
	},
	"estetica-capilar": {
		tagline: "Aesthetic medicine · Skin health · Hair restoration",
		summary:
			"Natural results, informed decisions: that's how we see aesthetic medicine.",
		intro: [
			"Our aesthetic medicine aims for natural results: preserving, improving and restoring the appearance and function of the skin and body through non-surgical procedures backed by clinical evidence and performed under medical judgment.",
		],
		audience: {
			title: WHEN.en,
			body: "When you want to care for the health and appearance of your skin, prevent or treat signs of aging, improve body firmness or texture, or simply get a professional assessment before deciding which procedure (if any) makes sense for you.",
		},
		lists: [
			{
				title: "Treatments",
				items: [
					"Dermatological and skin-condition assessment",
					"Biorevitalization",
					"Collagen biostimulation",
					"Botulinum toxin",
					"Hyaluronic acid",
					"Chemical peels",
					"Body treatments for composition and firmness",
				],
			},
		],
	},
	"enfoque-deportivo": {
		summary:
			"Physical performance optimization and recovery with a sports-medicine approach.",
	},
	"prevencion-ejecutiva": {
		summary:
			"Comprehensive preventive check-ups designed for demanding schedules and high-performance lives.",
		lists: [
			{
				title: INCLUDES.en,
				items: [
					"Preventive check-ups",
					"End-to-end travel coordination",
					"Hotels, transport and accompaniment",
					"Packages for international patients",
				],
			},
		],
	},

	// ── Live by Scope ─────────────────────────────────────────────────────────
	"living-medical": {
		tagline: "Medical care · Personalized coordination · Accompaniment",
		summary:
			"An experience that starts before you arrive: care and support for patients traveling from other cities or countries to access healthcare.",
		intro: [
			"Getting healthcare outside your city or country takes much more than booking an appointment. It means making important decisions, planning a trip and trusting your wellbeing to a team that understands your needs.",
			"That's why we created Living Medical, our support and coordination program for patients who want to access our services from other cities in Colombia or from abroad. Through personalized care, we coordinate consultations, help plan the visit and guide you through each stage, so every patient has clear information and a single point of contact.",
			"From the first contact to follow-up after your care, we make sure every step fits your needs, your care plan and your travel. More than getting to an appointment, we want to give you a care experience that is coordinated, personal and well thought out.",
		],
		steps: [
			{
				title: "End-to-end travel coordination",
				body: "We learn about your needs, guide the initial process and coordinate the review of the information needed to plan your care before you travel.",
			},
			{
				title: "Planning your visit",
				subtitle: "Hotels, transport and accompaniment",
				body: "We guide you on appointment scheduling, expected timelines and what to keep in mind when organizing your trip.",
			},
			{
				title: "Support during your stay",
				subtitle: "24/7 support and assistance",
				body: "We facilitate communication and coordinate the activities in your care plan, according to the agreed services and your particular needs.",
			},
			{
				title: "Continuity after your care",
				subtitle: "Tourism and recovery plans",
				body: "We guide you on check-ups, follow-up instructions and continuity-of-care options, in line with your care team's recommendations and in-person or remote care options.",
			},
		],
		cta: {
			eyebrow: "Living Medical",
			title: "Your next step starts here.",
			body: "Tell us where you're coming from and what kind of care you're looking for. Our team will guide you through the next steps to plan your experience.",
			label: "Plan my visit",
		},
	},
	telemedicina: {
		tagline: "Virtual medical care · Accessibility · Continuity of care",
		summary:
			"Remote medical consultations with the same quality and closeness, wherever you are.",
	},
	financiamiento: {
		summary:
			"Flexible payment options so you can access your treatment without barriers.",
	},
};

export const PILLAR_CONTENT: Record<Locale, PillarContentMap> = {
	es: ES,
	en: EN,
};

/** Sanity content for an item when present, else the bundled fallback. */
export function itemContent(
	slug: string,
	locale: Locale,
	remote?: PillarContentMap | null,
): PillarItemContent {
	return remote?.[slug] ?? PILLAR_CONTENT[locale][slug];
}

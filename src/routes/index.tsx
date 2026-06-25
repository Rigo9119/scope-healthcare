import { createFileRoute, Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages.js'
import { useLang } from '#/i18n.js'
import { fetchHomePage, type HomePageData } from '#/lib/queries.js'
import {
  ArrowRight,
  Award,
  Baby,
  Bone,
  Calendar,
  CalendarCheck,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Eye,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Phone,
  Quote,
  Scale,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({ component: Home })

// ─── Icon map — resuelve nombres de Sanity a componentes Lucide ──────────────

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Smile, Sparkles, Bone, Eye, HeartPulse, Baby, Scale, Microscope,
  ShieldCheck, Award, Stethoscope, Phone, ClipboardCheck, UserRound, Star,
}

const resolveIcon = (name: string) => ICON_MAP[name] ?? Stethoscope

const AVATAR_COLORS = ['#80d9d9', '#4dcaca', '#26bebe', '#009999', '#006666']

const FALLBACK: HomePageData = {
  hero: {
    eyebrow: 'Turismo médico de calidad',
    titleStart: 'Tu salud en las',
    titleAccent: 'mejores manos del mundo',
    subtitle: 'Conectamos pacientes con los mejores especialistas médicos internacionales, garantizando atención de clase mundial al mejor precio.',
    ctaPrimaryLabel: 'Agendar consulta',
    ctaSecondaryLabel: 'Ver especialidades',
  },
  stats: [
    { value: '25+', label: 'Años de experiencia', icon: 'Award' },
    { value: '40k+', label: 'Pacientes atendidos', icon: 'UserRound' },
    { value: '120', label: 'Especialistas', icon: 'Stethoscope' },
    { value: '4.9', label: 'Calificación promedio', icon: 'Star' },
  ],
  specialtiesEyebrow: 'Especialidades',
  specialtiesTitle: 'Áreas de atención médica',
  specialtiesSubtitle: 'Contamos con especialistas certificados en las principales ramas de la medicina.',
  specialtiesLinkLabel: 'Más información',
  specialties: [
    { icon: 'Smile', title: 'Odontología', body: 'Tratamientos dentales de alta calidad con tecnología de punta.' },
    { icon: 'Sparkles', title: 'Estética', body: 'Procedimientos estéticos certificados con los mejores resultados.' },
    { icon: 'Bone', title: 'Ortopedia', body: 'Cirugías ortopédicas de precisión y rehabilitación avanzada.' },
    { icon: 'Eye', title: 'Oftalmología', body: 'Corrección visual y tratamientos oculares de última generación.' },
    { icon: 'HeartPulse', title: 'Cardiología', body: 'Diagnóstico y tratamiento cardiovascular de excelencia.' },
    { icon: 'Baby', title: 'Pediatría', body: 'Atención integral para los más pequeños con especialistas certificados.' },
    { icon: 'Scale', title: 'Bariátrica', body: 'Cirugías de pérdida de peso con acompañamiento nutricional.' },
    { icon: 'Microscope', title: 'Oncología', body: 'Tratamientos oncológicos con tecnología de vanguardia.' },
  ],
  processEyebrow: 'Proceso',
  processTitle: 'Tu viaje médico, paso a paso',
  journey: [
    { icon: 'Phone', title: 'Consulta inicial', body: 'Evaluamos tu caso y te orientamos sobre las mejores opciones disponibles.' },
    { icon: 'ClipboardCheck', title: 'Plan personalizado', body: 'Diseñamos un plan médico adaptado a tus necesidades y presupuesto.' },
    { icon: 'Stethoscope', title: 'Atención médica', body: 'Recibes tratamiento con nuestros especialistas certificados internacionalmente.' },
    { icon: 'HeartPulse', title: 'Seguimiento', body: 'Acompañamiento post-tratamiento para garantizar tu recuperación óptima.' },
  ],
  whyUsEyebrow: 'Por qué elegirnos',
  whyUsTitle: 'La mejor opción para tu salud',
  whyUsSubtitle: 'Nos comprometemos con tu bienestar en cada etapa del proceso.',
  whyUsBadgeText: 'Satisfacción garantizada',
  reasons: [
    { icon: 'ShieldCheck', title: 'Calidad certificada', body: 'Todos nuestros especialistas cuentan con certificaciones internacionales y amplia experiencia.' },
    { icon: 'Award', title: 'Precios transparentes', body: 'Sin costos ocultos. Recibes un presupuesto detallado antes de iniciar cualquier tratamiento.' },
    { icon: 'HeartPulse', title: 'Acompañamiento integral', body: 'Desde la consulta inicial hasta tu recuperación, estamos contigo en cada paso.' },
  ],
  testimonialsEyebrow: 'Testimonios',
  testimonialsTitle: 'Lo que dicen nuestros pacientes',
  testimonials: [
    { name: 'María González', detail: 'Cirugía de cadera, Bogotá', rating: 5, text: 'El servicio fue excepcional. Me ayudaron a encontrar el mejor especialista y coordinaron todo el proceso. Recuperé mi movilidad y calidad de vida gracias a Scope Health.' },
    { name: 'Carlos Restrepo', detail: 'Implantes dentales, Medellín', rating: 5, text: 'Increíble experiencia. El proceso fue sencillo, transparente y el resultado superó todas mis expectativas. Lo recomiendo ampliamente a quienes buscan calidad.' },
    { name: 'Ana Martínez', detail: 'Cirugía ocular, Cali', rating: 5, text: 'Nunca imaginé que acceder a tratamiento de clase mundial fuera tan fácil. El equipo de Scope Health me guió en cada paso con profesionalismo y calidez.' },
  ],
  ctaEyebrow: 'Agenda tu consulta',
  ctaTitle: 'Comienza tu viaje hacia una mejor salud hoy',
  ctaSubtitle: 'Contáctanos y recibe asesoría personalizada sin costo de nuestros especialistas.',
  ctaPrimaryLabel: 'Agendar consulta',
  ctaPhone: '+57 (1) 000 0000',
  footerTagline: 'Conectamos pacientes con los mejores especialistas médicos internacionales.',
  footerColServicesLabel: 'Servicios',
  footerServices: [{ label: 'Odontología' }, { label: 'Estética' }, { label: 'Ortopedia' }, { label: 'Oftalmología' }],
  footerColCompanyLabel: 'Empresa',
  footerCompany: [{ label: 'Nosotros' }, { label: 'Proceso' }, { label: 'Especialistas' }, { label: 'Blog' }],
  footerColContactLabel: 'Contacto',
  footerAddress: 'Calle 100 #19-61, Bogotá',
  footerPhone: '+57 (1) 000 0000',
  footerEmail: 'hola@scopehealth.co',
  footerCopyright: '© 2026 Scope Health. Todos los derechos reservados.',
  footerPrivacyLabel: 'Privacidad',
  footerTermsLabel: 'Términos',
  footerCookiesLabel: 'Cookies',
}

// ─── Shared bits ─────────────────────────────────────────────────────────────

function BrandMark({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const text = tone === 'light' ? 'text-white' : 'text-text-primary'
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center bg-primary-500 shadow-[0_6px_16px_rgba(16,89,181,0.35)]">
        <Stethoscope size={20} className="text-white" />
      </span>
      <span className={`font-heading text-lg font-bold tracking-tight ${text}`}>
        Scope<span className="text-primary-500">Health</span>
      </span>
    </span>
  )
}

function TopBar() {
  return (
    <div className="hidden bg-primary-700 text-white lg:block">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-xs">
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-1.5">
            <Phone size={13} /> +57 (1) 000 0000
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Mail size={13} /> lorem@scopehealth.co
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} /> {m.topbar_hours()}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-primary-100">
          <MapPin size={13} /> Lorem ipsum, Bogotá
        </span>
      </div>
    </div>
  )
}

function Navbar() {
  const { locale, switchLocale } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    { href: '#especialidades', label: m.nav_specialties() },
    { href: '#proceso',        label: m.nav_process() },
    { href: '#testimonios',    label: m.nav_testimonials() },
    { href: '#contacto',       label: m.nav_contact() },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div
        className={`bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : 'border-b border-border-default'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="link-animated text-sm font-semibold text-text-secondary transition-colors duration-200 hover:text-primary-600"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            {/* Language switcher */}
            <div className="flex items-center gap-0.5">
              {(['es', 'en'] as const).map((lang, i) => (
                <>
                  {i > 0 && <span key={`sep-${lang}`} className="text-xs text-border-default">|</span>}
                  <button
                    key={lang}
                    type="button"
                    onClick={() => switchLocale(lang)}
                    className={`px-2 py-1 text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
                      locale === lang
                        ? 'text-primary-600'
                        : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {lang}
                  </button>
                </>
              ))}
            </div>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-btn-primary transition duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-btn-primary-hover active:translate-y-0 active:shadow-btn-primary-active"
            >
              <Calendar size={16} /> {m.nav_book()}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="text-text-primary lg:hidden"
            aria-label="Menú"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border-default bg-white px-6 pb-5 lg:hidden">
            <nav className="flex flex-col gap-1 pt-3">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="link-animated px-3 py-3 text-base font-medium text-text-secondary transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-3 bg-primary-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-btn-primary transition duration-200 hover:bg-primary-600 active:shadow-btn-primary-active"
              >
                {m.nav_book()}
              </a>

              {/* Language switcher mobile */}
              <div className="mt-3 flex items-center gap-2 border-t border-border-default pt-4">
                <span className="text-xs text-text-muted">Idioma:</span>
                {(['es', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => { switchLocale(lang); setOpen(false) }}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
                      locale === lang
                        ? 'bg-primary-500 text-white'
                        : 'text-text-muted hover:text-primary-600'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

function Stars({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static star rating
        <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
      ))}
    </span>
  )
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  if (light) {
    return (
      <p className="mb-4 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white/65">
        <span className="h-px w-7 bg-white/50" />
        {children}
      </p>
    )
  }
  return (
    <p className="mb-3 inline-flex items-center gap-2 bg-primary-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-700">
      <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
      {children}
    </p>
  )
}

// A soft, intentional image placeholder (calming clinic photography goes here).
function ImagePlaceholder({ className = '', icon: Icon = UserRound }: { className?: string; icon?: typeof UserRound }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(150deg, #b3e8e8 0%, #4dcaca 55%, #009999 100%)' }}
    >
      <Icon size={80} className="text-white/70" strokeWidth={1.25} />
      <span className="absolute bottom-3 right-4 bg-white/85 px-3 py-1 text-[11px] font-semibold text-primary-700">
        Imagen
      </span>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-bg-page">
      <div className="h-[90vh] animate-pulse bg-primary-100" />
    </div>
  )
}

function Home() {
  const { locale } = useLang()
  const [page, setPage] = useState<HomePageData>(FALLBACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchHomePage(locale)
      .then((data) => { if (data) setPage(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [locale])

  if (loading) return <PageSkeleton />

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg-page font-body text-text-secondary">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        {/* Full-bleed background image */}
        <ImagePlaceholder
          icon={Stethoscope}
          className="absolute inset-0 h-full w-full"
        />

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-primary-900/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        {/* Centered copy */}
        <div className="relative px-6 py-20 text-center lg:px-12">
          <Eyebrow light>{page.hero.eyebrow}</Eyebrow>
          <h1 className="font-heading text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {page.hero.titleStart}<br className="hidden sm:block" />{' '}
            <span className="text-primary-200">{page.hero.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {page.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-white px-8 py-3.5 text-sm font-bold text-primary-700 shadow-btn-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary-50 hover:shadow-btn-white-hover active:translate-y-0 active:shadow-md"
            >
              <CalendarCheck size={18} /> {page.hero.ctaPrimaryLabel}
            </a>
            <a
              href="#especialidades"
              className="inline-flex items-center gap-2 border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/80 hover:bg-white/10 active:translate-y-0"
            >
              {page.hero.ctaSecondaryLabel} <ChevronRight size={16} />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
          <div className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Scroll
          </span>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="border-y border-border-default bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
          {page.stats?.map(({ value, label, icon }) => {
            const Icon = resolveIcon(icon)
            return (
              <div key={label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary-50">
                  <Icon size={22} className="text-primary-600" />
                </span>
                <div>
                  <p className="font-heading text-2xl font-extrabold text-text-primary">{value}</p>
                  <p className="text-xs text-text-muted">{label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Specialties ── */}
      <section id="especialidades" className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{page.specialtiesEyebrow}</Eyebrow>
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-text-primary sm:text-4xl">
              {page.specialtiesTitle}
            </h2>
            <p className="mt-4 text-text-secondary">
              {page.specialtiesSubtitle}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.specialties?.map(({ icon, title, body }) => {
              const Icon = resolveIcon(icon)
              return (
                <div
                  key={title}
                  className="group border border-border-default bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card"
                >
                  <span className="flex h-14 w-14 items-center justify-center bg-primary-50 transition group-hover:bg-primary-500">
                    <Icon size={26} className="text-primary-600 transition group-hover:text-white" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold text-text-primary">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{body}</p>
                  <a
                    href="#contacto"
                    className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors duration-200 hover:text-primary-700"
                  >
                    <span className="link-animated">{page.specialtiesLinkLabel}</span>
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover/link:translate-x-1" />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Care journey ── */}
      <section id="proceso" className="bg-primary-50/60 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{page.processEyebrow}</Eyebrow>
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-text-primary sm:text-4xl">
              {page.processTitle}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {page.journey?.map(({ icon, title, body }, i) => {
              const Icon = resolveIcon(icon)
              return (
              <div key={title} className="relative bg-white p-7 shadow-sm">
                <span className="absolute -top-4 left-7 flex h-9 w-9 items-center justify-center bg-primary-600 font-heading text-sm font-bold text-white shadow-md">
                  {i + 1}
                </span>
                <span className="mt-3 flex h-12 w-12 items-center justify-center bg-primary-50">
                  <Icon size={24} className="text-primary-600" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{body}</p>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Why us (split) ── */}
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <ImagePlaceholder
              icon={HeartPulse}
              className="aspect-[5/4] w-full shadow-[0_30px_60px_-20px_rgba(16,89,181,0.3)]"
            />
            <div className="absolute -bottom-5 left-6 right-6 flex items-center justify-between bg-white px-5 py-4 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center bg-primary-50">
                  <ShieldCheck size={18} className="text-primary-600" />
                </span>
                <span className="text-sm font-semibold text-text-primary">{page.whyUsBadgeText}</span>
              </div>
              <span className="font-heading text-lg font-extrabold text-primary-600">100%</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Eyebrow>{page.whyUsEyebrow}</Eyebrow>
            <h2 className="font-heading text-3xl font-extrabold text-text-primary sm:text-4xl">
              {page.whyUsTitle}
            </h2>
            <p className="mt-4 text-text-secondary">
              {page.whyUsSubtitle}
            </p>

            <div className="mt-8 space-y-6">
              {page.reasons?.map(({ icon, title, body }) => {
                const Icon = resolveIcon(icon)
                return (
                <div key={title} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary-50">
                    <Icon size={22} className="text-primary-600" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-text-primary">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{body}</p>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonios" className="bg-primary-50/60 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{page.testimonialsEyebrow}</Eyebrow>
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-text-primary sm:text-4xl">
              {page.testimonialsTitle}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {page.testimonials?.map((t, i) => (
              <figure
                key={t.name}
                className="flex flex-col bg-white p-7 shadow-sm"
              >
                <Quote size={32} className="text-primary-200" fill="currentColor" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                  {t.text}
                </blockquote>
                <div className="mt-5">
                  <Stars count={t.rating} />
                </div>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border-default pt-5">
                  <span
                    className="flex h-11 w-11 items-center justify-center font-heading text-sm font-bold text-white"
                    style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  >
                    {t.name.split(' ').map((w: string) => w[0]).join('')}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-text-primary">{t.name}</span>
                    <span className="block text-xs text-text-muted">{t.detail}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contacto" className="px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 px-8 py-16 text-center shadow-xl sm:px-16">
          <div className="mx-auto max-w-2xl">
            <span className="flex justify-center">
              <span className="mb-5 inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white">
                <Sparkles size={14} /> {page.ctaEyebrow}
              </span>
            </span>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {page.ctaTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-primary-50">
              {page.ctaSubtitle}
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-white px-8 py-3.5 text-sm font-bold text-primary-700 shadow-btn-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary-50 hover:shadow-btn-white-hover active:translate-y-0 active:shadow-md"
              >
                <CalendarCheck size={18} /> {page.ctaPrimaryLabel}
              </a>
              <a
                href={`tel:${page.ctaPhone?.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 border border-white/40 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 hover:shadow-[0_6px_16px_rgba(0,0,0,0.22)] active:translate-y-0 active:shadow-none"
              >
                <Phone size={16} /> {page.ctaPhone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-text-primary px-6 pb-10 pt-16 text-neutral-400">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-4">
            <div>
              <BrandMark tone="light" />
              <p className="mt-5 max-w-xs text-sm leading-relaxed">
                {page.footerTagline}
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-wide text-white">
                {page.footerColServicesLabel}
              </h3>
              <ul className="space-y-3 text-sm">
                {page.footerServices?.map((l) => (
                  <li key={l.label}>
                    <a href="#especialidades" className="link-animated transition-colors duration-200 hover:text-primary-300">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-wide text-white">
                {page.footerColCompanyLabel}
              </h3>
              <ul className="space-y-3 text-sm">
                {page.footerCompany?.map((l) => (
                  <li key={l.label}>
                    <a href="#" className="link-animated transition-colors duration-200 hover:text-primary-300">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-wide text-white">
                {page.footerColContactLabel}
              </h3>
              <ul className="space-y-4 text-sm">
                {page.footerAddress && (
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-primary-400" /> {page.footerAddress}
                  </li>
                )}
                {page.footerPhone && (
                  <li className="flex items-start gap-3">
                    <Phone size={16} className="mt-0.5 shrink-0 text-primary-400" /> {page.footerPhone}
                  </li>
                )}
                {page.footerEmail && (
                  <li className="flex items-start gap-3">
                    <Mail size={16} className="mt-0.5 shrink-0 text-primary-400" /> {page.footerEmail}
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
            <p>{page.footerCopyright}</p>
            <div className="flex gap-6">
              <a href="#" className="link-animated transition-colors duration-200 hover:text-white">{page.footerPrivacyLabel}</a>
              <a href="#" className="link-animated transition-colors duration-200 hover:text-white">{page.footerTermsLabel}</a>
              <a href="#" className="link-animated transition-colors duration-200 hover:text-white">{page.footerCookiesLabel}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

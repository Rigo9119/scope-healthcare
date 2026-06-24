import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Award,
  Baby,
  Bone,
  Calendar,
  CalendarCheck,
  Check,
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

// ─── Data ──────────────────────────────────────────────────────────────────────

const specialties = [
  { icon: Smile, title: 'Lorem ipsum', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { icon: Sparkles, title: 'Dolor sit', body: 'Sed do eiusmod tempor incididunt ut labore et dolore.' },
  { icon: Bone, title: 'Amet consectetur', body: 'Ut enim ad minim veniam, quis nostrud exercitation.' },
  { icon: Eye, title: 'Adipiscing elit', body: 'Duis aute irure dolor in reprehenderit in voluptate.' },
  { icon: HeartPulse, title: 'Eiusmod tempor', body: 'Excepteur sint occaecat cupidatat non proident sunt.' },
  { icon: Baby, title: 'Incididunt labore', body: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur.' },
  { icon: Scale, title: 'Dolore magna', body: 'Neque porro quisquam est qui dolorem ipsum quia dolor.' },
  { icon: Microscope, title: 'Aliqua veniam', body: 'Quis autem vel eum iure reprehenderit qui in ea.' },
]

const stats = [
  { value: '25+', label: 'Lorem ipsum dolor', icon: Award },
  { value: '40k+', label: 'Dolor sit amet', icon: UserRound },
  { value: '120', label: 'Consectetur elit', icon: Stethoscope },
  { value: '4.9', label: 'Adipiscing tempor', icon: Star },
]

const journey = [
  {
    icon: Phone,
    title: 'Lorem ipsum dolor',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  },
  {
    icon: ClipboardCheck,
    title: 'Sit amet consectetur',
    body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.',
  },
  {
    icon: Stethoscope,
    title: 'Adipiscing elit sed',
    body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
  },
  {
    icon: HeartPulse,
    title: 'Eiusmod tempor labore',
    body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.',
  },
]

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Lorem ipsum dolor',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  },
  {
    icon: Award,
    title: 'Sit amet consectetur',
    body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  },
  {
    icon: HeartPulse,
    title: 'Adipiscing elit sed',
    body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.',
  },
]

const testimonials = [
  {
    name: 'Lorem Ipsum',
    detail: 'Dolor sit amet',
    rating: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    avatarBg: '#80d9d9',
  },
  {
    name: 'Dolor Sit',
    detail: 'Consectetur elit',
    rating: 5,
    text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    avatarBg: '#4dcaca',
  },
  {
    name: 'Amet Consectetur',
    detail: 'Adipiscing tempor',
    rating: 5,
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    avatarBg: '#26bebe',
  },
]

const navLinks = [
  { href: '#especialidades', label: 'Lorem' },
  { href: '#proceso', label: 'Ipsum' },
  { href: '#testimonios', label: 'Dolor' },
  { href: '#contacto', label: 'Sit amet' },
]

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
            <Clock size={13} /> Lun–Sáb · 8:00–18:00
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
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
                className="text-sm font-semibold text-text-secondary transition-colors hover:text-primary-600"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            className="hidden items-center gap-2 bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 lg:inline-flex"
          >
            <Calendar size={16} /> Lorem ipsum
          </a>

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
                  className="px-3 py-3 text-base font-medium text-text-secondary transition hover:bg-primary-50 hover:text-primary-700"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-3 bg-primary-500 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Lorem ipsum
              </a>
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

function Eyebrow({ children }: { children: React.ReactNode }) {
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

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg-page font-body text-text-secondary">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-bg-page">
        {/* soft organic shapes */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-primary-100/50 blur-2xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* Left — copy */}
          <div>
            <Eyebrow>Lorem ipsum dolor</Eyebrow>
            <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Lorem ipsum dolor{' '}
              <span className="text-primary-600">sit amet</span> consectetur
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 bg-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,89,181,0.3)] transition hover:bg-primary-600"
              >
                <CalendarCheck size={18} /> Lorem ipsum dolor
              </a>
              <a
                href="#especialidades"
                className="inline-flex items-center justify-center gap-2 border border-primary-200 bg-white px-7 py-3.5 text-sm font-semibold text-primary-700 transition hover:border-primary-400 hover:bg-primary-50"
              >
                Dolor sit amet <ChevronRight size={16} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium text-text-secondary">
              <span className="inline-flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center bg-primary-100">
                  <Check size={13} className="text-primary-700" strokeWidth={3} />
                </span>
                Lorem ipsum
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center bg-primary-100">
                  <Check size={13} className="text-primary-700" strokeWidth={3} />
                </span>
                Dolor sit amet
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center bg-primary-100">
                  <Check size={13} className="text-primary-700" strokeWidth={3} />
                </span>
                Consectetur
              </span>
            </div>
          </div>

          {/* Right — image + floating cards */}
          <div className="relative">
            <ImagePlaceholder
              icon={Stethoscope}
              className="aspect-[4/5] w-full shadow-[0_30px_60px_-20px_rgba(16,89,181,0.35)]"
            />

            {/* floating: appointment */}
            <div className="absolute -left-5 top-10 hidden items-center gap-3 bg-white p-3.5 shadow-lg sm:flex">
              <span className="flex h-11 w-11 items-center justify-center bg-primary-50">
                <CalendarCheck size={20} className="text-primary-600" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-text-primary">Lorem ipsum</p>
                <p className="text-xs text-text-muted">Dolor sit amet</p>
              </div>
            </div>

            {/* floating: rating */}
            <div className="absolute -bottom-5 -right-3 flex items-center gap-3 bg-white p-3.5 shadow-lg">
              <span className="flex h-11 w-11 items-center justify-center bg-amber-50">
                <Star size={20} className="fill-amber-400 text-amber-400" />
              </span>
              <div>
                <p className="font-heading text-base font-bold leading-none text-text-primary">4.9/5</p>
                <p className="mt-1 text-xs text-text-muted">Lorem ipsum</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="border-y border-border-default bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary-50">
                <Icon size={22} className="text-primary-600" />
              </span>
              <div>
                <p className="font-heading text-2xl font-extrabold text-text-primary">{value}</p>
                <p className="text-xs text-text-muted">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Specialties ── */}
      <section id="especialidades" className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>Lorem ipsum</Eyebrow>
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-text-primary sm:text-4xl">
              Lorem ipsum dolor sit amet
            </h2>
            <p className="mt-4 text-text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map(({ icon: Icon, title, body }) => (
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
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition hover:gap-2 hover:text-primary-700"
                >
                  Lorem ipsum <ArrowRight size={15} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Care journey ── */}
      <section id="proceso" className="bg-primary-50/60 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>Dolor sit amet</Eyebrow>
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-text-primary sm:text-4xl">
              Lorem ipsum dolor consectetur
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {journey.map(({ icon: Icon, title, body }, i) => (
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
            ))}
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
                <span className="text-sm font-semibold text-text-primary">Lorem ipsum dolor</span>
              </div>
              <span className="font-heading text-lg font-extrabold text-primary-600">100%</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Eyebrow>Consectetur elit</Eyebrow>
            <h2 className="font-heading text-3xl font-extrabold text-text-primary sm:text-4xl">
              Lorem ipsum dolor sit amet adipiscing
            </h2>
            <p className="mt-4 text-text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="mt-8 space-y-6">
              {reasons.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary-50">
                    <Icon size={22} className="text-primary-600" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-text-primary">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonios" className="bg-primary-50/60 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>Adipiscing tempor</Eyebrow>
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-text-primary sm:text-4xl">
              Lorem ipsum dolor sit amet
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
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
                    style={{ backgroundColor: t.avatarBg }}
                  >
                    {t.name.split(' ').map((w) => w[0]).join('')}
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
                <Sparkles size={14} /> Lorem ipsum
              </span>
            </span>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Lorem ipsum dolor sit amet consectetur
            </h2>
            <p className="mx-auto mt-5 max-w-md text-primary-50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-white px-8 py-3.5 text-sm font-bold text-primary-700 shadow-lg transition hover:bg-primary-50"
              >
                <CalendarCheck size={18} /> Lorem ipsum dolor
              </a>
              <a
                href="tel:+5710000000"
                className="inline-flex items-center gap-2 border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Phone size={16} /> +57 (1) 000 0000
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-wide text-white">
                Lorem
              </h3>
              <ul className="space-y-3 text-sm">
                {['Lorem ipsum', 'Dolor sit', 'Amet elit', 'Consectetur'].map((l) => (
                  <li key={l}>
                    <a href="#especialidades" className="transition hover:text-primary-300">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-wide text-white">
                Ipsum
              </h3>
              <ul className="space-y-3 text-sm">
                {['Adipiscing', 'Tempor', 'Incididunt', 'Magna aliqua'].map((l) => (
                  <li key={l}>
                    <a href="#especialidades" className="transition hover:text-primary-300">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-heading text-sm font-bold uppercase tracking-wide text-white">
                Dolor sit
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary-400" /> Lorem ipsum, Bogotá
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 shrink-0 text-primary-400" /> +57 (1) 000 0000
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 shrink-0 text-primary-400" /> lorem@scopehealth.co
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
            <p>© 2026 Scope Health. Lorem ipsum dolor sit amet.</p>
            <div className="flex gap-6">
              <a href="#" className="transition hover:text-white">Lorem</a>
              <a href="#" className="transition hover:text-white">Ipsum</a>
              <a href="#" className="transition hover:text-white">Dolor</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

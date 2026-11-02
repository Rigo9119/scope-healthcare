// Pillar → item tree shown in the Studio. Keep in sync with PILLARS in
// src/lib/pillars.ts (the frontend owns titles, icons and URLs; a slug listed
// here but missing there has no page). Document ids: `pillarItem-{slug}-{locale}`.
export const PILLAR_TREE = [
  {
    title: 'Scope Clinic',
    items: [
      {slug: 'gastroenterologia', title: 'Gastroenterología'},
      {slug: 'urologia', title: 'Urología'},
      {slug: 'medicina-fisica-deporte', title: 'Medicina Física y del Deporte'},
      {slug: 'reumatologia', title: 'Reumatología'},
      {slug: 'estetica-capilar', title: 'Medicina Estética y Capilar'},
      {slug: 'psicologia', title: 'Psicología'},
      {slug: 'nutricion', title: 'Nutrición'},
    ],
  },
  {
    title: 'Scope Ageless',
    items: [
      {slug: 'peso-saludable', title: 'Peso Saludable'},
      {slug: 'bienestar-longevidad', title: 'Bienestar y Longevidad'},
      {slug: 'estetica-capilar', title: 'Medicina Estética y Capilar'},
      {slug: 'enfoque-deportivo', title: 'Enfoque Deportivo'},
      {slug: 'prevencion-ejecutiva', title: 'Prevención Ejecutiva'},
    ],
  },
  {
    title: 'Live by Scope',
    items: [
      {slug: 'living-medical', title: 'Living Medical'},
      {slug: 'telemedicina', title: 'Telemedicina'},
      {slug: 'financiamiento', title: 'Financiamiento'},
    ],
  },
]

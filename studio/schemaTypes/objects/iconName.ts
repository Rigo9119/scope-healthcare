import { defineField } from 'sanity'

export const iconNameField = defineField({
  name: 'icon',
  title: 'Ícono',
  type: 'string',
  options: {
    list: [
      { title: 'Sonrisa / Odontología', value: 'Smile' },
      { title: 'Brillos / Estética', value: 'Sparkles' },
      { title: 'Hueso / Ortopedia', value: 'Bone' },
      { title: 'Ojo / Oftalmología', value: 'Eye' },
      { title: 'Corazón / Cardiología', value: 'HeartPulse' },
      { title: 'Bebé / Pediatría', value: 'Baby' },
      { title: 'Balanza / Bariátrica', value: 'Scale' },
      { title: 'Microscopio / Lab', value: 'Microscope' },
      { title: 'Escudo / Seguridad', value: 'ShieldCheck' },
      { title: 'Premio / Calidad', value: 'Award' },
      { title: 'Estetoscopio', value: 'Stethoscope' },
      { title: 'Teléfono', value: 'Phone' },
      { title: 'Checklist', value: 'ClipboardCheck' },
      { title: 'Usuario', value: 'UserRound' },
      { title: 'Estrella', value: 'Star' },
    ],
  },
})

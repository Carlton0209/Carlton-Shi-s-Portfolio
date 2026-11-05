import { withBase } from '../lib/asset'

export type CgiStudyId = 'still' | 'form-light'

export const cgiStudies = {
  still: {
    id: 'still',
    path: '/works/still-beverage',
    name: 'STILL',
    category: 'Beverage packaging / CGI study',
    title: 'A moment of brightness.',
    description: 'A fictional citrus soda explored through packaging, material and light. Pale lime, dark green typography and a cold aluminum surface turn a simple can into a complete product image.',
    cardDescription: 'A citrus soda concept, brought to life through packaging, modeled condensation and controlled studio light.',
    tags: 'Packaging / Product visualization / Procedural detail',
    alt: 'STILL citrus soda can with condensation, a yuzu cross section and a leaf in a softly lit studio.',
    detailAlt: 'Close-up of the STILL can, showing the aluminum lid, curved packaging lettering and water droplets.',
    galleryTitle: 'Cold, down to the detail.',
    galleryDescription: 'Move between the finished product, its surface details and a neutral clay view of the same geometry.',
    detailWidth: 1200,
    detailHeight: 1200,
    evidence: [
      { title: 'Build the object', text: 'A lathed can profile, rolled rim, pull tab and curved mesh lettering establish the product. The citrus and leaf are procedural geometric studies.' },
      { title: 'Shape the surface', text: 'Separate shaders distinguish lacquer, exposed aluminum and water. Seeded placement creates variation in the static condensation beads.' },
      { title: 'Control the light', text: 'Four area lights shape the reflections and small highlights. The clay render uses the same hero camera, geometry and lighting.' },
    ],
    scope: 'Independent fictional product. Static condensation is made from linked droplet meshes; the citrus is a stylized geometric approximation. No fluid simulation is included.',
    deliverables: 'Hero / Detail / Clay / Source scene',
  },
  'form-light': {
    id: 'form-light',
    path: '/works/form-light',
    name: 'FORM / LIGHT',
    category: 'Automotive / Look development',
    title: 'Drawn by reflection.',
    description: 'A concept vehicle explored through camera, material and studio lighting. Broad highlights describe the bodywork while a restrained graphite palette keeps the attention on form.',
    cardDescription: 'An automotive study in graphite, glass and reflection, with two camera views and an inspectable 3D scene.',
    tags: 'Automotive / Material development / Studio lighting',
    alt: 'Graphite concept vehicle in a controlled studio render, with broad highlights tracing the bodywork.',
    detailAlt: 'Alternate rear three-quarter studio view of the graphite concept vehicle.',
    galleryTitle: 'One asset. Another perspective.',
    galleryDescription: 'Compare two finished camera views and inspect the underlying vehicle geometry in a matching clay render.',
    detailWidth: 1600,
    detailHeight: 1000,
    evidence: [
      { title: 'Prepare the asset', text: 'A licensed concept-car model provides the geometry. This study focuses on scene preparation, new materials, camera placement and lighting.' },
      { title: 'Read the bodywork', text: 'Large light sources shape the reflections across the paint. Separate materials distinguish body panels, glass, wheels and tires.' },
      { title: 'Inspect the construction', text: 'The clay view uses the hero camera and neutral materials. The original scene and build script make the setup inspectable.' },
    ],
    scope: 'Independent studio lighting and look-development study using a third-party vehicle model. Vehicle geometry is credited below. The work does not include original vehicle modeling or photographic background integration.',
    deliverables: 'Two camera views / Clay / Source scene',
  },
} as const

export const cgiAsset = (id: CgiStudyId, view: string) => withBase(`images/cgi-studies/${id}-${view}.webp`)
export const cgiSource = (id: CgiStudyId) => withBase(`downloads/cgi-studies/${id}-source.zip`)

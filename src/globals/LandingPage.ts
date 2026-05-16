import type { GlobalConfig } from 'payload'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  label: 'Landing Page',
  access: {
    read: () => true,
  },
  admin: {
    description: 'All copy and content blocks for reup.energy.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', defaultValue: 'ReUP — Power on Demand. For the Sea.' },
            {
              name: 'metaDescription',
              type: 'textarea',
              defaultValue:
                'ReUP delivers fast, reliable on-demand power to yachts at harbor. Marine-grade mobile charging, dispatched to your berth.',
            },
          ],
        },
        {
          label: 'Nav',
          fields: [
            {
              name: 'navLinks',
              type: 'array',
              minRows: 0,
              maxRows: 6,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
              defaultValue: [
                { label: 'How it works', href: '#how' },
                { label: 'Who we serve', href: '#audience' },
                { label: 'Why ReUP', href: '#why' },
              ],
            },
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Marine power, on demand' },
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                  defaultValue: 'Power on Demand.',
                },
                {
                  name: 'headingHighlight',
                  type: 'text',
                  defaultValue: 'For the Sea.',
                },
                {
                  name: 'lede',
                  type: 'textarea',
                  defaultValue:
                    'Fast, silent, reliable electricity — delivered to your berth. No diesel. No paperwork. No waiting on a slow pedestal.',
                },
                {
                  name: 'primaryCTA',
                  type: 'group',
                  fields: [
                    { name: 'label', type: 'text', defaultValue: 'Request a pilot' },
                    { name: 'href', type: 'text', defaultValue: '#contact' },
                  ],
                },
                {
                  name: 'secondaryCTA',
                  type: 'group',
                  fields: [
                    { name: 'label', type: 'text', defaultValue: 'See how it works' },
                    { name: 'href', type: 'text', defaultValue: '#how' },
                  ],
                },
                {
                  name: 'audiencePills',
                  type: 'array',
                  admin: {
                    description:
                      'Small pills shown below the CTAs to surface the dual audience (harbors + end customers).',
                  },
                  fields: [{ name: 'label', type: 'text', required: true }],
                  defaultValue: [
                    { label: 'Marinas' },
                    { label: 'Charter fleets' },
                    { label: 'Events' },
                    { label: 'Captains' },
                    { label: 'Owners' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Strip',
          fields: [
            {
              name: 'strip',
              type: 'array',
              minRows: 0,
              maxRows: 8,
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  defaultValue: 'bolt',
                  options: [
                    { label: '⚡ Bolt (power / kW)', value: 'bolt' },
                    { label: '🛡 Shield · wave (marine-grade / IP rating)', value: 'shield' },
                    { label: '🔇 Silent (no diesel / no noise)', value: 'silent' },
                    { label: '👆 Tap (one-tap / app)', value: 'tap' },
                    { label: '⚓ Anchor (harbor / marina)', value: 'anchor' },
                    { label: '🧭 Compass (captains / owners)', value: 'compass' },
                  ],
                },
                { name: 'label', type: 'text', required: true },
              ],
              defaultValue: [
                { icon: 'bolt', label: 'Up to 350 kW · DC fast' },
                { icon: 'shield', label: 'Marine-grade IP67' },
                { icon: 'silent', label: 'Silent at the dock' },
                { icon: 'tap', label: 'One tap from the app' },
              ],
            },
          ],
        },
        {
          label: 'How',
          fields: [
            {
              name: 'how',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', defaultValue: 'How ReUP works' },
                {
                  name: 'lede',
                  type: 'textarea',
                  defaultValue:
                    'A full-stack mobile marine power service — hardware, software, and humans on the dock.',
                },
                {
                  name: 'steps',
                  type: 'array',
                  fields: [
                    { name: 'num', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'body', type: 'textarea', required: true },
                  ],
                  defaultValue: [
                    {
                      num: '01',
                      title: 'Request',
                      body: 'Captain or marina opens the ReUP app, picks a berth, sets a kWh target and deadline.',
                    },
                    {
                      num: '02',
                      title: 'Dispatch',
                      body: 'Our mobile power unit is wheeled, towed, or floated to the berth by a ReUP operator.',
                    },
                    {
                      num: '03',
                      title: 'Charge',
                      body: 'Plug in via marine-grade connectors. Live telemetry in-app. Auto-bill on completion.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Audiences',
          fields: [
            {
              name: 'audiences',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Who we serve' },
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'Two doors into the same service.',
                },
                {
                  name: 'lede',
                  type: 'textarea',
                  defaultValue:
                    'ReUP is built for the people who keep harbors running — and for the people who keep boats running. Same platform, two front doors.',
                },
                { name: 'harborLabel', type: 'text', defaultValue: 'For Harbors' },
                {
                  name: 'harborSubtitle',
                  type: 'text',
                  defaultValue: 'Marina operators · charter fleets · event organizers',
                },
                { name: 'customerLabel', type: 'text', defaultValue: 'For End Customers' },
                {
                  name: 'customerSubtitle',
                  type: 'text',
                  defaultValue: 'Yacht owners · captains · charterers',
                },
                {
                  name: 'items',
                  type: 'array',
                  admin: {
                    description:
                      'Each card belongs to a group — "harbor" or "customer". The page splits them automatically.',
                  },
                  fields: [
                    {
                      name: 'group',
                      type: 'select',
                      required: true,
                      defaultValue: 'harbor',
                      options: [
                        { label: 'For Harbors', value: 'harbor' },
                        { label: 'For End Customers', value: 'customer' },
                      ],
                    },
                    { name: 'title', type: 'text', required: true },
                    { name: 'body', type: 'textarea', required: true },
                  ],
                  defaultValue: [
                    {
                      group: 'harbor',
                      title: 'Marina Operators',
                      body: 'Close the grid-capacity gap without an infrastructure project. Premium service for your guests, rev-share for you.',
                    },
                    {
                      group: 'harbor',
                      title: 'Charter Companies',
                      body: 'Saturday-changeover SLAs across your hybrid/electric fleet. Silent, certain, ESG-reported.',
                    },
                    {
                      group: 'harbor',
                      title: 'Event Organizers',
                      body: 'Surge power for regattas, boat shows, and hospitality. Diesel-free, SLA-backed, photogenic.',
                    },
                    {
                      group: 'customer',
                      title: 'Yacht Owners',
                      body: 'Show up Friday at 5 — the boat is charged, the marina is quiet, the invoice is on file.',
                    },
                    {
                      group: 'customer',
                      title: 'Captains',
                      body: 'One tap from the bridge. Live telemetry, billed to the boat or the management company, never to you.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Why',
          fields: [
            {
              name: 'why',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', defaultValue: 'Why ReUP wins' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'body', type: 'textarea', required: true },
                  ],
                  defaultValue: [
                    {
                      title: 'Marine-native',
                      body: 'Salt, vibration, GFCI, isolation transformers, dockside logistics — designed in, not bolted on.',
                    },
                    {
                      title: 'Full stack',
                      body: 'We own the hardware, the platform, and the dockside experience. Competitors own only pieces.',
                    },
                    {
                      title: 'Service, not equipment',
                      body: 'You buy kWh delivered and uptime — not a box to manage. We sweat the metal.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Numbers',
          fields: [
            {
              name: 'numbers',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Built for scale' },
                { name: 'heading', type: 'text', defaultValue: 'The numbers ReUP runs on.' },
                {
                  name: 'items',
                  type: 'array',
                  minRows: 0,
                  maxRows: 6,
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'unit', type: 'text' },
                    { name: 'label', type: 'text', required: true },
                    { name: 'footnote', type: 'text' },
                  ],
                  defaultValue: [
                    { value: '350', unit: 'kW', label: 'Peak DC output per unit', footnote: 'Container & pontoon class' },
                    { value: '2 000', unit: 'kWh', label: 'Capacity per pontoon module', footnote: 'LFP, marine-grade' },
                    { value: '24', unit: 'h', label: 'Offline-safe telemetry buffer', footnote: 'Sessions complete even without cloud' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Pilot Marinas',
          fields: [
            {
              name: 'pilotMarinas',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'In conversation with' },
                { name: 'heading', type: 'text', defaultValue: 'The harbors we are building with.' },
                {
                  name: 'lede',
                  type: 'textarea',
                  defaultValue: 'A focused shortlist of Mediterranean marinas — selected for yacht density, charter season, and the willingness to electrify ahead of regulation.',
                },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'location', type: 'text', required: true },
                    { name: 'status', type: 'select', defaultValue: 'prospect', options: [
                      { label: 'Prospect', value: 'prospect' },
                      { label: 'MOU', value: 'mou' },
                      { label: 'Active', value: 'active' },
                    ]},
                  ],
                  defaultValue: [
                    { name: 'Port Adriano', location: 'Mallorca, ES', status: 'prospect' },
                    { name: 'Marina Ibiza', location: 'Ibiza, ES', status: 'prospect' },
                    { name: 'Marina di Portisco', location: 'Sardinia, IT', status: 'prospect' },
                    { name: 'Port Vauban', location: 'Antibes, FR', status: 'prospect' },
                    { name: 'ACI Split', location: 'Croatia', status: 'prospect' },
                    { name: 'Limassol Marina', location: 'Cyprus', status: 'prospect' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Testimonial',
          fields: [
            {
              name: 'testimonial',
              type: 'group',
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: true },
                {
                  name: 'quote',
                  type: 'textarea',
                  defaultValue: 'I plug in, the boat is ready by morning, and the marina is quiet. That used to be a gallon of diesel and a generator humming all night.',
                },
                { name: 'author', type: 'text', defaultValue: 'A captain we are working with' },
                { name: 'role', type: 'text', defaultValue: '28 m motoryacht · Mediterranean' },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contact',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', defaultValue: 'Bring ReUP to your harbor.' },
                {
                  name: 'lede',
                  type: 'textarea',
                  defaultValue: "Marinas, charter operators, event organizers — let's talk pilot.",
                },
                { name: 'email', type: 'email', defaultValue: 'hello@reup.energy' },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footer',
              type: 'group',
              fields: [
                {
                  name: 'copyright',
                  type: 'text',
                  defaultValue: '© 2026 ReUP. Mobile marine power, on demand.',
                },
                {
                  name: 'note',
                  type: 'text',
                  defaultValue: 'A CognaLabs / VoltFleet venture · reup.energy',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

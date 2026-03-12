import type { Template } from '../lib/types'

export const TEMPLATES: Record<string, Template> = {
  nova: {
    id: 'nova',
    name: 'Nova',
    tier: 'free',
    tagline: 'Clean & Modern',
    accent: '#2563eb',
    bg: 'linear-gradient(135deg,#1e40af 0%,#3b82f6 100%)',
    preview: '🌟',
    sections: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
  },
  slate: {
    id: 'slate',
    name: 'Slate',
    tier: 'free',
    tagline: 'Minimal & Bold',
    accent: '#0f172a',
    bg: 'linear-gradient(135deg,#0f172a 0%,#334155 100%)',
    preview: '◼',
    sections: ['experience', 'skills', 'education', 'summary', 'certifications', 'projects'],
  },
  prism: {
    id: 'prism',
    name: 'Prism',
    tier: 'paid',
    tagline: 'Executive & Premium',
    accent: '#7c3aed',
    bg: 'linear-gradient(135deg,#4c1d95 0%,#7c3aed 50%,#a78bfa 100%)',
    preview: '💎',
    sections: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
  },
}

export const TEMPLATE_LIST = Object.values(TEMPLATES)

export const NAV_ITEMS = [
  { id: 'personal',         label: 'Personal Info'   },
  { id: 'summary',          label: 'Summary'         },
  { id: 'experience',       label: 'Experience'      },
  { id: 'education',        label: 'Education'       },
  { id: 'skills',           label: 'Skills'          },
  { id: 'projects',         label: 'Projects'        },
  { id: 'certifications',   label: 'Certifications'  },
  { id: 'template',         label: 'Template'        },
] as const
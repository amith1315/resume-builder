// ─── TEMPLATES ───────────────────────────────────────────────────────────────

export type TemplateTier = 'free' | 'paid'

export interface Template {
  id: string
  name: string
  tier: TemplateTier
  tagline: string
  accent: string
  bg: string
  preview: string
  sections: string[]
}

// ─── RESUME SECTIONS ─────────────────────────────────────────────────────────

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  start: string
  end: string
  current: boolean
  description: string
}

export interface EducationEntry {
  id: string
  school: string
  degree: string
  field: string
  year: string
  gpa: string
}

export interface ProjectEntry {
  id: string
  name: string
  description: string
  url: string
  tech: string
}

export interface CertificationEntry {
  id: string
  name: string
  issuer: string
  year: string
}

// ─── RESUME ──────────────────────────────────────────────────────────────────

export interface Resume {
  id: string
  templateId: string
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
  title: string
  summary: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: string[]
  skillInput: string
  projects: ProjectEntry[]
  certifications: CertificationEntry[]
  createdAt: string
  updatedAt: string
}

// ─── UI ──────────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error'

export interface ToastData {
  msg: string
  type: ToastType
}

export type SectionId =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'template'
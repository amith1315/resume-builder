import type { Resume } from './types'
import { supabase } from './supabase'

// ─── FACTORY ─────────────────────────────────────────────────────────────────

export const createEmptyResume = (): Resume => ({
  id:             `r_${Date.now()}`,
  templateId:     'nova',
  name:           '',
  email:          '',
  phone:          '',
  location:       '',
  linkedin:       '',
  website:        '',
  title:          '',
  summary:        '',
  experience:     [{ id: `e_${Date.now()}`,  company: '', role: '',   start: '', end: '', current: false, description: '' }],
  education:      [{ id: `ed_${Date.now()}`, school: '',  degree: '', field: '', year: '', gpa: '' }],
  skills:         [],
  skillInput:     '',
  projects:       [{ id: `p_${Date.now()}`,  name: '',    description: '', url: '', tech: '' }],
  certifications: [{ id: `c_${Date.now()}`,  name: '',    issuer: '',      year: '' }],
  createdAt:      new Date().toISOString(),
  updatedAt:      new Date().toISOString(),
})

// ─── USER ID ─────────────────────────────────────────────────────────────────
// Since there's no auth, we generate a persistent anonymous user ID
// In production: replace with Supabase Auth user ID

function getUserId(): string {
  let uid = localStorage.getItem('rb_uid')
  if (!uid) {
    uid = `anon_${Date.now()}_${Math.random().toString(36).slice(2)}`
    localStorage.setItem('rb_uid', uid)
  }
  return uid
}

// ─── LOCAL CACHE ─────────────────────────────────────────────────────────────
// Keep localStorage as a fast cache — Supabase is source of truth

function cacheSet(id: string, data: Resume) {
  try {
    const all = cacheGetAll()
    all[id] = data
    localStorage.setItem('rb_resumes', JSON.stringify(all))
  } catch {}
}

function cacheGetAll(): Record<string, Resume> {
  try {
    return JSON.parse(localStorage.getItem('rb_resumes') || '{}')
  } catch {
    return {}
  }
}

function cacheDelete(id: string) {
  try {
    const all = cacheGetAll()
    delete all[id]
    localStorage.setItem('rb_resumes', JSON.stringify(all))
  } catch {}
}

// ─── DB API ──────────────────────────────────────────────────────────────────

export const db = {

  async save(id: string, data: Resume): Promise<Resume> {
    const updated: Resume = { ...data, updatedAt: new Date().toISOString() }
    const userId = getUserId()

    // Update local cache immediately (optimistic)
    cacheSet(id, updated)

    // Persist to Supabase
    const { error } = await supabase
      .from('resumes')
      .upsert({
        id,
        user_id: userId,
        data:    updated,
      })

    if (error) console.error('Supabase save error:', error.message)

    return updated
  },

  async load(id: string): Promise<Resume | null> {
    // Try Supabase first
    const { data, error } = await supabase
      .from('resumes')
      .select('data')
      .eq('id', id)
      .single()

    if (!error && data) {
      cacheSet(id, data.data)
      return data.data as Resume
    }

    // Fall back to local cache
    return cacheGetAll()[id] ?? null
  },

  async list(): Promise<Resume[]> {
    const userId = getUserId()

    // Try Supabase first
    const { data, error } = await supabase
      .from('resumes')
      .select('data')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (!error && data) {
      const resumes = data.map(row => row.data as Resume)
      // Sync to local cache
      resumes.forEach(r => cacheSet(r.id, r))
      return resumes
    }

    // Fall back to local cache
    return Object.values(cacheGetAll()).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  },

  async delete(id: string): Promise<void> {
    cacheDelete(id)

    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id)

    if (error) console.error('Supabase delete error:', error.message)
  },
}
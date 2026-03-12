import { useState, useCallback, useEffect, useRef } from 'react'
import type { Resume, SectionId, ToastData } from '../../lib/types'
import { db } from '../../lib/db'
import { downloadAsPDF } from '../../lib/pdf'
import { TEMPLATES } from '../../constants/templates'

import SidebarNav            from './SidebarNav'
import PersonalInfo          from './sections/PersonalInfo'
import SummarySection        from './sections/SummarySection'
import ExperienceSection     from './sections/ExperienceSection'
import EducationSection      from './sections/EducationSection'
import SkillsSection         from './sections/SkillsSection'
import ProjectsSection       from './sections/ProjectsSection'
import CertificationsSection from './sections/CertificationsSection'
import TemplateSection       from './sections/TemplateSection'
import ResumePreview         from '../preview/ResumePreview'
import UpgradeModal          from '../upgrade/UpgradeModal'
import Button                from '../ui/Button'
import Toast                 from '../ui/Toast'
import Icon                  from '../ui/Icon'

interface Props {
  resumeId: string
  onBack:   () => void
}

export default function Editor({ resumeId, onBack }: Props) {
  const [resume,        setResume]        = useState<Resume | null>(null)
  const [loading,       setLoading]       = useState(true)
  const [activeSection, setActiveSection] = useState<SectionId>('personal')
  const [showUpgrade,   setShowUpgrade]   = useState(false)
  const [isPro,         setIsPro]         = useState(() => localStorage.getItem('rb_pro') === 'true')
  const [saving,        setSaving]        = useState(false)
  const [downloading,   setDownloading]   = useState(false)
  const [toast,         setToast]         = useState<ToastData | null>(null)

  const printRef = useRef<HTMLDivElement>(null)

  // Load resume from Supabase on mount
  useEffect(() => {
    db.load(resumeId).then(data => {
      if (data) setResume(data)
      setLoading(false)
    })
  }, [resumeId])

  const handleChange = useCallback((updated: Resume) => {
    setResume(updated)
    db.save(updated.id, updated) // fire and forget — auto-save on every change
  }, [])

  const handleSave = async () => {
    if (!resume) return
    setSaving(true)
    await db.save(resume.id, resume)
    setSaving(false)
    setToast({ msg: 'Saved successfully', type: 'success' })
  }

  const handleDownload = async () => {
    const el = printRef.current
    if (!el) return
    setDownloading(true)
    setToast({ msg: 'Generating PDF...', type: 'success' })
    try {
      await downloadAsPDF(el, resume?.name || 'resume')
      setToast({ msg: 'PDF downloaded!', type: 'success' })
    } catch {
      setToast({ msg: 'Failed to generate PDF', type: 'error' })
    }
    setDownloading(false)
  }

  const handleUpgrade = () => {
    setIsPro(true)
    localStorage.setItem('rb_pro', 'true')
    setShowUpgrade(false)
    if (!resume) return
    const updated = { ...resume, templateId: 'prism' }
    setResume(updated)
    db.save(updated.id, updated)
    setToast({ msg: '🎉 Upgraded! All templates unlocked.', type: 'success' })
  }

  const renderSection = () => {
    if (!resume) return null
    const props = { resume, onChange: handleChange }
    switch (activeSection) {
      case 'personal':       return <PersonalInfo          {...props} />
      case 'summary':        return <SummarySection        {...props} />
      case 'experience':     return <ExperienceSection     {...props} />
      case 'education':      return <EducationSection      {...props} />
      case 'skills':         return <SkillsSection         {...props} />
      case 'projects':       return <ProjectsSection       {...props} />
      case 'certifications': return <CertificationsSection {...props} />
      case 'template':       return (
        <TemplateSection
          {...props}
          isPro={isPro}
          onUnlock={() => setShowUpgrade(true)}
        />
      )
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg gap-2 text-text2 text-sm">
        <Icon name="loading" size={16} className="animate-spin-slow" />
        Loading resume...
      </div>
    )
  }

  // Resume not found
  if (!resume) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg text-text2 text-sm flex-col gap-4">
        <p>Resume not found.</p>
        <Button variant="secondary" onClick={onBack}>Go back</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg text-text1">

      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-border1 bg-bg/90 backdrop-blur-xl shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-text2 hover:text-text1 transition-colors cursor-pointer"
          >
            <Icon name="back" size={14} /> Resumes
          </button>
          <span className="text-border2">|</span>
          <span className="font-semibold text-sm text-text1 truncate max-w-48">
            {resume.name || 'Untitled Resume'}
          </span>
          {isPro && (
            <span className="text-xs font-semibold text-violet-300">💎 Premium</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" loading={saving} onClick={handleSave}>
            <Icon name="check" size={13} /> Save
          </Button>
          <Button variant="primary" size="sm" loading={downloading} onClick={handleDownload}>
            <Icon name="download" size={13} /> Download PDF
          </Button>
        </div>
      </header>

      {/* 3-column body */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* Col 1 — Sidebar nav */}
        <SidebarNav
          active={activeSection}
          resume={resume}
          isPro={isPro}
          onSelect={setActiveSection}
          onUnlock={() => setShowUpgrade(true)}
        />

        {/* Col 2 — Form */}
        <main className="w-[650px] shrink-0 overflow-y-auto bg-bg border-r border-border1">
          {renderSection()}
        </main>

        {/* Col 3 — Live preview */}
        <div className="flex-1 overflow-hidden bg-surface2 flex flex-col">

          {/* Preview toolbar */}
          <div className="h-12 flex items-center px-5 border-b border-border1 bg-bg shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-text2">Live Preview</span>
              <span className="text-xs text-text3">
                · {TEMPLATES[resume.templateId]?.name ?? 'Nova'} template
              </span>
            </div>
          </div>

          {/* Scrollable resume preview */}
          <div className="flex-1 overflow-y-auto p-6 flex justify-center items-start">
            <div
              className="bg-white rounded-lg shadow-2xl w-full mb-6"
              style={{ maxWidth: '650px' }}
            >
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden A4 print target for html2pdf */}
      <div className="fixed -left-[9999px] -top-[9999px] w-[210mm] pointer-events-none">
        <div ref={printRef}>
          <ResumePreview resume={resume} />
        </div>
      </div>

      {showUpgrade && (
        <UpgradeModal onUpgrade={handleUpgrade} onClose={() => setShowUpgrade(false)} />
      )}
      {toast && <Toast {...toast} onDone={() => setToast(null)} />}
    </div>
  )
}
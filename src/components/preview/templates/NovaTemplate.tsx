import type { Resume } from '../../../lib/types'

const f = (v?: string) => !!v?.trim()

export default function NovaTemplate({ r }: { r: Resume }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#1d4ed8', color: 'white', padding: '2rem 2.5rem' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'Georgia, serif', marginBottom: '0.15rem' }}>
          {r.name || 'Your Name'}
        </div>
        <div style={{ fontSize: '1rem', opacity: 0.85, marginBottom: '1rem' }}>
          {r.title || 'Professional Title'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', opacity: 0.9 }}>
          {f(r.email)    && <span>✉ {r.email}</span>}
          {f(r.phone)    && <span>📞 {r.phone}</span>}
          {f(r.location) && <span>📍 {r.location}</span>}
          {f(r.linkedin) && <span>🔗 {r.linkedin}</span>}
          {f(r.website)  && <span>🌐 {r.website}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>

        {/* Main column */}
        <div style={{ padding: '1.75rem 2rem', borderRight: '1px solid #e5e7eb' }}>
          {f(r.summary) && (
            <Section title="Professional Summary" accent="#1d4ed8">
              <p style={{ fontSize: '0.85rem', color: '#374151', lineHeight: 1.7 }}>{r.summary}</p>
            </Section>
          )}

          {r.experience?.some(e => f(e.company) || f(e.role)) && (
            <Section title="Work Experience" accent="#1d4ed8">
              {r.experience.filter(e => f(e.company) || f(e.role)).map(e => (
                <div key={e.id} style={{ marginBottom: '1.1rem', paddingBottom: '1.1rem', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111827' }}>{e.role}</div>
                  <div style={{ color: '#111827', fontSize: '0.82rem', fontWeight: 500 }}>{e.company}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.4rem' }}>
                    {e.start}{e.start && (e.end || e.current) ? ' – ' : ''}{e.current ? 'Present' : e.end}
                  </div>
                  {f(e.description) && <div style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.6 }}>{e.description}</div>}
                </div>
              ))}
            </Section>
          )}

          {r.projects?.some(p => f(p.name)) && (
            <Section title="Projects" accent="#1d4ed8">
              {r.projects.filter(p => f(p.name)).map(p => (
                <div key={p.id} style={{ marginBottom: '1.1rem', paddingBottom: '1.1rem', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827' }}>{p.name}</div>
                  {f(p.tech) && <div style={{ color: '#111827', fontSize: '0.82rem', fontWeight: 500 }}>{p.tech}</div>}
                  {f(p.description) && <div style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.6 }}>{p.description}</div>}
                  {f(p.url) && <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{p.url}</div>}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ padding: '1.75rem 1.5rem', background: '#f8fafc' }}>
          {r.skills?.length > 0 && (
            <Section title="Skills" accent="#1d4ed8">
              <div>{r.skills.map((s, i) => (
                <span key={i} style={{ display: 'inline-block', background: '#eff6ff', color: '#1d4ed8', borderRadius: 4, padding: '0.2rem 0.55rem', fontSize: '0.75rem', fontWeight: 500, margin: '0.2rem' }}>{s}</span>
              ))}</div>
            </Section>
          )}

          {r.education?.some(e => f(e.school)) && (
            <Section title="Education" accent="#1d4ed8">
              {r.education.filter(e => f(e.school)).map(e => (
                <div key={e.id} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111827' }}>{e.school}</div>
                  <div style={{ fontSize: '0.8rem', color: '#4b5563' }}>{e.degree}{e.degree && e.field ? ', ' : ''}{e.field}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{e.year}</div>
                </div>
              ))}
            </Section>
          )}

          {r.certifications?.some(c => f(c.name)) && (
            <Section title="Certifications" accent="#1d4ed8">
              {r.certifications.filter(c => f(c.name)).map(c => (
                <div key={c.id} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111827' }}>{c.name}</div>
                  <div style={{ fontSize: '0.76rem', color: '#6b7280' }}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</div>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '0.3rem', marginBottom: '0.85rem' }}>
        {title}
      </div>
      {children}
    </div>
  )
}
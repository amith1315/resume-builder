import type { Resume } from '../../../lib/types'

const f = (v?: string) => !!v?.trim()

export default function PrismTemplate({ r }: { r: Resume }) {
  const initials = r.name
    ? r.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'YN'

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#4c1d95 0%,#6d28d9 60%,#7c3aed 100%)', color: 'white', padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0, border: '3px solid rgba(255,255,255,0.3)' }}>
          {initials}
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.2rem' }}>{r.name || 'Your Name'}</div>
          <div style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '0.75rem' }}>{r.title || 'Professional Title'}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.78rem', opacity: 0.85 }}>
            {f(r.email)    && <span>✉ {r.email}</span>}
            {f(r.phone)    && <span>📞 {r.phone}</span>}
            {f(r.location) && <span>📍 {r.location}</span>}
            {f(r.website)  && <span>🌐 {r.website}</span>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px' }}>

        {/* Main */}
        <div style={{ padding: '2rem 2rem 2rem 2.5rem' }}>
          {f(r.summary) && (
            <p style={{ fontSize: '0.85rem', color: '#374151', lineHeight: 1.7, marginBottom: '1.5rem' }}>{r.summary}</p>
          )}

          {r.experience?.some(e => f(e.company) || f(e.role)) && (
            <Section title="Experience">
              {r.experience.filter(e => f(e.company) || f(e.role)).map(e => (
                <div key={e.id} style={{ marginBottom: '1.1rem', paddingBottom: '1.1rem', borderBottom: '1px dashed #e9d5ff' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1a2e' }}>{e.role}</div>
                  <div style={{ fontSize: '0.78rem', color: '#7c3aed', fontWeight: 500, marginBottom: '0.35rem' }}>
                    {e.company}{e.start ? ' · ' : ''}{e.start}{e.start && (e.end || e.current) ? ' – ' : ''}{e.current ? 'Present' : e.end}
                  </div>
                  {f(e.description) && <div style={{ fontSize: '0.81rem', color: '#374151', lineHeight: 1.65 }}>{e.description}</div>}
                </div>
              ))}
            </Section>
          )}

          {r.projects?.some(p => f(p.name)) && (
            <Section title="Projects">
              {r.projects.filter(p => f(p.name)).map(p => (
                <div key={p.id} style={{ marginBottom: '1.1rem', paddingBottom: '1.1rem', borderBottom: '1px dashed #e9d5ff' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1a2e' }}>{p.name}</div>
                  {f(p.tech) && <div style={{ fontSize: '0.78rem', color: '#7c3aed', fontWeight: 500, marginBottom: '0.35rem' }}>{p.tech}</div>}
                  {f(p.description) && <div style={{ fontSize: '0.81rem', color: '#374151', lineHeight: 1.65 }}>{p.description}</div>}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ background: '#faf5ff', padding: '2rem 1.5rem', borderLeft: '1px solid #e9d5ff' }}>
          {r.skills?.length > 0 && (
            <Section title="Skills">
              {r.skills.map((s, i) => (
                <div key={i} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#374151', marginBottom: '0.2rem' }}>{s}</div>
                  <div style={{ height: 4, background: '#e9d5ff', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(90deg,#7c3aed,#a78bfa)', borderRadius: 2, width: `${65 + ((i * 23) % 30)}%` }} />
                  </div>
                </div>
              ))}
            </Section>
          )}

          {r.education?.some(e => f(e.school)) && (
            <Section title="Education">
              {r.education.filter(e => f(e.school)).map(e => (
                <div key={e.id} style={{ marginBottom: '0.85rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1a1a2e' }}>{e.school}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{e.degree}{e.degree && e.field ? ', ' : ''}{e.field}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{e.year}</div>
                </div>
              ))}
            </Section>
          )}

          {r.certifications?.some(c => f(c.name)) && (
            <Section title="Certifications">
              {r.certifications.filter(c => f(c.name)).map(c => (
                <div key={c.id} style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 600, color: '#1a1a2e' }}>{c.name}</div>
                  <div style={{ color: '#7c3aed' }}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</div>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6d28d9', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {title}
        <span style={{ flex: 1, height: 1, background: '#e9d5ff', display: 'inline-block' }} />
      </div>
      {children}
    </div>
  )
}
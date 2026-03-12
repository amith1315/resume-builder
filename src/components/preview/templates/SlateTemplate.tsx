import type { Resume } from '../../../lib/types'

const f = (v?: string) => !!v?.trim()

export default function SlateTemplate({ r }: { r: Resume }) {
  return (
    <div style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div style={{ padding: '2.5rem 2.5rem 1.5rem', borderBottom: '3px solid #0f172a' }}>
        <div style={{ fontSize: '2.4rem', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.35rem' }}>
          {r.name || 'Your Name'}
        </div>
        <div style={{ fontSize: '1.05rem', color: '#475569', fontStyle: 'italic', marginBottom: '1rem' }}>
          {r.title || 'Professional Title'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.78rem', color: '#64748b', fontFamily: 'Arial, sans-serif' }}>
          {f(r.email)    && <span>{r.email}</span>}
          {f(r.phone)    && <span>{r.phone}</span>}
          {f(r.location) && <span>{r.location}</span>}
          {f(r.linkedin) && <span>{r.linkedin}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.75rem 2.5rem' }}>
        {f(r.summary) && (
          <Section title="About">
            <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.8, fontFamily: 'Arial, sans-serif' }}>{r.summary}</p>
          </Section>
        )}

        {r.experience?.some(e => f(e.company) || f(e.role)) && (
          <Section title="Experience">
            {r.experience.filter(e => f(e.company) || f(e.role)).map(e => (
              <div key={e.id} style={{ marginBottom: '1.2rem', borderLeft: '3px solid #e2e8f0', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{e.role}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', fontFamily: 'Arial, sans-serif', marginBottom: '0.4rem' }}>
                  <span>{e.company}</span>
                  <span>{e.start}{e.start && (e.end || e.current) ? ' – ' : ''}{e.current ? 'Present' : e.end}</span>
                </div>
                {f(e.description) && <div style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.7, fontFamily: 'Arial, sans-serif' }}>{e.description}</div>}
              </div>
            ))}
          </Section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {r.education?.some(e => f(e.school)) && (
            <Section title="Education">
              {r.education.filter(e => f(e.school)).map(e => (
                <div key={e.id} style={{ marginBottom: '0.65rem', fontFamily: 'Arial, sans-serif' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{e.school}</div>
                  <div style={{ fontSize: '0.82rem', color: '#475569' }}>{e.degree}{e.degree && e.field ? ', ' : ''}{e.field}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{e.year}</div>
                </div>
              ))}
            </Section>
          )}

          {r.skills?.length > 0 && (
            <Section title="Skills">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', fontFamily: 'Arial, sans-serif' }}>
                {r.skills.map((s, i) => (
                  <span key={i} style={{ background: '#0f172a', color: 'white', padding: '0.25rem 0.65rem', fontSize: '0.75rem', borderRadius: 2, fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </Section>
          )}
        </div>

        {r.projects?.some(p => f(p.name)) && (
          <Section title="Projects">
            {r.projects.filter(p => f(p.name)).map(p => (
              <div key={p.id} style={{ marginBottom: '1.2rem', borderLeft: '3px solid #e2e8f0', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', fontFamily: 'Arial, sans-serif', marginBottom: '0.4rem' }}>
                  <span style={{ fontStyle: 'italic' }}>{p.tech}</span><span>{p.url}</span>
                </div>
                {f(p.description) && <div style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.7, fontFamily: 'Arial, sans-serif' }}>{p.description}</div>}
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem', fontFamily: 'Arial, sans-serif' }}>
        {title}
      </div>
      {children}
    </div>
  )
}
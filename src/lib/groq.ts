const API_KEY = import.meta.env.VITE_GROQ_API_KEY
const API_URL = 'https://api.groq.com/openai/v1/chat/completions'

async function callGroq(prompt: string): Promise<string> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model:       'llama-3.3-70b-versatile',
      messages:    [{ role: 'user', content: prompt }],
      max_tokens:  1000,
      temperature: 0.7,
    }),
  })

  if (!res.ok) {
    const errBody = await res.json()
    console.error('Groq error:', errBody)
    throw new Error(`Groq API error: ${res.status}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}

// ─── AI FEATURES ─────────────────────────────────────────────────────────────

export async function generateSummary(title: string, skills: string[]): Promise<string> {
  const skillList = skills.length ? `with skills in ${skills.join(', ')}` : ''
  const prompt = `Write a compelling 3-sentence professional summary for a resume.
The person is a ${title || 'professional'} ${skillList}.
Make it confident, specific, and achievement-oriented.
Return only the summary text, no labels or preamble.`

  return callGroq(prompt)
}

export async function improveDescription(role: string, company: string, description: string): Promise<string> {
  const prompt = `Improve this work experience description for a resume to make it more impactful and achievement-oriented.
Use strong action verbs and quantify results where possible. Keep it to 2-3 sentences max.

Role: ${role || 'Professional'}
Company: ${company}
Current description: ${description}

Return only the improved description, no labels or preamble.`

  return callGroq(prompt)
}

export async function suggestSkills(title: string): Promise<string[]> {
  const prompt = `Suggest 10 relevant professional skills for a ${title || 'professional'}.
Return ONLY a JSON array of skill strings like ["React","Node.js"].
No explanation, no markdown, no backticks.`

  const raw = await callGroq(prompt)
  const clean = raw.replace(/```json|```/g, '').trim()
  try {
    const parsed = JSON.parse(clean)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
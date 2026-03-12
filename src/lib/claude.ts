// ─── API CALL ─────────────────────────────────────────────────────────────────
// In production: route through your own backend (e.g. /api/claude)
// to keep your API key server-side

async function callClaude(prompt: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) throw new Error(`API error: ${res.status}`)

  const data = await res.json()
  return data.content
    ?.map((b: { type: string; text?: string }) => b.text ?? '')
    .join('') ?? ''
}

// ─── AI FEATURES ─────────────────────────────────────────────────────────────

export async function generateSummary(title: string, skills: string[]): Promise<string> {
  const skillList = skills.length ? `with skills in ${skills.join(', ')}` : ''
  const prompt = `Write a compelling 3-sentence professional summary for a resume. 
The person is a ${title || 'professional'} ${skillList}. 
Make it confident, specific, and achievement-oriented. 
Return only the summary text, no labels or preamble.`

  return callClaude(prompt)
}

export async function improveDescription(role: string, company: string, description: string): Promise<string> {
  const prompt = `Improve this work experience description for a resume to make it more impactful and achievement-oriented.
Use strong action verbs and quantify results where possible. Keep it to 2-3 sentences max.

Role: ${role || 'Professional'}
Company: ${company}
Current description: ${description}

Return only the improved description, no labels or preamble.`

  return callClaude(prompt)
}

export async function suggestSkills(title: string): Promise<string[]> {
  const prompt = `Suggest 10 relevant professional skills for a ${title || 'professional'}.
Return ONLY a JSON array of skill strings like ["React","Node.js"]. 
No explanation, no markdown, no backticks.`

  const raw = await callClaude(prompt)
  const clean = raw.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(clean)
  return Array.isArray(parsed) ? parsed : []
}
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { idea } = req.body || {};
  if (!idea || typeof idea !== 'string' || !idea.trim()) {
    return res.status(400).json({ error: 'Please provide a software idea.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured in Vercel.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Generate only clean, semantic, accessible HTML. Include a language attribute, title, labels, keyboard-friendly controls, and sensible WCAG practices. Return only HTML, without markdown fences.'
          },
          { role: 'user', content: `Create accessible HTML for: ${idea.trim()}` }
        ],
        temperature: 0.4,
        max_tokens: 2000
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'OpenAI request failed.' });
    }

    return res.status(200).json({ code: data.choices?.[0]?.message?.content?.trim() || '' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to contact OpenAI.' });
  }
}

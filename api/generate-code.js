import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { idea } = req.body;

  if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
    return res.status(400).json({ error: 'Please provide a software idea' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert accessibility specialist and web developer. 
Generate clean, semantic, and fully accessible HTML code that follows WCAG 2.1 AA standards.
Always include:
- Proper semantic HTML tags (header, nav, main, section, article, footer)
- ARIA labels and roles where needed
- Keyboard navigation support
- Focus visible styles
- Color contrast compliance
- Form labels and error messages
- Skip links where appropriate

Return ONLY valid HTML code wrapped in a single code block. No explanations.`
          },
          {
            role: 'user',
            content: `Create accessible HTML code for: ${idea}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      return res.status(response.status).json({ 
        error: error.error?.message || 'Failed to generate code' 
      });
    }

    const data = await response.json();
    const generatedCode = data.choices[0].message.content;

    // Extract HTML from code block if wrapped
    const htmlMatch = generatedCode.match(/```(?:html)?\n?([\s\S]*?)\n?```/) || 
                      generatedCode.match(/```([\s\S]*?)```/);
    const cleanCode = htmlMatch ? htmlMatch[1].trim() : generatedCode.trim();

    return res.status(200).json({ 
      code: cleanCode,
      message: 'Accessible code generated successfully'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to generate code' 
    });
  }
}

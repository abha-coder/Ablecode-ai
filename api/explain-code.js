import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;

  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    return res.status(400).json({ error: 'Please provide code to explain' });
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
            content: `You are an expert web developer and accessibility specialist.
Analyze and explain the provided code with a focus on:
1. What the code does (functionality)
2. Accessibility features (ARIA, semantic HTML, keyboard navigation, etc.)
3. Best practices used
4. Any accessibility improvements that could be made
5. WCAG compliance level

Be clear, concise, and educational. Format your response with sections.`
          },
          {
            role: 'user',
            content: `Please explain this code and its accessibility features:\n\n${code}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      return res.status(response.status).json({ 
        error: error.error?.message || 'Failed to explain code' 
      });
    }

    const data = await response.json();
    const explanation = data.choices[0].message.content;

    return res.status(200).json({ 
      explanation: explanation,
      message: 'Code explanation generated successfully'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to explain code' 
    });
  }
}

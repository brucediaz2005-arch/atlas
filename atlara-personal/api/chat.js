// Cerebro de ATLARA Personal: responde con Groq.
// Variables de entorno en Vercel:
//   GROQ_API_KEY   (obligatoria)  tu clave de console.groq.com
//   GROQ_MODEL     (opcional)     por defecto llama-3.3-70b-versatile
const PERSONAS = {
  atlas: 'Eres Atlas, asistente de voz analítico y directo. Respondes en español de México. Tu respuesta se lee en voz alta: texto plano, sin markdown, sin listas, máximo tres frases cortas.',
  lara:  'Eres Lara, asistente de voz cálida y clara. Respondes en español de México. Tu respuesta se lee en voz alta: texto plano, sin markdown, sin listas, máximo tres frases cortas.'
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });
  const KEY = process.env.GROQ_API_KEY;
  if (!KEY) return res.status(500).json({ error: 'Falta GROQ_API_KEY en Vercel' });

  const agente = req.body && req.body.agente === 'lara' ? 'lara' : 'atlas';
  const mensaje = String((req.body && req.body.mensaje) || '').slice(0, 1000);
  if (!mensaje.trim()) return res.status(400).json({ error: 'Mensaje vacío' });

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: PERSONAS[agente] }, { role: 'user', content: mensaje }],
        max_tokens: 300,
        temperature: 0.7
      })
    });
    const j = await r.json();
    if (!r.ok) return res.status(502).json({ error: (j.error && j.error.message) || 'Error de Groq' });
    res.status(200).json({ respuesta: ((j.choices && j.choices[0] && j.choices[0].message.content) || '').trim() });
  } catch (e) {
    res.status(502).json({ error: 'No se pudo conectar con Groq' });
  }
};

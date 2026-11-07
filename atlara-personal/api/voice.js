// Voz de ATLARA Personal: ElevenLabs, una voz para cada agente.
// Variables de entorno en Vercel:
//   ELEVENLABS_API_KEY        (obligatoria)
//   ELEVENLABS_VOICE_ID_ATLAS (obligatoria) ID de la voz de Atlas
//   ELEVENLABS_VOICE_ID_LARA  (obligatoria) ID de la voz de Lara
//   ELEVENLABS_MODEL          (opcional) por defecto eleven_multilingual_v2
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });
  const KEY = process.env.ELEVENLABS_API_KEY;
  const agente = req.body && req.body.agente === 'lara' ? 'LARA' : 'ATLAS';
  const VOZ = process.env['ELEVENLABS_VOICE_ID_' + agente];
  if (!KEY || !VOZ) return res.status(500).json({ error: 'Faltan ELEVENLABS_API_KEY o ELEVENLABS_VOICE_ID_' + agente });

  const texto = String((req.body && req.body.texto) || '').slice(0, 800);
  if (!texto.trim()) return res.status(400).json({ error: 'Texto vacío' });

  try {
    const r = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + encodeURIComponent(VOZ) + '?output_format=mp3_44100_128', {
      method: 'POST',
      headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
      body: JSON.stringify({ text: texto, model_id: process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2' })
    });
    if (!r.ok) return res.status(502).json({ error: 'ElevenLabs respondió ' + r.status });
    res.setHeader('Content-Type', 'audio/mpeg');
    res.status(200).send(Buffer.from(await r.arrayBuffer()));
  } catch (e) {
    res.status(502).json({ error: 'No se pudo conectar con ElevenLabs' });
  }
};

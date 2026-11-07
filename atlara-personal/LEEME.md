# ATLARA Personal: instalación

1. Sube esta carpeta a tu proyecto de Vercel (versión personal), reemplazando index.html y añadiendo api/chat.js y api/voice.js.
2. Variables de entorno en Vercel (Settings > Environment Variables):
   - GROQ_API_KEY
   - GROQ_MODEL (opcional)
   - ELEVENLABS_API_KEY (la que ya tienes)
   - ELEVENLABS_VOICE_ID_ATLAS (ID de la voz de Atlas)
   - ELEVENLABS_VOICE_ID_LARA (ID de la voz de Lara)
3. Vuelve a desplegar y abre la página en Chrome para Mac. Toca la pantalla una vez y permite el micrófono.
4. Di "Atlas, ..." o "Lara, ..." seguido de tu pregunta.

Si tus variables actuales tienen otros nombres, cámbialas aquí; los IDs de voz no cambian.

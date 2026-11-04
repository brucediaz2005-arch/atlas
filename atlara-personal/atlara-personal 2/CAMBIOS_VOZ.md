# ATLARA Personal — corrección de voz

Esta versión conserva los modelos GLB, texturas, reactores, diseño y selección de voces de ElevenLabs.

Correcciones:
- Evita iniciar varias sesiones de reconocimiento simultáneamente.
- Reintenta la escucha con pausa tras terminar; no la reinicia mientras Groq responde o ElevenLabs habla.
- Registra los eventos de reconocimiento en la consola de Chrome.
- Muestra los errores reales de Groq y ElevenLabs en lugar de ocultarlos tras «No pude responder en este momento».
- Reanuda la escucha al volver a la pestaña.

Configuración en Vercel:
GROQ_API_KEY, GROQ_MODEL, ELEVENLABS_API_KEY,
ELEVENLABS_VOICE_ID_ATLAS, ELEVENLABS_VOICE_ID_LARA.

El código ya utiliza process.env.GROQ_MODEL; no es necesario cambiar el modelo en el archivo.
No se garantiza funcionamiento hasta desplegar y probar en Chrome.

Para subir a GitHub, reemplaza los archivos de la carpeta atlara-personal
en la rama prueba-atlara, no subas este ZIP como archivo sin descomprimir.

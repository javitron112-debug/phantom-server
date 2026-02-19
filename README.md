📻 PHANTOM V22.3 | Tactical Web Radio
PHANTOM es una prueba de concepto (PoC) de una radio táctica basada en web que utiliza tecnología WebRTC (Audio API) y Socket.io para comunicaciones de voz efícies y seguras. Diseñada para ser efímera, no deja rastro de datos en disco y opera totalmente en la memoria volátil (RAM).

🛡️ Características de Seguridad
Cifrado de Grado Militar: Utiliza AES-GCM de 256 bits para el audio y los mensajes.

Derivación de Clave Robusta: Implementa PBKDF2 con 600,000 iteraciones y hash SHA-512, lo que hace que los ataques de fuerza bruta sean computacionalmente inviables.

Comunicaciones Efímeras: Todo el historial de chat, coordenadas GPS y fragmentos de audio se almacenan en RAM volátil. Al cerrar la pestaña o el navegador, la información desaparece.

Protección Anti-DDoS: Sistema de baneo automático por IP integrado en el servidor para prevenir inundaciones de paquetes (Flood).

Privacidad Total: Sin bases de datos. El servidor actúa únicamente como un repetidor (Relay) de paquetes cifrados.

🚀 Funcionalidades Tácticas
PTT (Push-to-Talk): Sistema de medio dúplex con bloqueo de canal automático cuando alguien está transmitiendo.

Botón SOS Emergencia: Envía una alerta visual y sonora a todo el equipo, bloquea el canal para prioridad absoluta y comparte la ubicación GPS en tiempo real con enlace directo a Google Maps.

Localización GPS: Envío manual de coordenadas para reportes de posición.

Auto-Configuración por QR: Genera un código QR que contiene la URL del servidor codificada, facilitando el despliegue rápido entre miembros del equipo.

Optimizado para Móvil: Interfaz diseñada para evitar zooms accidentales y barra de escritura fija sobre el teclado táctil.

🛠️ Instalación y Despliegue
1. Servidor (Backend)
Diseñado para ser desplegado en Render, Heroku o cualquier servidor Node.js.

Sube los archivos server.js y package.json a tu repositorio.

En Render, crea un Web Service.

Asegúrate de configurar la variable de entorno NODE_VERSION en 18.0.0 o superior.

2. Cliente (Frontend)
Diseñado para GitHub Pages.

Sube el archivo index.html a un repositorio con GitHub Pages activo.

Accede a la URL generada, introduce la URL de tu servidor en Render y ¡listo!

📱 Uso Operativo
Enlace: Al abrir la web, introduce la URL del servidor, tu ID de operador y la clave del canal (E2EE).

QR: Usa el botón "Generar QR" para que otros miembros se unan sin tener que escribir manualmente la dirección del servidor.

Comunicación: Mantén presionado el botón central para transmitir. El LED pasará a Rojo (TX). Si ves el LED en Azul (RX), el canal está ocupado.

⚠️ Descargo de Responsabilidad
Este software es una herramienta experimental con fines educativos y de prueba de concepto. El autor no se hace responsable del uso indebido de esta herramienta.

📻 PHANTOM V22.3 | Tactical Web Radio
PHANTOM es una plataforma de comunicación táctica basada en web que utiliza WebRTC y Socket.io para transmisiones de voz seguras y eficientes en tiempo real. Este sistema ha sido diseñado bajo el principio de Privacidad por Diseño, operando exclusivamente en memoria volátil para garantizar comunicaciones efímeras.

🛡️ Seguridad y Cifrado
E2EE (End-to-End Encryption): Todo el audio y texto se cifra en el dispositivo emisor y se descifra en el receptor.

Algoritmo AES-GCM: Utiliza cifrado de 256 bits para garantizar la integridad y confidencialidad.

Derivación SHA-512: Las claves se generan mediante PBKDF2 con 600,000 iteraciones, haciendo el sistema resistente a ataques de fuerza bruta.

Zero Persistence: No se utiliza ninguna base de datos. Al cerrar la sesión, toda la información de la RAM es purgada automáticamente.

Protección Perimetral: El servidor incluye un sistema de baneo automático por IP ante intentos de ataques DoS.

🚀 Funciones Operativas
PTT (Push-to-Talk): Control de flujo de voz medio-dúplex con indicadores visuales de estado (TX/RX).

Alerta SOS Prioritaria: Activación de alarma sonora global, bloqueo del canal para emergencia y envío de coordenadas GPS con enlace directo a mapas.

Reporte de Posición: Envío rápido de ubicación actual sin activar alarma de emergencia.

Auto-Configuración QR: Generador de códigos QR que pre-configuran la URL del servidor para facilitar el despliegue a nuevos operadores.

Contador de Operadores: Visualización en tiempo real del número de usuarios activos en la frecuencia.

🛠️ Guía de Despliegue
1. Servidor (Backend)
Ideal para alojar en Render.com:

Crea un repositorio privado con server.js y package.json.

En Render, crea un Web Service conectado a ese repositorio.

Configura el Start Command como: node server.js.

2. Cliente (Frontend)
Ideal para alojar en GitHub Pages:

Sube el archivo index.html a tu repositorio.

Activa GitHub Pages en los ajustes del repositorio.

Accede a la URL, ingresa los datos de conexión y genera un QR para tu equipo.

🔍 Solución de Problemas (Troubleshooting)
¿No se escucha el audio? Verifica que la contraseña E2EE sea idéntica en todos los dispositivos. Un solo carácter diferente impedirá el descifrado.

¿El botón PTT no responde? Asegúrate de estar usando una conexión HTTPS. Los navegadores bloquean el acceso al micrófono en sitios no seguros.

¿Error de conexión en móvil? El servidor en Render puede "dormirse" tras 15 minutos de inactividad. Espera 30 segundos a que despierte en el primer acceso.

⚠️ Aviso Legal
Este proyecto es una Prueba de Concepto (PoC) con fines educativos. El uso de este sistema en entornos críticos queda bajo responsabilidad del usuario final.

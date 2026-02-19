# ⚡ PHANTOM V22.3 | Tactical Web Radio ⚡

<p align="center">
  <img src="https://img.shields.io/badge/Estado-OPERATIVO-00ff41?style=for-the-badge&logo=render&logoColor=white" />
  <img src="https://img.shields.io/badge/Seguridad-AES--GCM%20256--bit-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Privacidad-E2EE%20%2F%20Zero--Log-orange?style=for-the-badge" />
</p>

**PHANTOM** es un ecosistema de comunicación crítica diseñado para operaciones que requieren **máxima discreción y despliegue rápido**. No es solo una radio; es un repetidor efímero que cifra cada bit de información antes de que salga de tu dispositivo.

---

## 🛠️ Especificaciones Técnicas

| Módulo | Tecnología | Función |
| :--- | :--- | :--- |
| **Cifrado de Voz** | AES-GCM 256-bit | Encriptación de audio en tiempo real |
| **Derivación** | PBKDF2 / SHA-512 | Protección contra fuerza bruta (600k iter.) |
| **Transporte** | WebSockets (Socket.io) | Latencia ultra baja en transmisiones |
| **Persistencia** | 0% (Volátil) | Todo se destruye al cerrar la sesión |



---

## 📡 Funciones Principales

### 🎙️ Comunicación PTT (Push-to-Talk)
Sistema de medio dúplex con **bloqueo automático**. Si un operador está transmitiendo (LED Rojo), el resto del equipo entra en modo recepción (LED Azul) y sus botones de transmisión se bloquean para evitar colisiones de audio.

### 🚨 Protocolo de Emergencia SOS
Al activar el botón SOS:
1. Se emite una alerta sonora de alta prioridad a todo el equipo.
2. El canal se bloquea para uso exclusivo de la emergencia.
3. Se envía la **ubicación GPS exacta** con un enlace directo a Google Maps.

### 📲 Auto-Configuración QR
Genera un código QR desde la consola principal. Cualquier compañero que escanee el código entrará a la web con la **URL del servidor ya configurada**, eliminando errores de escritura.

---

## 🚀 Guía de Instalación

### 1. Servidor (Backend en Render)
Sube tu archivo `server.js` y `package.json` a tu repositorio y despliega como **Web Service**.

Comandos de inicio automáticos en Render
npm install
node server.js

### 2. Cliente (Frontend en GitHub Pages)
El despliegue de la interfaz se realiza en GitHub Pages para garantizar alta disponibilidad.

Alojamiento: Sube el archivo index.html a la rama raíz (main) de tu repositorio.

Protocolo Seguro: Es estrictamente obligatorio acceder mediante HTTPS. Los navegadores modernos bloquean el acceso al micrófono y a la geolocalización en sitios que no cuentan con un certificado SSL válido.

### 🔍 Solución de Problemas (Troubleshooting)
**[!IMPORTANT]**
Latencia en el primer arranque
Debido al uso del plan gratuito de Render, el servidor entra en estado de "suspensión" tras 15 minutos de inactividad. La primera conexión del día puede demorar hasta 30 segundos mientras la instancia se reactiva.

### [!TIP]
Errores de descifrado (Audio/Chat)
El sistema utiliza cifrado simétrico AES-GCM. Si la contraseña del canal no coincide exactamente (incluyendo mayúsculas o espacios) entre todos los operadores, el navegador no podrá descifrar los paquetes, resultando en silencio.

### ⚠️ Descargo de Responsabilidad (Disclaimer)
**[!CAUTION]**
Este software es una Prueba de Concepto (PoC). Aunque implementa estándares de seguridad avanzados (E2EE), su estabilidad operativa está sujeta a la calidad de la red y a las limitaciones del proveedor de hosting. El uso de esta herramienta en entornos de misión crítica es bajo la total responsabilidad del usuario.

<p align="center">
<i>Desarrollado para comunicaciones seguras y efímeras. v22.3.0</i>
</p>

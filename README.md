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
3. Se envía la **ubicación GPS exacta** con un enlace directo a mapas.

### 📲 Auto-Configuración QR
Genera un código QR desde la consola principal. Cualquier compañero que escanee el código entrará a la web con la **URL del servidor ya configurada**, eliminando errores de escritura en momentos críticos.

---

## 🚀 Guía de Instalación

### 1. Servidor (Backend en Render)
Sube tu archivo `server.js` y despliega como **Web Service**.
```bash
# Comandos de inicio automáticos
npm install
node server.js

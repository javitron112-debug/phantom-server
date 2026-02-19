# ⚡ PHANTOM V22.4 | Tactical Web Radio & Relay ⚡

<p align="center">
  <img src="https://img.shields.io/badge/Versión-22.4_Stable-00ff41?style=for-the-badge&logo=render&logoColor=white" />
  <img src="https://img.shields.io/badge/Seguridad-AES--GCM_E2EE-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Audio-Tactical_Beep_%26_Siren-orange?style=for-the-badge" />
</p>

**PHANTOM** evoluciona a la versión 22.4, consolidándose como una plataforma de comunicación efímera de alto rendimiento. Esta actualización introduce herramientas de inteligencia de campo y mejoras críticas en la señalización acústica.

---

## 🆕 Novedades de la V22.4

### 🔄 Sistema de Grabación de Ráfaga (Instant Replay)
Implementación de un buffer circular de audio que almacena las últimas transmisiones recibidas. Permite al operador re-escuchar el último mensaje con un solo toque, ideal para entornos con ruido ambiental elevado donde la primera escucha no fue clara.

### 👥 Gestión de Operadores Activos
Nueva interfaz de monitorización de equipo. El encabezado táctico ahora incluye un menú desplegable en tiempo real que lista los IDs de todos los operadores sintonizados en la misma frecuencia.

### 🚨 Alerta SOS Sincronizada
El protocolo de emergencia ahora es **global**. Al activarse el SOS, la sirena de alta intensidad (onda de sierra) se dispara simultáneamente en todos los dispositivos conectados a la sala, garantizando una respuesta inmediata del equipo.

### 🕒 Registro Temporal (Timestamping)
Todos los mensajes de texto y alertas de posición incluyen ahora una marca de tiempo precisa (`HH:MM`), permitiendo una cronología exacta de los eventos en el log de misión.

---

## 🛠️ Especificaciones Técnicas Actualizadas

| Módulo | Tecnología | Función |
| :--- | :--- | :--- |
| **Cifrado de Voz** | AES-GCM 256-bit | Encriptación E2EE antes de la salida de datos. |
| **Audio Táctico** | Roger Beep (1000Hz) | Confirmación local de fin de transmisión. |
| **Alerta SOS** | Sawtooth Oscillator | Sirena global de 440Hz-880Hz. |
| **Buffer de Ráfaga** | Blob URL Memory | Almacenamiento volátil de los últimos 5 audios. |



---

## 🚀 Despliegue Rápido

### 1. Servidor (Backend)
Actualiza tu `server.js` para soportar la nueva lógica de `user-list` detallada.

npm install
node server.js
### 2. Cliente (Frontend)
Sube el nuevo index.html a tu hosting HTTPS.

## [!CAUTION] 
El acceso vía HTTPS es obligatorio para que el navegador permita el uso del micrófono, la geolocalización y el motor de AudioContext necesario para la sirena.

🔍 Troubleshooting (Solución de Problemas)
[!IMPORTANT]
¿No escuchas la sirena SOS?
Algunos navegadores (especialmente en iOS) bloquean el audio automático. Es necesario que el usuario haya interactuado con la pantalla (un toque en cualquier lugar) al menos una vez tras cargar la página para "despertar" el motor de audio.

[!TIP]
Uso de la Ráfaga
El botón de ráfaga solo funcionará si ya has recibido al menos una transmisión de audio desde que entraste en la sala. El historial se borra completamente al refrescar la pestaña.

### ⚠️ Descargo de Responsabilidad (Disclaimer)
Este software es una Prueba de Concepto (PoC). La estabilidad depende de la latencia de red. El sistema no almacena logs; una vez cerrada la sesión, la información es irrecuperable por diseño.

<p align="center">
<i>PHANTOM TACTICAL - Silent. Invisible. Secure. v22.4.0</i>
</p>

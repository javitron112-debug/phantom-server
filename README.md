# ⚡ PHANTOM V22.6 | Tactical Web Radio ⚡

<p align="center">
  <img src="https://img.shields.io/badge/Versión-22.6_Stable-00ff41?style=for-the-badge&logo=render&logoColor=white" />
  <img src="https://img.shields.io/badge/Security-AES--GCM_E2EE-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Mobile-Wake--Lock_Active-orange?style=for-the-badge" />
</p>

**PHANTOM** es un sistema de comunicación táctica efímero diseñado para operaciones que requieren soberanía total de datos y persistencia cero. La versión 22.6 optimiza el despliegue en campo mediante invitaciones QR y garantiza la conexión en dispositivos móviles con la pantalla bloqueada.

---

## 🆕 Novedades de la V22.6

### 📲 Sistema de Invitación Simplificado (QR & Link)
Ahora es posible invitar a nuevos operadores sin que tengan que configurar manualmente el servidor o la contraseña.
- **QR de Invitación:** Genera un código que contiene los metadatos de la sala.
- **Enlace Directo:** Permite enviar la configuración vía aplicaciones de mensajería.
- **Flujo "One-Click":** El invitado solo debe introducir su nombre de operador; el resto de los campos técnicos se auto-configuran y se ocultan para reducir errores.

### 🔋 Persistencia Táctica (Background Mode)
Optimizado para evitar que Android e iOS suspendan la aplicación al apagar la pantalla:
- **Wake-Lock API:** Mantiene la CPU activa para procesar paquetes de audio.
- **Silent Background Loop:** Engaña al sistema operativo simulando una reproducción de audio constante, evitando que el proceso sea "matado" para ahorrar batería.

### 🔄 Ráfaga de Audio (5s Buffer)
Botón de respuesta rápida que reproduce la última transmisión recibida. Crucial en entornos ruidosos donde la comunicación inicial puede perderse.

---

## 🛠️ Arquitectura del Sistema



| Característica | Implementación | Beneficio |
| :--- | :--- | :--- |
| **Cifrado** | AES-GCM 256-bit | Privacidad total; el servidor no puede leer el contenido. |
| **Persistencia** | Zero-Log (RAM Only) | Si el servidor se apaga, toda la historia desaparece. |
| **Audio** | Web Audio API | Generación sintética de Beeps y Sirenas SOS globales. |
| **Sincronización** | Socket.io | Latencia mínima en comunicaciones medio-dúplex. |

---

## 🚀 Guía de Despliegue

### 1. Requisitos
- **Servidor:** Node.js instalado (o cuenta en Render/Railway).
- **Cliente:** Acceso obligatorio vía **HTTPS** (necesario para Micrófono y Wake-Lock).

### 2. Instalación

## Clonar repositorio
git clone [https://github.com/tu-usuario/phantom-radio.git](https://github.com/tu-usuario/phantom-radio.git)

## Instalar dependencias
npm install express socket.io

## Iniciar servicio
node server.js

### 3. Configuración en Móvil (Crítico)
Para garantizar que la radio funcione con la pantalla apagada:

Android: Ajustes > Aplicación (Chrome) > Batería > Sin Restricciones.

iOS: Desactivar el Modo de Bajo Consumo.

## 🚨 Protocolos de Emergencia
Al activar el botón SOS, el sistema:

Obtiene las coordenadas GPS exactas.

Emite una sirena sonora global en todos los terminales sintonizados.

Envía un mensaje de chat con un enlace directo a Google Maps con la posición del operador en peligro.

## ⚠️ Seguridad y Privacidad
Este sistema utiliza PBKDF2 con 600,000 iteraciones para derivar la clave de cifrado. Esto significa que la contraseña nunca viaja por la red; solo se usa localmente para cifrar y descifrar los paquetes que pasan por el servidor.

<p align="center">
<i>PHANTOM TACTICAL - Silent. Invisible. Secure. v22.6.0</i>
</p>

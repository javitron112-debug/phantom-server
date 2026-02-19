================================================================================
    ____  __  __ ___     _   __ ______ ____   __  ___  _   __  ____   ____
   / __ \/ / / //   |   / | / //_  __// __ \ /  |/  / | | / / /__  \ /__  \
  / /_/ / /_/ // /| |  /  |/ /  / /  / / / // /|_/ /  | |/ /    /  /   /  /
 / ____/ __  // ___ | / /|  /  / /  / /_/ // /  / /   |   /    /  /   /  /
/_/   /_/ /_//_/  |_|/_/ |_/  /_/   \____//_/  /_/    |_/    /____/ /____/

                           SISTEMA DE RADIO TÁCTICA v22.3
                      [ CIFRADO E2EE | MEMORIA VOLÁTIL | PTT ]
================================================================================

1. DESCRIPCIÓN DEL PROYECTO
--------------------------------------------------------------------------------
PHANTOM es una plataforma de comunicación crítica basada en web diseñada para ser
efímera e invisible. Utiliza tecnología de vanguardia para garantizar que las
comunicaciones sean seguras y no dejen rastro digital.

>> ESTADO: OPERATIVO [LIVE]
>> PROTOCOLO: AES-GCM 256-bit + PBKDF2 (600k Iteraciones)
>> ALMACENAMIENTO: 0% PERSISTENCIA (Sólo RAM)

2. ESPECIFICACIONES TÉCNICAS
--------------------------------------------------------------------------------
[+] SEGURIDAD:
    - Cifrado de extremo a extremo (E2EE) en el dispositivo del cliente.
    - Derivación de clave mediante SHA-512 (Resistente a fuerza bruta).
    - Protección Anti-DDoS con sistema de baneo por IP en el servidor.

[+] FUNCIONALIDADES:
    - PTT (Push-to-Talk) con bloqueo automático de canal (Half-Duplex).
    - Botón SOS: Alarma sonora + Bloqueo de Prioridad + GPS en tiempo real.
    - Localización: Envío manual de coordenadas tácticas.
    - QR Config: Generación de acceso rápido con URL de servidor integrada.

3. ARQUITECTURA DEL SISTEMA
--------------------------------------------------------------------------------
Este sistema opera de forma desacoplada para máxima resiliencia:

[ CLIENTE (GitHub Pages) ] <---- (Túnel Cifrado) ----> [ SERVIDOR (Render) ]
        |                                                   |
        |--- Cifra Audio/Texto                              |--- Distribuye Paquetes
        |--- Gestiona GPS                                   |--- Controla Usuarios
        |--- Genera QR                                      |--- Filtra Ataques DoS

4. GUÍA DE DESPLIEGUE RÁPIDO
--------------------------------------------------------------------------------
[ PASO 01 ] - BACKEND:
    Sube 'server.js' y 'package.json' a un repositorio privado. Despliega en 
    Render.com como "Web Service". Configura NODE_VERSION >= 18.0.0.

[ PASO 02 ] - FRONTEND:
    Sube 'index.html' a GitHub Pages. Asegúrate de que la URL de conexión en 
    el código apunte a tu nueva instancia de Render.

[ PASO 03 ] - ACCESO:
    Entra a la URL de GitHub Pages, ingresa la URL de Render y genera un QR 
    táctico para distribuir la configuración a tu equipo de forma automática.

5. SOLUCIÓN DE PROBLEMAS (TROUBLESHOOTING)
--------------------------------------------------------------------------------
* ¿ERROR DE AUDIO?   -> Verificar que el Password sea idéntico en el equipo.
* ¿EL BOTÓN NO VA?   -> Asegúrate de estar usando protocolo HTTPS.
* ¿NO CONECTA?       -> El servidor gratuito de Render puede tardar 30s en despertar.
* ¿PÉRDIDA DE DATOS? -> El sistema borra todo al cerrar la pestaña por diseño.

6. NOTAS LEGALES
--------------------------------------------------------------------------------
Este software es una Prueba de Concepto (PoC) con fines educativos. El uso de 
este sistema en misiones reales es bajo responsabilidad del operador.

================================================================================
             SISTEMA PHANTOM - DESARROLLADO PARA OPERACIONES SEGURAS
================================================================================

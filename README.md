<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>PHANTOM V22.3 | Tactical Documentation</title>
    <style>
        :root {
            --neon: #00ff41;
            --bg: #0a0b0d;
            --panel: #14171c;
            --border: #20252e;
            --text: #a0aab8;
        }

        body {
            background-color: var(--bg);
            color: var(--text);
            font-family: 'Courier New', Courier, monospace;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }

        .terminal {
            max-width: 900px;
            margin: 0 auto;
            border: 1px solid var(--border);
            background: var(--panel);
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.05);
            border-radius: 8px;
            overflow: hidden;
        }

        .top-bar {
            background: var(--border);
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .dots { display: flex; gap: 8px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; background: #333; }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }

        .content { padding: 30px; }

        h1 {
            color: var(--neon);
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 5px;
            margin-bottom: 0;
            text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
        }

        .subtitle {
            text-align: center;
            font-size: 0.9em;
            color: #555;
            margin-bottom: 40px;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }

        .box {
            border: 1px solid var(--border);
            padding: 20px;
            background: rgba(0,0,0,0.2);
            border-radius: 4px;
        }

        h2 {
            color: var(--neon);
            font-size: 1.1em;
            border-bottom: 1px solid var(--border);
            padding-bottom: 10px;
            margin-top: 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        ul { list-style: none; padding: 0; }
        li { margin-bottom: 10px; position: relative; padding-left: 20px; }
        li::before { content: ">"; position: absolute; left: 0; color: var(--neon); }

        .tag {
            background: var(--neon);
            color: black;
            padding: 2px 8px;
            font-weight: bold;
            font-size: 0.8em;
            border-radius: 3px;
            margin-right: 5px;
        }

        code {
            background: #000;
            color: #efefef;
            padding: 15px;
            display: block;
            border-radius: 4px;
            border-left: 3px solid var(--neon);
            margin: 10px 0;
            font-size: 0.9em;
        }

        .warning {
            border: 1px solid #ff3131;
            color: #ff8a8a;
            padding: 15px;
            border-radius: 4px;
            background: rgba(255, 49, 49, 0.05);
        }

        footer {
            text-align: center;
            padding: 20px;
            font-size: 0.8em;
            color: #444;
            border-top: 1px solid var(--border);
        }
    </style>
</head>
<body>

<div class="terminal">
    <div class="top-bar">
        <div class="dots">
            <div class="dot red"></div>
            <div class="dot yellow"></div>
            <div class="dot green"></div>
        </div>
        <div style="font-size: 10px; color: #666;">PHANTOM_OS_v22.3.sys</div>
    </div>

    <div class="content">
        <h1>PHANTOM V22.3</h1>
        <div class="subtitle">SISTEMA DE COMUNICACIÓN TÁCTICA E2EE</div>

        <div class="grid">
            <div class="box">
                <h2>🛡️ SEGURIDAD</h2>
                <ul>
                    <li><span class="tag">AES-GCM</span> Cifrado de 256 bits</li>
                    <li><span class="tag">SHA-512</span> Derivación de clave</li>
                    <li><span class="tag">600K</span> Iteraciones PBKDF2</li>
                    <li><span class="tag">RAM</span> 0% persistencia en disco</li>
                </ul>
            </div>
            <div class="box">
                <h2>🚀 CAPACIDADES</h2>
                <ul>
                    <li>PTT (Push-To-Talk) Half-Duplex</li>
                    <li>Protocolo SOS con GPS activo</li>
                    <li>Auto-configuración vía QR</li>
                    <li>Anti-DDoS con baneo por IP</li>
                </ul>
            </div>
        </div>

        <div class="box" style="margin-bottom: 20px;">
            <h2>🛠️ DESPLIEGUE RÁPIDO</h2>
            <p>1. Despliega el servidor en <strong>Render.com</strong>:</p>
            <code>npm install && node server.js</code>
            <p>2. Sube el cliente a <strong>GitHub Pages</strong> y enlaza la URL generada.</p>
        </div>

        <div class="box" style="margin-bottom: 20px;">
            <h2>🔍 SOLUCIÓN DE PROBLEMAS</h2>
            <ul>
                <li><strong>¿Sin audio?</strong> Verifica que la clave E2EE coincida.</li>
                <li><strong>¿Error Micro/GPS?</strong> Requiere conexión <strong>HTTPS</strong>.</li>
                <li><strong>¿No conecta?</strong> Render tarda 30s en "despertar" el tier gratuito.</li>
            </ul>
        </div>

        <div class="warning">
            <strong>⚠️ AVISO OPERATIVO:</strong> Este sistema es una Prueba de Concepto (PoC). El borrado de datos es instantáneo al cerrar la pestaña por diseño de seguridad.
        </div>
    </div>

    <footer>
        &copy; 2026 PHANTOM TACTICAL - COMUNICACIONES EFÍMERAS
    </footer>
</div>

</body>
</html>

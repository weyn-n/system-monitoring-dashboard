function updateStats() {
    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {
            console.log('DATA:', data);

            const cpu = document.getElementById('cpu');
            const ram = document.getElementById('ram');
            const diskPercent = document.getElementById('disk_in_precent');
            const diskUsed = document.getElementById('disk_used');
            const diskTotal = document.getElementById('disk_total');
            const upload = document.getElementById('size_upd').textContent = data.size_upd;
            const download = document.getElementById('size_dowd').textContent = data.size_dowd;
            const uptime = document.getElementById('uptime_result');
            const processes = document.getElementById('processes');

            console.log({
                cpu,
                ram,
                diskPercent,
                diskUsed,
                diskTotal,
                upload,
                download,
                uptime,
                processes
            });

            if (cpu) cpu.textContent = data.cpu;
            if (ram) ram.textContent = data.ram;
            if (diskPercent) diskPercent.textContent = data.disk_in_precent;
            if (diskUsed) diskUsed.textContent = data.disk_used;
            if (diskTotal) diskTotal.textContent = data.disk_total;
            if (upload) {
                upload.textContent = data.size_upd;
            }
            if (download) {
                download.textContent = data.size_dowd;
            }
            if (uptime) uptime.textContent = data.uptime_result;
            if (processes) processes.textContent = data.processes;
        })
        .catch(err => console.error('Ошибка обновления:', err));
}

updateStats();
setInterval(updateStats, 2000);

const cpuHistory = [];
const CPU_HISTORY_LENGTH = 30;

const canvas = document.getElementById('cpu-chart');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawCPUChart() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    ctx.clearRect(0, 0, width, height);

    // -------------------------
    // GRID
    // -------------------------

    ctx.strokeStyle = '#252525';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
        const y = (height / 4) * i;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // -------------------------
    // CPU LINE
    // -------------------------

    if (cpuHistory.length < 2) {
        return;
    }

    ctx.beginPath();

    cpuHistory.forEach((value, index) => {

        const x =
            (index / (CPU_HISTORY_LENGTH - 1)) * width;

        const y =
            height - (value / 100) * height;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;

    ctx.stroke();
}

function addCPUValue(value) {

    value = Number(value);

    if (Number.isNaN(value)) {
        return;
    }

    // Ограничиваем 0-100%
    value = Math.max(0, Math.min(100, value));

    cpuHistory.push(value);

    // Оставляем только последние 30 измерений
    if (cpuHistory.length > CPU_HISTORY_LENGTH) {
        cpuHistory.shift();
    }

    const currentValue =
        document.getElementById('cpu-chart-value');

    if (currentValue) {
        currentValue.textContent = `${value.toFixed(1)}%`;
    }

    drawCPUChart();
}

function updateStats() {

    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {

            console.log('DATA:', data);

            const cpu = document.getElementById('cpu');
            const ram = document.getElementById('ram');
            const diskPercent =
                document.getElementById('disk_in_precent');
            const diskUsed =
                document.getElementById('disk_used');
            const diskTotal =
                document.getElementById('disk_total');

            const upload =
                document.getElementById('size_upd');

            const download =
                document.getElementById('size_dowd');

            const uptime =
                document.getElementById('uptime_result');

            const processes =
                document.getElementById('processes');


            // -------------------------
            // STATS
            // -------------------------

            if (cpu) {
                cpu.textContent = data.cpu;
            }

            if (ram) {
                ram.textContent = data.ram;
            }

            if (diskPercent) {
                diskPercent.textContent =
                    data.disk_in_precent;
            }

            if (diskUsed) {
                diskUsed.textContent =
                    data.disk_used;
            }

            if (diskTotal) {
                diskTotal.textContent =
                    data.disk_total;
            }

            if (upload) {
                upload.textContent =
                    data.size_upd;
            }

            if (download) {
                download.textContent =
                    data.size_dowd;
            }

            if (uptime) {
                uptime.textContent =
                    data.uptime_result;
            }

            if (processes) {
                processes.textContent =
                    data.processes;
            }


            // -------------------------
            // CPU GRAPH
            // -------------------------

            addCPUValue(data.cpu);
        })
        .catch(err =>
            console.error('Ошибка обновления:', err)
        );
}


// -------------------------
// INIT
// -------------------------

resizeCanvas();
drawCPUChart();

window.addEventListener('resize', () => {
    resizeCanvas();
    drawCPUChart();
});

updateStats();

// Каждые 2 секунды
setInterval(updateStats, 2000);
function updateStats() {
    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('cpu').textContent = data.cpu;
            document.getElementById('ram').textContent = data.ram;
            document.getElementById('disk_in_precent').textContent = data.disk_in_precent;
            document.getElementById('disk').textContent = `${data.disk_used} / ${data.disk_total}`;
            document.getElementById('size_upd').textContent = data.size_upd;
            document.getElementById('size_dowd').textContent = data.size_dowd;
            document.getElementById('uptime_result').textContent = data.uptime_result;
            document.getElementById('processes').textContent = data.processes;
        })
        .catch(err => console.error('Ошибка обновления:', err));
}

setInterval(updateStats, 2000); // каждые 2 сек
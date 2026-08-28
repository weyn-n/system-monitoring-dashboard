from flask import Flask, jsonify, render_template
import psutil
import platform
import time

app = Flask(__name__)

last_net = psutil.net_io_counters()
last_time = time.time()

def get_stats():

    # SYSTEM

    hostname = platform.node()

    # OS
    os_system = platform.system()
    os_release = platform.release()
    os = f"{os_system} {os_release}"

    # CPU Cores
    cpu_cores = psutil.cpu_count(logical=True)

    processes = processes_count = len(psutil.pids())

    # Uptime
    boot_time = psutil.boot_time()
    uptime = time.time() - boot_time

    seconds = int(uptime)
    total_days = seconds // 86400
    total_hours = (seconds % 86400) // 3600
    total_minutes = (seconds % 3600) // 60
    total_seconds = (seconds % 60) // 1

    uptime_result = ""

    if total_days > 0:
        uptime_result += f"{total_days}d, "

    if total_hours > 0:
        uptime_result += f"{total_hours}h, "

    if total_minutes > 0:
        uptime_result += f"{total_minutes}m, "

    if total_seconds > 0:
        uptime_result += f"{total_seconds}s"

    # RESOURCES

    cpu = psutil.cpu_percent(interval=0.1)
    ram = psutil.virtual_memory().percent

    # Disk

    disk = psutil.disk_usage("/")

    disk_in_precent = disk.percent
    disk_used = f"{disk.used // 1024 ** 3} GB"
    disk_total = f"{disk.total // 1024 ** 3} GB"

    # NETWORK

    global last_net, last_time

    current_net = psutil.net_io_counters()
    current_time = time.time()

    elapsed = current_time - last_time

    upload_speed = (current_net.bytes_sent - last_net.bytes_sent) / elapsed
    download_speed = (current_net.bytes_recv - last_net.bytes_recv) / elapsed

    last_net = current_net
    last_time = current_time

    def format_bytes(value):
        if value < 1024:
            return f"{value:.0f} B"

        if value < 1024 ** 2:
            return f"{value / 1024:.1f} KB"

        if value < 1024 ** 3:
            return f"{value / (1024 ** 2):.1f} MB"

        return f"{value / (1024 ** 3):.1f} GB"



    print("Hostname:", hostname)
    print("OS:", os)
    print("CPU Cores:", cpu_cores)
    print("Processes:", processes)
    print("CPU:", cpu, "%")
    print("RAM:", ram, "%")
    print("Disk:", disk_in_precent, "%")
    print("Disk Used:", disk_used)
    print("Disk Total:", disk_total)
    print("Uptime:", uptime_result)

    data = {
        "hostname": hostname,
        "os": os,
        "cpu_cores": cpu_cores,
        "processes": processes,
        "cpu": cpu,
        "ram": ram,
        "disk_in_precent": disk_in_precent,
        "disk_used": disk_used,
        "disk_total": disk_total,
        'size_upd': format_bytes(upload_speed) + '/s',
        'size_dowd': format_bytes(download_speed) + '/s',
        "uptime_result": uptime_result,
    }

    return data

@app.route('/')
def index():
    return render_template('index.html', **get_stats())   # ← HTML

@app.route('/api/stats')
def api_stats():
    return jsonify(get_stats())   # ← JSON

if __name__ == '__main__':
    app.run(debug=True)

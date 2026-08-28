from flask import Flask, jsonify, render_template
import psutil
import platform
import time

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def system_info():
    return jsonify({
        "hostname": hostname,
        "os": os,
        "cores": cpu_cores,
        "processes": processes,
        "uptime": uptime_result,
        "cpu": psutil.cpu_percent(),
        "ram": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage('C://').percent,
        "disk_used": disk_used,
        "disk_total": disk_total
    })

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

cpu = psutil.cpu_percent()
ram = psutil.virtual_memory().percent

# Disk


disk = psutil.disk_usage("/")

disk_in_precent = disk.percent
disk_used = f"{disk.used // 1024 ** 3} GB"
disk_total = f"{disk.total // 1024 ** 3} GB"

# NETWORK
network = psutil.net_io_counters()

units = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s']
i_upd = 0
i_dowd = 0

upd = network.bytes_sent
dowd = network.bytes_recv

while upd >= 1024 and i_upd < len(units) - 1:
    upd /= 1024
    i_upd += 1

while dowd >= 1024 and i_dowd < len(units) - 1:
    dowd /= 1024
    i_dowd += 1

size_upd = f"{upd:.2f} {units[i_upd]}"
size_dowd = f"{dowd:.2f} {units[i_dowd]}"

print("Hostname:", hostname)
print("OS:", os)
print("CPU Cores:", cpu_cores)
print("Processes:", processes)
print("CPU:", cpu, "%")
print("RAM:", ram, "%")
print("Disk:", disk_in_precent, "%")
print("Disk Used:", disk_used)
print("Disk Total:", disk_total)
print("Uploaded:", size_upd)
print("Downloaded:", size_dowd)
print("Uptime:", uptime_result)

app.run()

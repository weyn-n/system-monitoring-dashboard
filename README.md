# 🖥️ System Monitoring Dashboard

A simple web-based system monitoring dashboard built with **Python and Flask**.

The application collects system information such as CPU, RAM, disk usage, network information, and uptime using `psutil` and displays the data through a web interface.

The project also includes **Docker support**, allowing the application to run in an isolated container.

## ✨ Features

* 🖥️ System information
* ⚙️ CPU usage
* 🧠 RAM usage
* 💾 Disk usage
* 🌐 Network information
* ⏱️ System uptime
* 📊 Web-based monitoring dashboard
* 🐳 Docker support

## 🛠️ Tech Stack

* **Python**
* **Flask**
* **psutil**
* **HTML / CSS**
* **JavaScript**
* **Docker**

## ⚙️ How It Works

The application uses `psutil` to collect information about the system.

The data is processed by the Flask backend and then displayed through the web interface.

```text
System
   ↓
psutil
   ↓
Flask
   ↓
HTML / CSS / JavaScript
   ↓
Monitoring Dashboard
```

## 🚀 Getting Started

### Prerequisites

Choose one of the following:

**Option 1 — Docker**

* Docker Desktop

**Option 2 — Local Python**

* Python 3.x
* pip

---

## 🐳 Run with Docker

Docker is the easiest way to run the application without manually installing the Python dependencies.

### 1. Clone the repository

```bash
git clone https://github.com/weyn-n/system-monitoring-dashboard
cd system-monitoring-dashboard
```

### 2. Build the Docker image

```bash
docker build -t system-monitoring-dashboard .
```

### 3. Run the container

```bash
docker run -p 5000:5000 system-monitoring-dashboard
```

The application will be available at:

```text
http://localhost:5000
```

### Stop the container

Press `Ctrl + C` in the terminal where the container is running.

Alternatively, if running in detached mode:

```bash
docker ps
docker stop <container_id>
```

### Rebuild after changes

If you change the application code, rebuild the image:

```bash
docker build -t system-monitoring-dashboard .
```

Then run the container again:

```bash
docker run -p 5000:5000 system-monitoring-dashboard
```

---

## 🐍 Run Locally Without Docker

### 1. Clone the repository

```bash
git chttps://github.com/weyn-n/system-monitoring-dashboard
cd system-monitoring-dashboard
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the application

```bash
python app.py
```

Then open:

```text
http://localhost:5000
```

## 📁 Project Structure

```text
system-monitoring-dashboard/
├── static/
│   ├── script.js
│   └── style.css
├── templates/
│   └── index.html
├── Dockerfile
├── app.py
├── requirements.txt
└── README.md
```

## 📊 Monitored Information

| Metric  | Description          |
| ------- | -------------------- |
| CPU     | Current CPU usage    |
| RAM     | Current memory usage |
| Disk    | Disk usage           |
| Network | Network information  |
| Uptime  | System uptime        |


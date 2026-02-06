# Cinema Reservation System

<img width="550" height="600" alt="image" src="https://github.com/user-attachments/assets/6dcdfde4-063e-4777-ac7c-f4b156b3bc8e" />

A server-side Node.js application, for cinema seat reservations using a web interface.

---

### Project Structure

* **src/**: Main server logic and static client-side assets.
* **views/**: HTML templates for the frontend.
* **database/**: SQL scripts for database initialization.
* **docker-compose.yml**: Orchestration for the app and MySQL database.

---

### Features

* **Automated Reservations**: Server-side handling of booking requests.
* **Persistent Storage**: MySQL integration for saving seat states.
* **Containerized Environment**: Full Docker support for easy deployment.
* **Zero Local Setup**: Runs entirely within containers without needing local Node.js.

---

### Tech Stack

* **Backend**: Node.js, Express.
* **Database**: MySQL 8.0.
* **Frontend**: HTML, CSS, JavaScript.
* **Infrastructure**: Docker, Docker Compose.

---

### Quick Start

The application is configured to run with a single command using Docker:

```bash
docker-compose up -d
```

---

### Manual Setup

For local development without Docker:

1. **Prerequisites**: Node.js and MySQL server installed locally
2. **Install dependencies**: `npm install`
3. **Database setup**: Import `database/init.sql` into your MySQL instance
4. **Configuration**: Update `.env` file with your local database credentials
5. **Run application**: `npm start`

The server will start on the configured port (default: 8000).
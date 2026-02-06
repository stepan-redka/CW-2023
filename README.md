# CW-2023
<img width="550" height="600" alt="image" src="https://github.com/user-attachments/assets/6dcdfde4-063e-4777-ac7c-f4b156b3bc8e" />

**Course project built with Node.js**

A classic server-side application that provides cinema seat reservation functionality through a simple web interface.

## Features
- Server automatically handles reservation requests
- Real-time seat booking system
- MySQL database for persistent storage
- Fully containerized with Docker
- No local dependencies required

## Tech Stack
- Node.js & Express
- MySQL 8.0
- HTML, CSS, JavaScript
- Docker & Docker Compose

## Project Structure
```
CW-2023/
├── src/
│   ├── server.js          # Main application server
│   └── public/
│       ├── css/           # Stylesheets
│       └── js/            # Client-side scripts
├── views/                 # HTML templates
├── database/
│   └── init.sql          # Database initialization
├── docker-compose.yml    # Docker orchestration
├── Dockerfile           # Container definition
└── package.json
```

## Quick Start (ONE COMMAND)

```bash
docker-compose up -d
```

That's it! The application will be available at `http://localhost:8000`

**Note:** Default credentials are set in docker-compose.yml. The app runs entirely in Docker - no local Node.js or npm installation required.

## Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Clean up everything (including data)
docker-compose down -v
```

## Configuration

Default environment variables are set in [docker-compose.yml](docker-compose.yml):
- `DB_PASSWORD`: cinemapass123
- `DB_NAME`: KursovaDB
- `PORT`: 8000

To override, create a `.env` file:
```bash
DB_PASSWORD=yourpassword
PORT=8000
```

## Development

For local development without Docker:

```bash
npm install
npm run dev
```

Ensure MySQL is running locally and update database credentials in `.env` file.

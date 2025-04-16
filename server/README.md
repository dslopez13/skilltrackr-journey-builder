
# SkillTrackr Backend Server

This is the backend server for the SkillTrackr application, built with Node.js, Express, and PostgreSQL using a Hexagonal Architecture.

## Architecture

The application follows the Hexagonal Architecture (Ports and Adapters) pattern:

- **Domain**: Core business entities and logic
- **Application**: Use cases that orchestrate the domain
- **Infrastructure**: External interfaces like repositories and controllers

## Setup

1. Install dependencies:
```
npm install
```

2. Create a PostgreSQL database and set up the environment variables:
```
cp .env.example .env
```
Then edit the `.env` file with your database credentials.

3. Run database migrations:
```
npm run db:init
```

4. Start the server:
```
npm start
```

For development with automatic restart:
```
npm run dev
```

## API Endpoints

### Skills

- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get a skill by ID
- `POST /api/skills` - Create a new skill
- `PUT /api/skills/:id` - Update a skill
- `DELETE /api/skills/:id` - Delete a skill

## Environment Variables

- `PORT` - The port on which the server will run (default: 3000)
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Application environment (development, production)

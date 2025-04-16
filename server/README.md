
# SkillTrackr Backend Server

This is the backend server for the SkillTrackr application, built with Node.js and Express.

## Setup

1. Install dependencies:
```
npm install
```

2. Start the server:
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

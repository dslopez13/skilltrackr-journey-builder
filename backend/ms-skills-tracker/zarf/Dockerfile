FROM node:22.14.0-bullseye AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

FROM node:22.14.0-bullseye

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["node", "index.js"]

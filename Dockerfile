FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Copy the environment file and inject it at build time for Nextjs
COPY .env.development .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
# Image de dev : Fastify + TS avec hot reload (tsx watch)
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# Le code source est monté via un volume (voir docker-compose.yml),
# on ne le copie donc pas ici pour garder le hot reload.

EXPOSE 3000

CMD ["npm", "run", "dev"]

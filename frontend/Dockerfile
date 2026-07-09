# Image de dev : Vite + Vue + TS avec hot reload
FROM node:22-alpine

WORKDIR /app

# On copie d'abord les manifests pour profiter du cache de couches Docker
COPY package.json package-lock.json* ./
RUN npm install

# Le code source est monté via un volume (voir docker-compose.yml),
# on ne le copie donc pas ici pour garder le hot reload.

EXPOSE 5173

CMD ["npm", "run", "dev"]

FROM node:18-alpine3.15

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
RUN npm prune --production
COPY . .

EXPOSE 4840
CMD [ "node", "app.js" ]
FROM node:14

WORKDIR /app

COPY package*.json./

RUN npm install

# Copy both server and client code
COPY./.

# Build the client-side application
RUN npm run build

# Assuming the server serves static files from /app/public
COPY./client/dist./public

EXPOSE 3001

CMD ["node", "server.js"]
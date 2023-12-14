# build with:  docker build -t immudb-accounting-backend -f Dockerfile . 
# run with:    docker run -d -p 8000:8000 --name immudb-accounting-backend-container immudb-accounting-backend
FROM node:20-slim AS builder
WORKDIR /app
COPY ./src ./
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./config.json .
RUN npm install
RUN npm run build


FROM node:20-slim AS production
WORKDIR /app
COPY --from=builder /app/dist .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
COPY --from=builder /app/config.json .
EXPOSE 8000
CMD ["node", "index.js"]
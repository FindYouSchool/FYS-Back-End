# stage 1 building the code
FROM node:14.17-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN npm run build

# stage 2
FROM node:14.17-alpine 
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production

COPY --chown=node:node --from=builder /app/prisma /app/prisma
COPY --from=builder /app/dist ./dist

COPY .env .

EXPOSE 4001
CMD [ "npm", "start" ]
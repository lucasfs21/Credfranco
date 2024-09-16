# Etapa de build
FROM node:18.17.0-alpine AS build

WORKDIR /app

# Copie apenas os arquivos necessários para o build
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Etapa de produção
FROM node:18.17.0-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]

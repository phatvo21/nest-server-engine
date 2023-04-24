# Instal package dependencies
FROM node:16-alpine AS dependency

WORKDIR /server-engine

COPY package*.json ./
RUN npm ci

# Build source
FROM dependency AS base
COPY . .

# Build source
FROM base AS build
RUN npm run build

# Ship compiled sources
FROM dependency

COPY --from=build /server-engine/dist ./dist

RUN npm prune --production

EXPOSE 3000
ENV NO_COLOR=true
ARG COMMIT_HASH
ENV COMMIT_HASH=$COMMIT_HASH

CMD ["node", "dist/main"]
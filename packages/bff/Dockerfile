FROM node:18-alpine AS build

ARG AMBIENTE

ENV NODE_ENV production

COPY packages/bff /app/
COPY yarn.lock /app/
COPY .npmrc /app/

WORKDIR /app

RUN yarn install --frozen-lockfile --production
RUN yarn build:${AMBIENTE}

FROM node:18-alpine AS final
COPY --from=build /app/build /app
COPY --from=build /app/node_modules /app/node_modules
EXPOSE 8000
CMD node ./app/index.bundle.js
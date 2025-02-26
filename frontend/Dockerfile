# =======================================
FROM helsinkitest/node:14-slim as appbase
# =======================================

# Use non-root user
USER appuser

# Build ARGS
ARG PROJECT
ARG FOLDER
ARG SERVICE

# Yarn
ENV YARN_VERSION 1.22.10

RUN yarn policies set-version $YARN_VERSION
RUN yarn config set ignore-engines true

WORKDIR /app

# Install dependencies
COPY --chown=appuser:appuser package.json yarn.lock lerna.json ./
COPY --chown=appuser:appuser $PROJECT/$FOLDER/package.json $PROJECT/$FOLDER/package.json
COPY --chown=appuser:appuser $PROJECT/shared/package.json* $PROJECT/shared/package.json
COPY --chown=appuser:appuser shared/package.json shared/package.json

RUN yarn --frozen-lockfile --check-files && yarn cache clean --force

# Copy all files
COPY --chown=appuser:appuser . .

# =============================
FROM appbase as development
# =============================

# Set V8 max heap size to 2GB (default is 512MB)
# This prevents Docker Compose from crashing due to out of memory errors
ENV NODE_OPTIONS="--max_old_space_size=2048"

ARG SERVICE
# Use non-root user
USER appuser
WORKDIR /app

# Copy all files
COPY --chown=appuser:appuser . .

ENV NEXT_TELEMETRY_DISABLED 1
# Bake package.json start command into the image
ENV DEV_START "yarn $SERVICE:dev"
CMD ["sh", "-c", "${DEV_START}"]

# ===================================
FROM appbase as staticbuilder
# ===================================
# Set environmental variables for frontend (used in CI)
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_ACTIVATION_LINK_EXPIRATION_SECONDS
ARG NEXT_PUBLIC_MOCK_FLAG
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_SENTRY_ENVIRONMENT
ARG NEXT_PUBLIC_LINKEDEVENTS_URL
ARG NEXT_PUBLIC_KEYWORDS_DATA_SOURCE
ARG PROJECT
ARG FOLDER

# Use non-root user
USER appuser
WORKDIR /app

# copy all files
COPY --chown=appuser:appuser . .

# Build application
WORKDIR /app/$PROJECT/$FOLDER/

RUN yarn build

# Clean all dependencies (this should avoid caching + missing /pages directory problem)
RUN rm -rf node_modules
RUN yarn cache clean

# ==========================================
FROM helsinkitest/node:14-slim AS production
# ==========================================

ARG PORT
ARG PROJECT
ARG FOLDER
ARG SERVICE

# Use non-root user
USER appuser

WORKDIR /app

# Copy files needed by yarn install
COPY --chown=appuser:appuser package.json yarn.lock lerna.json ./
COPY --chown=appuser:appuser $PROJECT/$FOLDER/package.json $PROJECT/$FOLDER/package.json
COPY --chown=appuser:appuser $PROJECT/shared/package.json $PROJECT/shared/package.json
COPY --chown=appuser:appuser shared/package.json shared/package.json

# Install production dependencies
RUN yarn install --production --check-files --ignore-scripts --prefer-offline && yarn cache clean --force

# Copy files needed by nextjs
COPY --from=staticbuilder --chown=appuser:appuser app/$PROJECT/$FOLDER/.next $PROJECT/$FOLDER/.next
COPY --from=staticbuilder --chown=appuser:appuser app/$PROJECT/$FOLDER/next-i18next.config.js app/$PROJECT/$FOLDER/next.config.js $PROJECT/$FOLDER/
COPY --from=staticbuilder --chown=appuser:appuser app/next.config.js app/start.js ./
COPY --from=staticbuilder --chown=appuser:appuser app/shared/src/server/next-server.js shared/src/server/

# Copy public directory
COPY --chown=appuser:appuser $PROJECT/$FOLDER/public $PROJECT/$FOLDER/public


# install lerna
RUN yarn add -W lerna

# Expose port
EXPOSE $PORT

ENV NEXT_TELEMETRY_DISABLED 1
# Start nextjs server
ENV PROD_START "yarn $SERVICE:start"
CMD ["sh", "-c", "${PROD_START}"]

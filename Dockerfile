# --- Build stage: compile the Vite site into static files ---
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Anthropic key for the build-time changelog summary (scripts/generate-highlights.mjs).
# Pass via Coolify build env / --build-arg. If absent, the build keeps the
# committed highlights.generated.json and still succeeds.
ARG ANTHROPIC_API_KEY=""
ARG ANTHROPIC_MODEL=""
RUN ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY" ANTHROPIC_MODEL="$ANTHROPIC_MODEL" npm run build

# --- Runtime stage: serve the static dist/ with nginx ---
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

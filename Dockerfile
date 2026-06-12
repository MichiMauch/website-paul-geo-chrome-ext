# --- Build stage: compile the Vite site into static files ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# OpenAI key for the build-time changelog summary (scripts/generate-highlights.mjs).
# Pass via Coolify build env / --build-arg. If absent, the build keeps the
# committed highlights.generated.json and still succeeds.
ARG OPENAI_API_KEY=""
ARG OPENAI_MODEL=""
RUN OPENAI_API_KEY="$OPENAI_API_KEY" OPENAI_MODEL="$OPENAI_MODEL" npm run build

# --- Runtime stage: serve the static dist/ with nginx ---
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

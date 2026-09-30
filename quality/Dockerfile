FROM node:22-alpine
WORKDIR /app
COPY quality ./quality
USER node
CMD ["node","quality/health.mjs"]

FROM node:22-alpine
WORKDIR /workspace
COPY --chown=node:node quality ./quality
COPY --chown=node:node tests ./tests
USER node
CMD ["node", "--test", "tests/repository-quality.node.mjs"]

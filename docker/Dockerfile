FROM node:12.19.0-alpine as builder
# Create app directory
WORKDIR /usr/src/app
# Copy code bussiness
COPY . .
# Install package and build code
RUN yarn --prod
RUN yarn build
FROM node:12.19.0-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules/. ./node_modules
COPY --from=builder /usr/src/app/dist/. ./dist
# epxort port 
EXPOSE 3001
# Run when start docker container
CMD ["node", "dist/main"]
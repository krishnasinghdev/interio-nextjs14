FROM node

WORKDIR /app
COPY package*.json ./
RUN npm install pnpm -g
RUN pnpm install
COPY . .
EXPOSE 3000

CMD pnpm run dev
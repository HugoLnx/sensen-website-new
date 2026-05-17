# Estágio de Base: Instalação de dependências
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Estágio de Desenvolvimento: Para rodar localmente com Docker
FROM base AS development
COPY . .
# O script generate-content é necessário antes de rodar
RUN npm run generate-content
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host"]

# Estágio de Build: Compilação para produção
FROM base AS builder
COPY . .
# Define o base path como raiz para o build do Docker
ENV VITE_BASE_PATH=/
# Roda o build (que internamente chama generate-content)
RUN npm run build

# Estágio de Produção: Servidor estático Nginx
FROM nginx:stable-alpine AS production
# Copia o build para o diretório do Nginx
# Vike gera o output em dist/client para o frontend estático
COPY --from=builder /app/dist/client /usr/share/nginx/html

# Configuração customizada do Nginx para suportar roteamento SPA (se necessário)
# e lidar com o base path se for diferente de '/'
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

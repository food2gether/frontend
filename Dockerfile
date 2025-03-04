FROM nginx:1.26-alpine

WORKDIR /app

COPY --chown=root:root --chmod=644 ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=root:root --chmod=755 ./dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
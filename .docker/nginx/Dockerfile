FROM nginx:1.21
COPY . /app
RUN rm -rf /etc/nginx/nginx.conf /etc/nginx/conf.d && \
    mkdir -p /etc/nginx/nginx.conf && \
    cp -f /app/docker/nginx/nginx.conf /etc/nginx/nginx.conf && \
    cp -f /app/docker/nginx/web.conf /etc/nginx/conf.d/web.conf 
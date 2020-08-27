FROM nginx:1.15-alpine

COPY nginx/h5bp/ /etc/nginx/h5bp/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY build/ /usr/share/nginx/html/

EXPOSE 80
CMD nginx -g "daemon off;"

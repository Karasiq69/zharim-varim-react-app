# Используем официальный образ Node.js версии 20.11.0 в качестве базового
FROM node:20.11.0
# Устанавливаем переменные окружения
ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST
# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости проекта
RUN npm ci

# Копируем все файлы проекта в рабочую директорию
COPY . .
COPY --from=builder /app/next.config.mjs ./
# Собираем приложение Next.js
RUN npm run build

# Открываем порт, который будет использоваться приложением
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
'use client'

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Количество попыток повтора запроса при неудаче (по умолчанию 3, включая первую попытку)
      refetchOnWindowFocus: false, // Отключить повторные запросы при возвращении фокуса на окно
      staleTime: 5 * 60 * 1000, // Время в миллисекундах, в течение которого данные считаются актуальными (5 минут)
    },
  },
});


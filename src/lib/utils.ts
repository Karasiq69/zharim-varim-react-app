import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
    price: number | string,
    options: {
        currency?: 'RUB'
    } = {}
) {
    const {currency = 'RUB'} = options

    const numericPrice =
        typeof price === 'string' ? parseFloat(price) : price

    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(numericPrice)
}
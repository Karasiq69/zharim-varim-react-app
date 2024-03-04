import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
    return (
        <div className="flex flex-col h-full rounded-t-sm">
            {/* Скелетон для изображения */}
            <Skeleton className="rounded-t-sm h-[200px] w-full" />

            {/* Скелетон для контентной части карточки */}
            <div className="p-4 pb-3 space-y-2 flex-grow">
                <Skeleton className="h-6 w-3/4" /> {/* Скелетон для заголовка */}
                <Skeleton className="h-4 w-full" /> {/* Скелетон для описания */}
            </div>

            {/* Скелетон для нижней части карточки с ценой и кнопкой */}
            <div className="p-4 pt-0 mt-auto flex justify-between items-center">
                <Skeleton className="h-6 w-1/4" /> {/* Скелетон для цены */}
                <Skeleton className="h-10 w-1/4" /> {/* Скелетон для кнопки */}
            </div>
        </div>
    );
};

export default SkeletonCard;

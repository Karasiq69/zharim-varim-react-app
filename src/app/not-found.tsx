type Props = {};
const NotFound = (props: Props) => {
    return (
        <section className="flex items-center   p-16  dark:bg-gray-700">
            <div className="container flex flex-col items-center ">
                <div className="flex flex-col gap-6 max-w-md text-center">
                    <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
                        <span className="sr-only">Ошибка</span>404
                    </h2>
                    <p className="text-2xl md:text-3xl dark:text-gray-300">Упс! Такой страницы нет..</p>
                    <a href="/"
                       className="px-8 py-4 text-xl font-semibold rounded bg-emerald-600 text-gray-50 hover:text-gray-200">Вернуться
                        на главную</a>
                </div>
            </div>
        </section>
    );
};
export default NotFound;

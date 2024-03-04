import {ArrowDownToLine, EggFried, Leaf, MapPin} from "lucide-react";

const perks = [
    {
        name: '100% свежие продукты',
        Icon: Leaf,
        description:'Привозим каждое утро'
    },{
        name: 'Обед, завтрак, ужин',
        Icon: EggFried,
        description:'У нас можно вкусно поесть в любое время дня'
    },{
        name: 'Удобное расположение',
        Icon: MapPin,
        description:'До нас легко добраться'
    },
]


const Perks = () => {
    return (
        <div className={'grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3'}>
            {perks.map((perk) => {
                return (
                    <div key={perk.name} className={'text-center md:flex md:items-start md:text-left lg:block lg:text-center'}>
                        <div className={'md:flex-shrink-0 flex justify-center'}>
                            <div className={'h-16 w-16 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-900'}>
                                {<perk.Icon className={'w-1/3 h-1/3'} />}
                            </div>
                        </div>
                        <div className={'mt-5 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'}>
                            <h3>{perk.name}</h3>
                            <p className={'mt-3 text-sm text-muted-foreground'}>
                                {perk.description}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};
export default Perks;

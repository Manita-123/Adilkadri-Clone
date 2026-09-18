import { Truck, RefreshCw, CircleDollarSign, ShieldHalf } from 'lucide-react';

function Options() {

    const data = [
        {
            id: 1,
            desc: "Free Shipping",
            icon: Truck ,
        },
        {
            id: 2,
            desc: "Easy Returns",
            icon: RefreshCw,
        },
        {
            id: 3,
            desc: "COD Available",
            icon: CircleDollarSign,
        },
        {
            id: 4,
            desc: "Secure Payment",
            icon:ShieldHalf ,
        },
    ]

    return (
        <div className="flex flex-wrap items-center justify-center gap-9 mb-16 mx-2">
            {data.map((item) => {
                const Icon = item.icon;
                return (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 "
                    >
                        <div className='rounded-full bg-white border border-gray-200 p-2 shadow-xl'>
                            <Icon className="w-7 h-7 text-yellow-800 " strokeWidth={1} />
                        </div>
                        
                         <span className="text-yellow-800 font-medium max-w-20 md:max-w-75 md:truncate">{item.desc}</span>
                    </div>
                );
            })}
        </div>

    )
}

export default Options

import { useEffect, useState } from "react";
import Feature from "./Feature";
import { Link } from "react-router-dom";
import useAxios from "../../customHook/useAxios";

function Features() {
    const [data,setData] = useState(null);
    const axios = useAxios();

    useEffect(()=>{
        axios.get('/foods')
        .then(res=>{
            const d = res.data
            const sortd = d.sort((a,b)=>b.quantity-a.quantity)
            if (sortd.length>6) {
                const dt = sortd.slice(0,6)
                setData(dt)
            }else{
                setData(sortd)
            }
        })
        .catch(e=> console.log(e))
    },[axios])

    return ( 
        <>
        <div className=" py-8">
            <div className=" text-center w-full text-white">
                <h1 className=" bg-blue-500 px-4 py-2 w-fit mx-auto rounded-md font-semibold text-xl">Our Feature Foods</h1>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-8">
                {data?.map(d=> <Feature key={d._id} d={d}></Feature>)}
            </div>
            <div className="w-full flex justify-center">
                <Link className=" btn bg-green-300 text-slate-700 hover:bg-green-400" to={'/availablefoods'}>Show All</Link>
            </div>
        </div>
        </>
     );
}

export default Features;
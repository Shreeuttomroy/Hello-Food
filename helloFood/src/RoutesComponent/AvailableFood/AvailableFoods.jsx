import { useContext, useEffect, useState } from "react";
import useAxios from "../../customHook/useAxios";
import AvailableFood from "./AvailableFood";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AuthContext } from "../../AuthProvider/AuthProvider";
// import { Link } from "react-router-dom";

function AvailableFoods() {

    const axios = useAxios()
    const [foods, setFoods] = useState([])
    const { btitle,user } = useContext(AuthContext)
    
    useEffect(() => {
        // const userr = user?.email
        axios.get(`/availablefoods?user=${user.email}`,{withCredentials:true})
            .then(e => {
                if (e.data) {
                    setFoods(e.data)
                }
            })
            .catch(e => console.log(e))
    }, [axios,user])
    const searchfood = (e) => {
        e.preventDefault()
        const inputValue = e.target.foodname.value.toString()
        const findfood = foods.find(d => d.name.toString() === inputValue)
        const findFood = [findfood]
        setFoods(findFood)
    }
    const sortfood = () => {
        const sortFood = foods.slice().sort((a, b) => new Date(a.expired) - new Date(b.expired))
        setFoods(sortFood)
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{btitle} | Available Food</title>
                </Helmet>
            </HelmetProvider>
            <div className=" py-8">
                <div className=" text-center w-full text-white">
                    <h1 className=" bg-blue-500 px-4 py-2 w-fit mx-auto rounded-md font-semibold text-xl">Available Foods</h1>
                </div>
                <div className=" relative w-fit mx-auto my-4 flex">
                    <form className=" relative w-fit md:mr-5 mx-auto" onSubmit={searchfood}>
                        <input type="text" placeholder="Search Food" name="foodname" className="input input-bordered w-full max-w-xs" />
                        <button className="h-full absolute right-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </form>
                    <button className="btn btn-outline btn-info" onClick={sortfood}>Sort By Date</button>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-8">
                    {foods?.map(d => <AvailableFood key={d._id} d={d}></AvailableFood>)}
                </div>
                {/* <div className="w-full flex justify-center">
                    <Link className=" btn bg-green-300 text-slate-700 hover:bg-green-400" to={'/availablefoods'}>Show All</Link>
                </div> */}
            </div>
        </>
    );
}

export default AvailableFoods;
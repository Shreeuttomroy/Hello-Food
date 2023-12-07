import { useContext, useEffect, useState } from "react";
import useAxios from "../../customHook/useAxios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import TableData from "./TableData";
import Swal from "sweetalert2";
import { Helmet, HelmetProvider } from "react-helmet-async";


function MyFoodRequest() {

    const axios = useAxios()
    const { user, btitle } = useContext(AuthContext)
    const { email } = user
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios.get(`/myfoodrequest?usermail=${email}`,{withCredentials:true})
            .then(res => setFoods(res.data))
            .catch(e => console.log(e.message))
    }, [axios, email])

    const handleCancel = id => {
        const d = id
        axios.delete(`/cancelfood?id=${d}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    const reamining = foods.filter(d => d.id !== id)
                    setFoods(reamining)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(e => console.log(e.message))

    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{btitle} | Request Food</title>
                </Helmet>
            </HelmetProvider>
            <div>
                {
                    foods.length > 0 ?
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>PickUp Location</th>
                                        <th>Expired Date</th>
                                        <th>Requested Date</th>
                                        <th>Donation Amount</th>
                                        <th>Status</th>
                                        <th>Cancel Button</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        foods.map(food => <TableData key={food._id} handleCancel={handleCancel} food={food}></TableData>)
                                    }
                                </tbody>
                            </table>
                        </div> :
                        <div className=" w-full flex justify-center h-screen">
                            <div className=" w-fit self-center mx-auto text-2xl font-bold">Data Not Found!</div>
                        </div>
                }
            </div>
        </>
    );
}

export default MyFoodRequest;
import { useContext, useEffect, useState } from "react";
import useAxios from "../../customHook/useAxios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import ReactTable from "./ReactFoodTable";

function ManageFood() {

    const axios = useAxios()
    const { user } = useContext(AuthContext)
    const { email } = user
    console.log(email);
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios.get(`/myfood?usermail=${email}`)
            .then(res => setFoods(res.data))
            .catch(e => console.log(e.message))
    }, [axios, email])
    console.log(foods?.length);
    const columns = [
        {
            header: "Name",
            accessor: 'name'
        },
        {
            header: "Expired",
            accessor: 'expired'
        },
        {
            header: "PickUp Location",
            accessor: 'pickuplocation'
        },
        {
            header: "Edit",
            accessor: 'name'
        },
        {
            header: "Manage",
            accessor: 'name'
        },
        {
            header: "Delete",
            accessor: 'name'
        }
    ]

    return (
        <>
            <div>
                {
                    foods.length>0?
                    <ReactTable columns={columns} foods={foods}></ReactTable>:
                    <div>Food Not Found!</div>
                }
            </div>
        </>
    );
}

export default ManageFood;
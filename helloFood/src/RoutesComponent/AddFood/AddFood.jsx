import Swal from "sweetalert2";

import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxios from "../../customHook/useAxios";
import { Helmet, HelmetProvider } from "react-helmet-async";

function AddFood() {

    const axios = useAxios()
    const { user, btitle } = useContext(AuthContext);
    const { email, displayName, photoURL } = user

    const addFoodOnDatabse = (e) => {
        e.preventDefault()
        // console.log("Hello");
        const form = e.target
        const name = form.name.value;
        const img = form.photourl.value;
        const d_img = form.d_img.value;
        const d_email = form.d_email.value;
        const d_name = form.d_name.value;
        const quantity = form.quantity.value;
        const pickuplocation = form.pickuplocation.value;
        const expired = form.exdate.value;
        const notes = form.addnote.value;
        const satus = "available"
        const data = {
            name,
            img,
            donator: {
                d_img,
                d_email,
                d_name,
            },
            quantity,
            pickuplocation,
            expired,
            notes,
            satus
        }
        // console.log(data);
        // const datas = JSON.stringify(data)
        axios.post('/addfood', data)
            .then(res => {
                // console.log(res)
                if (res.data.acknowledged == true) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your food added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }else{
                    console.log(res);
                }
            })
            .catch(e => console.log(e))
    }
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{btitle} | Add Food</title>
                </Helmet>
            </HelmetProvider>
            <div className=" w-11/12 my-4 mx-auto">
                <div className=" w-full my-4 text-center">
                    <h1 className=" w-fit mx-auto py-3 px-4 rounded-md bg-green-400 text-black font-bold text-2xl">Share Your Food</h1>
                </div>
                <form onSubmit={addFoodOnDatabse}>

                    {/* name  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                    </div>

                    {/* image  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Food Photo URL</span>
                        </label>
                        <input type="text" placeholder="url" name="photourl" className="input input-bordered" required />
                    </div>

                    {/* donator photo  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Donator Photo URL</span>
                        </label>
                        <input type="text" placeholder="url" name="d_img" defaultValue={photoURL} readOnly className="input input-bordered" required />
                    </div>

                    {/* Donator email  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Donator Email</span>
                        </label>
                        <input type="email" placeholder="donator email" defaultValue={email} readOnly name="d_email" className="input input-bordered" required />
                    </div>

                    {/* Donator name  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Donator Name</span>
                        </label>
                        <input type="text" placeholder="donator name" defaultValue={displayName} readOnly name="d_name" className="input input-bordered" required />
                    </div>

                    {/* food quantity  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Quantity</span>
                        </label>
                        <input type="text" placeholder="quantity" name="quantity" className="input input-bordered" required />
                    </div>

                    {/* pickup Location */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">PickUp Location</span>
                        </label>
                        <input type="text" placeholder="location" name="pickuplocation" className="input input-bordered" required />
                    </div>

                    {/* expire date  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Expired</span>
                        </label>
                        <input type="date" placeholder="date" name="exdate" className="input input-bordered" required />
                    </div>

                    {/* additonal notes  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Additional Note</span>
                        </label>
                        <input type="text" placeholder="write something" name="addnote" className="input input-bordered" required />
                    </div>

                    {/* request button  */}
                    <button type="submit" className="btn my-4 bg-slate-300 hover:bg-green-400 ">Share Food</button>
                </form>
            </div>
        </>
    );
}

export default AddFood;
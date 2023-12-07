import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../customHook/useAxios";
import { FaLocationDot } from "react-icons/fa6";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet, HelmetProvider } from "react-helmet-async";
// import axios from "axios";

function Food() {
    const [Food, setFood] = useState(null);
    const axios = useAxios()
    const { id } = useParams();
    const { user, btitle } = useContext(AuthContext)
    // const [exdate,setExdate]= useState(null)

    // current date 
    const currentDate = new Date()
    const cdate = currentDate.toISOString().substring(0, 10)

    useEffect(() => {
        axios.get(`/sfood?user=${user.email}&id=${id}`,{withCredentials:true})
            .then(res => setFood(res.data))
            .catch(e => console.log(e.message))
    }, [axios, id,user])
    //expired date

    let expireddate
    if (Food?.expired) {
        const date = Food?.expired
        const expdate = new Date(date)
        expireddate = expdate.toISOString().substring(0, 10)

    }


    const handlerequestFood = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value;
        const img = form.photourl.value;
        const id = form.foodid.value;
        const d_email = form.d_email.value;
        const d_name = form.d_name.value;
        const u_email = form.u_email.value;
        const reqdate = form.reqdate.value;
        const pickuplocation = form.pickuplocation.value;
        const expired = form.exdate.value;
        const additonalnote = form.addnote.value;
        const donation = form.donation.value;
        const data = {
            name,
            img,
            id,
            d_email,
            d_name,
            u_email,
            reqdate,
            pickuplocation,
            expired,
            additonalnote,
            donation
        }
        // const datas = JSON.stringify(data)
        axios.post('/foodrequests', data)
            .then(res => {
                if (res.data.acknowledged == true) {
                    Swal.fire({
                        position: "top-end",
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
                    <title>{`${btitle} | ${Food?.name}`}</title>
                </Helmet>
            </HelmetProvider>
            <div className=" w-11/12 my-4 mx-auto">
                <div className=" flex">
                    <div className="avatar">
                        <div className=" w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={Food?.donator.d_img} />
                        </div>
                    </div>
                    <div className=" text-xl font-semibold ml-4">
                        <p>{Food?.donator.d_name}</p>
                        <p className=" flex text-sm"><span><FaLocationDot></FaLocationDot></span>{Food?.pickuplocation}</p>
                    </div>
                </div>
                <div className=" my-4">
                    <img className=" w-full h-[500px] rounded-md" src={Food?.img} alt="" />
                    <div>
                        <h2 className="card-title my-2">{Food?.name}</h2>
                        <p>{Food?.notes}</p>
                        <p>Location: {Food?.pickuplocation}</p>
                        <p>Quantity: {Food?.quantity}</p>
                        <p>Expire: {Food?.expired}</p>
                        <div className="card-actions justify-end">
                            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                            <button className="btn bg-slate-300 hover:bg-slate-600 hover:text-white " onClick={() => document.getElementById('my_modal_4').showModal()}>open modal</button>
                            <dialog id="my_modal_4" className="modal">
                                <div className="modal-box w-11/12 max-w-5xl">
                                    <form onSubmit={handlerequestFood}>

                                        {/* name  */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Name</span>
                                            </label>
                                            <input type="text" placeholder="name" name="name" defaultValue={Food?.name} className="input input-bordered" readOnly required />
                                        </div>

                                        {/* image  */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Food URL</span>
                                            </label>
                                            <input type="text" placeholder="url" name="photourl" defaultValue={Food?.img} className="input input-bordered" readOnly required />
                                        </div>

                                        {/* Food_Id  */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Food Id</span>
                                            </label>
                                            <input type="text" placeholder="food id" name="foodid" defaultValue={Food?._id} className="input input-bordered" readOnly required />
                                        </div>

                                        {/* Donator email  */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Donator Email</span>
                                            </label>
                                            <input type="email" placeholder="donator email" name="d_email" defaultValue={Food?.donator?.d_email} readOnly className="input input-bordered" required />
                                        </div>

                                        {/* Donator name  */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Donator Name</span>
                                            </label>
                                            <input type="text" placeholder="donator name" name="d_name" defaultValue={Food?.donator?.d_name} className="input input-bordered" required />
                                        </div>

                                        {/* user mail  */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Your Email</span>
                                            </label>
                                            <input type="email" placeholder="email" name="u_email" defaultValue={user?.email} className="input input-bordered" readOnly required />
                                        </div>

                                        {/* request date  */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Request Date</span>
                                            </label>
                                            <input type="date" placeholder="name" name="reqdate" defaultValue={cdate} className="input input-bordered" readOnly required />
                                        </div>

                                        {/* pickup Location */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">PickUp Location</span>
                                            </label>
                                            <input type="text" placeholder="location" name="pickuplocation" defaultValue={Food?.pickuplocation} className="input input-bordered" readOnly required />
                                        </div>

                                        {/* expire date  */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Expired</span>
                                            </label>
                                            <input type="date" placeholder="date" name="exdate" defaultValue={expireddate} className="input input-bordered" readOnly required />
                                        </div>

                                        {/* additonal notes  */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Additional Note</span>
                                            </label>
                                            <input type="text" placeholder="write something" name="addnote" defaultValue={Food?.notes} className="input input-bordered" required />
                                        </div>

                                        {/* donation money */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Donation</span>
                                            </label>
                                            <input type="number" placeholder="usd" name="donation" className="input input-bordered" required />
                                        </div>

                                        {/* request button  */}
                                        <button type="submit" className="btn my-4 bg-slate-300 hover:bg-green-400 ">Request Food</button>
                                    </form>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button, it will close the modal */}
                                            <button className="btn bg-slate-300 hover:bg-slate-600 hover:text-white ">Back</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Food;
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { auth } from "../firbaseConfig/firebaseConfig";

function SignUp() {

    const { createUserWithEmail } = useContext(AuthContext)
    const navigate = useNavigate()

    const handlesignup = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const url = form.photourl.value
        const email = form.email.value
        const password = form.password.value
        // const user = {
        //     name,
        //     url,
        //     email,
        //     password
        // }
        createUserWithEmail(email, password)
            .then(() => {
                updateProfile(auth.currentUser,{
                    displayName: name,
                    photoURL: url
                })
                .then(()=>{
                    Swal.fire({
                        title: "Success!",
                        text: "Your account created!",
                        icon: "success"
                    })
                    .then(()=>{
    
                        navigate("/")
                    })
                    .then(e=> console.log(e))
                })
                .catch(e=> console.log(e))
                // console.log(e);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <>
            <div className="hero min-h-screen md:w-full bg-base-200">
                <div className="hero-content flex-col md:w-10/12 mx-auto lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handlesignup} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name" name="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="URL" name="photourl" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                        <div className=" w-full flex justify-center">
                            <label className="label">
                                <Link to={"/login"} className="label-text-alt text-blue-400 hover:text-blue-700 link">Already have a account?</Link>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
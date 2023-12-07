function Feature({ d }) {
    return (
        <>
            <div className="card w-96 bg-base-100 my-4 mx-auto shadow-xl">
                <figure><img className=" w-full h-52" src={d?.img} alt={d?.name} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{d?.name}</h2>
                    <p>{d?.notes}</p>
                    <p>Location: {d?.pickuplocation}</p>
                    <p>Quantity: {d?.quantity}</p>
                    <p>Expire: {d?.expired}</p>
                    <div className="w-full"><p>Donator:</p></div>
                    <div className=" flex justify-center mb-3">
                        <div className="w-fit flex">
                            <p className=" self-center text-xl font-semibold mr-7">{d?.donator?.d_name}</p>
                            <div className="avatar">
                                <div className=" w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={d?.donator?.d_img} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">View Details</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Feature;
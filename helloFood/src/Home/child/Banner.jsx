import SFood from './img/sharefood.png'
import WFood from './img/wastefood.png'

function Banner() {
    return (
        <>
            <div className="carousel h-fit w-full">
                <div id="slide1" className="carousel-item h-[400px] md:h-full relative w-full">
                    <div className="hero h-[400px] md:h-full bg-gradient-to-l from-blue-200 to-green-300">
                        <div className="hero-content flex-row-reverse">
                            <div className=' w-2/4 flex justify-center'>
                            <img src={WFood} className="w-fit h-[300px] md:h-[400px]" />
                            </div>
                            <div className=' w-2/4 md:pl-7'>
                                <h1 className=" text-xl md:text-5xl font-bold">Don`t Waste Food!</h1>
                                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute dark:text-white flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn bg-transparent btn-circle">❮</a>
                        <a href="#slide2" className="btn bg-transparent btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="h-[400px] md:h-full carousel-item relative w-full">
                    <div className="hero h-[400px] md:h-full bg-gradient-to-l from-blue-200 to-green-300">
                        <div className="hero-content flex-row-reverse">
                            <div className=' w-2/4 flex justify-center'>
                            <img src={SFood} className="w-fit h-[300px] md:h-[400px]" />
                            </div>
                            <div className=' w-2/4 md:pl-7'>
                                <h1 className="text-xl md:text-5xl font-bold">Share Your Foods!</h1>
                                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute dark:text-white flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn bg-transparent btn-circle">❮</a>
                        <a href="#slide1" className="btn bg-transparent btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
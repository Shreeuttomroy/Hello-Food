
import Banner from "./child/Banner";
import Features from "./child/Features";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Quotes from "./child/Quotes/Quotes";
import Share from "./child/Share/Share";

function Home() {
    const { btitle } = useContext(AuthContext)
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{btitle} | Home</title>
                </Helmet>
                <div className="w-full bg-base-200 mx-auto">
                    {/* banner section */}
                    <div>
                        <Banner></Banner>
                    </div>
                    {/* Feature foods section */}
                    <div>
                        <Features></Features>
                    </div>
                    {/* waste, hare and get */}
                    <div>
                        <Share></Share>
                    </div>
                    {/* quotes section  */}
                    <div>
                        <Quotes></Quotes>
                    </div>
                </div>
            </HelmetProvider>
        </>
    );
}

export default Home;
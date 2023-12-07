import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // ES6
import { auth } from "../firbaseConfig/firebaseConfig";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import useAxios from "../customHook/useAxios";

export const AuthContext = createContext();
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const axios = useAxios()


  const createUserWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (cuser) => {
      const useremail = {email: cuser?.email}
      const logoutemail ={email: cuser?.email || user?.email}
      setUser(cuser);
      setLoading(false);
      if (cuser) {
        console.log(useremail);
        axios.post(`/user`, useremail, { withCredentials: true })
          .then((e) => console.log(e.data))
          .catch((e) => console.log(e));
      } else {
        console.log(logoutemail);
        axios.post('/userlogout', logoutemail, { withCredentials: true })
          .then((e) => console.log(e.data))
          .catch((e) => console.log(e));
      }
    });
    return () => {
      unSub();
    };
  }, [axios,user?.email]);

  const btitle = "FoodHub"

  const datas = {
    user,
    loading,
    createUserWithEmail,
    signInWithPass,
    signInWithGoogle,
    logOut,
    btitle
  };
  return <AuthContext.Provider value={datas}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
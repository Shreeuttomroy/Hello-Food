import axios from "axios";

const instance = axios.create({
    baseURL: 'https://foodhub-black.vercel.app/food/v1'
  });
function useAxios() {
    return instance;
}

export default useAxios;
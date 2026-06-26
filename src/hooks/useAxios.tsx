import axios from "axios";

const axiosInstance = axios.create();

export default function useAxios() {
  return axiosInstance;
}
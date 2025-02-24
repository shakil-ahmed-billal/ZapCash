import useAxiosPublic from "@/hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();

const registerUser = async (userData) => {
  console.log(userData);
  try {
    const { data } = await axiosPublic.post("/api/user/register", userData);
    console.log(data);

    if (data.success) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const loginUser = async (userData) => {
  try {
    const { data } = await useAxiosPublic.post("/api/user/login", userData);
    console.log(data);
    if (data.success) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { loginUser, registerUser };

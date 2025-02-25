import axios from "axios";

const sendCashApi = async (sendData) => {
  console.log(sendData);
  try {
    const { data } = await axios.post("http://localhost:5000/api/trx", sendData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default sendCashApi;

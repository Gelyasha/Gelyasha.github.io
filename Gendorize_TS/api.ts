import axios, { AxiosResponse } from './node_modules/axios';

const SERVER_URL = 'https://api.genderize.io';

interface IResponse {
    gender: string;
    name: string;
};

const getGender = async (firstName: string) => {
    const url = `${SERVER_URL}?name=${firstName}`;
    const gender = (await axios.get<IResponse>(url)).data;
    return gender;
};

export { getGender };
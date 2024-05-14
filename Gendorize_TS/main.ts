import { ERROR } from "./error";
import { checkValidRequest, checkEmptyRequest } from "./checks";
import { getGender } from "./api";

const input = document.querySelector<HTMLInputElement>('#search-input');
const requestButton = document.querySelector<HTMLButtonElement>('#request-button');
const result = document.querySelector<HTMLDivElement>('#request-result')

const findOutGender = async (firstName: string) => {

    try {
        const gender = await getGender(firstName);
        if (result) {
            if (!gender.gender) {
                result.textContent = ERROR.NAME_NOT_FOUND;
                return
            }
            result.textContent = gender.gender;
        };
    } catch (error) {
        console.log((error as Error).message);
        if (result) {
            result.textContent = (error as Error).message;
        }
    }
};

requestButton?.addEventListener('click', (event) => {
    try {
        event?.preventDefault();
        const firstName = input?.value ?? '';
        checkEmptyRequest(firstName);
        checkValidRequest(firstName);
        findOutGender(firstName);
    } catch (error: unknown) {
        if (result) {
            result.textContent = (error as Error).message;
        }
        console.log((error as Error).message);
    }
})



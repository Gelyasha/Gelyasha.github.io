import { ERROR } from "./error";
const checkValidRequest = (firstName) => {
    if (!/^[a-zA-Z]+$/.test(firstName)) {
        throw new Error(ERROR.INVALID_SEARCH_QUERY);
    }
    ;
};
const checkEmptyRequest = (firstName) => {
    if (!firstName) {
        throw new Error(ERROR.EMPTY_SEARCH_QUERY);
    }
    ;
};
export { checkValidRequest, checkEmptyRequest };

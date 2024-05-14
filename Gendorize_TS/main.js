var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ERROR } from "./error";
import { checkValidRequest, checkEmptyRequest } from "./checks";
import { getGender } from "./api";
const input = document.querySelector('#search-input');
const requestButton = document.querySelector('#request-button');
const result = document.querySelector('#request-result');
const findOutGender = (firstName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gender = yield getGender(firstName);
        if (result) {
            if (!gender.gender) {
                result.textContent = ERROR.NAME_NOT_FOUND;
                return;
            }
            result.textContent = gender.gender;
        }
        ;
    }
    catch (error) {
        console.log(error.message);
        if (result) {
            result.textContent = error.message;
        }
    }
});
requestButton === null || requestButton === void 0 ? void 0 : requestButton.addEventListener('click', (event) => {
    var _a;
    try {
        event === null || event === void 0 ? void 0 : event.preventDefault();
        const firstName = (_a = input === null || input === void 0 ? void 0 : input.value) !== null && _a !== void 0 ? _a : '';
        checkEmptyRequest(firstName);
        checkValidRequest(firstName);
        findOutGender(firstName);
    }
    catch (error) {
        if (result) {
            result.textContent = error.message;
        }
        console.log(error.message);
    }
});

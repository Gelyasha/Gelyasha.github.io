const TYPE_ERROR = 'Необходимо ввести число';
const VALUE_ERROR = 'Недопустимая операция';

const button = document.getElementById('equals');
const text = document.getElementById('result');

let additionResult;
let multiplicationResult;
let subtractionResult;
let divisionResult;
let result;

// const computeHistoryHeaderDiv = document.createElement('div');
// const historyOfResulstDiv = document.createElement('div');
// computeHistoryHeaderDiv.className = 'new-class';
// historyOfResulstDiv.className = 'new-class';
// computeHistoryHeaderDiv.style.color = 'red';
// historyOfResulstDiv.style.color = 'blue';
// computeHistoryHeaderDiv.textContent = 'История вычислнений: ';
// historyOfResulstDiv.textContent = 'Результат вычисленний';

// document.body.appendChild(computeHistoryHeaderDiv);
// computeHistoryHeaderDiv.appendChild(historyOfResulstDiv);

// не работает
// const getDiv = () => {
// 	historyOfResulstDiv.innerHTML=`${result}`;
//     computeHistoryHeaderDiv.insertAdjacentElement('beforeend', historyOfResulstDiv)
// 	return historyOfResulstDiv;
// }



const createHistoryOfComputing = () => {
    const historyOfResulstDiv = document.getElementById('history-of-results');
    const newResultDiv = document.createElement('div');
    newResultDiv.textContent = text.textContent;
    historyOfResulstDiv.appendChild(newResultDiv);
    newResultDiv.addEventListener('click', () => newResultDiv.remove());
}



const showCalculationResult = () => {
    const firstValue = document.getElementById('first-value').value;
    const secondValue = document.getElementById('second-value').value;

    console.log(firstValue);
    const select = document.getElementById('operation');
    const operation = select.options[select.selectedIndex].value
    if (firstValue === '' || secondValue === '' || !isFinite(firstValue) || !isFinite(secondValue)) {
        text.innerHTML = TYPE_ERROR;
        console.log(TYPE_ERROR);
        return;
    }

    switch (operation) {
        case 'addition':
            additionResult = (Number(firstValue) * 100 + Number(secondValue) * 100) / 100;
            text.innerHTML = `${additionResult}`;
            console.log(`${additionResult}`);
            result = additionResult;
            // historyOfResulstDiv.insertAdjacentText('beforeend',`\n ${additionResult}` );
            // getDiv();
            createHistoryOfComputing();
            return;

        case 'multiplication':
            multiplicationResult = Number(firstValue) * Number(secondValue);
            text.innerHTML = `${multiplicationResult}`;
            console.log(`${multiplicationResult}`);
            // historyOfResulstDiv.insertAdjacentText('beforeend',`\n ${multiplicationResult}` );
            result = multiplicationResult;
            // getDiv();
            createHistoryOfComputing();
            return;

        case 'subtraction':
            subtractionResult = (Number(firstValue) * 100 - Number(secondValue) * 100) / 100;
            text.innerHTML = `${subtractionResult}`;
            console.log(`${subtractionResult}`);
            // historyOfResulstDiv.insertAdjacentText('beforeend',`\n ${subtractionResult}`);
            result = subtractionResult;
            // getDiv();
            createHistoryOfComputing();
            return;

        case 'division':
            if (Number(secondValue) === 0) {
                console.log(VALUE_ERROR)
                text.innerHTML = VALUE_ERROR;
                return
            }
            divisionResult = Number(firstValue) / Number(secondValue);
            text.innerHTML = `${divisionResult}`;
            console.log(`${divisionResult}`);
            // historyOfResulstDiv.insertAdjacentText('beforeend',`\n ${divisionResult}`);
            result = divisionResult;
            // getDiv();
            createHistoryOfComputing();
            return;
    };
}




button.addEventListener('click', showCalculationResult);
// newResultDiv.addEventListener('click', deleteResultDiv);

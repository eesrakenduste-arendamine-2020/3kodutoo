const operations = {
    '%'(l, r) {
        return l % r;
    },
    '*'(l, r) {
        return l * r;
    },
    '+'(l, r) {
        return l + r;
    },
    '-'(l, r) {
        return l - r;
    },
    '/'(l, r) {
        return l / r;
    }
};

const functions = {
    cos(r) {
        return Math.cos(r * 0.01745);
    },
    ln(r) {
        return Math.log(r);
    },
    log(r) {
        return Math.log10(r);
    },
    sin(r) {
        return Math.sin(r * 0.01745);
    },
    sqr(r) {
        return Math.pow(r, 2);
    },
    sqrt(r) {
        return Math.sqrt(r);
    },
    tan(r) {
        return Math.tan(r * 0.01745);
    }
};

class Calculation {
    constructor(resultElement, historyElement) {
        this.resultElement = resultElement;
        this.historyElement = historyElement;
        this.valueChain = '';
        this.leftValueChain = '';
        this.history = '';
        this.op = '';
        this.total = 0;
    }

    solve() {
        if (!this.op || !this.leftValueChain) return;

        if (operations.hasOwnProperty(this.op)) {

            const result = round(operations[this.op](Number(this.total) || Number(this.leftValueChain), Number(this.valueChain)));

            this.total = result;
            this.renderResult(result);
            this.history += this.valueChain;
            this.renderHistory(this.history);
            this.leftValueChain = '';
        } else {
            throw Error('Unknown operator');
        }
    }

    setOperator(op) {
        if (operations.hasOwnProperty(op)) {
            if (this.valueChain === '') this.valueChain = '0 ';
            this.op = op;

            // MATCH LAST CHAR OF HISTORY AND CHANGE ACCORDINGLY IF OP IS CHANGED
            this.history += (this.history === '' ? this.valueChain : '') + op;

            this.renderHistory(this.history);
            this.renderResult('');

            this.leftValueChain = this.valueChain;
            this.valueChain = '';
        }
    }

    // Laseb käesoleva arvu läbi funktsiooni aga history-sse paneme ta "fn(arv)" formaadis
    executeFunction(fn) {
        if (this.op) {
            this.history += `${fn}(${this.valueChain})`;
        } else {
            if (!this.valueChain) this.valueChain += 0;
            this.history = `${fn}(${this.history || this.valueChain})`;
        }

        this.valueChain = round(functions[fn](Number(this.valueChain)));
        this.renderHistory(this.history);
        this.renderResult(this.valueChain);
    }

    appendValue(value) {
        // Kui me alustame punktiga siis eeldame et esimene number on 0
        if (this.valueChain === '' && value === '.') {
            this.valueChain === '0';
        }

        // Me ei lisa punkti uuesti kui see on juba chainis olemas
        if (value === '.' && this.valueChain.includes('.')) {
            return;
        }

        this.valueChain += value;
        this.renderResult(this.valueChain);
    }

    renderResult(text) {
        this.resultElement.innerText = text;
    }

    renderHistory(text) {
        this.historyElement.innerText = text;
    }

    reset() {
        this.valueChain = '';
        this.history = '';
        this.op = '';
        this.fn = '';
        this.total = 0;
        this.renderResult('');
        this.renderHistory('');
    }
}

// Lihtne ümardamine
function round(x, precision = 0.001) {
    const y = x + precision / 2;

    return y - (y % precision);
}

const keys = document.getElementById('keys');

const calc = new Calculation(document.getElementById('result'), document.getElementById('history'));

keys.onmousedown = event => {
    const dataKey = event.target.getAttribute('data-key');

    // Varajane return kui dataKey-d ei ole
    if (!dataKey) {
        return;
    }

    handleKey(dataKey);
};

function handleKey(dataKey) {
    if (dataKey === 'switch') {
        // Lisa/eemalda class vastavalt vajadusele
        keys.classList.contains('switch-tab') ? keys.classList.remove('switch-tab') : keys.classList.add('switch-tab');
    } else if (dataKey === 'clear') {
        calc.reset();
    } else if (isNaN(calc.total)) {
        return;
    } else if (!isNaN(parseInt(dataKey)) || dataKey === '.') {
        calc.appendValue(dataKey);
    } else if (dataKey === '=') {
        calc.solve();
    } else if ('+-*/%'.includes(dataKey)) {
        calc.setOperator(dataKey);
    } else {
        calc.executeFunction(dataKey);
    }
}
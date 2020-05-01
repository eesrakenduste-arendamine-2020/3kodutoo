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
            this.op = '';
            this.valueChain = this.total;
        } else {
            throw Error('Unknown operator');
        }
    }

    setOperator(op) {
        if (operations.hasOwnProperty(op)) {
            if (this.valueChain === '') this.valueChain = '0';
            this.op = op;

            // Kui history viimane char on operator siis me kirjutame selle üle
            // Ma kujutan ette et see ei ole kõige kiirem viis selle tegemiseks
            if (operations.hasOwnProperty(this.history.substring(this.history.length - 1))) {
                this.history = this.history.slice(0, this.history.length - 1);
            }
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
            this.history = `${fn}(${this.history})`;
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

        if (this.valueChain && this.history && !this.op) {
            this.reset();
        }

        if (value.includes('.') && value !== '.') {
            this.valueChain = value;
        } else {
            this.valueChain += value;
        }

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
        this.renderResult('0');
        this.renderHistory('');
    }
}

// Lihtne ümardamine
// https://stackoverflow.com/a/49729715
function round(number, precision = 4) {
    const factor = Math.pow(10, precision);
    const n = precision < 0 ? number : 0.01 / factor + number;

    return Math.round(n * factor) / factor;
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
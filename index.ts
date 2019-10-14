{
    class calculator {
        private container: HTMLElement;
        private n1: string = null;
        private n2: string = null;
        private operator: string = null;
        private span: HTMLElement;
        constructor() {
            this.createContainer();
            this.createOutPut();
            this.createButtons();
            this.bindEvent();
        }
        createContainer() {
            let container = this.createElement('div', 'calcuContainer', '');
            this.container = container;
            document.body.append(container)
        }
        bindEvent() {
            this.container.addEventListener('click', (event) => {
                this.inputListener((event.target as HTMLElement).textContent)
            })
        }
        clear(text:string) {
            this.n1 = null;
            this.n2 = null;
            this.span.textContent = text;
        }
        updateNum(name: string, text: string) {
            if (this[name] == null) {

                this[name] = text
            } else {
                this[name] += text
            }
            this.span.textContent = this[name];

        }
        inputListener(text: string) {

            if ('0123456789.'.indexOf(text) >= 0) {
                if (this.operator === null) {
                    this.updateNum('n1', text)
                } else {
                    this.updateNum('n2', text)
                }

            } else if ('÷+-×'.indexOf(text) >= 0) {
                if (this.n2 != null) {
                    let rs = this.getResult();
                    if(isNaN(rs))rs='0'
                    this.clear('');
                    this.span.textContent = rs;
                    this.n1 = rs;

                }
                this.operator = text;

            } else if (text === '=') {
                if (this.n1 == null || this.n2 == null) return;
                this.getResult();

            } else if (text === 'clear') {
                this.clear('0');
            }

        }
        getResult() {
            let n1 = parseFloat(this.n1)
            let n2 = parseFloat(this.n2)
            let rs: any;
            if (this.operator === '+') {
                rs = (n1 + n2);
            } else if (this.operator === '-') {
                rs = (n1 - n2);
            } else if (this.operator === '÷') {
                rs = (n1 / n2)
            } else if (this.operator === '×') {
                rs = (n1 * n2);
            }
            if (rs === Infinity) rs = '不是数字'
            this.span.textContent = (
                rs as number).toFixed(6);

            return rs.toString();
        }
        createButtons() {
            let buttons: Array < Array < string >>= [
                ['clear', '÷'],
                ['7', '8', '9', '×'],
                ['4', '5', '6', '-'],
                ['1', '2', '3', '+'],
                ['0', '.', '='],
            ]
            buttons.forEach((buttonList) => {
                let buttonContainer = this.createElement('div', `buttonContainer`, '')
                buttonList.forEach((button) => {
                    let buttonElement = this.createElement('button', `button button-${button}`, button);
                    buttonContainer.appendChild(buttonElement);
                })

                this.container.appendChild(buttonContainer)

            })

        }
        createOutPut() {
            let outPutElement = this.createElement('div', 'output', '');
            let span = this.createElement('span', '', '0');
            outPutElement.appendChild(span);
            this.span = span;
            this.container.appendChild(outPutElement)
        }


        createElement(name: string, className: string, text: string): HTMLElement {
            let htmlElement = document.createElement(name);
            if (className) htmlElement.className = className;
            htmlElement.textContent = text;
            return htmlElement
        }
    }
    new calculator()
}
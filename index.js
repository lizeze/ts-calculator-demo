{
    var calculator = /** @class */ (function () {
        function calculator() {
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.createContainer();
            this.createOutPut();
            this.createButtons();
            this.bindEvent();
        }
        calculator.prototype.createContainer = function () {
            var container = this.createElement('div', 'calcuContainer', '');
            this.container = container;
            document.body.append(container);
        };
        calculator.prototype.bindEvent = function () {
            var _this = this;
            this.container.addEventListener('click', function (event) {
                _this.inputListener(event.target.textContent);
            });
        };
        calculator.prototype.clear = function (text) {
            this.n1 = null;
            this.n2 = null;
            this.span.textContent = text;
        };
        calculator.prototype.updateNum = function (name, text) {
            if (this[name] == null) {
                this[name] = text;
            }
            else {
                this[name] += text;
            }
            this.span.textContent = this[name];
        };
        calculator.prototype.inputListener = function (text) {
            if ('0123456789.'.indexOf(text) >= 0) {
                if (this.operator === null) {
                    this.updateNum('n1', text);
                }
                else {
                    this.updateNum('n2', text);
                }
            }
            else if ('÷+-×'.indexOf(text) >= 0) {
                if (this.n2 != null) {
                    var rs = this.getResult();
                    if (isNaN(rs))
                        rs = '0';
                    this.clear('');
                    this.span.textContent = rs;
                    this.n1 = rs;
                }
                this.operator = text;
            }
            else if (text === '=') {
                if (this.n1 == null || this.n2 == null)
                    return;
                this.getResult();
            }
            else if (text === 'clear') {
                this.clear('0');
            }
        };
        calculator.prototype.getResult = function () {
            var n1 = parseFloat(this.n1);
            var n2 = parseFloat(this.n2);
            var rs;
            if (this.operator === '+') {
                rs = (n1 + n2);
            }
            else if (this.operator === '-') {
                rs = (n1 - n2);
            }
            else if (this.operator === '÷') {
                rs = (n1 / n2);
            }
            else if (this.operator === '×') {
                rs = (n1 * n2);
            }
            if (rs === Infinity)
                rs = '不是数字';
            this.span.textContent = rs.toFixed(6);
            return rs.toString();
        };
        calculator.prototype.createButtons = function () {
            var _this = this;
            var buttons = [
                ['clear', '÷'],
                ['7', '8', '9', '×'],
                ['4', '5', '6', '-'],
                ['1', '2', '3', '+'],
                ['0', '.', '='],
            ];
            buttons.forEach(function (buttonList) {
                var buttonContainer = _this.createElement('div', "buttonContainer", '');
                buttonList.forEach(function (button) {
                    var buttonElement = _this.createElement('button', "button button-" + button, button);
                    buttonContainer.appendChild(buttonElement);
                });
                _this.container.appendChild(buttonContainer);
            });
        };
        calculator.prototype.createOutPut = function () {
            var outPutElement = this.createElement('div', 'output', '');
            var span = this.createElement('span', '', '0');
            outPutElement.appendChild(span);
            this.span = span;
            this.container.appendChild(outPutElement);
        };
        calculator.prototype.createElement = function (name, className, text) {
            var htmlElement = document.createElement(name);
            if (className)
                htmlElement.className = className;
            htmlElement.textContent = text;
            return htmlElement;
        };
        return calculator;
    }());
    new calculator();
}

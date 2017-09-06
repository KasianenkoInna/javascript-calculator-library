
/**
* Easy Calculator lib 
* version 0.0.1
*/

(function(global){
	var buildStyles = function ()
	{
		var style = document.createElement("style");
		style.appendChild(
			document.createTextNode(
				'#calculator-wrapper {'
					+	'width: 424px;'
					+	'position: absolute;'
					+	'z-index: 1000;'
					+	'left:-331px;'
					+ '}'
				+ '#calculator-result{'
					+   'border-right: 5px solid   #8fde4f ;'
					+ 	'background-color: #ffffff;'
					+	'width: 334px;'
					+	'height: 90px;'
					+ '}'
				+ '#calculator-close-result{'
				+	'width: 20px; height: 20px;  margin-left:306px;   text-align:center; font-size: 14pt; font-family:"Arial Narrow", Arial, sans-serif;color: #ef4f4f;cursor:pointer;}'
				+ '#calculator-inside-result{'
					+   'border-top: 10px solid #ffffff;'
					+   'border-left: 5px solid #ffffff;'
					+	'width: 300px;'
					+	'height: 40px; font-size: 20pt; font-family:"Arial Narrow", Arial, sans-serif; color: #6b6b6b; '
					+ '}'
				+ 	'#table-calculator {border-collapse: collapse; border-right: 5px solid   #8fde4f ; background-color: #ffffff;float: left;}'
				+ 	'.easy-calculator-button{border: 1px solid   #ebf2f5; width: 80px; height: 60px; cursor:pointer;}'
				+ 	'.easy-calculator-button-operator {border: 1px solid   #ebf2f5; width: 80px; height: 60px;}'
				+ 	'.number-button:active, .operator-button:active {'
				+  	'-webkit-box-shadow: inset 0px 0px 31px -10px rgba(0,0,0,0.12);'
				+	'-moz-box-shadow: inset 0px 0px 31px -10px rgba(0,0,0,0.12);'
				+	'box-shadow: inset 0px 0px 31px -10px rgba(0,0,0,0.12);}'
				+ 	'.easy-calculator-button-text-wrapper{text-align:center; font-size: 14pt; font-family:"Arial Narrow", Arial, sans-serif;color: #6b6b6b ;font-weight: 400; margin:0px;}'
				+ 	'#easy-calculator-control-tab {border-collapse: collapse; border: 0px ; background-color: #8fde4f; width:64px ;height: 64px; float: left; cursor:move;}'
				+ 	'.easy-calculator-icon { text-align:center; font-size: 18pt; width:30px ;height: 30px;}'
				+	'.easy-calculator-button-text-icon {font-family:"Courier New", Monospace; font-weight: 400; color: #ffffff; margin:0px; border-collapse: collapse;font-weight: Bold;}'
			)
			
		);

		document.getElementsByTagName('head')[0].appendChild(style);
	};
	
	/**
	* @returns {Element} <div id='calculator-wrapper'>
	*/
	var buildView = function()
	{		
		/**
		* @param {String} buttonText
		* @param {String} typeClass class that needs to attach events to specific buttons
		*
		* @returns {Element}
		*/
		var buildHtmlButton = function(buttonText, typeClass)
		{
			var buttonClass = 'easy-calculator-button';
			if (typeof typeClass !== 'undefined') {
				buttonClass += ' ' + typeClass;
			}

			var td = document.createElement('td');
			var div = document.createElement('div');
			td.setAttribute('class', buttonClass);
			div.setAttribute('class', 'easy-calculator-button-text-wrapper');
			div.appendChild(document.createTextNode(buttonText));
			td.appendChild(div);
			
			return td;
		};

		/**
		* @param {Number} number
		*
		* @returns {Element}
		*/
		var buildNumberButton = function(number)
		{
			if ('number' !== typeof number) {
				console.warn('Tryeing to create number button but given argument is ' + typeof number);
				return;
			}

			var button = buildHtmlButton(' ' + number, 'number-button');
			button.setAttribute('data-number', number);
			
			return button;
		};

		/**
		* @param {String} value
		*
		* @returns {Element}
		*/
		var buildOperatorButton = function(value)
		{
			if ('string' !== typeof value) {
				console.warn('Tryeing to create Operator button but given argument is ' + typeof value);
				return;
			}

			var button = buildHtmlButton(' ' + value + ' ', 'operator-button');
			button.setAttribute('data-value', value);
			
			return button;
		}

		/**
		* @param {String} buttonText
		*
		* @returns {Element}
		*/
		var buildIconeButton = function(buttonText)
		{
			var td = document.createElement('td');
			var div = document.createElement('div');
			td.setAttribute('class', 'easy-calculator-icon');
			div.setAttribute('class', 'easy-calculator-button-text-icon');
			div.appendChild(document.createTextNode(buttonText));
			td.appendChild(div);
			
			return td;
		}
	
		var calculatorWrapperDiv = document.createElement('div');
		calculatorWrapperDiv.setAttribute('id', 'calculator-wrapper');

		var calculatorResult = document.createElement('div');
		calculatorResult.setAttribute('id', 'calculator-result');

		var calculatorClose = document.createElement('div');
		calculatorClose.setAttribute('id', 'calculator-close-result');
		calculatorClose.appendChild(document.createTextNode('x'));
		calculatorResult.appendChild(calculatorClose);

		var calculatorInsideResult = document.createElement('div');
		calculatorInsideResult.setAttribute('id', 'calculator-inside-result');

		calculatorResult.appendChild(calculatorInsideResult);

		calculatorWrapperDiv.appendChild(calculatorResult);

		var table = document.createElement('table');
		table.setAttribute('id', 'table-calculator');

		var tr = document.createElement('tr');
		tr.appendChild(buildOperatorButton('CE', 'operator-button'));
		tr.appendChild(buildOperatorButton('C', 'operator-button'));
		tr.appendChild(buildOperatorButton('=>', 'operator-button'));
		tr.appendChild(buildOperatorButton('/', 'operator-button'));
		table.appendChild(tr);

		var tr = document.createElement('tr');
		tr.appendChild(buildNumberButton(7));
		tr.appendChild(buildNumberButton(8));
		tr.appendChild(buildNumberButton(9));
		tr.appendChild(buildOperatorButton('*', 'operator-button'));
		table.appendChild(tr);
		
		var tr = document.createElement('tr');
		tr.appendChild(buildNumberButton(4));
		tr.appendChild(buildNumberButton(5));
		tr.appendChild(buildNumberButton(6));
		tr.appendChild(buildOperatorButton('-', 'operator-button'));
		table.appendChild(tr);
		
		var tr = document.createElement('tr');
		tr.appendChild(buildNumberButton(1));
		tr.appendChild(buildNumberButton(2));
		tr.appendChild(buildNumberButton(3));
		var plusButton = buildOperatorButton('+', 'operator-button');
		plusButton.setAttribute('rowspan', 2);
		tr.appendChild(plusButton);
		table.appendChild(tr);
		
		var tr = document.createElement('tr');
		tr.appendChild(buildNumberButton(0));
		tr.appendChild(buildHtmlButton(' .'));
		tr.appendChild(buildOperatorButton('=', 'operator-button'));
		table.appendChild(tr);
		
		calculatorWrapperDiv.appendChild(table);
		
		var moveIconTable = document.createElement('table');
		moveIconTable.setAttribute('id', 'easy-calculator-control-tab');

		var tr = document.createElement('tr');
		tr.appendChild(buildIconeButton('+'));
		tr.appendChild(buildIconeButton('-'));
		moveIconTable.appendChild(tr);

		var tr = document.createElement('tr');
		tr.appendChild(buildIconeButton('*'));
		tr.appendChild(buildIconeButton('='));
		moveIconTable.appendChild(tr);
		calculatorWrapperDiv.appendChild(moveIconTable);
		
		document.body.appendChild(calculatorWrapperDiv);
		
		return calculatorWrapperDiv;
	};

	/**
	* @param {Object} view
	*/
	var attachClickEventToViewNumberButtons = function (view){
		var buttons = document.getElementsByClassName('number-button');
		var resultInput = document.getElementById("calculator-inside-result");
		for(var i = 0; i < buttons.length; i++ ){
			buttons[i].addEventListener("click", function(event){
				var number = event.currentTarget.getAttribute('data-number');
				resultInput.innerHTML += '' + number;
				limit = resultInput.innerHTML.length;

				if(limit > 26 ) {
					return false;
				}
			});
		}
	};

	/**
	* @param {Object} view
	*/
	var attachClickEventToViewOperatorButtons = function (view){
		var buttons = view.getElementsByClassName('operator-button');
		var resultInput = document.getElementById("calculator-inside-result");
		for(var i = 0; i < buttons.length; i++ ){
			buttons[i].addEventListener("click", function(event) {
				var value = event.currentTarget.getAttribute('data-value');
					if ('+' === value || '-' === value || '*' === value || '/' === value || '.' === value) {	
						var valueLastChar = resultInput.innerHTML.slice(-1);
						if ('+' === valueLastChar || '-' === valueLastChar || '*' === valueLastChar || '/' === valueLastChar){
							resultInput.innerHTML = resultInput.innerHTML.substr(0, resultInput.innerHTML.length - 1);
						}
						return resultInput.innerHTML += '' + value;
					}
					if ('=' === value) {
						return countOfResultInput();
					}
					if ('CE' === value) {
						return resultInput.innerHTML = '';
					}
					if ('C' === value) {
						return resultInput.innerHTML = resultInput.innerHTML.slice(0,-1);
					}
					if ('=>' === value) {
						deletLastNumber();
						return;
					}
				}
			);
		}
					
	}
	
	/**
	* @return void
	*/
	var deletLastNumber = function() {
		var resultInput = document.getElementById("calculator-inside-result");
		var indexOfPlus = resultInput.innerHTML.lastIndexOf('+');
		var indexOfMinus = resultInput.innerHTML.lastIndexOf('-');
		var indexOfMul = resultInput.innerHTML.lastIndexOf('*');
		var indexOfDev = resultInput.innerHTML.lastIndexOf('/');

		if (-1 === indexOfPlus && -1 === indexOfMinus && -1 === indexOfMul && -1 === indexOfDev) {
			resultInput.innerHTML = '';
			return;
		}

		var maxIndex = Math.max(indexOfPlus, indexOfMinus, indexOfMul, indexOfDev);
		var part = resultInput.innerHTML.slice(0, maxIndex);

		resultInput.innerHTML = part;
	};

	var countOfResultInput = function() {
		var resultInput = document.getElementById("calculator-inside-result");
		var valueLastChar = resultInput.innerHTML.slice(-1);
						if ('+' === valueLastChar || '-' === valueLastChar || '*' === valueLastChar || '/' === valueLastChar){
							resultInput.innerHTML = resultInput.innerHTML.substr(0, resultInput.innerHTML.length - 1);
							resultInput.innerHTML = eval(resultInput.innerHTML);
						}
		resultInput.innerHTML = eval(resultInput.innerHTML);
	};

	/**
	* @param {...} easyCalculator
	*
	* @return void
	*/
	var attachMoveEvent = function(easyCalculator)
	{
		var controlTab = document.getElementById('easy-calculator-control-tab');
		if (null === controlTab) {
			console.warn('no control tab');
			return;
		}

		var closeTab = document.getElementById('calculator-close-result');
		if (null === closeTab) {
			console.warn('no control tab');
			return;
		}

		closeTab.addEventListener('mousedown', function() {
			var isHidden = easyCalculator.hide();
			if (true === isHidden) {
				return;
			}		
		});

		controlTab.addEventListener('mousedown', function() {
			var isShown = easyCalculator.show();
			if (true === isShown) {
				return;
			}

			document.addEventListener('mousemove', easyCalculator.moveView);
			document.addEventListener(
				'mouseup',
				function () {
					document.removeEventListener('mousemove', easyCalculator.moveView);
				}
			);			
		});
	};

	

	// Constructor
	function EasyCalculator()
	{
		var self = this;
		this.version = '0.0.1';
		this.view = '';
		this.getView = function()
		{
			return this.view;
		};

		this.moveView = function(e)
		{
			self.view.style.top = e.pageY - 117 + 'px';
			self.view.style.left = e.pageX - 334 + 'px';
		};

		this.init = function()
		{
			buildStyles();
			self.view = buildView();

			attachClickEventToViewOperatorButtons(self.view);
			attachClickEventToViewNumberButtons(self.view);

			/**
			* @return {boolean} isShown
			*/
			self.show = function()
			{
				var leftPosition = self.view.offsetLeft; 
				if (leftPosition < 0) {
					self.view.style.left = '0px'; 
					return true;
				};

				return false;
			};
			self.hide = function()
			{
				var leftPosition = self.view.offsetLeft; 
				if (leftPosition > -331) {
					self.view.style.left = '-331px'; 
					return true;
				};

				return false;
			};
			attachMoveEvent(self);
		};
	};
	
	global.easyCalculator = new EasyCalculator();

})(window);	




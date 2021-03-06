class Dice {

	numDice
	container
	constructor(numDice, animationSpeed, containerId) {

		jQuery.fn.extend({
			prependClass: function (newClasses) {
				return this.each(function () {
					var currentClasses = $(this).prop("class");
					$(this).removeClass(currentClasses).addClass(newClasses + " " + currentClasses);
				});
			}
		});


		this.animationSpeed = animationSpeed;
		this.numDice = numDice;
		this.container = $(`#${containerId}`);

		for (var i = 0; i < numDice; i++) {
			var sceneId = `scene-${i}`;

			var style = 'margin: 5px;';
			if (i > 0) {
				var top = -(i * 75);
				var left = (i * 75);
				style += `position: relative; top: ${top}px; left: ${left}px`;
            }
			
			$(this.container).append(`<div class='dice__scene' id='${sceneId}' style='${style}'></div>`)

			this.addDie(sceneId, i);
        }
	}

	addDie(sceneId, dieNum) {
		var dieId = `die-${dieNum}`;
		$(`#${sceneId}`).append(`<div id='${dieId}' class='show-front dice__cube'></div>`);

		$(`#${dieId}`).append('<div class="dice__side dice__side--front"></div>');
		$(`#${dieId}`).append('<div class="dice__side dice__side--back"></div>');
		$(`#${dieId}`).append('<div class="dice__side dice__side--right"></div>');
		$(`#${dieId}`).append('<div class="dice__side dice__side--left"></div>');
		$(`#${dieId}`).append('<div class="dice__side dice__side--top"></div>');
		$(`#${dieId}`).append('<div class="dice__side dice__side--bottom"></div>');
	}

	rollDice() {
		var rolled = 0;
		for (var i = 0; i < this.numDice; i++) {
			var die = $(`#die-${i}`);
			var animationSpeed = this.animationSpeed;

			var number = Math.floor((Math.random() * 6) + 1);
			var currentClass = die.attr('class').split(' ')[0];
			var newClass = 'show-';

			switch (number) {
				case 1:
					newClass += 'front';
					break;
				case 2:
					newClass += 'top';
					break;
				case 3:
					newClass += 'left';
					break;
				case 4:
					newClass += 'right';
					break;
				case 5:
					newClass += 'bottom';
					break;
				case 6:
					newClass += 'back';
					break;
				default:
					alert(`error, invalid number ${number}`);
            }

			rolled += number;
			console.log(`rolled ${number}`);
			
			die.removeClass(currentClass);

			if (currentClass == newClass) {
				die.prependClass(newClass + ' show-same');

				// Remove animation class after animation has finished
				setTimeout(function () {
					die.removeClass('show-same');
				}, animationSpeed);
			} else {
				die.prependClass(newClass);
			}
		}

		// raise dice rolled event
		var ref = $(this);
		setTimeout(function () {
			$(ref).trigger('rolled', rolled);

		}, animationSpeed, ref);
	}
}
//gallery
(function () {
		gallery('.gallery-block');

	 function gallery(galleryClass) {
		var galleryBlock = $(galleryClass);

		galleryBlock.each(function(){
			var block = $(this);
			var galleryList = block.find('.gallery');
			var galleryItems = galleryList.children('li');
			var qty = galleryItems.length;
			var cloneElem = galleryItems.first().clone();

			//clone
			galleryList.append(cloneElem);

			//add pagination
			var pagination = _createControl(qty);
			block.append(pagination);
			var buttons = pagination.find('.slide-number');

			// slider
			var itemWidth = galleryItems.width();
			var galleryLeft = 0;
			var newGalleryLeft = 0;
			var currentSlide = 0;
			var variance = 0;
			var flag = true;

			pagination
				.on('click', '.next', function(e){
					e.preventDefault();
					if (flag === true && currentSlide >= qty){
						_jumpToFirstItem();
					}
					_goToNextItem();
				})
				.on('click', '.prev', function(e){
					e.preventDefault();
					if (flag === true && currentSlide <= 0){
						_jumpToLastItem();
					}
					_goToPrevItem();
				})
				.on('click','.slide-number', function(e){
					e.preventDefault();
					var i = buttons.index(this);
					if (flag === true && i !== currentSlide) {
						_goToItem(i);
					}
				})

			function _setActive(){
				buttons.parent().removeClass('active');
				var index = currentSlide;
				if (currentSlide > qty - 1) {
					index = 0;
				} else if (currentSlide < 0) {
					index = qty;
				}
				buttons.eq(index).parent().addClass('active')
			};

			function _startAnim(newGalleryLeft){
				flag = false;
				galleryList.animate({
					marginLeft: Math.round(newGalleryLeft)
				}, 500, function(){
					flag = true;
					galleryLeft = newGalleryLeft;
				});
			}

			function _animate(left){
				_setActive();
				_startAnim(left);
			}

			function _prepareFutureSlide(index){
				currentSlide = index;
				galleryLeft = (index * itemWidth) * -1;
			}

			function _jumpToItem(index){
				_prepareFutureSlide(index);
				galleryList.css('margin-left', galleryLeft);
			}

			function _jumpToFirstItem(){
				_jumpToItem(0);
			}

			function _jumpToLastItem(){
				_jumpToItem(qty);
			}

			function _goToItem(index){
				_prepareFutureSlide(index);
				_animate(galleryLeft);
			}

			function _goToNextItem(){
				_goToItem(currentSlide+1);
			}

			function _goToPrevItem(){
				_goToItem(currentSlide-1);
			}

			function _createControl(qty){
		    	var divControl = $('<div>').addClass('control');
		    	var prev = $('<img>', {
		    		src: 'images/prev.png',
		    		class: 'prev',
		    		href: '#',
		    		style: 'background: url(../images/prevhover.png) no-repeat;',
		    		text: 'prev'
		    	});
		    	var next = $('<img>', {
		    		src: 'images/next.png',
		    		class: 'next',
		    		href: '#',
		    		text: 'next'
		    	});
		    	var controlList = $('<ul>');
		    	for (var i=0; i < qty; i++) {
		    		var newLi = $('<li>');
		    		var newLink = $('<img>', {
		    			class: 'slide-number',
		    			href: '#',
		    			text: i + 1
		    		});
		    		newLi.append(newLink);
		    		controlList.append(newLi);
		    	}

		    	divControl.append(prev, controlList, next);
		    	return divControl;
		    };
		})
	}

    
	gallery('galleryBlock');

})();
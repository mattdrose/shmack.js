/*
 * jQuery Shmack v0.1.0
 *
 * Licensed under the MIT license.
 * Copyright 2013 Matt Rose
 */

(function($) {

    // here we go!
    $.shmack = function(element, options) {

        // plugin's default options
        var defaults = {
            blockSelector: 'li',	//String - Selector for elements to be sorted into columns
			columns: 3,				//Integer - Number of columns to stack
			loadImages: true,		//Boolean - Load images before stacking (important for calculating heights)
			setImageHeight: false,	//Boolean - Height of images is set using data-height (used for faster load time)
			onBlockLoad: false,		//Function - Run after each block loads
			complete: false			//Function - Run on complete
        };

        // to avoid confusions, use "base" to reference the current instance of the object
        var base = this;

        // plugin's properties will be available through:
        // base.settings.propertyName from inside the plugin or
        // element.data('shmack').settings.propertyName from outside the plugin
        base.settings = $.extend({}, defaults, options);

        var $element = $(element), // reference to the jQuery version of DOM element
             //element = element;  // reference to the actual DOM element

			//Store all the blocks
			$blocks = $element.find(base.settings.blockSelector);

        // the "constructor" method that gets called when the object is created
        var init = function() {

			//Create the columns
				//Calculate fluid width of columns
				base.columnWidth = Math.round((100 / base.settings.columns)*1000)/1000 + '%';
				//Contains all the column containers jQuery objects
				base.columnContainers = [];
				//Contains the height of each column container
				base.columnHeights = [];


			//Add column containers
			for(var i=1; i<=base.settings.columns; i++){
				//Make a column container jQuery Object
				var $columnContainer =	$('<div></div>').addClass('shmack-column')
												.attr('id', 'shmack-column-'+i)
												.css({
													width: base.columnWidth,
													float: 'left'
												});

				//Append the column container
				$element.append($columnContainer);

				//Store the object, and the initial height
				base.columnContainers.push($columnContainer);
				base.columnHeights.push(0);
			}

			//Add the blocks into the columns
			$blocks.each(function(i, val){

				var $block = $(this),
					block = this;

				//If the height of images is known (image height is preset, or images are preloaded)
				if (base.settings.setImageHeight || base.settings.loadImages){
					//Add blocks based on the lowest column height
					var minVal = Math.min.apply( Math, base.columnHeights ),//Returns min height
						minValIndex = base.columnHeights.indexOf(minVal);//Returns column index with the shortest height

					//Container with shortest height
					var $container = base.columnContainers[minValIndex];

					//Add the block
					$container.append($block);

					//Calculate the new container height
					base.columnHeights[minValIndex] += getBlockHeight(block); //parseInt( $element.data('height'), 10 );//Add the height

				//If height isn't known add items in iterated order
				} else {
					base.columnContainers[i % base.settings.columns].append($block);
				}


				//Run onBlockLoad function after each block has loaded
				if(base.settings.onBlockLoad){
					base.settings.onBlockLoad(i, block);
				}

			})

			//Reset blocks css to work with columns - responsive :)
			.css({
				width: '100%',
				float: 'none'
			});

			if(base.settings.complete){
				base.settings.complete();
			}

        };


        // public methods
        // -------------------------------------------
        // -------------------------------------------
        // these methods can be called by:
        // base.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('shmack').publicMethod(arg1, arg2, ... argn) from outside if arguments ARE required or
        // element.shmack('publicMethod') from outside if arguments AREN'T required

        // reverse the changes made to the DOM element
        base.destroy = function() {

            $blocks.each(function(){

				var $block = $(this),
					block = this;

				//Move the block back into the element
				$element.append($block);

            }).css({
				width: '',
				float: ''
            });

            for (var i; i <= base.columnContainers.length; i++){
				$column = base.columnContainers[i];
				$column.remove();
            }

        };


        // private methods
        // -------------------------------------------
        // -------------------------------------------

        // Returns the height of the sent DOM element
        var getBlockHeight = function( block ){

			var $block = $(block),
				height = $block.height();

			//If the user uses data-height to set the image height (loadImages hasn't been run)
			if(base.settings.setImageHeight){

				//Run through each image to get the height
				$block.find('img').each(function(){

					var $img = $(this);

					if ($img.data('height')!==undefined){
						height += $img.data('height');
						height -= $img.height();//Subtract height from calculation if incase has already loaded
					}
				});
			}

			return height;
		};

        // fire up the plugin!
        if (base.settings.loadImages){
			$element.imagesLoaded(init);
        }else{
			init();
		}

    };

    // ======================= imagesLoaded Plugin ===============================
	/*!
	* jQuery imagesLoaded plugin v1.1.0
	* http://github.com/desandro/imagesloaded
	*
	* MIT License. by Paul Irish et al.
	*/


	// $('#my-container').imagesLoaded(myFunction)
	// or
	// $('img').imagesLoaded(myFunction)

	// execute a callback when all images have loaded.
	// needed because .load() doesn't work on cached images

	// callback function gets image collection as argument
	//  `this` is the container

	$.fn.imagesLoaded = function( callback ) {
		var $this = this,
		$images = $this.find('img').add( $this.filter('img') ),
			len = $images.length,
			blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
			loaded = [];

		function triggerCallback() {
			callback.call( $this, $images );
		}

		function imgLoaded( event ) {
			var img = event.target;
			if ( img.src !== blank && $.inArray( img, loaded ) === -1 ){
				loaded.push( img );
				if ( --len <= 0 ){
					setTimeout( triggerCallback );
					$images.unbind( '.imagesLoaded', imgLoaded );
				}
			}
		}

		// if no images, trigger immediately
		if ( !len ) {
			triggerCallback();
		}

		$images.bind( 'load.imagesLoaded error.imagesLoaded',  imgLoaded ).each( function() {
			// cached images don't fire load sometimes, so we reset src.
			var src = this.src;
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			// data uri bypasses webkit log warning (thx doug jones)
			this.src = blank;
			this.src = src;
		});

		return $this;
	};
	// ======================= end imagesLoaded Plugin ===============================


    // add the plugin to the jQuery.fn object
    $.fn.shmack = function(method) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined === $(this).data('shmack')) {

                // create a new instance of the plugin
                // pass the user-provided "method" (assumed to be an object of options)
                var plugin = new $.shmack(this, method);

                // store a reference to the plugin object in case user needs access to public variables and methods
                $(this).data('shmack', plugin);

            // if the plugin is already initiated, check to see if the method exists
            } else if ($(this).data('shmack')[method]) {
				// call the method
				$(this).data('shmack')[method].apply( this, arguments );
            }

        });

    };

})(jQuery);
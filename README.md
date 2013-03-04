Shmack.js
===========

A jquery plugin to stack items into fluid columns, creating a grid layout simialar to [Pinterest](http://www.pinterest.com).

##Why Another Pinterest Clone?

There are already several plugins that does what shmack does. The only problem is that they use fixed calculated positioning, which is poor for bloat, performance, and responsive layouts.

Shmack is a lighweight, responsive solution that stacks elements into columns, as appose to using fixed calculations to position them.

How to Use
----------

Create markup with a container and child elements
```html
<ul id="shmack-it">
<li>
    <h3>Block 1</h3>
    <img src="http://placehold.it/350x250">
</li>
<li>
    <h3>Block 2</h3>
    <img src="http://placehold.it/350x180">
</li>
<li>
    <h3>Block 3</h3>
    <img src="http://placehold.it/350x150">
</li>
<li>
    <h3>Block 4</h3>
    <img src="http://placehold.it/350x350">
</li>
<li>
    <h3>Block 5</h3>
    <img src="http://placehold.it/350x120">
</li>
</ul>
```

Include jQuery and shmack.js at the bottom of your page.
```html
<script type="text/javascript" src="path/to/jquery.js"></script>
<script type="text/javascript" src="path/to/jquery.shmack.min.js"></script>
```

Initialize the plugin on load.
```javascript
$(document).ready(function(){
  $('#shmack-it').shmack();
});
````

Options
-------

These are the options (and their defaults) that you can pass to shmack:

```javascript
blockSelector: 'li',	//String - Selector for elements to be sorted into columns
columns: 3,				//Integer - Number of columns to stack
loadImages: true,		//Boolean - Load images before stacking (important for calculating heights)
setImageHeight: false,	//Boolean - Height of images is set using data-height (used for faster *	load time)
onBlockLoad: false,		//Function - Run after each block loads
complete: false			//Function - Run on complete
````

Similar Plugins
---------------

*	[Masonry](https://github.com/desandro/masonry)
*	[BlocksIt.js](http://www.inwebson.com/jquery/blocksit-js-dynamic-grid-layout-jquery-plugin/)
*	[Wookmark](https://github.com/GBKS/Wookmark-jQuery)

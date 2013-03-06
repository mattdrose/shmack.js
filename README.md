# Shmack.js

A jquery plugin to stack items into fluid columns, creating a grid layout similar to <a href="http://pinterest.com/all/" target="_blank">Pinterest</a>.

<a href="http://codepen.io/mattdrose/full/LDfFp" target="_blank">Here's an example</a>

<a href="http://codepen.io/mattdrose/pen/LDfFp" target="_blank">Play with the code</a>

### Why Another Pinterest Clone?

There are already several plugins that do what shmack does. The only problem is that they use fixed calculated positioning, which results in bloat, possible rendering/paint issues, and isn't good for responsive layouts.

Shmack is a lighweight, responsive solution that stacks elements into columns, as apposed to using fixed calculations to position them.


## How it Works

Shmack is quite simple. It takes a bunch of element blocks and wraps them in divs that act as columns. Each element is added to the column with the shortest height (this can be changed through settings). From that point on, you can style the blocks to look however you'd like.


## How to Use

### Add Markup
Create markup that includes a container with children:
```html
<article id="shmack-it">
    <section class="block">
        <img class="pic" src="http://placecage.com/350/250">
        <h3>Block 1</h3>
    </section>
    <section class="block">
        <img class="pic" src="http://placecage.com/350/180">
        <h3>Block 2</h3>
    </section>
    <section class="block">
        <img class="pic" src="http://placecage.com/350/280">
        <h3>Block 3</h3>
    </section>
    <section class="block">
        <img class="pic" src="http://placecage.com/350/350">
        <h3>Block 4</h3>
    </section>
    <section class="block">
        <img class="pic" src="http://placecage.com/350/120">
        <h3>Block 5</h3>
    </section>
</article>
```
_Note: By default, shmack is looking for the selector ".block"_


### Add the Plugin
Include jQuery and shmack.js at the bottom of your page:
```html
<script type="text/javascript" src="path/to/jquery.js"></script>
<script type="text/javascript" src="path/to/jquery.shmack.min.js"></script>
```

### Initialize the Plugin
Initialize the plugin on load:
```javascript
$(document).ready(function(){
 	$('#shmack-it').shmack();
});
````

### Add Some Styling
You can customize the CSS anyway you'd like. This is the minimum styling needed:
```css
.block{
    /* Fallback for no js */
    width:33.333%;
    float:left;
}
    .shmack-column .block{
        width:auto;
        float:none;
    }

/* If not already added to CSS */
.clearfix:before,
.clearfix:after {
    content: "";
    display: table;
} 
.clearfix:after {
    clear: both;
}
.clearfix {
    zoom: 1; /* For IE 6/7 (trigger hasLayout) */
}
```
_Note: The columns use the class "shmack-column"_


## Options

These are the options (and their defaults) that you can pass to shmack:

```javascript
$('#shmack-it').shmack({
	blockSelector: '.block',	//String - Selector for elements to be sorted into columns
	columns: 3,				//Integer - Number of columns to stack
	loadImages: true,		//Boolean - Load images before stacking (important for calculating heights)
	setImageHeight: false,	//Boolean - Height of images is set using data-height (used for faster load times)
	onBlockLoad: false,		//Function - Callback after each block loads
	complete: false			//Function - Callback on complete
});
````


## Similar Plugins

*	<a href="https://github.com/desandro/masonry" target="_blank">Masonry</a>
*	<a href="http://www.inwebson.com/jquery/blocksit-js-dynamic-grid-layout-jquery-plugin/" target="_blank">BlocksIt.js</a>
*	<a href="https://github.com/GBKS/Wookmark-jQuery" target="_blank">Wookmark</a>

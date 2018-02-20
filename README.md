# Intermediate D3 workshop | NICAR 2018
We will build on D3.js basics by exploring more complex chart forms, covering functions for fetching and manipulating data, and introducing transitions and interaction. We will write working code together and break down how some of our favorite examples of D3 charts work.

This is designed to build on [the beginner workshop](https://github.com/darlacameron/beginning-d3-nicar-2018).

## Steps to get started
1. Download or `git clone` this repository.
2. In terminal, run the command `python -m SimpleHTTPServer 8000`
3. In a browser, open the url http://localhost:8000/
4. In a text editor (e.g. Sublime Text), open the repository folder.
5. Start with 1-dom-manipulation/index.html

## Follow along
[View the slides](https://docs.google.com/presentation/d/1DXY_PkQkBEmbOnIxSiOCfRUc-VDIJtcnInt7mubyP-w/edit?usp=sharing)

[Docs: everything D3 can do](https://github.com/d3/d3/blob/master/API.md)

We will make an animated chart together that shows the relationship between health spending and life expectancy using data from [the OECD](http://stats.oecd.org/#). This chart was inspired by Peter Aldhous ([you can view his implementation in R here](https://github.com/BuzzFeedNews/2017-05-us-health-care/)).

Each step involves reading some documentation, then writing a few lines of code. If you get stuck, there is a link at the end of each step to a working implementation.

We will be using Blockbuilder to write code. Blockbuilder is a code editor that runs in your browser and shows you the results which refresh as you write. If you have a GitHub account, you can log in and save your code as Gists. [Here's a link to the starting point for our workshop.](http://blockbuilder.org/jmuyskens/4a3c352e1979e3d61eac78ffa8c2f205)


## 1. Functional programming and data analysis

[starting point](/01-working-with-data)

First, lets load our data: [Docs: d3.csv](https://github.com/d3/d3-request/blob/master/README.md#csv).

    d3.csv(‘oecd.csv’, function(data) { // do things with the data });

Take a look at your data using `console.log(data)` or `console.table(data)` if you are fancy.

Now let’s play with the data, using built in Array functions:

- [docs: Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [docs: Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

TASK: filter out values where one or both are NA. Then create an Array of life expectancies.

Finally, lets play with some helpful [d3-array](https://github.com/d3/d3-array/) functions:

[d3.max](https://github.com/d3/d3-array/#max), [d3.min](https://github.com/d3/d3-array/#min), [d3.mean](https://github.com/d3/d3-array/#mean), [d3.median](https://github.com/d3/d3-array/#median), [d3.extent](https://github.com/d3/d3-array/#extent)

[what it should look like](/02-nesting-data)

## 2. Grouping data

[starting point](/02-nesting-data)

Goal is to structure your data the way you want your DOM to look.

`Nest` is like "groupBy" in other functional programming languages

[Docs: d3.nest](https://github.com/d3/d3-collection#nests)

![nest diagram](nest.png)

`.entries` returns an array

`.map` returns an object which is useful for creating lookup tables. There's also `.object` which you can use if you are sure your data doesn't collide with js reserved words. JS objects not equal to hash tables like python dicts but can be used in much the same way.

Try it out with [Mr. Nester](http://bl.ocks.org/jmuyskens/raw/349d82067d82ce121fcd6773dc6db3a1/).

create an object called `dataByYear` and use it with your circle selection. Try different years

Now repeat the excercise using `.entries`. Note that the structure changes.

[what it should look like](/03-scatter)

## 3. Scatter plot
[starting point](/03-scatter)

[Docs: d3-scale](https://github.com/d3/d3-scale)

First, choose what variable goes on each axis. We will be doing spending on x and life expectancy on y

    var xScale = d3.scaleLinear()
        .domain([0, d3.max(healthExpenditures)])
        .range([0, width]);

Task: write the y scale, using the extent of the life expectancy for the domain. Note that zero in SVG is at the top of the image, so you’ll want to flip your range.

[what it should look like](/04-axes)

## 4. Axes
[starting point](/04-axes)

[Docs: D3 axis](https://github.com/d3/d3-axis)

Demo: create an x axis

Task: create a y axis

The backbone of the axis is a `<path>` while the ticks are `<line>`s so you can easily style them separately with CSS.

We can make a dashed line with `stroke-dasharray: TKpx TKpx;`.

Task: reduce the number of ticks, make the y axis ticks extend across the chart

Use a `transform` to move your axis around.

Play with the following:

`.tickSize` to specify length of ticks. Try making your axes as wide and tall as your chart.

`.ticks` to specify number of ticks

`.tickFormat` format the tick

[Docs: axis ticks](https://github.com/d3/d3-axis#axis_ticks)

[what it should look like](/05-annotations)

## 5. Annotations

[starting point](/05-annotations)

[Docs: text-anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)

[what it should look like](/06-connected-scatter)

## 6. Connected scatterplot

[starting point](/06-connected-scatter)

[Docs: d3.line](https://github.com/d3/d3-shape#lines)

[what it should look like](/07-advanced-enter-exit-pattern)

## 7. Advanced update pattern

[starting point](/07-advanced-enter-exit-pattern)

docs: enter pattern example

Demo: create an update function

timer function:

    var i = 0;
    d3.interval(function() {
        if (i < dataByYear.length) update(dataByYear[i++].values);
    }, 500);

[what it should look like](/08-transitions)

## 8. Transitions

[starting point](/08-transitions)

[Docs: d3 transition](https://github.com/d3/d3-transition)

Live coding: add transition to circles for position and radius

Task: add transition to text. Try out different easing patterns.

[what it should look like](/09-interaction)

## 9. Interaction

[starting point](/09-interaction)

When entering or adding elements chain `.on(EVENTNAME, callback)`. Similar to jQuery, this calls a function when an event happens.

D3 will call your callback function with the datum like you get in other accessor functions. Use `d3.select(this)` to select the element that was triggered.

Some events:
- mouseenter
- mouseleave
- mouseover
- click

Demo: create a mouseover function for the circles

Task: make a replay “button” that triggers when you `’click’` it.

Extra credit docs: [Voronoi](https://github.com/d3/d3-voronoi)

[what it should look like](/10-final)

# what's in the advanced class
- Layouts (force, hierarchy)
- Geo tools
- Modules
- Behaviors (drag and zoom)
- Canvas

# libraries and tools you may find useful
[crowbar](http://nytimes.github.io/svg-crowbar/) to download your chart as an SVG. You can then edit it using vector graphics software such as Adobe Illustrator.

[d3-jetpack](https://www.npmjs.com/package/d3-jetpack) for convenience functions that will save you a lot of repetitive typing.

[d3-legend](http://d3-legend.susielu.com/) to make convenient legends based on your scales.

[Textures.js](https://riccardoscalco.github.io/textures/) to use patterns in your visualizations.

[d3-annotation](http://d3-annotation.susielu.com/) for interactive annotations.

[flubber](https://github.com/veltman/flubber) for better transitions between shapes. [Example](https://beta.observablehq.com/@jmuyskens/pennsylvania-redistricting).

[Observable](https://beta.observablehq.com/) Mike Bostock's shiny new notebook coding environment. [Example](https://beta.observablehq.com/@jmuyskens/pennsylvania-redistricting).



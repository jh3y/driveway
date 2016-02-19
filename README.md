![img](https://img.shields.io/badge/version-1.0.0-000000.svg)
![img](https://img.shields.io/badge/language-CSS-9a12b3.svg)
![img](https://img.shields.io/badge/license-MIT-22a7f0.svg)
![img](https://img.shields.io/badge/size-~3.16kb-2ecc71.svg)

driveway
===
pure CSS masonry layout aid

![img](https://raw.github.com/jh3y/pics/master/driveway/driveway.png)

`driveway` is an explorative project for developing pure CSS masonry layouts. It is developed using `stylus`.

* easy to use
* interactive
* responsive
* config driven
* customisable
* extendable

```html
<div class="dw">
  <div class="dw-pnl ">
    <div class="dw-pnl__cntnt">
      <p>Some content.</p>
    </div>
  </div>
</div>
```

## _"I just want a copy"_
You may have come here from the [blog post](https://medium.com/@_jh3y/how-to-pure-css-masonry-layouts-a8ede07ba31a#.9v5aqxclp) I wrote about pure CSS masonry layouts. If that's the case and you want the exact code I used in that post(_with vendor prefixing_), you'll be best served looking in the `dist` folder for `driveway.blog.css` and `driveway.blog.min.css`. Alternatively, use `bower` to pull in the repo.

## usage
In order to start using  `driveway`, drop the `driveway{.min}.css` file into your page and start building your markup.

`driveway` simply provides the basic means to layout your content in a masonry style and provides no aesthetic styling. This should ideally be covered by your own `theme` files. There are some notes about theming below.

If you would like a similar theme to that used in the [demo](http://jh3y.github.io/driveway), check out the `theme.styl` file in the sources.

### anatomy
`driveway` is built up of different blocks;

* `container`
* `panels`
* `clusters`
* `segments`
* `flip panels(optional)`
* `focus curtain(optional)`

Below is an explanation of these blocks. It may be easier to inspect the [demo](http://jh3y.github.io/driveway) page or source in the repo to get a further understanding of how these piece together.

#### layout container
We start our layout with a container;

```html
<div class="dw"></div>
```

##### class reference
* `dw` - layout container

#### layout panels
Panels are the simplest building blocks of our layout. The content for a panel lives inside the `dw-pnl__cntnt` element.

```html
<div class="dw-pnl ">
  <div class="dw-pnl__cntnt">
    <p>Panel content.</p>
  </div>
</div>
```
##### modifiers
* Focus `{dw-pnl--fcs}` - the focus modifier will focus a panel on hover. Ust it by adding the `dw-pnl--fcs` class to the panel. This means that a _focus curtain element_ must exist within the layout container as the __very last__ element.

  ```html
    <div class="dw__fcs-crtn"></div>
  ```

* Pulse `{dw-pnl--pls}` - the pulse modifier will slightly enlarge a panel on hover. Use it by adding the `dw-pnl--pls` class to the panel.

##### class reference
* `dw-pnl` - panel
* `dw-pnl__cntnt` - panel content
* `dw-pnl--fcs` - panel focus modifier
* `dw-pnl--pls` - panel pulse modifier

#### clusters and segments
Clusters and segments are most likely the trickiest part of creating a layout with `driveway`. Clusters are used to breakup the layout flow a little more and enhance the masonry effect that's desired.

A cluster is the top level element.

```html
<div class="dw-pnl dw-clstr dw-clstr--vrt">
</div>
```

It's still a panel so it needs the `dw-pnl` class in addition to the `dw-clstr` class. The last class is used to declare the direction of the cluster flow. `dw-clstr--vrt` declares that are cluster should flow vertically using columns whilst `dw-clstr--hrz` would declare a horizontal flow for our cluster. This is __important__. Not adding the modifier class will result in that cluster not collapsing when desired.

A cluster is made up of segments. This can be _tricky_.

```html
<div class="dw-clstr__sgmnt"></div>
```

The first children of our cluster need to be either `row`s or `column`s depending on the directional flow of our cluster. Our content will then sit within these.

For example;

A vertically flowed cluster with two columns. The row/column modifier is important to define the internal flow of the segment. Here we use `dw-clstr__sgmnt--clmn` as we want columns. But we may use `dw-clstr__sgmnt--rw` if we desire a row.

```html
<div class="dw-pnl dw-clstr dw-clstr--vrt">
  <div class="dw-clstr__sgmnt dw-clstr__sgmnt--clmn ">
  </div>
  <div class="dw-clstr__sgmnt dw-clstr__sgmnt--clmn ">
  </div>
</div>

```

Once we have created our cluster children containers, we simply need to fill them with content. We fill them with panel blocks. These panel blocks must have the class `dw-clstr__sgmnt` in addition to their panel class.

```html
<div class="dw-pnl dw-clstr__sgmnt">
  <div class="dw-pnl__cntnt">
    <p>Panel content.</p>
  </div>
</div>
```
We may want to enforce that our segments take up a certain amount of real estate inside their clusters. There are two segment modifiers to ensure that a segment takes up at least `25%` or `50%` of the real estate in the relative direction. These are applied with `dw-clstr__sgmnt--qrt` and `dw-clstr__sgmnt--hlf` respectively.


Putting it all together we get something like;

```html
<div class="dw-pnl dw-clstr dw-clstr--vrt">
  <div class="dw-clstr__sgmnt dw-clstr__sgmnt--clmn ">
    <div class="dw-pnl dw-clstr__sgmnt ">
      <div class="dw-pnl__cntnt">
        <p>I am in the first column.</p>
      </div>
    </div>
  </div>
  <div class="dw-clstr__sgmnt dw-clstr__sgmnt--clmn ">
    <div class="dw-pnl dw-clstr__sgmnt ">
      <div class="dw-pnl__cntnt">
        <p>I am in the second column.</p>
      </div>
    </div>
    <div class="dw-pnl dw-clstr__sgmnt ">
      <div class="dw-pnl__cntnt">
        <p>So am I.</p>
      </div>
    </div>
  </div>
</div>
```
##### class reference
* `dw-clstr` - cluster
* `dw-clstr--vrt` - vertical flow cluster modifier
* `dw-clstr--hrz` - horizontal flow cluster modifier
* `dw-clstr__sgmnt` - segment
* `dw-clstr__sgmnt--clmn` - segment column
* `dw-clstr__smgnt--rw` - segment row
* `dw-clstr__smgnt--qrt` - segment taking up quarter of the real estate available
* `dw-clstr__smgnt--hlf` - segment taking up half of the real estate available

#### focus curtain
The focus curtain is an optional element. It __is__ required though if you wish to use the `focus` modifier on any of your panels. This is because `driveway` makes use of CSS sibling combinator syntax in order to give off the desired effect. To use, ensure that an element with the class `dw__fcs-crtn` is placed as the very last element of the layout container.

```html
<div class="dw">
  <!-- LAYOUT CONTENT HERE -->
  <div class="dw__fcs-crtn"></div>
</div>
```

#### flip panels
Flip panels are layout panels that spin round on hover/tap(mobile). Due to the required markup needed for the effect, their structure is a little different to other panels.

```html
<div class="dw-pnl dw-flp dw-flp--md">
  <div class="dw-pnl__cntnt dw-flp__cntnt">
    <div class="dw-flp__pnl dw-flp__pnl--frnt">
      <h1>You can flip me round</h1>
    </div>
    <div class="dw-flp__pnl dw-flp__pnl--bck">
      <h1>Yeah that's right</h1>
    </div>
  </div>
</div>
```

A flip panel is still a panel so it still uses the `dw-pnl` class. It also uses the `dw-flp` class and an additional class to define the height of the panel.

That last piece is __important__. In order for the flip to render and behave correctly, a defined height must be set so that each side of the panel matches up. There are size modifiers for small, medium and large. These are set in the config and are used with `dw-flp--sm`, `dw-flp--md` and `dw-flp--lg` classes respectively.

Our flip panel content(`dw-flp__cntnt`) has to consist of two panels(`dw-flp__pnl`). One for the front of the panel(`dw-flp__pnl--frnt`), and one for the back(`dw-flp__pnl--bck`).

##### class reference
* `dw-flp` - flip panel
* `dw-flp--sm` - small flip panel
* `dw-flp--md` - medium flip panel
* `dw-flp--lg` - large flip panel
* `dw-flp__cntnt` - flip panel content
* `dw-flp__pnl` - flip panel child panel
* `dw-flp__pnl--frnt` - flip panel front
* `dw-flp__pnl--bck` - flip panel back



#### full class glossary
* `dw` - layout container
* `dw-pnl` - panel
* `dw-pnl__cntnt` - panel content
* `dw-pnl--fcs` - panel focus modifier
* `dw-pnl--pls` - panel pulse modifier
* `dw-clstr` - cluster
* `dw-clstr--vrt` - vertical flow cluster modifier
* `dw-clstr--hrz` - horizontal flow cluster modifier
* `dw-clstr__sgmnt` - segment
* `dw-clstr__sgmnt--clmn` - segment column
* `dw-clstr__smgnt--rw` - segment row
* `dw-clstr__smgnt--qrt` - segment taking up quarter of the real estate available
* `dw-clstr__smgnt--hlf` - segment taking up half of the real estate available
* `dw__fcs-crtn` - focus curtain
* `dw-flp` - flip panel
* `dw-flp--sm` - small flip panel
* `dw-flp--md` - medium flip panel
* `dw-flp--lg` - large flip panel
* `dw-flp__cntnt` - flip panel content
* `dw-flp__pnl` - flip panel child panel
* `dw-flp__pnl--frnt` - flip panel front
* `dw-flp__pnl--bck` - flip panel back


### theming
`driveway` includes minimal theming. It provides structural styling and minimal aesthetics for things like panel padding. For the demos, utility classes are used to add color to text, panels etc.

Some areas of theming are likely to be common though such as how to display images as panels.

#### images
Displaying images in a masonry style is quite a common desire. It seems likely that when doing this, there will be no need to define an `img` element within our panel content as the `img` is the panel content.

```html
<div class="dw-pnl ">
  <img src="img/photo-2.jpg" class="dw-pnl__cntnt"/>
</div>
```

However, dropping this in the page with no `img` specific theming will break things a little depending on your image sizes. This isn't major, but for my personal theming I added the following rules to my theme.

```css
img {
  max-height: 300px;
}
img.dw-pnl__cntnt,
img.dw-flp__pnl {
  padding: 0;
}
img.dw-flp__pnl {
  max-height: 100%;
}

```
This stops images going wild!

## development
### setup

`driveway` is developed using `gulp`, `stylus` and `jade`.

__NOTE:__ In order to run the source, both __[node]__ and __[gulp]__ are required.

1. Clone the repo.

```shell
  git clone https://github.com/jh3y/driveway.git
```

2. Navigate into the repo and install the dependencies.

```shell
  cd driveway
  npm install
```

3. Run `gulp` to take care of preprocessing and running a local static server instance.

```shell
  gulp
```

### available pages
There are some pages available for developing against that have been used to explore methods when developing `driveway`;

* `index.html` - demo page for `driveway` which is manually built.
* `sandbox.html` - sandbox page for developing new features.
* `dev.html` - randomly generated layout in order to test different combinations.
* `timeline.html` - page for exploring timeline ordered content layouts.

### config driven development
Development of `driveway` is config driven in the sense that a set of variables defined in a json file are passed to both `jade` and `stylus` source are compiled. This makes it easier to change properties for `driveway` by only having to alter them in one place.

#### roll your own!
As `driveway` is config driven, you can make alterations to it's configuration such as classnames, responsive breakpoints and some default aesthetics by making updates to this it's config file and compiling your own versions.

In order to do this;

* clone and set up the repo.
* modify `driveway-config.json`.
* run `gulp compile --dist --stat`. This will output new files in the `dist` folder whilst giving you the new filesize.


## timeline ordering issue
Date ordered content is something that deserves it's own mention as this seems to be the hardest issue to tackle with implementing a pure CSS masonry layout.

Without server side rendering or some JavaScript intervention this isn't easy with just CSS.

Date ordered content can be done but it is when we try and make this content responsive that we hit a stumbling block as the order is lost between viewports.

I have experimented with different approaches(_even trying to play with `flexbox` ordering_) but I haven't come across a nice way of doing it.

The only straight forward solution seems to be duplicating the markup per viewport size breakpoint.

### an example
Let's imagine we have some content that is ordered by date.

At a larger viewport we wish to display this in four columns. This requires dropping an item of content into each column one a time from left to right, newest to oldest(1-10) until we run out of items.

| Column 1 | Column 2 | Column 3 | Column 4 |
|----------|----------|----------|----------|
|    1     |    2     |    3     |    4     |
|    5     |    6     |    7     |    8     |
|    9     |    10    |  EMPTY   |  EMPTY   |

This looks fine but when we drop down to a lower viewport would be greeted with one column and the items in the wrong order;

| Column |
|--------|
|   1    |
|   5    |
|   9    |
|   2    |
|   6    |
|  etc.  |

One way to get round this is render two sets of content on the page and wrap them accordingly based on the viewport.

For our `mobile` version of the markup, we just need one column with our content in the correct order. For this, we can use a container that will be hidden with CSS at larger viewports and then a collection of panel blocks.

```html
<div class="dw--mobile">
  <div class="dw-pnl"></div> <!-- 1 -->
  <div class="dw-pnl"></div> <!-- 2 -->
  <div class="dw-pnl"></div> <!-- 3 -->
  <div class="dw-pnl"></div> <!-- 4 -->
  <div class="dw-pnl"></div> <!-- 5 -->
  <div class="dw-pnl"></div> <!-- 6 -->
</div>
```

For our `desktop` version we need a vertically flowed cluster with the amount of columns that are desired. Nested clusters will work fine here.

```html
<div class="dw--desktop">
  <div class="dw-pnl dw-clstr">
    <div class="dw-clstr__sgmnt dw-clstr__sgmnt--clmn ">
      <div class="dw-pnl"></div> <!-- 1 -->
      <div class="dw-pnl"></div> <!-- 5 -->
    </div>
    <div class="dw-clstr__sgmnt dw-clstr__sgmnt--clmn ">
      <div class="dw-pnl"></div> <!-- 2 -->
      <div class="dw-pnl"></div> <!-- 6 -->
    </div>
    <div class="dw-clstr__sgmnt dw-clstr__sgmnt--clmn ">
      <div class="dw-pnl"></div> <!-- 3 -->
    </div>
    <div class="dw-clstr__sgmnt dw-clstr__sgmnt--clmn ">
      <div class="dw-pnl"></div> <!-- 4 -->
    </div>
  </div>
</div>
```

We can then control what is seen with some simple CSS theming like;

```css
@media (min-width: 768px) {
  .dw--mobile {
    display: none;
  }
}
.dw--desktop {
  display: none;
}
@media (min-width: 768px) {
  .dw--desktop {
    display: block;
  }
}

```
This isn't ideal but __will__ work. If someone has a better solution _please_ submit a PR! :smile:

## contributing
Don't hesitate to post and issue, PR or suggestion. Alternatively, get in touch via email or by tweeting me [@_jh3y](https://twitter.com/@_jh3y)!

## license
__MIT__

@[jh3y](https://twitter.com/@_jh3y) 2016

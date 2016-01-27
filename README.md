# driveway
pure CSS masonry layout aid

__NOTE:__ driveway is currently a work in progress.

It is developed using `gulp`, `stylus` and `jade`.

## just give me it
If you just want a copy of `driveway` identical to what was used in the blog post I wrote about pure CSS masonry layouts fit with vendor prefixing. You'll be best served looking in the `dist` folder for `driveway.blog.css`.

## developing
### prerequisites
In order to run the source, both __[node]__ and __[gulp]__ are required.

1. Clone the repo.

        git clone https://github.com/jh3y/driveway.git

2. Navigate into the repo and install the dependencies.

        cd driveway
        npm install

3. Run `gulp` to take care of preprocessing and running a local static server instance.

        gulp

__NOTE:__ Navigating to the root(`/`) of the server will present you with a randomly generated `dev` style page at the moment whereas `/demo.html` is a controlled development page.

@jh3y 2016

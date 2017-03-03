# Puzzle Animator

With this lib, you can create animations like "GIF Puzzles", using one image and de canvas. The objective is create a simple puzzle animation, but avoiding the big size of GIF images. Based on this incridible game tutorial: [HTML5 Puzzle Game](https://code.tutsplus.com/tutorials/create-an-html5-canvas-tile-swapping-puzzle--active-10747)

## Using

```
...

<body>

    <canvas id="canvas"></canvas> <!-- Canvas to setup the animation -->

    <script src="puzzle-animator.min.js"></script>
    <script>
        puzzleAnimator.init({
            img: '1.jpg',
            canvasId: 'canvas',
            difficulty: 3,
            originalImageFrame: 5,
            maxFrames: 9,
            speed: 150
        });

        document.addEventListener('click', function(){
            puzzleAnimator.toggle();
        })
    </script>

</body>
...

```

## Options
```
{
    img: '1.jpg', // Image file path
    canvasId: 'canvas', // Id of the canvas element
    difficulty: 3, // Defines the quantity of pieces in the puzzle (vertically and horizontally)
    currentFrame: 2 // Optional - The initial frame of the animation. Default: 1
    originalImageFrame: 5, // Optional - The frame that reproduces the original image. Default: 1
    paused: false, // Optional - Defines if the animation is initally paused
    maxFrames: 9, // Max frames of the animation
    speed: 150 // Speed in Ms with the frame stay on the screen (like GIF speed)
}
```

## Methods

Use this methods to control and get information about the animation:

* puzzleAnimator.play() - Play the animation
* puzzleAnimator.stop() - Stop the animation
* puzzleAnimator.toggle() - Toggle among playing and stopped
* puzzleAnimator.getCurrentFrame() - Get the current frame of animation

## Thanks

Thanks by using this lib. Enjoy!! You can create PRs if you want.
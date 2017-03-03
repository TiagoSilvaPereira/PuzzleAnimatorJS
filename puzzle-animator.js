var puzzleAnimator = {

    img: null,
    canvas: null,
    canvasContext: null,
    pieces: [],
    originalPieces: [],
    pieceWidth: 0,
    pieceHeight: 0,
    puzzleWidth: 0,
    puzzleHeight: 0,

    // Animation Control
    currentFrame: 0,
    maxFrames: 0,
    originalImageFrame: 0,
    paused: false,

    init: function(options) {
        this.options = options;
        this.options.speed = options.speed || 100;

        this.currentFrame = options.currentFrame || 0;
        this.maxFrames = options.maxFrames || 1;
        this.originalImageFrame = (options.originalImageFrame) || 1;
        this.paused = options.paused || false;

        this.makeImage();
    },

    makeImage: function() {
        this.img = new Image();
        this.img.addEventListener('load',this.imageLoaded.bind(this),false);
        this.img.src = this.options.img;
    },

    imageLoaded: function() {
        this.pieceWidth = Math.floor(this.img.width / this.options.difficulty)
        this.pieceHeight = Math.floor(this.img.height / this.options.difficulty)
        this.puzzleWidth = this.pieceWidth * this.options.difficulty;
        this.puzzleHeight = this.pieceHeight * this.options.difficulty;
        this.makeCanvas();
        this.initPuzzle();
    },

    makeCanvas: function() {
        this.canvas = document.getElementById(this.options.canvasId);
        this.canvasContext = this.canvas.getContext('2d');
        this.canvas.width = this.puzzleWidth;
        this.canvas.height = this.puzzleHeight;
    },

    initPuzzle: function() {
        this.canvasContext.drawImage(this.img, 0, 0, this.puzzleWidth, this.puzzleHeight, 0, 0, 
                                     this.puzzleWidth, this.puzzleHeight);
        this.buildPuzzlePieces();
    },

    buildPuzzlePieces: function() {
        var piecesQuantity,
            piece,
            xPos = 0,
            yPos = 0;

        for(piecesQuantity = 0; piecesQuantity < this.options.difficulty * this.options.difficulty; piecesQuantity++){
            piece = {};
            piece.sx = xPos;
            piece.sy = yPos;
            
            this.originalPieces.push(piece);

            xPos += this.pieceWidth;
            if(xPos >= this.puzzleWidth){
                xPos = 0;
                yPos += this.pieceHeight;
            }
        }

        // Copy the pieces to another array, because the animation can shuffle the pieces array
        this.pieces = this.originalPieces.slice(0);

        this.setupAnimation();
    },

    drawPieces: function(pieces) {
        var i,
            piece,
            xPos = 0,
            yPos = 0;

        this.canvasContext.clearRect(0,0,this.puzzleWidth,this.puzzleHeight);

        for(i = 0;i < pieces.length; i++){
            piece = pieces[i];
            piece.xPos = xPos;
            piece.yPos = yPos;

             this.canvasContext.drawImage(this.img, piece.sx, piece.sy, this.pieceWidth, this.pieceHeight, 
                                          xPos, yPos, this.pieceWidth, this.pieceHeight);

            xPos += this.pieceWidth;
            if(xPos >= this.puzzleWidth){
                xPos = 0;
                yPos += this.pieceHeight;
            }
        }
    },

    setupAnimation: function() {
        setInterval(function(){
        
            if(!this.paused) {
                this.currentFrame = (this.currentFrame < this.maxFrames) ? this.currentFrame + 1 : 1;

                if(this.currentFrame != this.originalImageFrame){
                    this.shufflePuzzle();
                }else{
                    this.originalPuzzle();
                }
            }

        }.bind(this), this.options.speed);
    },

    originalPuzzle: function() {
        this.drawPieces(this.originalPieces);
    },

    shufflePuzzle: function() {
        this.pieces = this.shuffleArray(this.pieces);
        this.drawPieces(this.pieces);
    },

    shuffleArray: function(pieces){
        for(var random, copy, quantity = pieces.length; quantity; random = parseInt(Math.random() * quantity), 
            copy = pieces[--quantity], pieces[quantity] = pieces[random], pieces[random] = copy);
        return pieces;
    },

    getCurrentFrame: function() {
        return this.currentFrame;
    },

    stop: function() {
        this.paused = true;
    },

    play: function() {
        this.paused = false;
    },

    toggle: function() {
        console.log(this.getCurrentFrame());
        this.paused = !this.paused;
    }

};
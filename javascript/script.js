// Function to display the hello message as a popup alert
function displayHelloMessage() {
    // The message you want to display
    const helloMessage = "Hi! Welcome to @annbanhmi's ASCII Art Generator =)";
    // Display the hello message as a popup alert
    alert(helloMessage);
    }
    // Attach the function to the onload event of the window
    window.onload = displayHelloMessage;

// Function to change instructional text
    function changeText() {
        var h5Element = document.getElementById('changing-text'); // Get the HTML element with the id 'changing-text' and store it in the variable 'h5Element'
        var text = h5Element.textContent; // Get the current text content of the 'h5Element' and store it in the variable 'text'
        
           if (text === "Still don't know how to use it?") { // Check if the text content is "Still don't know how to play?"
           h5Element.textContent = "See the bar at the bottom? Just click anywhere on the bar"; // If true, change the text content of 'h5Element' to "See the 3 images below? Just click whatever you like"
              } else {
                h5Element.textContent = "Still don't know how to use it?"; // If false, change the text content of 'h5Element' back to "Still don't know how to play?"
                    }
         }
        //Function to start the loop of changing text in  5 interval times, every 2s
        function startChangingText() {
         var interval = 2000; // Time interval in milliseconds
          var numIterations = 20; // Number of times to execute the changeText function
        
          for (var i = 0; i < numIterations; i++) { // Iterate 'i' from 0 to 'numIterations' - 1
           setTimeout(changeText, interval * i); // Call the 'changeText' function after a delay of 'interval' multiplied by the current value of 'i' (creating increasing delays)
            }
        }
        
        startChangingText(); // Start the process of changing the text content by calling the 'startChangingText' function
        
    

// Get the canvas element with ID 'canvas1'
const canvas = document.getElementById('canvas1');

// Get the 2D rendering context of the canvas
const ctx = canvas.getContext('2d');

// Create a new Image object
const image1 = new Image();

// Set the source of the image to 'img/ann.png'
image1.src = 'img/ann.png';

// Add an event listener to execute a function once the image is loaded
image1.addEventListener('load', function() {
    // Get the canvas element with ID 'canvas1' again (redundant)
    const canvas = document.getElementById('canvas1');

    // Get the 2D rendering context of the canvas again (redundant)
    const ctx = canvas.getContext('2d');

    // Set the width and height of the canvas to 600 pixels
    canvas.width = 600;
    canvas.height = 600;

    // Draw the loaded image on the canvas (scales to fit the canvas)
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);

    // Get the pixel data from the canvas
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(pixels);

    // Get the 'resolution' input element from the DOM
    const inputSlider = document.getElementById('resolution');

    // Get the label element with ID 'resolutionLabel'
    const inputLabel = document.getElementById('resolutionLabel');

    // Initialize the cell size with the value from the 'resolution' input
    let cellSize = parseInt(inputSlider.value);

    // Initialize arrays to store cell information and symbols
    let imageCellArray = [];
    let symbols = [];

    // Set the font color to white and the font size using the cell size
    ctx.fillStyle = 'white';
    ctx.font = cellSize + 'px Verdana';

    // Define a class for individual cells
    class Cell {
        constructor(x, y, symbol, color) {
            this.x = x;
            this.y = y;
            this.symbol = symbol;
            this.color = color;
        }

        // Method to draw the cell with the specified symbol and color
        draw() {
            ctx.fillStyle = 'white';
            ctx.fillText(this.symbol, this.x + 1, this.y + 1);
            ctx.fillStyle = this.color;
            ctx.fillText(this.symbol, this.x, this.y);
        }
    }

    // Function to convert grayscale intensity to corresponding ASCII symbols
    function convertToSymbol(g) {
        // Assign ASCII symbols based on the grayscale intensity 'g'
        // The function takes a grayscale intensity value as input and returns an ASCII symbol
        if (g > 250) return '@'; // If the intensity is greater than 250, return '@'
        else if (g > 240) return '*'; // If the intensity is between 240 and 250, return '*'
        else if (g > 220) return '+'; // If the intensity is between 220 and 240, return '+'
        else if (g > 200) return '#'; // If the intensity is between 200 and 220, return '#'
        else if (g > 180) return '&'; // If the intensity is between 180 and 200, return '&'
        else if (g > 160) return '%'; // If the intensity is between 160 and 180, return '%'
        else if (g > 140) return '_'; // If the intensity is between 140 and 160, return '_'
        else if (g > 120) return ':'; // If the intensity is between 120 and 140, return ':'
        else if (g > 100) return '£'; // If the intensity is between 100 and 120, return '£'
        else if (g > 80) return '/'; // If the intensity is between 80 and 100, return '/'
        else if (g > 60) return '-'; // If the intensity is between 60 and 80, return '-'
        else if (g > 40) return 'X'; // If the intensity is between 40 and 60, return 'X'
        else if (g > 20) return 'W'; // If the intensity is between 20 and 40, return 'W'
        else return ''; // If the intensity is less than or equal to 20, return an empty string ''
    }

    // Function to scan the image and create an array of cells
    function scanImage() {
        // Update the cell size and font size using the input value
        cellSize = parseInt(inputSlider.value);
        ctx.font = cellSize + 'px Verdana';

        // Clear the previous imageCellArray
        imageCellArray = [];

        // Loop through the pixel data vertically, incrementing y by 'cellSize' each iteration
        for (let y = 0; y < pixels.height; y += cellSize) {
            // Loop through the pixel data horizontally, incrementing x by 'cellSize' each iteration
            for (let x = 0; x < pixels.width; x += cellSize) {
                // Calculate the position in the pixel data for the current (x, y) coordinates
                // Each pixel in the pixel data is represented by four values: red, green, blue, and alpha (transparency)
                // posX is the horizontal position (x-coordinate) of the current pixel in the pixel data array
                // posY is the vertical position (y-coordinate) of the current pixel in the pixel data array
                // Since each pixel occupies four values (RGBA) in the data array, we multiply x and y by 4 to get the correct position
                const posX = x * 4;
                const posY = y * 4;

                // Calculate the overall position in the pixel data array for the current (x, y) coordinates
                // The 'pos' variable represents the index of the starting position of the current pixel in the data array
                // The formula 'posY * pixels.width + posX' calculates the correct index position in the one-dimensional data array
                // 'pixels.width' represents the width of the image in pixels, and 'posX' and 'posY' are the calculated positions
                const pos = (posY * pixels.width) + posX;

                // Check if the pixel's alpha channel is above 128 (semi-transparent)
                if (pixels.data[pos + 3] > 128) {
                    // Extract the red, green, and blue values of the pixel from the pixel data
                    const red = pixels.data[pos];
                    const green = pixels.data[pos + 1];
                    const blue = pixels.data[pos + 2];

                    // Calculate the total color value by summing the red, green, and blue values
                    const total = red + green + blue;

                    // Calculate the average color value by dividing the total by 3
                    const averageColorValue = total / 3;

                    // Convert the average grayscale value to a corresponding ASCII symbol
                    const symbol = convertToSymbol(averageColorValue);

                    // Create the color string in 'rgb(r, g, b)' format
                    const color = "rgb(" + red + "," + green + "," + blue + ")";

                    // Push a new Cell object into the imageCellArray
                    if (total > 200) imageCellArray.push(new Cell(x, y, symbol, color));

                    // Push the symbol into the symbols array
                    symbols.push(symbol);
                }
            }
        }
    }

    // Call the scanImage function to process the image
    scanImage();

    // Function to draw the ASCII representation of the image on the canvas
    function drawAscii() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw each cell from the imageCellArray
        for (let i = 0; i < imageCellArray.length; i++) {
            imageCellArray[i].draw();
        }
    }

    // Call the drawAscii function to display the ASCII image on the canvas
    drawAscii();

    // Function to handle changes in the slider value (resolution)
    function handleSlider() {
        // Log the current slider value to the console
        console.log(inputSlider.value);

        // Check if the slider value is 1 (original image)
        if (inputSlider.value == 1) {
            // Update the inputLabel text
            inputLabel.innerHTML = 'Original image';

            // Draw the original image on the canvas
            ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
        } else {
            // Update the inputLabel text with the current resolution value
            inputLabel.innerHTML = 'Resolution: ' + inputSlider.value + ' px';

            // Re-scan the image and draw the ASCII representation
            scanImage();
            drawAscii();
        }
    }

    // Call the handleSlider function to initialize the display
    handleSlider();

    // Add an event listener to the slider for changes in value
    inputSlider.addEventListener('change', handleSlider);
});


   



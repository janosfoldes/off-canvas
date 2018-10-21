# @janosfoldes/off-canvas

JavaScript/CSS component for responsive off-canvas navigation menus and sidebars.

## Install

`npm i -D git+https://github.com/janosfoldes/off-canvas.git`

## Dependencies

1. [jQuery](https://jquery.com/)

## Usage

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Off-canvas Example</title>
    <link href="off-canvas.min.css" rel="stylesheet" type="text/css">
</head>

<body>
    <div class="off-canvas right" data-off-canvas data-off-canvas-button="button-oc-right">
        Navigation Menu
    </div>
    <div class="canvas">
        <div class="content">
            <h1>Off-canvas Example</h1>
            <button type="button" id="button-oc-right">Toggle off-canvas</button>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="off-canvas.min.js"></script>
</body>
</html>
```

## Requirements

1. Install [Node.js](https://nodejs.org/en/)
2. Install Gulp and Gulp CLI: `npm i -g gulp gulp-cli`

## Run the examples

1. `gulp examples`

## Build

1. `npm i`
2. `gulp build`

Builded component folder: **dist/**

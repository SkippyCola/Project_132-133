Status = "";
img = "";
objects = [];


function preload()
{
    img = loadImage("Watch.png");
}
function setup()
{
    canvas = createCanvas(640,420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("The model has Loaded");
    Status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}

function draw()
{
    image(img, 0,0,640,420);

    if (Status != "")
    {
        for( i = 0; i < objects.length; i ++)
        {
            document.getElementById("status").innerHTML = "Status : There is one object in the image and it is identified";

            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "% ", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}


function back()
{
    window.location.replace("index.html");
}


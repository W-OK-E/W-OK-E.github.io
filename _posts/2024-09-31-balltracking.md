---
layout: post
title: Track me if you can!
date: 2024-09-31 18:00:00
description: Simple Ball Tracking using hsv
tags: Computer Vision, OpenCV
categories: Posts
chart:
  plotly: true
---
How hard is it for you to keep track of the tennis ball when Federer and Nadal are up against each other? Quite easy, no? Barring of course, the torture that your neck has to undergo. 

<video width="640" height="360" autoplay loop muted controls>
  <source src="giphy.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

But then, I thought to myself, how hard could this be for a machine? And how would they exactly go about achieving the task? So we will be taking up this seemingly simple task today -  to detect or track a volleyball and find the number of players in a volleyball match, but using Computer Vision! 

Getting the Ball in your Court

To begin with, let us first look at how do computers process image data. So an image for Computers is nothing but a set of numbers in a matrix, which essentially represent pixel values. So for instance this....







Source

is a visual depiction of how your lappy looks at the number '8'. Each tiny value that you see represents how bright or dark that particular pixel is...and here the values range from 0(black) -255(white), now similarly for color images, we can have three values(RGB or HSV, depending upon what color model you choose) and so on.



But here we are tasked with tracking a ball in a video right? So why talk about images? Well, what is a video if not a bunch of images being displayed in quick succession? Hell, I even used to think that there's someone sitting behind the T.V. screen doing all the flipping for us, good to know I was kinda right ;) So now, the rate at which these images are being flashed across the screen is determined by something called "fps" i.e. Frames Per Second, which basically decides how many "frames" or "pictures" do we flash to create an illusion of motion. 



Now, the Human eye can be fooled at about 10-12 fps,  hence most of the videos that we see out there are 25 fps(not to confuse with terms like 720p or 1080p which measure the number of pixels that there are in each frame) while movie cameras can shoot at about 40 fps. So yeah, a video is essentially a bunch of images being flashed across the screen so quickly, that the human eye is fooled and perceives it as a video.



And that's how we are proceeding with the given task. We are reading the video frame by frame, doing a bunch of operations on them, and figuring out where the ball is in that frame. We do that for all the frames and viola! We track the ball successfully. Now of course, there are "tracking algorithms" that can predict the position of the ball in the next frame and track it, but let's keep that for a future post shall we.



The Ball's story before it is tracked

So for this we have chosen quite an interesting video, have a look:











source: author

Now, you see the interesting or rather the tricky thing here is that not only is the Ball yellow in color, the Brazilian players too are in yellows, which means simply applying color filtering won't cut it.

Gaussian Blurring

Why do we need to Blur the frames? Well, when we think of blurring, we mostly think of the loss of detail and information. But sometimes, too much detail is harmful too. Here in this case, where the algorithm is looking for a ball, the sharp detail of the players, or the court can often confuse and mess with the distinction. Hence blurring the image helps reduce the details and makes it easier to detect the object/region of interest.

But what on earth is "Gaussian Blurring" then? 



So it starts by choosing a matrix or in fancy jargon - a "Kernel" with odd but equal number of rows & columns, with each value in the kernel being a 'weight'. So to think about it, the size needs to be odd because we need a central value in the kernel, and it is not possible to have one with a kernel of even size. Now each value in white that you see in each box are the 'weights' associated with it or the emphasis that the pixel value in that box will be given.

Hence when our kernel is in the top left corner of the image, the value that the central pixel of the resultant image takes in the blurred image is a weighted average of all the pixels that the Kernel covers, and this weighted average is put in place of the central pixel, that is why we need to have a square matrix with odd shape and a central value. Pheww...so much Jargon !!



Look at it through a different lens!

Alright, there's one detail that is really crucial here. There is a catch here to the way we are reading the frames from the videos. We briefly mentioned the RGB color model above right, it is the most common kind of color model that is used for images that you see, so we mix various intensities of three base colors - Red, Green and Blue to obtain a subset of the colors in the visible spectrum. Yeah you read it right, it's impossible to obtain all the colors using certain RGB models(there are variations there too, but we won't go there)







 

Now the catch here is that, after we have read the frame from the video, we convert it from RGB to HSV(more on it soon). But the reason for switching to HSV is not the limitations faced by RGB in representing every color in the spectrum, rather it is in the way the RGB model responds to variations.











HSV or Hue, Saturation, Value is has three parameters or numbers, just like RGB but they have different characteristics. Hue for instance, handles the color part and ranges from 0 to 360 degrees. So for instance shades of Red fall between 0 and 60 degrees, yellow from 61-120 degrees and so on.

Saturation talks about the "amount of gray" or "amount of color" in the image. And ranges from 0-100 percent, where 0 means more gray, and towards 100 means more of the color.

Value handles the brightness/luminosity of the image and just as it's brother Saturation, ranges from 0-100 percent. 



Now the reason why we are going with HSV over RGB or some other color model for the purpose is that there are very less variations from color to color in the HSV range than in RGB. To think of it, two shades of red will be closer in the HSV color model than in RGB. So imagine if in our video, the ball comes under a light source and is brighter than usual for a moment, if our image is in HSV, the range that we have asked the computer to look for won't change much, as the two shades are closer on the HSV scale, but at the same time, if the model used were RGB, the resultant change will be significant and our pre-defined range could be rendered useless.







                                                     The HSV color model [source] 



As they say: Look at what's relevant

So we define a range of color values that the machine needs to look for, what is left now is actually looking for the values. That's easy peasy lemon squeezy! We just check whether the pixels that we are looking at, fall into the range that we defined earlier. If yes, then we replace those pixels with 255(white) or else we replace them with 0(black), so for instance, when looking for the Brazilian men in yellow in a particular frame, the "relevant look" would be something like this:













Now obviously the outlining is nowhere close to perfect, but we only care about the overall picture here, which is more than enough to track the tiny dot in the left corner and count the number of players.



Bustin' the Ball

Notice in the above binary image, we have several white blobs. How do you say which is the ball and which are the players? We would mostly make intuitive guesses here as to what their identity is, but that's where it's methodical and little easier although not definite, for a machine.

We take the binary image and calculate something called contours. Contours are pretty simple, generally they are just continuous lines that connect points with the same elevation. Here in our context, these are lines that connect all the continuous points along a boundary with the same intensity. 

How does that help you ask? Well, post contour drawing, there are two ways that I have used them:





Whatever the contour, we estimate the circle with the smallest radius that can be drawn around that, then if the radius is in a certain range, we classify them as players or else as the ball. So as expected, most of the time the circles drawn around the player contours are larger than those drawn around the ball's contours.




Alright the first method works fine, but there was something else too which I found helpful. Drawing bounding circles around the contours is fine, but what if we can extrapolate the shape of the object just from it's contours? It would work like magic no? Since the ball is round, and the players are all zigggy-zaggy, once we are able to figure out the exact shape of the contours, it would be cake-walk to distinguish them.



In the end, I applied a mixture of both the above techniques, so I confirmed that the radius of the bounding circle around a contour lay in a certain range, and also that the contours roughly represent the ball, and that is how ladies and gentlemen we manage to track the infamous illusive ball:









 source: author

PS: The methodology used here is really basic, and the results are borderline satisfactory, I'm all ears for better ideas. Feel free to connect and collaborate! 


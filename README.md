# Face Recognition

---

## Configuration

<b>1. Add the model for your face</b>
	1. create a folder, `picsREF` and populate it with as many images as you want of yourself in appropriate lighting and eyes looking at the camera.
	2. rename all the images to follow this name convention:
			```
			img0.jpg
			img1.jpg
			img2.jpg
			...
			```
	3. create a folder called `desscriptors`.
	4. just run the `createDescriptors` function with model name as an argument.

<b>2. Setup the Video feed</b>
	1. install [IP Webcam](https://play.google.com/store/apps/details?id=com.pas.webcam).
	2. start the server.
	3. configure it, in the panel, to be portrait.
	4. put the photo url in the `run` function as an argument.

<b>3. Start the Recognition</b>
	1. run the program with `node index.js`.
	2. the time taken for the detection and the result will be shown in the console.
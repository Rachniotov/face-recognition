require("@tensorflow/tfjs-node");
const { NodeJSKernelBackend } = require("@tensorflow/tfjs-node/dist/nodejs_kernel_backend");
const face = require("@vladmandic/face-api");
const canvas  = require("canvas");
const fs = require("fs");

const { Canvas, Image, ImageData } = canvas;
face.env.monkeyPatch({ Canvas, Image, ImageData });

face.nets.ssdMobilenetv1.loadFromDisk("./weights");
face.nets.faceRecognitionNet.loadFromDisk("./weights");
face.nets.faceLandmark68Net.loadFromDisk("./weights");

const options = new face.SsdMobilenetv1Options({minConfidence: 0.1, maxResults: 1});

const parseDescriptors = (name) => {
	let descriptor = fs.readFileSync(`${__dirname}/descriptors/${name}.json`);
	descriptor = JSON.parse(descriptor);
	descriptor = descriptor[0];

	let finalDesc = [];
	for (let i = 0; i < descriptor.length; i++) {
		finalDesc.push(new Float32Array(Object.values(descriptor[i])));
	}
	// console.log(finalDesc);

	return finalDesc;
}
let rachitDesc = parseDescriptors('rachit');


let run = async (url) => {
	// const reference = await face
	// .detectAllFaces(await canvas.loadImage(`${__dirname}/pics/newasts.jpg`), options)
	// .withFaceLandmarks()
	// .withFaceDescriptors();
	
	console.time("detected");
	const real = await face
	.detectSingleFace(await canvas.loadImage(url), options)
	.withFaceLandmarks()
	.withFaceDescriptor();
	console.timeEnd("detected");
	
	
	if(real) {
		const matcher = new face.FaceMatcher(new face.LabeledFaceDescriptors('MEEE', rachitDesc));

		const result = matcher.findBestMatch(real.descriptor);
		console.log(result);
	}
}

setInterval(() => run('http://192.168.29.87:8080/photo.jpg'), 3000);

let createDescriptors = async (filename) => {
	let arr = [];

	for (let i = 0; i < 17; i++) {
		const path = `${__dirname}/picsREF/img${i}.jpg`;
		
		const thing = await face
		.detectSingleFace(await canvas.loadImage(path), options)
		.withFaceLandmarks()
		.withFaceDescriptor();
		
		if (thing) {
			console.log(`here ${i}`);
			arr.push(thing.descriptor);
		}
	}
	let obj = {0: arr};

	fs.writeFileSync(`${__dirname}/descriptors/${filename}.json`, JSON.stringify(obj));
}
// createDescriptors('rachit')

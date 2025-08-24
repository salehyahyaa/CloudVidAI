import express from "express";
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, uploadProcessedVideo } from "./storage";


const app = express();

//Get the bucket and file name from the cloud pub/sub message
app.post("/process-video", async (req, res) => {
    let data;
    try {
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
        data = JSON.parse(message);
        if (!data.name) {
            throw new Error('Invalid method payload recieved.');
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send('Bad request: Missing file name.');
    }
    const inputFileName = data.name;
    const outputFileName = `processed-${inputFileName}`;

    //Download the raw video from Cloud Storage
    await downloadRawVideo(inputFileName);
    
    //convert video to 720p 
    try {
        await convertVideo(inputFileName, outputFileName);
    } catch {
        Promise.all([
            deleteRawVideo(inputFileName),
            deleteProcessedVideo(outputFileName)
        ]);
        return res.status(500).send(`Internal Server Error: video processing failed.`);
    }

    //Upload the processed video to Cloud Storage
    await uploadProcessedVideo(outputFileName);

    await Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
    ])
    return res.status(200).send(`Process finished successfully.`);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(
        `Video processing service listening at http://localhost:${port}`);
})

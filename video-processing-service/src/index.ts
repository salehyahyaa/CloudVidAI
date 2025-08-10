// ======================================================== Imports ==================
import { LogOutput } from "concurrently";
import express from "express";
import ffmpeg from "fluent-ffmpeg"; /*CLI tool */
//========================================================= Config Starting ==================
const app = express()
const port = 3000;
//========================================================= API Routes ==================
app.get ("/process-video", (req, res) => { 
    const inputFilePath = req.body.inputFilePath
    const outputFilePath = req.body.outputFilePathx

    const missing: string[] = [];            //=========================Took an extra step so we specify to the client whitch FilePath is missing
    if (!inputFilePath) missing.push("inputFilePath")
    if (!outputFilePath) missing.push("outputFilePath")
    
    if (missing.length) {                     
        return res.status(400).json({          
            success: false,
            message: `Missing required field(s): ${missing.join(", ")}`
        });
    }
        return res.status(202).json({
        success: true,
        message: "Processing accepted",
        });                                   //=========================Took an extra step so we specify to the client whitch FilePath is missing

        ffmpeg(inputFilePath)
        .outputOptions('-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2') //720p /*forceOrginalAspect... is just a force command to make sure there is no distortion*/
        .on()
    });
//========================================================= Server Starting ==================
app.listen(port, () => { /*this API endpoint allows us to start our sever on our locally hosted comptuter*/   /*() is a callback function*/
    console.log(`Video processing service listening at https://localhost:${port}`);
});
//========================================================= Video Processing ==================

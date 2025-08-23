// ======================================================== Imports ========================================================================
import express from "express";
import ffmpeg from "fluent-ffmpeg"; /*CLI tool */
//========================================================= Config Starting ========================================================================
const app = express()
app.use(express.json()) /*this is the middleware code, choosing JSON as your data format*/
//========================================================= API Routes ==========================================================================================
app.post ("/process-video", (req, res) => { 
    const inputFilePath = req.body.inputFilePath
    const outputFilePath = req.body.outputFilePath

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad Request: Missing file path.");
    }

});
//========================================================= Server Starting ============================================================================================================
const port = process.env.PORT || 3000; /*this is a standard norm to providfe the port at runtime*/
app.listen(port, () => { /*this API endpoint allows us to start our sever on our locally hosted comptuter*/   /*() is a callback function*/
    console.log(`Video processing service listening at http://localhost:${port}`);
});
//========================================================= Video Processing ==========================================================================================

//this will handel all of the GCS(google cloud stroage)  interactions 
//Keep track of all the local file interactions 
//think of this as the stroage layer file
//===================================================================================================================================================
import { Storage } from "@google-cloud/storage";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

const storage = new Storage() /*Creating an instance of storage so we can interact with that API*/
const  rawVideoBucketName = "sy-raw-videos" /*Downlaod from this bucket*/ 
const processedVideoBucketName = "sy-processed-videos" /*Upload to this bucke*/

const localRawVideoPath = "./sy-raw-videos" /*the downloaded raw video uplaods will be placed within this folder*/
const localProcessedVideoPath = "./sy-processed-videos" /*the processed vidoes will be placed within this folder*/


export function setupDirectories() { /*Creates the local dependencies for raw AND processed videos */
}


/** this is the conversion code, hence where we take the raw video and process it to the video 720p video quality
* @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}
* @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}
* @returns A promise that resolves when the video has been converted.
*/
export function convertVideo(rawVideoName: string, processedVideoName: string) { /*this function is what changes the video quality to 720p*/ 
    return new Promise<void>((resolve, reject) => { /*wrapping ffmpeg into a promise so we let the clinet know whats going on whikle ffmeg is asyncing*/ 
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
        .outputOptions('-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2') //720p /*forceOrginalAspect... is just a force command to make sure there is no distortion*/
        .on("end", () => { /*async event listener */
        console.log("Processing finished successfully.");
        resolve();
    })
        .on("error", (err) => {
        console.log(`An error occured: ${err.message}`);
    })
        .save(`${localProcessedVideoPath}/${processedVideoName}`); /*Save the output file and specifing the path*/
    })

}


/** 
* @param fileName - The name of the file to download from the 
* {@link rawVideoBucketName} bucket into the {@link localProcessedVideoPath} folder
* @returns A promise that resolves when the video has been converted.
*/
export async function downlocalRawVideo(fileName: string) {
    await storage.bucket(rawVideoBucketName) /*await blocks any console.log() code from running until rawVideoBucketName is stored within bucket */ 
        .file(fileName) /*once reacived file */
        .download({ destination: `${localRawVideoPath}/${fileName}` }); /*add it to this bucket */

    console.log(
        `gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}} ` /*gs == GoogleStorage*/
    )
}


/** 
* @param fileName - The name of the file to download from the 
* {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName}
* @returns A promise that resolves when the video has been uploaded.
*/
export async function uploadProcessedVideo(fileName: string) {
    const bucket = storage.bucket(processedVideoBucketName);

    await bucket.upload(`${localProcessedVideoPath}/${fileName}`, {
        destination: fileName
    });
    console.log(
        `${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}.`
        );

    await bucket.file(fileName).makePublic();    
}


/** 
* @param filePath - The path of the file too delete 
* @returns A promise that resolves when the file has been deleted.
*/
function deleteFile(filePath: string): Promise<void> { 
    return new Promise ((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
            reject(`File ${filePath} does not exist.`)
        }
    });
} 


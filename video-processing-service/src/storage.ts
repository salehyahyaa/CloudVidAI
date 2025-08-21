//this will handel all of the GCS(google cloud stroage)  interactions 
//Keep track of all the local file interactions 
//think of this as the stroage layer file
//===================================================================================================================================================
import { Storage } from "@google-cloud/storage";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";


export function setupDirectories() { /*Creates the local dependencies for raw AND processed videos */
}

/** this is the conversion code, hence where we take the raw video and process it to the video 720p video quality
 * * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}
* @param processedVideoname - The name of the file to convert to {@link localProcessedVideoPath}
* @returns A promise that resolves when the video has been converted.
*/

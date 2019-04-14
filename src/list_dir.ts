const fs = require('fs');
const path = require('path')
import { File } from "./models/model";

export async function listDir(queryPath: string) {
    return new Promise((resolve, reject) => {
        try {
            console.log(queryPath);
            const dirPath = queryPath;
            fs.readdir(dirPath, async function (err: any, files: any) {
                if (err) {
                    reject(err)
                } else {
                    let fileArr = await Promise.all(files.map(file => processFile(dirPath, file)))
                    resolve(fileArr)
                }
            });
        }
        catch (e) {
            reject(e)
        }
    })
}

function processFile(dirPath: any, file: any): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.stat(path.join(dirPath, file), (err, stats) => {
            if (err) reject(err)
            let fileObj: File;
            if (stats.isDirectory()) {
                fileObj = {
                    type: "Folder",
                    name: file,
                    size: 0,
                    parentPath: dirPath
                }
            }
            else {
                fileObj = {
                    type: "File",
                    name: file,
                    size: stats.size,
                    parentPath: dirPath
                }
            }
            resolve(fileObj)
        })
    })
}

    // console.log(fs.statSync(file).isDirectory());








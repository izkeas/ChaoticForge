import { fileURLToPath } from 'url'
import Path from "path"

export default function getDirName(url : string){
    return Path.dirname(fileURLToPath(url))
}
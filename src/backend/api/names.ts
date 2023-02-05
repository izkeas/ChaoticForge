import { ServerData } from "../../ServerData.js"
import { Request, Response } from "express"

export default function GetNameGenerators(req : Request, res : Response){

    if ( req.method == "GET"){

        const names = ServerData.nameGenerators;

        res.status(200).json({
            result : "SUCCESS!!", nameGenerators : Array.from(names.keys())
        })
    }

    else {
        res.status(400).json({
            result : "Invalid method!"
        });
    }
}
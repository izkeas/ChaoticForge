import { Request, Response} from "express"
import { ServerData } from "../../../ServerData"

export default function CreateNames(req : Request, res : Response){

    if ( req.method === "POST"){

        if ( req.body && typeof req.body.nameGenerator === "string"){
            const nameGenerator = ServerData.nameGenerators.get(req.body.nameGenerator);
            const gender = typeof req.body.gender == "string" ? req.body.gender : "neuter";

            let names = [];

            if (gender === "neuter"){
                names = nameGenerator.neuter.generate(100);
            }
            else if (gender === "male"){
                names = nameGenerator.male.generate(100);
            }
            else if (gender === "female"){
                names = nameGenerator.female.generate(100);
            }

            res.status(202).json({result : "SUCCESS", names : names});
        }
        else{
            res.status(202).json({result : "nameGenerator body parameter required!"});
        }

    }
    else {
        res.status(400).json({result : "Invalid Method!"});
    }
}
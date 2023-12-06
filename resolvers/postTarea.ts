import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { TareaModel, TareaModelType } from "../db/tarea.ts";

export const postTarea = async(req:Request<TareaModelType>, res:Response<string | {error:unknown}>) => {
    try{  const { name, estado} = req.body;
        const newtarea = new TareaModel({name, estado});
        await newtarea.save();

        res.status(201).send("Tarea creada");
    }    catch(error){
        res.status(500).send(error)
    }
}
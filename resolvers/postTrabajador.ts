import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { TrabajadorModel, TrabajadorModelType } from "../db/trabajador.ts";

export const postTrabajador = async(req:Request<TrabajadorModelType>, res:Response<string | {error:unknown}>) => {
    try{   
    const {email, name, telefono, dni} = req.body;
        const newtrabajador = new TrabajadorModel({email, name, telefono, dni});
        await newtrabajador.save();

        res.status(201).send("Trabajador creado");
    }
    catch(error){
        res.status(500).send(error)
    }
}
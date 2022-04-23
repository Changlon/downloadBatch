import request from "../api" 
import { cache,expire } from "../api" 

export const test = async ()=> request({route:"/test",cache,expire})  


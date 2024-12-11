import { ContentModel } from "../db";
import {Router,json,Request,Response} from 'express';
const contentRouter = Router();

contentRouter.use(json());

contentRouter.post('/add', async (req:Request, res:Response) => {
    
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        link,
        type,
        title:req.body.title,
        userId:req.userId,
        tags:[]
    })

    res.json({
        message: "Content added succesfully"
    })
})


contentRouter.get("/view", async (req:Request, res:Response) =>{
    const data = await ContentModel.find({
        userId:req.userId
    }).populate("userId", "username");

    res.json({
        data
    })

})

contentRouter.delete("/delete", async (req:Request, res:Response) =>{
    const userId = req.userId;
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId
    })

    res.json({
        message: "Deleted content"
    })
})

export default contentRouter;
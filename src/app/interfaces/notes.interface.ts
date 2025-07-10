import { Types } from "mongoose";

export interface INotes {
    title: string,
    content: string,
    category: string,
    pinned: boolean,
    tags: object,
    user: Types.ObjectId

}
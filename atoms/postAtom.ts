import {atom} from "recoil"

const post : Post = {} as Post
export const postIdState = atom({
    key: "postIdState",
    default: post
})
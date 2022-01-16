import { atom } from "recoil"

// to store the playlist
export const playlistState = atom({
    key: 'playlistState',
    default: null
})

// to store the playlistId
export const playlistIdState = atom({
    // this is the initial state
    // key here is unique for each atom 
    key: "playlistIdState",
    default: "3idZjz51OjIu4gvU4uORmR"
})  
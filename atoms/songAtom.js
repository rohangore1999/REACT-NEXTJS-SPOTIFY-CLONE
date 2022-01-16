import { atom } from 'recoil'

// it will have the id of current playing song
export const currentTrackIdState = atom({
    key:"currentTrackIdState", // unique id (with respect to other atoms/selectors)
    default: null //initial value is null
})

// it will have the current playing song
export const isPlayingState = atom({
    key:'isPlayingState',
    default: false //initial value is false
})
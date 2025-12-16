import { Assets } from "pixi.js";
import appTextures, {allTexturesKeys} from "./textures.js";


Object.entries(appTextures).forEach(([key, val]) => {
    Assets.add(key, val)
});

const textures = new Map();

export const loadAssets = (onProgress) => {
    const keys = Object.entries(allTexturesKeys).map(([key, val]) => val)
    Assets.load([...keys], onProgress).then((data) => {
        Object.entries(data).forEach(([key, val]) => {
            textures.set(key, val)
        })
        onProgress('all')
    })
};

export const getTexture = (id) => {
    if (textures.has(id) ) {
        return textures.get(id)
    }
    return null
};
import { ALL_VIDEOS, SEARCH_PRODUCTS } from '../constants/actionTypes'

export default (videos = [], action) => {
    switch (action.type) {
        case ALL_VIDEOS:
            return action.videos;
        // case CREATE:
        //     return [...videos, action.payload];
        // case UPDATE:
        //     return videos.map((post) => (post._id === action.payload._id ? action.payload : post));
        // case DELETE:
        //     return videos.filter((post) => post._id !== action.payload);
        default:
            return videos;
    }
};


import Category from "../pages/Category/Category";
import DetailList from "../pages/DetailList/DetailList";
import Home from "../pages/Home/Home";
import NewMusic from "../pages/NewMusic/NewMusic";
import News from "../pages/News/News";
import Top100 from "../pages/Top100/Top100";
import Trending from "../pages/Trending/Trending";
import Video from "../pages/Video/Video";

export const publicRoutes = [
    {
        path: '/', component: Home
    },
    {
        path: '/trending', component: Trending
    },
    {
        path: '/top100', component: Top100
    },
    {
        path: '/category', component: Category
    },
    {
        path: '/newmusic', component: NewMusic
    },
    {
        path: '/video', component: Video
    },
    {
        path: '/news', component: News
    },
    {
        path: '/album/:title/:id', component: DetailList
    },
]

import { useEffect, useState } from "react"
import Article from "./Article"
import { Post } from "../lib/types/Post.types"
import { Link, useLocation } from "react-router-dom"

export default function SinglePost(){
    const location = useLocation();
    const slug = location.pathname.split('/')[2]
    const [post, setPost] = useState<Post>()
    
    useEffect(() => {
        
        const getPost = async () => {
            const res = await fetch('http://localhost:4000/api/post/' + slug)
            const result = await res.json()
            if(result.error){
                window.location.href = '/404'
            } else {
                setPost(result)
            }
        }
        getPost()
    }, [slug])
    return (<div>
        <Link className="mb-6" to="/">back HOME</Link>
        {post &&  <Article post={post} />}
       
    </div>)
}
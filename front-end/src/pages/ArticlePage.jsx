
import { useParams, useLoaderData } from "react-router-dom";
import articles from '../article-content';
import CommentsList from "../CommentsList";
import Axios from 'axios';

export default function ArticlePage() {
    const { name } = useParams();
    const { upvotes, comments } = useLoaderData();

    const article = articles.find(a => a.name === name);

    return(
        <>
        <h1>{article.title}</h1>
        <button>Upvote</button>
        <p>This article has {upvotes} Upvotes! </p>
        {article.content.map(p => <p key={p}>{p}</p>)}
        <CommentsList comments={comments} />
        </>
        
    );
}

export async function loader({ params }) {
          const response = await Axios.get(`/api/articles/${params.name}`);
          const { upvotes, comments } = response.data;
          if (response.status !== 200) {
            throw new Response('Article not found', { status: 404 });
          }
          return { upvotes, comments };
 }
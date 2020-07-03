import React, { useState,useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import Posts from '../src/components/Posts'
import Pagination from "./components/Pagination";

 const App=()=>{
     const [posts,setPosts]=useState([]);
     const [loading, setLoading]=useState(false);
     const [currentPage, setCurrentPage]=useState(1);
     const [postsPerPage]=useState(10);

     useEffect(()=>{
        const fetchPosts=async () =>{
            setLoading(true);
            const res=await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
        }
        fetchPosts();
     },[]);
    //  console.log(posts);

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost-postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);

    // change page
    const paginate=(pageNumber)=>setCurrentPage(pageNumber);
     return (
         <div className="container mt-3">
             <h2 className="text-primary mb-3">App Component</h2>
             <Posts posts={currentPosts} loading={loading} />
             <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />

         </div>
     )
 }
 export default App;
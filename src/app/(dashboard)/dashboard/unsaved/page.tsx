'use client'
import PostCard from "@components/dashboard/post-card";
import { PostCreateButton } from "@components/dashboard/post-create-button";
import { Badge } from "@components/ui/badge";
import { Button, buttonVariants } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import db from "@lib/db";
import axios from "axios";
import { CheckCircle2, Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { cache } from "react"


type Post = {
  id: string;
  title: string;
  image: string;
  hasDescription: string;
  hasImage: string;
  published: string;
  createdAt: string;
  updatedAt: string;
};

// const fetchData = async () => {
//   const response = await axios.get("/api/post", {});

//   return response.data;
// };
export default  function DashboardPage() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const localStorageKey = 'posts';
    const savedPostsString = localStorage.getItem(localStorageKey);
    let savedPosts = [];

    if (savedPostsString) {
      try {
        savedPosts = JSON.parse(savedPostsString);
        console.log('Posts loaded from localStorage:', savedPosts);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }

    setPosts(savedPosts);
  }, []); // The empty dependency array ensures that this effect runs only once on component mount


  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Unsaved Posts</h3>
            <p className="text-sm text-muted-foreground">
              your can see your all unsaved posts 
            </p>
          </div>
          {/* <Link href="/edior/1234" className={`${buttonVariants()}`}>
            <Plus className="w-4 h-4 mr-2" />
            new post
          </Link> */}
          <PostCreateButton>new post</PostCreateButton>
        </div>

        <div className="w-full h-20 ">
      

          {posts?.map((post: Post, index: number) => (
            <PostCard
              key={index}
              id={post.id}
              title={post.title}
              image={post.image}
              date={post.updatedAt}
              unsaved={true}
              published=""
            />
          ))}
        </div>
       
      </div>
    </div>
  );
};


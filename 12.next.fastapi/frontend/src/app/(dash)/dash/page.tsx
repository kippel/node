"use client"
import Link from 'next/link';
import { useState, useEffect } from "react";
import axios from "axios";

function DashPage() {

    console.log(localStorage.getItem("token"))
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    useEffect(() => {
        async function fetchPosts() {
            console.log(`${backendUrl}/workouts/red`)
            const token = localStorage.getItem("token");

            const res = await axios.get(`${backendUrl}/workouts/red`,  {
                headers: {
                    Authorization: `Bearer ${token}`, // <-- Muy importante
                 },
            });
            console.log(res.data);
      
        }

        fetchPosts();
    }, [backendUrl]);



    return (
        <div>dash


            <Link href="/lesson">Lesson</Link>
        </div>
    )
};

export default DashPage;
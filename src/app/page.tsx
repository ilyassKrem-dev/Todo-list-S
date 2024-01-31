'use client';

import { useEffect } from "react";


export default function Home() {

  useEffect(() => {
    fetch("/test")
      .then(res => res.json())
        .then(data => console.log(data))
  })

  return (
    <div className="">
      Test
    </div>
  )
}
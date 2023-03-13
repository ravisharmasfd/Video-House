import { useState } from "react"
import {Feed,Sidebar} from "../components/index.js"

export default function Home() {
  const [category, setCategory] = useState("treading");
  return (
    <div className="flex flex-col md:flex-row">
        <Sidebar category={category} setCategory={setCategory}></Sidebar>
        <Feed category={category}></Feed>
    </div>
  )
}

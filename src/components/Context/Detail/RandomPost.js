import React, { useContext } from "react";
import { BlogContext } from "../Context/BlogContext";
import { Link } from "react-router-dom";
import './RandomPost.css'
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";



const RandomPost = () => {
  const { valueOne } = useContext(BlogContext);
  const [blogs] = valueOne;
  const copyofBlog = [...blogs];
  const randomArr = copyofBlog.sort(() => Math.random() - Math.random()).slice(0, 5)
console.log(randomArr)
  return (
    <div className="randomPosts">
        <h3>Other Posts:</h3>
        {randomArr.map((key,index)=>{
            return   <Link
            to={`/detail/${key.id}`}
            state={key}
            key={key.id}
            style={{ textDecoration: "none",color:'black' }}
          ><div  className='randomBoxes'>  
                 <div><img src={key.image} alt={key.image} /></div> 
              <div className='textandComm'><h5>{key.title}</h5>
              <span><AiOutlineHeart/>{key.likes.length}</span>
              <span><FaRegComment />{key.comments.length}</span></div>
              
                
                {/* <p>{key.name}</p>
                <p>{key.useremail}</p> */}
            
            </div></Link>

        })}
      
   
    </div>
  );
};

export default RandomPost;

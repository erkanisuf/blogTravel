import React from 'react'
import {
    FacebookIcon,
    RedditIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";
  
  import {
    FacebookShareButton,
    RedditShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
  import {AiOutlineShareAlt} from 'react-icons/ai'
import './ShareBox.css'
const ShareBox = ({url}) => {
    return (
        <div className='shareIcons'>
            <div style={{alignItems:'center',fontSize:'35px',fontWeight:'0',width:'15px',color:'grey',justifyContent:'center',marginTop:'5px'}} ><AiOutlineShareAlt/></div >
        <div><FacebookShareButton url={url} ><  FacebookIcon size={45} round={true}/></FacebookShareButton></div>
        <div><TwitterShareButton url={url} ><  TwitterIcon size={45} round={true}/></TwitterShareButton></div>
        <div><WhatsappShareButton url={url} ><  WhatsappIcon size={45} round={true}/></WhatsappShareButton></div>
        <div><RedditShareButton url={url} ><  RedditIcon size={45} round={true}/></RedditShareButton></div>
        </div>
    )
}

export default ShareBox

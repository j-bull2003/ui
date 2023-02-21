import React from 'react'

const News = ({newsData}) => {
    return (
        <div className='News_main_section'>
            <div className="news_header_section">
                <h1>News</h1>
                <div className="white_space">
                    {/* <img src={`${newsData?.link}/image/large.png`}/>? */}
                </div>
            </div>
            <div className="news_headline_div">
                <h1>{newsData?.title}</h1>
                <div className="headline_paragraph"><p>{newsData?.content}</p></div>
            </div>
        </div>
    )
}

export default News

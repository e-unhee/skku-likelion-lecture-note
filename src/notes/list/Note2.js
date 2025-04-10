import React, { useState } from "react";
import style from "../css/ApiPractice.module.css"

export default function ApiPractice() {
    const [userid, setUserid] = React.useState(1);
    const [username, setUsername] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [error, setError] = React.useState('');
    const [response, setResponse] = React.useState('');

    const handleGetUser = () => {
        console.log(userid);
        console.log(title);
        console.log(content);
        // https://jsonplaceholder.typicode.com/users/1
        fetch('https://jsonplaceholder.typicode.com/users/'+userid).then(
            (res)=>{
                if(!res.ok) throw new Error('No user')
                return res.json();
            }).then((user)=>{
                setUsername(user);
                console.log(user);
            }).catch((error)=>{
                setError(error.message);
                console.log(error);
            });
    }

    const handlePostBlog = () => {
        // https://jsonplaceholder.typicode.com/users/1
        fetch('https://jsonplaceholder.typicode.com/posts/', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringfy({
                title: title,
                body: content,
                userId: 1
            })
        }).then(
            (res)=>{
                if(!res.ok) throw new Error('No user')
                return res.json();
            }).then((data)=>{
                console.log(data);
                setResponse(data);
            }).catch((error)=>{
                setError(error.message);
                console.log(error);
            });
    }


    return <div className={style.container}>
        <h1 className={style.heading}>API 연습</h1>
        <div className={style.section}>
            <input 
                className={style.input}
                type="number" 
                min="1" 
                max="10" 
                value={userid} 
                onChange={(e)=>{setUserid(e.target.value)}}
                placeholder="User ID 1~10" />
            <button className={style.button} onClick={handleGetUser}>
                유저 정보 GET
            </button>
            <div className={style.card}> 
                <p>
                    <strong>유저 이름: </strong> {username.name}
                </p>
                <p>
                    <strong>유저 이메일: </strong> {username.email}
                </p>
                <p>
                    <strong>유저 전화번호: </strong> {username.phone}
                </p>
            </div>  
        </div>
        <hr/>
        <div className={style.section}>
            <input 
                className={style.input}
                type="text"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                placeholder="게시글 제목" />
            <textarea 
                className={style.textarea}
                value={content} 
                onChange={(e)=>{setContent(e.target.value)}}
                placeholder="게시글 내용" 
                rows="4"/>
            <button className={style.button} onClick={handlePostBlog}>게시글 작성하기 POST</button>
        </div>

        {response &&
        <div className={`${style.success} ${style.response}`}>
            게시글이 생성되었습니다: {response.id}
        </div>}


        {error &&
        <div className={`${style.error} ${style.response}`}>
            오류: {error}
        </div>}
    </div>
}

// export default function Note2() {
//     const [data, setData] = React.useState("test")
//     return (
//         <div>
//             <h2>{data}</h2>
//         <button onClick={()=>{setData('테스트')}}>변경</button>
//         </div>
//     );
// }


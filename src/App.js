import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from 'axios';
import dummy from './data.json';
// const ENDPOINT = "http://18.142.43.29:3001";
//  const ENDPOINT = "https://qa-pdf-app.serino.com";

//LOCAL
// const ENDPOINT = "http://localhost:3001";

// //DEV
// const ENDPOINT = "http://18.142.43.29:3001";

//QA
const ENDPOINT = "https://pdfapp.serino.com";

// const ENDPOINT = "https://dev-pdfapp.serino.com";
// const ENDPOINT = "https://dev-ims-socket.serino.com";

export default function ClientComponent() {
  const [pdfData, setPdfData] = useState([]);
  const [rnd, setRnd] = useState(0);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [active, setActive] = useState([]);

  const handlePost = () => {
    if(!token) return alert('Please Provide Token!')
    let endpoint = ENDPOINT + '/documents';
    // let endpoint = ENDPOINT + '/documents';
    console.log({...dummy})
    axios.post(endpoint, { ...dummy}, {
      headers: {
        "x-app-key": 10,
        "Authorization": `Bearer ${token}` 
      } 
    }).then(({data}) => {
      console.log('POST RESPONSE')
      console.log(data)
      // setUserId(data.user_id)
      // localStorage.setItem('user_id', data.user_id)
    })
    .catch(err => {
      console.log(err)
    })
  }


  // useEffect(() => {
  //   if(userId){
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.emit("connect-user", userId);
  //   socket.on("new-user", (data) => {
  //     console.log('New User ')
  //     setActive(data)
  //   });

  //   socket.on("pdf-webhook", data => {
  //     let newData = [];
  //     newData = pdfData;
  //  const ind = pdfData.find(a => a.id === data.document_id);
  //     if(!ind){
  //       newData.push({id: data.document_id, ...data})
  //     }

  //     setPdfData(newData)
  //     setRnd(Math.random())
  //       });
  //   }
  // }, [userId]);



  let user_id = localStorage.getItem('user_id')

useEffect(() => {
  console.log('INITT')
  // if(token){
const socket = socketIOClient(`${ENDPOINT}`, {
  extraHeaders: {
    Authorization: `Bearer ${token}`
  },
  // transports: ["websocket"]
})
socket.on("USER_CONNECTED", (response) => console.log('CONNECTED!'))

    socket.on("pdf-webhook", data => {
      console.log('PDF WEBHOOK RESPONSE')
      console.log(data)
      pdfData.push(data)
      setPdfData(pdfData)
      setRnd(Math.random())
      });


      socket.on("set-user", user => {
        console.log('SET USER')
        console.log(user)
        setUserId(user)
        });

  // }

        return () => {
          socket.disconnect();
          console.log("DISCONNTECT")
        }
}, [token]);


  let pdfList = pdfData.map((a, index) => {
    return(
      <a key={index} href={a.file_url} target="_blank"><li >{a.file_url}</li></a>
    )
  })

  return (
    <>
    <p>Token</p>
    <input 
      value={token}
      onChange={(e) => setToken(e.target.value)}
    />
     <p>User ID: {userId}</p>
 
    <br/>
    <button onClick={() => handlePost()}>Post</button>
    <p>PDF LINKS</p>
      <ul>
        {pdfList}
      </ul>
      <br/>
      <ul>
        {active.map(a => {
          return (
            <li key={a}>{a}</li>
          )
        })}
      </ul>
    </>
  );
}
import React from 'react';
import api from "";
import { useState,useEffect } from 'react';
import {Grid, CircularProgress, Typography,Link} from "@mui/material";
import ActivityStyles from '../../styles/activity';
import {BarChart} from '';
import AllStyles from '';
import ChatHistory from '';


const Activity = () => {
 const [loading,setLoading] = useState(true)
 const [sessionDates,setSessionDates] = useState([])
 const [sessionChatLenghts,setSessionChatLengths] = useState([])
 const [sessions,setSessions] = useState([])

 useEffect(()=> {

    const fetchSessions = async()=> {
        try {
           const response = await api.get("/sessions");
           setSessions(response.data.reverse());
           setSessionDates([
             ...Array.from(response.data, (data)=>data.date.split(",")[0]),

           ]);

           setSessionChatLengths([
            ...Array.from(response.data,(data)=>data.chats.length),

           ]);
           setLoading(false);

          

        }
        catch (error) {
          if (error.response){
             console.log(error.response.data)
             console.log(error.response.data)
             console.log(error.response.headers)
          }
        }
    };
    fetchSessions();
 },[]);

 const handleDelete = async (id) => {
    try {

      await api.delete(`/sessions/${id}`);
      setSessions(sessions.filter((session)=> session.id !== id));


    } 
    catch (error) {
     console.error('Error deleting session:', error)   

    }
 };

 return (
    <Grid container {...ActivityStyles.activityBody}>
        <Grid container item {...ActivityStyles.titleOutline}>
            <Typography {...ActivityStyles.title}>Your statistics</Typography>
        </Grid>

    <Grid container item>
        <Typography {...ActivityStyles.description}>
            Graph of the conversation you had with Rex this year

        </Typography>
        
    </Grid>   
    <Grid container item>
        {loading ? (<CircularProgress />):
        (<BarChart xAxis = {[{scaleType: "band", data: {...sessionDates}}]}
        series = {[{data: [...sessionChatLenghts]}]}
        width = {500}
        height = {300}
        
        />)}

        <Grid container item {...AllStyles.endedChatsTitle}>
            <Grid {...AllStyles.endedChats}>Details Chat Activity</Grid>
            <Grid>
               <Link {...AllStyles.endedChatsTitle}>See all</Link>                

            </Grid>

        </Grid>

       <Grid>
          {loading ? (
            <CircularProgress />

          ):(
            sessions.map((session, i)=> session.isSessionEnded && i < 4 ? (
            <ChatHistory

            key = {session.id}
            id = {session.id}
            date ={session.date}
            lasttext = {
                session.chats.length ?
                session.chats[setSessions.length -1].Rex[
                    session.chats[session.chats.length -1].Rex.length - 1
                ] : ""
            }
            sessionEnded={session.isSessionEnded}
            handleDelete ={()=> handleDelete(session.id)}
            isActivity={true}
            
            />    

            ):null
        
             )

          )}
       </Grid>
    </Grid> 

    </Grid>

    
 )
}

export default Activity;

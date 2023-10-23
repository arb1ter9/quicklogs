import React from 'react';
import { useState, useEffect } from 'react';
import './Logs.css'
import axios from 'axios';

function Logs() {
    const [createdLogs, setCreatedLogs] = useState([]);
    const dbLogList = 'http://localhost:5555/logs';

    useEffect(() => {
        axios
          .get(dbLogList)
          .then((response) => {
            const sortedLogs = response.data.data.sort((a, b) => a.log_id - b.log_id);
            setCreatedLogs(sortedLogs);
          })
      }, [dbLogList]);

    return (
        <div className='logs-list'>
            {createdLogs.map((createdLog) => {
                return (
                    <>
                        <a href={`https://logs.tf/${createdLog.log_id}`} target='_blank'>{createdLog.title}</a>
                    </>
                )
            })}
        </div>
    )
}

export default Logs;
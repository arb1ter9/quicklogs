import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [tfLogs, setTfLogs] = useState([])
  const [createdLogs, setCreatedLogs] = useState([])
  const [logID, setLogID] = useState('')
  const [success, setSuccess] = useState(false)

  const logsListURL = 'https://logs.tf/api/v1/log?limit=100'
  const getLog = `http://logs.tf/api/v1/log/${logID}`
  const dbLogList = 'http://localhost:5555/logs'

  const handleSaveLog = async () => {
    let logTitle = ''
    let logMatchLength = 0
    let logPlayers = 0

    axios
      .get(getLog)
      .then((res) => {
        logTitle = res.data.info.title
        logMatchLength = res.data.info.title
        logPlayers = Object.keys(res.data.names).length
      })
    const data = {
      logID,
      logTitle,
      logMatchLength,
      logPlayers
    }

    axios
      .post(`http://localhost:5555/logs/${logID}`, data)
      .then(() => {
        alert('Log created!')
      })
      .catch((error) => {
        alert('Could not add log')
        console.log(error)
      })
  }

  useEffect(() => {
    axios
      .get(dbLogList)
      .then((response) => {
        setCreatedLogs(response.data.data)
        console.log(createdLogs)
      })
  }, [dbLogList])

  useEffect(() => {
    if (logID !== '') {
      axios
        .get(getLog)
        .then((response) => {
          setTfLogs(response.data.info)
          console.log(tfLogs)
          setSuccess(true)
        })
        .catch((error) => {
          setSuccess(error.response.success)
        })
    }
  }, [getLog])

  return (
    <div>
      <ul>
        <h1>quicklogs</h1>
        <input value={logID} onChange={e => {
          setLogID(e.target.value)
        }} /><br></br><br></br>
        {success === true && logID !== '' ?
          <div>
            <a href={`https://logs.tf/${logID}`} target='_blank'>{tfLogs.title}</a><br></br>
            <button onClick={handleSaveLog}>Save log</button>
          </div>
          :
          <p>Log not found!</p>}
        <div>
          {createdLogs.map((createdLog) => {
            return <p>{createdLog.title}</p>
          })}
        </div>
      </ul>
    </div>
  )
}

export default App

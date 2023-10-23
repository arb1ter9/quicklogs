import { useEffect, useState } from 'react';
import './Home.css';
import './button.css';
import axios from 'axios';

function Home() {
  const [tfLogs, setTfLogs] = useState({});
  const [createdLogs, setCreatedLogs] = useState([]);
  const [logID, setLogID] = useState('');
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const [logLoading, setLogLoading] = useState(false);

  // const logsListURL = 'https://logs.tf/api/v1/log?limit=100';
  const getLog = `http://logs.tf/api/v1/log/${logID}`;
  const dbLogList = 'http://localhost:5555/logs';

  const handleSaveLog = async () => {
    setLogLoading(true);
    let logTitle = '';
    let logMatchLength = 0;
    let logPlayers = 0;

    axios
      .get(getLog)
      .then((res) => {
        logTitle = res.data.info.title;
        logMatchLength = res.data.info.title;
        logPlayers = Object.keys(res.data.names).length;
      });
    const data = {
      logID,
      logTitle,
      logMatchLength,
      logPlayers
    };

    axios
      .post(`${dbLogList}/${logID}`, data)
      .then(() => {
        alert('Log created!');
        setLogLoading(false);
      })
      .catch(() => {
        alert('Could not add log');
        setLogLoading(false);
      })
  };

  const getLogData = async () => {
    setLoading(true);
    await axios
      .get(getLog)
      .then((response) => {
        setSuccess(true);
        setTfLogs(response.data.info);
      })
      .catch((error) => {
        setSuccess(false);
      })
    setLoading(false);
  };

  useEffect(() => {
    axios
      .get(dbLogList)
      .then((response) => {
        const sortedLogs = response.data.data.sort((a, b) => a.log_id - b.log_id);
        setCreatedLogs(sortedLogs);
      })
  }, [dbLogList]);

  useEffect(() => {
    if (logID !== '') {
      getLogData();
    }
  }, [logID]);

  return (
    <>
      <div className='title'>
        <h1>quicklogs</h1>
        <input type='number' pattern='[0-9]*' placeholder='Log ID' className='input-box' onChange={(e) => setLogID(e.target.value)} />
        {loading ? (
          <></>
        ) : logID !== '' && success === true ? (
          <div>
            <a href={`https://logs.tf/${logID}`} target='_blank'>{tfLogs.title}</a>
            <img src='/plus-button.png' alt='Add log' className='add-button' onClick={handleSaveLog} />
          </div>
        ) : logID === '' ? (
          <></>
        ) : (
          <h2>Log not found!</h2>
        )}
      </div>
    </>
  );
}

export default Home

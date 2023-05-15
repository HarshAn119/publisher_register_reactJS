import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import api from './api/axiosConfig';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublisherCrud from './components/PublisherCrud';

function App() {
  const [publishers, setPublishers] = useState([]);

  async function load() {
    const result = await api.get('/all');
    setPublishers(result.data);
  }

  useEffect(() => {
    (async () => await load())();
  }, []);

  return (
    <div className="App">
      <ToastContainer autoClose={1500} />
      <h1 className="text-center">List of Publishers</h1>
      <PublisherCrud load={load} publishers={publishers} />
    </div>
  );
}

export default App;

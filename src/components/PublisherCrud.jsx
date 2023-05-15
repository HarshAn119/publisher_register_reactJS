import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axiosConfig.js';
import PublisherList from './PublisherList';

const PublisherCrud = ({ load, publishers }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [published, setPublished] = useState('');

  async function save(e) {
    e.preventDefault();
    await api.post('/create', {
      name: name,
      email: email,
      published: published,
    });
    toast.success('Publisher Record Saved');

    setId('');
    setName('');
    setEmail('');
    setPublished('');
    load();
  }

  async function editEmployee(publishers) {
    setName(publishers.name);
    setEmail(publishers.email);
    setPublished(publishers.published);
    setId(publishers.id);
  }

  async function deleteEmployee(id) {
    await api.delete('/delete/' + id);
    toast.success('Publisher Details Deleted Successfully');
    load();
  }

  async function update(e) {
    e.preventDefault();
    if (!id) return toast.error('Publisher Details not found');

    await api.put('/update/', {
      id: id,
      name: name,
      email: email,
      published: published,
    });
    toast.success('Publisher Details Updated');

    setId('');
    setName('');
    setEmail('');
    setPublished('');
    load();
  }

  return (
    <div className="container mt-4">
      <form action="">
        <div className="form-group my-2">
          <input
            type="text"
            className="form-control"
            hidden
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <label htmlFor="">Name</label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="">Email</label>
          <input
            required
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="row">
          <div className="col-4">
            <label htmlFor="">Published</label>
            <input
              type="text"
              className="form-control"
              value={published}
              placeholder="Published Post(s)"
              onChange={(e) => setPublished(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <button className="btn btn-primary m-4" onClick={save}>
            Register
          </button>
          <button className="btn btn-warning m-4" onClick={update}>
            Update
          </button>
        </div>
      </form>
      <PublisherList
        publishers={publishers}
        editEmployee={editEmployee}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
};

export default PublisherCrud;

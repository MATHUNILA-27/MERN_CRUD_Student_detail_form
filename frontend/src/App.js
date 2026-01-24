import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Table, Card } from 'react-bootstrap';

const API = "http://localhost:5000";

function App() {

  const [people, setPeople] = useState([]);
  const [form, setForm] = useState({
    name:"", regno:"", dept:"", dob:"", age:"",
    email:"", year:"", phone:"", address:"", skills:""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadpeople();
  }, []);

  const loadpeople = async () => {
    const res = await axios.get(API);
    setPeople(res.data);
  };

  const addperson = async () => {
    if (
      !form.name || !form.regno || !form.dept || !form.dob ||
      !form.age || !form.email || !form.year ||
      !form.phone || !form.address || !form.skills
    ) {
      return alert("No field should be empty");
    }

    const res = await axios.post(API, {
      ...form,
      regno: Number(form.regno),
      age: Number(form.age),
      year: Number(form.year),
      dob: new Date(form.dob)
    });

    setPeople([...people, res.data]);
    setForm({
      name:"", regno:"", dept:"", dob:"", age:"",
      email:"", year:"", phone:"", address:"", skills:""
    });
  };

  const startEdit = (p) => {
    setEditId(p._id);
    setForm(p);
  };

  const updateperson = async () => {
    const res = await axios.put(`${API}/${editId}`, form);
    setPeople(people.map(p => p._id === editId ? res.data : p));
    setEditId(null);
    setForm({
      name:"", regno:"", dept:"", dob:"", age:"",
      email:"", year:"", phone:"", address:"", skills:""
    });
  };

  const deleteperson = async (id) => {
    await axios.delete(`${API}/${id}`);
    setPeople(people.filter(p => p._id !== id));
  };

  return (
    <Container className="mt-4">

      <h3 className="text-center">MERN CRUD OPERATIONS</h3>
      <h5 className="text-center text-muted">(Create, Read, Update, Delete)</h5>

      {/* FORM */}
      <Card className="p-3 mt-4 shadow">
        <Form>
          <Row className="mb-3">
            <Col><Form.Control placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} /></Col>
            <Col><Form.Control placeholder="Reg No" value={form.regno} onChange={e => setForm({...form, regno:e.target.value})} /></Col>
            <Col><Form.Control placeholder="Department" value={form.dept} onChange={e => setForm({...form, dept:e.target.value})} /></Col>
          </Row>

          <Row className="mb-3">
            <Col><Form.Control type="date" value={form.dob} onChange={e => setForm({...form, dob:e.target.value})} /></Col>
            <Col><Form.Control type="number" placeholder="Age" value={form.age} onChange={e => setForm({...form, age:e.target.value})} /></Col>
            <Col><Form.Control type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></Col>
          </Row>

          <Row className="mb-3">
            <Col><Form.Control type="number" placeholder="Year" value={form.year} onChange={e => setForm({...form, year:e.target.value})} /></Col>
            <Col><Form.Control placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} /></Col>
            <Col><Form.Control placeholder="Address" value={form.address} onChange={e => setForm({...form, address:e.target.value})} /></Col>
          </Row>

          <Form.Control
            placeholder="Skills"
            className="mb-3"
            value={form.skills}
            onChange={e => setForm({...form, skills:e.target.value})}
          />

          {editId ? (
            <Button variant="success" onClick={updateperson}>Update</Button>
          ) : (
            <Button variant="primary" onClick={addperson}>Add</Button>
          )}
        </Form>
      </Card>

      {/* TABLE */}
      <Table striped bordered hover className="mt-4">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>RegNo</th>
            <th>Dept</th>
            <th>DOB</th>
            <th>Age</th>
            <th>Email</th>
            <th>Year</th>
            <th>Phone</th>
            <th>Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.regno}</td>
              <td>{p.dept}</td>
              <td>{p.dob}</td>
              <td>{p.age}</td>
              <td>{p.email}</td>
              <td>{p.year}</td>
              <td>{p.phone}</td>
              <td>{p.skills}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => startEdit(p)}>Edit</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => deleteperson(p._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Container>
  );
}

export default App;

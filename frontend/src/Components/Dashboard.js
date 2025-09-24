import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Alert, Navbar, Nav } from "react-bootstrap";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setMessage("Error fetching tasks.");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
      setTitle("");
      setDescription("");
      setMessage("Task added successfully!");
    } catch (err) {
      setMessage("Error adding task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
      setMessage("Task deleted successfully!");
    } catch (err) {
      setMessage("Error deleting task.");
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Task Dashboard</Navbar.Brand>
          <Nav>
            <Button
              variant="outline-light"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        {message && <Alert variant="info">{message}</Alert>}

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Add New Task</Card.Title>
            <Form onSubmit={addTask}>
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Task
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <h4>Your Tasks</h4>
        <Row>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Col md={4} className="mb-3" key={task._id}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                    <Button variant="danger" onClick={() => deleteTask(task._id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No tasks added yet.</p>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Form, Row, Col, Alert, Modal } from "react-bootstrap";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [editTask, setEditTask] = useState(null); // task being edited
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", config);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setMessage("Please provide both title and description.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description },
        config
      );
      setTasks([...tasks, res.data]);
      setTitle("");
      setDescription("");
      setMessage("Task added successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error adding task.");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
      setTasks(tasks.filter((task) => task._id !== id));
      setMessage("Task deleted.");
    } catch (err) {
      console.error(err);
      setMessage("Error deleting task.");
    }
  };

  // Open edit modal
  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  // Save edited task
  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${editTask._id}`,
        { title: editTask.title, description: editTask.description },
        config
      );
      setTasks(tasks.map((t) => (t._id === res.data._id ? res.data : t)));
      setShowModal(false);
      setEditTask(null);
      setMessage("Task updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error updating task.");
    }
  };

  return (
    <Container style={{ marginTop: "30px" }}>
      <h2 className="mb-4">Task Dashboard</h2>

      {message && <Alert variant="info">{message}</Alert>}

      {/* Add Task Form */}
      <Form onSubmit={handleAddTask} className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Button type="submit" variant="primary" block>
              Add Task
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Task List */}
      <Row>
        {tasks.map((task) => (
          <Col md={4} key={task._id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editTask?.title || ""}
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editTask?.description || ""}
                onChange={(e) =>
                  setEditTask({ ...editTask, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;

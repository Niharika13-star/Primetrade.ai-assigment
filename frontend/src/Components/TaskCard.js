import React from "react";
import { Card, Button } from "react-bootstrap";

function TaskCard({ task, onDelete }) {
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.description}</Card.Text>
        <Button variant="danger" onClick={() => onDelete(task._id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;

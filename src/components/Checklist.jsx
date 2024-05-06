import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';

const Checklist = () => {
  const [checklists, setChecklists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newChecklist, setNewChecklist] = useState({
    title: '',
    tasks: []
  });
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  useEffect(() => {
    fetchChecklists();
  }, []);

  const fetchChecklists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/checklists/checklists');
      setChecklists(response.data);
    } catch (error) {
      console.error('Error fetching checklists:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setNewChecklist({ title: '', tasks: [] });
    setSelectedChecklist(null);
    setSelectedTaskIndex(null);
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChecklist({
      ...newChecklist,
      [name]: value
    });
  };

  const handleAddTask = () => {
    setNewChecklist({
      ...newChecklist,
      tasks: [...newChecklist.tasks, { name: '', description: '', priority: 'Low', dueDate: null, completed: false }]
    });
  };

  const handleTaskChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedTasks = [...newChecklist.tasks];
  
    if (!updatedTasks || updatedTasks.length === 0) {
      return;
    }
  
    if (!updatedTasks[index]) {
      return;
    }
  
    updatedTasks[index][name] = type === 'checkbox' ? checked : value;
    
    setNewChecklist({
      ...newChecklist,
      tasks: updatedTasks
    });
  };
  
  const handleSave = async () => {
    try {
      await axios.post('http://localhost:3000/api/checklists/checklists', newChecklist);
      fetchChecklists();
      handleClose();
    } catch (error) {
      console.error('Error saving checklist:', error);
    }
  };

  const handleViewDetails = (checklist) => {
    setSelectedChecklist(checklist);
    setShowModal(true);
  };

  const handleEditTask = (index) => {
    setSelectedTaskIndex(index);
  };

  const handleUpdateTask = async () => {
    try {
      const updatedChecklist = { ...selectedChecklist };
      updatedChecklist.tasks[selectedTaskIndex] = newChecklist.tasks[selectedTaskIndex];
      await axios.put(`http://localhost:3000/api/checklists/checklists/${updatedChecklist._id}`, updatedChecklist);
      setSelectedChecklist(updatedChecklist);
      setSelectedTaskIndex(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (index) => {
    try {
      const updatedChecklist = { ...selectedChecklist };
      updatedChecklist.tasks.splice(index, 1);
      await axios.put(`http://localhost:3000/api/checklists/checklists/${updatedChecklist._id}`, updatedChecklist);
      setSelectedChecklist(updatedChecklist);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDeleteChecklist = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/checklists/checklists/${selectedChecklist._id}`);
      setChecklists(checklists.filter(checklist => checklist._id !== selectedChecklist._id));
      handleClose();
    } catch (error) {
      console.error('Error deleting checklist:', error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Checklists</h1>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Create New Checklist
      </Button>
      <Row>
        {checklists.map(checklist => (
          <Col key={checklist._id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{checklist.title}</Card.Title>
                <Card.Text>
                  <strong>Tasks:</strong> {checklist.tasks.length}
                </Card.Text>
                <Button variant="primary" onClick={() => handleViewDetails(checklist)}>View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedChecklist ? selectedChecklist.title : 'Create New Checklist'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {selectedChecklist ? (
              <div>
                <h4>{selectedChecklist.title}</h4>
                {selectedChecklist.tasks.map((task, index) => (
                  <div key={index} className="mb-3">
                    <Form.Group controlId={`taskName${index}`}>
                      <Form.Label>Task Name</Form.Label>
                      <Form.Control type="text" name="name" value={task?.name} onChange={(e) => handleTaskChange(index, e)} disabled={selectedTaskIndex !== index} />

                    </Form.Group>
                    <Form.Group controlId={`taskDescription${index}`}>
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="text" name="description" value={task.description} onChange={(e) => handleTaskChange(index, e)} disabled={selectedTaskIndex !== index} />
                    </Form.Group>
                    <Form.Group controlId={`taskPriority${index}`}>
                      <Form.Label>Priority</Form.Label>
                      <Form.Control as="select" name="priority" value={task.priority} onChange={(e) => handleTaskChange(index, e)} disabled={selectedTaskIndex !== index}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={`taskDueDate${index}`}>
                      <Form.Label>Due Date</Form.Label>
                      <Form.Control type="date" name="dueDate" value={task.dueDate} onChange={(e) => handleTaskChange(index, e)} disabled={selectedTaskIndex !== index} />
                    </Form.Group>
                    <Form.Group controlId={`taskCompleted${index}`}>
                      <Form.Check type="checkbox" label="Completed" name="completed" checked={task.completed} onChange={(e) => handleTaskChange(index, e)} disabled={selectedTaskIndex !== index} />
                    </Form.Group>
                    {selectedTaskIndex === index ? (
                      <div>
                        <Button variant="success" onClick={handleUpdateTask}>Update</Button>
                        <Button variant="danger" onClick={() => handleDeleteTask(index)}>Delete</Button>
                      </div>
                    ) : (
                      <Button variant="primary" onClick={() => handleEditTask(index)}>Edit</Button>
                    )}
                  </div>
                ))}
                <Button variant="danger" onClick={handleDeleteChecklist}>Delete Checklist</Button>
              </div>
            ) : (
              <Form>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={newChecklist.title} onChange={handleInputChange} />
                </Form.Group>
                {newChecklist.tasks.map((task, index) => (
                  <div key={index} className="mb-3">
                    <Form.Group controlId={`taskName${index}`}>
                      <Form.Label>Task Name</Form.Label>
                      <Form.Control type="text" name="name" value={task.name} onChange={(e) => handleTaskChange(index, e)} />
                    </Form.Group>
                    <Form.Group controlId={`taskDescription${index}`}>
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="text" name="description" value={task.description} onChange={(e) => handleTaskChange(index, e)} />
                    </Form.Group>
                    <Form.Group controlId={`taskPriority${index}`}>
                      <Form.Label>Priority</Form.Label>
                      <Form.Control as="select" name="priority" value={task.priority} onChange={(e) => handleTaskChange(index, e)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={`taskDueDate${index}`}>
                      <Form.Label>Due Date</Form.Label>
                      <Form.Control type="date" name="dueDate" value={task.dueDate} onChange={(e) => handleTaskChange(index, e)} />
                    </Form.Group>
                    <Form.Group controlId={`taskCompleted${index}`}>
                      <Form.Check type="checkbox" label="Completed" name="completed" checked={task.completed} onChange={(e) => handleTaskChange(index, e)} />
                    </Form.Group>
                  </div>
                ))}
                <Button variant="secondary" onClick={handleAddTask}>Add Task</Button>
              </Form>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Checklist
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Checklist;

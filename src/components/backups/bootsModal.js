import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { Card, Container, Button, Row, Col, Modal } from 'react-bootstrap';


function App() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState(null);

  //Hook
  useEffect(()=>{
    getTaskList()
  }, []);

  const getTaskList = ()=>{
    const url = 'http://localhost:8080/tasks'
    fetch(url)
      .then(res => {
        if(!res.ok){
          throw Error('Failed to fetch');
        }
        return res.json()
      })
      .then(data =>{
        setTasks(data)
        setIsLoading(false)
        setIsError(null);
      })
      .catch(err=>{
        setIsLoading(false)
        setIsError(err.message);
      })
  }

  const eyeBtn = (id)=>{
    console.log(id)
    const url = 'http://localhost:8080/tasks/'
    fetch(url + id)
      .then(res => {
        return res.json()
      })
      .then(data =>{
        console.log(data)
        setTaskDetails(data)
        setShow(true)
      })
      .catch(err=>{
        console.log(err)
      })
  }

  const changeCardColor = (st)=>{
    if(st === 'completed'){
      return 'success'
    }else if(st === 'pending'){
      return 'warning'
    }else if(st === 'ongoing'){
      return 'primary'
    }else{
      return 'secondary'
    }
  }

  return (
    <Container>
      <Row>
        { error && <div>{ error }</div> }
        { isLoading && <div>Loading...</div> }
        {tasks 
        ? 
        tasks.map((task)=>(
          <Col sm={3} className="p-3" key={task.id}>
            <Card style={{ width: '18rem' }} bg={changeCardColor(task.status)} onClick={() =>eyeBtn(task.id)}>
              <Card.Img variant="top" src={task.image} />
              <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>
                  {task.author}
              </Card.Text>
              <div className="d-flex flex-row-reverse">
                  <Button variant="secondary" onClick={() =>eyeBtn(task.id)}><FaEye /></Button>
              </div>
              </Card.Body>
            </Card>
          </Col>
      ))
        : <p>No data found</p>}
      </Row>

      {/* modal */}
      {taskDetails 
      && 
      <Modal show={show} onHide={() =>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{taskDetails.title} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={taskDetails.image} />
          </Card>
          <h4 className='mt-3'>Title</h4>
          <p>{taskDetails.title}</p>
          <h2>Description</h2>
          <p>{taskDetails.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() =>setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      }
    </Container>
  );
}

export default App;

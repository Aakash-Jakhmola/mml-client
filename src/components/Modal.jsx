import React,{useState} from 'react'
import "../css/Modal.css"
import base_url from '../keys'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import axios from 'axios'

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export default function Modal(props) {
  const [display, setDisplay] = useState('block')
  const [changes, setChanges] = React.useState({rating:props.rating,review:props.review})


	function handleEditChange(event) {
		const val = event.target.value;
    const name = event.target.name;
    setChanges((prev) => {
      return { ...prev, [name]: val };
    });
	}

  async function updateReview() {
		const updateUrl = `${base_url}users/${props.user}/movielist?movieid=${props.movie.id}`
		let obj = {newrating:changes.rating,newreview:changes.review};
		axios.patch(updateUrl,obj)
		.then((resp)=>{
			console.log(resp)
			alert('updated successfully')
		},(err)=> {
			console.log(err)
			alert(err)
		})
	}
  
  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
		<div className='overlay' style={{display:display}} onClick={props.update}>
			<div className='modal' onClick={stopPropagation} style={{padding:'1rem'}}>
			  <Form>
			    <Form.Group controlId="rating">
			    <Form.Label>New Rating</Form.Label>
		  	  <Form.Control size ="sm" as="select" name='rating' value={changes.rating} onChange={handleEditChange}>
				  {array.map((i) =>
					  <option>{i}</option>
				  )}
			    </Form.Control>
		      </Form.Group>
		      <Form.Group controlId="review">
			    <Form.Label>New Review</Form.Label>
			    <Form.Control as="textarea" rows={2} name='review' value={changes.review} onChange={handleEditChange}/>
		      </Form.Group>
		      <Card.Link onClick={updateReview}>Update</Card.Link>
		    </Form>
			</div>
		</div>
	)

}

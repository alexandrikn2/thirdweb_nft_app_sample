import React from "react";
import {Button, Card} from "react-bootstrap";

const NftCard = (props) => {
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Img className="rounded" style={{aspectRatio: '1'}} variant="top" src={props.metadata.image} />
            <Card.Body>
                <Card.Title>{props.metadata.name}</Card.Title>
                <Card.Text >
                    {props.metadata.description.length > 27 ? (
                        props.metadata.description.slice(0,26) + '...'
                    ) : (
                        props.metadata.description
                    )
                    }
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                {props.owner ? (
                    <small className="text-muted">Owner: {props.owner}</small>
                ) : (
                    <Button variant="primary">No owner</Button>
                )}
            </Card.Footer>
        </Card>
    )
}

export default NftCard
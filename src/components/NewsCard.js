import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import { Notyf } from 'notyf';

export default function NewsCard({newsProp}) {

    const notyf = new Notyf();

    console.log(newsProp);
    const { name, description } = newsProp;

    const [likes, setLikes] = useState(0);

    function likeNews(){
        if (likes < 10) {
            setLikes(likes + 1);
            console.log('Likes: ' + likes)
        } else {
            
            notyf.success("Promo Alert!")
            
        }
    }

    return (
        <Card className="mb-3">
            <Card.Body className="text-center">
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle className="mb-3">Likes: {likes}</Card.Subtitle>
                <Button variant="primary" onClick={likeNews}  className="text-center">Like</Button>
            </Card.Body>
        </Card>
    )
}

NewsCard.propTypes = {
    newsProp: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired
    })
}
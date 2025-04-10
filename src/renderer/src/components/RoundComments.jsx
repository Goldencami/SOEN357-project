import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { roundContext } from '../../../shared/context.jsx';

function RoundComments() {
    const round = useContext(roundContext);
    const [comments, setComments] = useState('');

    // get comments from session storage
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await window.api.getComments({ round });
                setComments(data);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong. Please try again.',
                });
            }
        };
        
        fetchComments();
    }, []);

    useEffect(() => {
        const updateComments = async () => {
            try {
                await window.api.setComments({ round, comments });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong. Please try again.',
                });
            }
        };

        updateComments();
    }, [comments]);

    return(
        <>
        <div className='container comment-container'>
            <p><label htmlFor="round-comments">Review of the round:</label></p>
            <textarea className='form-control'
                value={comments} 
                onInput={(e) => setComments(e.target.value)}
                name="round-comments" 
                id="round-comments" 
                rows={4} 
                placeholder='COMMENT AREA' 
                spellCheck="false" />
        </div>
        </>
    )
}

export default RoundComments
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import axios from 'axios';
import { useAuthCheck } from '../../components/VerifyAuth';
import '../../stylesheets/AddAnnouncementPage.css';

function AddAnnouncementPage() {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [description, setDescription] = useState('');

    const {name} = useAuthCheck();

    const navigate = useNavigate();

    const validateAnnouncement = async(event) => {
        event.preventDefault();
        console.log('Title:', title);
        console.log('Tag:', tag);
        console.log('Name:', name);
        console.log('Description:', description);
        navigate('/announcements');

        try {
            const response = await axios.post('/add-announcement', {
                title: title,
                name: name,
                tag: tag,
                description: description
            });

            console.log(response);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className='add-announcement-page'>
            <div className='add-announcement-form'>
                <label>Title:</label>
                <form>
                    <input
                        type='text'
                        name='title'
                        placeholder='Enter Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </form>
                <form>
                    <label>Tag:</label>
                    <input
                        type='text'
                        name='tag'
                        placeholder='Enter Tag'
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </form>
                <label>Description:</label>
                <form>
                    <textarea
                        name='description'
                        placeholder='Enter Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </form>
                <Button className='announcement-button' buttonStyle='btn--outline' onClick={validateAnnouncement}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default AddAnnouncementPage;

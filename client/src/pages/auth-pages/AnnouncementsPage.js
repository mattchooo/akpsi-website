import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/AnnouncementsPage.css';

function AnnouncementsPage() {
  const [announcementList, setAnnouncementList] = useState([]);
  const navigate = useNavigate();

  const getAnnouncements = () => {
    axios.get('/announcements').then(response => )
  }


  return (
    <div className='announcements-container'>
      <Button className='add-announcement-button' buttonStyle='btn--outline' onClick={() => navigate('/add-announcement')}>
        Add Announcement
      </Button>
    </div>
  )
}

export default AnnouncementsPage;

import React from 'react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

function Resources() {
    const navigate = useNavigate();

    const handleMasterDocClick = () => {
        window.open('https://docs.google.com/spreadsheets/d/16t7QFZVurZn-1zU3fqyYzIR2T3lI9u1cK5KfcIKkPiA/edit#gid=335813833', '_blank');
      };
    
      const handleMasterCalendarClick = () => {
        window.open('https://calendar.google.com/calendar/u/0/embed?src=589h7uuk75om7v91mtren3lgdo@group.calendar.google.com&ctz=America/New_York&pli=1', '_blank');
      };
    return (
        <div className='resources-container'>
            <h1>RESOURCES:</h1>
            <div className='resource-buttons'>
                <Button className='resource-button' buttonStyle='btn--outline' onClick={handleMasterDocClick}>
                    Master Doc
                </Button>
                <Button className='resource-button' buttonStyle='btn--outline' onClick={handleMasterCalendarClick}>
                    Master Calendar
                </Button>
                <Button className='resource-button' buttonStyle='btn--outline' onClick={() => navigate('/login')}>
                    Slack
                </Button>
            </div>
        </div>
    );
}

export default Resources;

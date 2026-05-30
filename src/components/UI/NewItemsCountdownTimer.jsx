import React, { useState, useEffect } from "react";


const NewItemsCountdownTimer = ({ item, seconds }) => {

    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const now = Date.now() / 1000;
        const then = now + seconds;

        const countDown = setInterval(() => {
            const secondsLeft = Math.round(then - Date.now() / 1000)
            if (secondsLeft <= 0) {
                clearInterval(countDown);
                console.log('done');
                return;
            }
            setTimeLeft(displayTimeLeft(secondsLeft));
        }, 1000);

        return ()=> clearInterval(countDown);
    }, [seconds]);
        
        const displayTimeLeft = (seconds) => {
            const minutesLeft = Math.floor(seconds / 60);
            const secondsLeft = seconds % 60;
            return `${minutesLeft}:${secondsLeft < 10 ? '0' : ''}`;
        }

        if (item.expiryDate === null) {
            return <p>No expiry date.</p>
        }
    
        return (
            <div className="de_countdown">
                {/* <span className="timer__hours">{}h </span> */}
                <span className="timer__minutes">{timeLeft}m </span>
                {/* <span className="timer__seconds">{}s</span> */}
            </div>
        )
    }

export default NewItemsCountdownTimer;
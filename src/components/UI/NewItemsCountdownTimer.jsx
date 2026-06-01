import React, { useState, useEffect } from "react";


const NewItemsCountdownTimer = ({ item, expiryDate }) => {

    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false,
    });

    useEffect(() => {
        
        const targetDate = new Date(expiryDate).getTime();

        const countDown = setInterval(() => {
            const now = Date.now();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(countDown);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true});
            } else {
                setTimeLeft({
                    hours: Math.floor(difference / (1000 * 60 * 60)),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                    isExpired: false,
                });
            }
        }, 1000);

        return () => clearInterval(countDown);
    }, [expiryDate]);

        if (item.expiryDate === null) {
            return <p>No expiry date.</p>
        }
        if (timeLeft.isExpired) {
            return <span></span>;
        }
    
        return (
            <div className="de_countdown">
                <span className="timer__hours">{timeLeft.hours}h </span>
                <span className="timer__minutes">{timeLeft.minutes}m </span>
                <span className="timer__seconds">{timeLeft.seconds}s</span>
            </div>
        )
    }

export default NewItemsCountdownTimer;
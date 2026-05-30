import React, { useState, useEffect } from "react";


const NewItemsCountdownTimer = ({ item, seconds }) => {

    const [timeLeft, setTimeLeft] = useState('');
    const now = Date.now() / 1000;
    const then = now + seconds * 1000;
    const countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        if (secondsLeft <= 0) {
            clearInterval(countDown);
            console.log('done');
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);

    const displayTimeLeft = seconds => {
        let minutesLeft = Math.floor(seconds/60);
        let secondsLeft = seconds % 60;
        minutesLeft = minutesLeft.toString().length === "expired";
        secondsLeft = secondsLeft.toString().length === "expired";
        return `${minutesLeft}:${secondsLeft}`;
    }

    useEffect(() => {
        setInterval(() => {
            setTimeLeft(displayTimeLeft(seconds));
        }, 1000);
    }, [seconds])

    return (
        <div className="de_countdown">
            <span className="timer__hours">{}h </span>
            <span className="timer__minutes">{}m </span>
            <span className="timer__seconds">{}s</span>
        </div>
    )
}

export default NewItemsCountdownTimer;
import React, { useState, useEffect } from "react";
import Head from "next/head";

function Home() {
    // Countdown logic
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetDate = new Date('2024-09-28T00:00:00');
            const now = new Date();
            const difference = targetDate - now;

            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }

            return timeLeft;
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="align-items-center justify-content-center text-center"
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                backgroundColor: '#fff',
            }}
        >
            <Head>
                <title>3bolu2 | Coming Soon</title>
            </Head>

            {/* Logo */}
            <img
                src="/img/ucboluiki.png"
                alt="Logo"
                style={{
                    position: 'absolute',
                    top: '15%', // Move the logo towards the top
                    left: '50%', // Center horizontally
                    width: '200px', // Set the width of the logo
                    zIndex: '1000',
                    transform: 'translate(-50%, -50%)', // Center the logo
                }}
            />

            {/* Coming Soon Text */}
            <div
                style={{
                    position: 'absolute',
                    top: '40%', // Adjust position under the logo
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '1000',
                }}
            >
               <div class="row hero-banner">
                  <h1 class="hero-banner__title hero-banner__stroked-title">Under Construction</h1>
                </div>
            </div>

            {/* Video Background */}
            <div
                className="video-container"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        minWidth: '100%',
                        minHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        zIndex: '0', // Behind content
                        transform: 'translate(-50%, -50%)',
                        objectFit: 'cover', // Ensure the video covers the whole screen
                        objectPosition: 'center', // Focus the center of the video
                    }}
                >
                    <source src="/img/bg2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Countdown Timer at the Bottom */}
            <div 
                style={{
                    position: 'absolute',
                    bottom: '5%', // Center near the bottom
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    color: '#fff',
                    fontSize: '1.4rem',
                    zIndex: '1000',
                    textAlign: 'center',
                }}
            >
                <div style={{ fontFamily: "'Courier New', monospace" }}>
                    {timeLeft.days || 0}d {timeLeft.hours || 0}h {timeLeft.minutes || 0}m {timeLeft.seconds || 0}s
                </div>
            </div>
        </div>
    );
}

export default Home;

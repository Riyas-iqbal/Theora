import React, { useRef, useEffect} from 'react'
import TypedJS from 'typed.js'

export default function Typed({data=['No data passed as args'], customClass=''}) {

    const el = useRef(null);

    useEffect(() => {
        const typed = new TypedJS(el.current, {
            strings: data,
            typeSpeed: 70,
            backDelay: 700,
            smartBackspace: true,
            backSpeed: 20,
            loop: true,
            loopCount: Infinity,
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);


    return <span className={customClass} ref={el}></span>;
}

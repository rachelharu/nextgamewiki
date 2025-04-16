'use client';
import { useRef, ElementType } from 'react';

interface AnimateTextProps {
    text: string;
    className: string;
    as?: ElementType;
}

export default function AnimateText({ text, className, as: Component = 'div' }: AnimateTextProps) {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    //more animations, commented out for now
    // useEffect(() => {
    //     requestAnimationFrame(() => {
    //         letterRefs.current.forEach((letter, i) => {
    //             if (letter) {
    //                 // Animation delay matches your existing CSS
    //                 letter.style.animationDelay = `${i * 0.1}s`;
    //             }
    //         });
    //     });
    // }, []);

    return (
        <Component className={className}>
            {text.split('').map((char, index) => (
                char === ' ' ? ' ' : (
                    <span
                        key={index}
                        ref={el => { letterRefs.current[index] = el }}
                    >
                        {char}
                    </span>
                )
            ))}
        </Component>
    );
}

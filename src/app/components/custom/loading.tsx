import React from 'react';
import Image from 'next/image';

const Loading = () => {
    return (
        <Image
            src="loading-animate.svg"
            alt="Map Classification"
            width={200}
            height={200}
            style={{width: "3.5em", height: "3.5em"}}
            className='rounded-full m-auto p-0 hidden sm:block w-64 h-64 sm:w-10 sm:h-10'
        />
    )
}

export default Loading
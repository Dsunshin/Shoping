'use client';

import { useEffect, useState } from "react";

const TestComponent = () => {
    const [x, setX] = useState(0);

    useEffect(()=>{
        setInterval(()=>{
            setX(prev => prev + 1);  
        }, 1000);  
    },[]);
    
    return (
      <div className="p-4 border rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">测试组件</h2>
        <p>{x}</p>
      </div>
    );
};

export default TestComponent;
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const Code = () => {
  const codeLines = [
    '<!DOCTYPE html>',
    '<html>',
    '<head><title>Example</title>',
    '<link rel="stylesheet" href="styles.css">',
    '</head>',
    '<body>',
    '<h1><a href="/">Header</a></h1>',
    '<nav>',
    '<a href="one">One</a>',
    '<a href="two">Two</a>',
    '<a href="three">Three</a>',
    '</nav>',
    '</body>',
    '</html>',
  ];

  const sequence = codeLines.reduce((acc, line, index) => {
    const prevLines = index === 0 ? '' : acc[acc.length - 2];
    const newLine = `${prevLines}\n${index + 1} ${line}`;
    return acc.concat([newLine, 1000]);
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-md font-mono">
      <TypeAnimation
        sequence={sequence}
        wrapper="div"
        cursor={true}
        repeat={Infinity}
        style={{ whiteSpace: 'pre' }}
      />
    </div>
  );
};

export default Code;

import React from "react";

function TextEditor() {
  return (
    <div class='container mx-auto w-5/6'>
      <div class='inline-block p-2 pl-4 mb-5 uppercase text-sm rounded-xl bg-slate-800 text-gray-100'>
        Edit text below
      </div>

      <h1>
        <div
          class="text-5xl font-bold leading-normal inline box-decoration-clone bg-slate-500 text-gray-100 p-4 [filter:url('#goo')]"
          contenteditable='true'>
          This is an example of a simple headline or text with rounded corners
          gooey SVG filter.
        </div>
      </h1>

      <svg
        style={{ visibility: "hidden", position: "absolute" }}
        width='0'
        height='0'
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'>
        <defs>
          <filter id='goo'>
            <feGaussianBlur
              in='SourceGraphic'
              stdDeviation='10'
              result='blur'
            />
            <feColorMatrix
              in='blur'
              mode='matrix'
              values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9'
              result='goo'
            />
            <feComposite in='SourceGraphic' in2='goo' operator='atop' />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default TextEditor;

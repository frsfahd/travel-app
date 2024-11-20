import React, { useState } from 'react';
import quint from '../../images/rooms/quint.jpg';
import quad from '../../images/rooms/quad.jpg';
import triple from '../../images/rooms/triple.jpg';
import double from '../../images/rooms/double.jpg';
import single from '../../images/rooms/single.jpg';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} className="p-3">
      {value === index && children}
    </div>
  );
}

function OptionsWithTabs({ onChangeHandler }) {
  const [value, setValue] = useState(0);

  return (
    <>
      <div className="flex justify-around border-b">
        <button
          className={`p-2 ${value === 0 ? 'border-b-2 border-blue-500' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onChangeHandler('Quint');
            setValue(0);
          }}
        >
          Quint
        </button>
        <button
          className={`p-2 ${value === 1 ? 'border-b-2 border-blue-500' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onChangeHandler('Quad');
            setValue(1);
          }}
        >
          Quad
        </button>
        <button
          className={`p-2 ${value === 2 ? 'border-b-2 border-blue-500' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onChangeHandler('Triple');
            setValue(2);
          }}
        >
          Triple
        </button>
        <button
          className={`p-2 ${value === 3 ? 'border-b-2 border-blue-500' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onChangeHandler('Double');
            setValue(3);
          }}
        >
          Double
        </button>
        <button
          className={`p-2 ${value === 4 ? 'border-b-2 border-blue-500' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onChangeHandler('Single');
            setValue(4);
          }}
        >
          Single
        </button>
      </div>
      <TabPanel value={value} index={0}>
        <img src={quint} alt="Quint" className="w-full h-auto" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <img src={quad} alt="Quad" className="w-full h-auto" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <img src={triple} alt="Triple" className="w-full h-auto" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <img src={double} alt="Double" className="w-full h-auto" />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <img src={single} alt="Single" className="w-full h-auto" />
      </TabPanel>
    </>
  );
}

export default OptionsWithTabs;

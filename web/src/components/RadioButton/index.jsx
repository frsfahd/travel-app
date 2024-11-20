const RadioButton = ({ text, name, selectedValue, onGenderChange }) => {
  const isChecked = selectedValue === text;

  return (
    <div>
      <label
        htmlFor={text}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            required
            type="radio"
            id={text}
            name={name}
            value={text}
            checked={isChecked}
            className="sr-only"
            onChange={onGenderChange}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked ? 'border-primary' : ''
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                isChecked ? '!bg-primary' : ''
              }`}
            ></span>
          </div>
        </div>
        {text}
      </label>
    </div>
  );
};

export default RadioButton;

const DailyForecastButton = ({ className, onClick, text }) => {

  const handleDailyForeClick = () => {
    onClick();
  };

  return (
    <>
      <button className={className} onClick={handleDailyForeClick} >
        {text}
      </button>
    </>
  );
};

export default DailyForecastButton;

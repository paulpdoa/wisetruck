const DateFormatter = ({ date }) => {

    const monthList = ['January','February','March','April','May','June','July','August','September']
    
    const dateFormat = date.split('T')[0];
    
    const year = dateFormat.split('-')[0];
    const month = dateFormat.split('-')[1];
    const day = dateFormat.split('-')[2];

    return (
        <span className="text-gray-900 font-normal">{ monthList[parseInt(month,10) - 1] } { day }, { year } </span>
    )
}

export default DateFormatter;
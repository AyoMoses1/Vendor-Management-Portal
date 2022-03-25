const getAgeBracket = (age) => {
    switch(age){
      case '18 - 24':
        return 'EIGHTEEN_TO_TWENTYFOUR';
      case '25 - 30':
        return 'TWENTYFIVE_TO_THIRTY';
      case '31 - 40':
        return 'THIRTYONE_TO_FORTY';
      default:
        return 'ABOVE_FORTY';
    }
 }

 export default getAgeBracket;
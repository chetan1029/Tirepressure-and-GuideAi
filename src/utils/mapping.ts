const images: { [key: string]: any } = {
    Bicycle: require('../assets/images/bicycle.png'),
    Auto: require('../assets/images/auto.png'),
    Motorcycle: require('../assets/images/motorcycle.png'),
    Default: require('../assets/images/auto.png'),
  };

const rideConditionData: { label: string, value: string }[] = [
  { label: 'Normal', value: 'NR' },
  { label: 'Long Duration (>2 hours)', value: 'LD' },
  { label: 'Wet Road', value: 'WR' },
  { label: 'Cold (<5 C or <41 F)', value: 'COLD' },
];
  
  export { images, rideConditionData };
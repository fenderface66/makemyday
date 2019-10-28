export enum DayType {
  SPORTY = 'sporty',
  ARTY = 'arty',
  SMART = 'smart'
}

type FormValues = {
  type: DayType;
  busyness: number;
  startTime: string;
  endTime: string;
}

export default {

  handleSubmit(values: FormValues) {
    console.log('submitted', values);
  }
};
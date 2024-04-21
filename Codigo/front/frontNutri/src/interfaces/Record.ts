export interface RecordProps {
    record: {
      weight: number;
      height: number;
      physicalActivities: string;
      imc: number;
      waist: number;
      bust: number;
      observations: string;
    };
    onUpdate: () => void;
  }
  
  
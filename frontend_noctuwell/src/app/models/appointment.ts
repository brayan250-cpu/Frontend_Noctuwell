export interface Appointment {
  id: number;
  patientId: number;
  specialistId: number;
  scheduleId: number;
  date: string;
  status?: string | null;
}

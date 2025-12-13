export interface TPrescriptionManagementProps {
  // Add props as needed
}

export interface TPrescription {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  instructions: string;
  createdAt: Date;
}

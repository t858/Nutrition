export interface TPatientManagementProps {
  // Add props as needed
}

export interface TPatient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
}

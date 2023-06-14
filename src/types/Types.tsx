export interface CategoryInterface {
  _id: string;
  categoryName: string;
}

export interface addProductInterface {
  productName: string;
  description: string;
  category: string;
  quantity: number;
  vendorPrice: number;
  vendor: string;
  retailPrice: number;
  status: string;
}

export interface getProductInterface {
  _id: string;
  productName: string;
  description: string;
  category: string;
  quantity: number;
  vendorPrice: number;
  vendor: string;
  retailPrice: number;
  status: string;
}

export interface addPetInterface {
  petName: string;
  gender: string;
  weight: string;
  owner: string;
  ownerEmail: string;
}

export interface getPetInterface {
  _id: string;
  petName: string;
  gender: string;
  weight: string;
  owner: string;
  ownerEmail: string;
}

export interface addStaffInterface {
  employeeName: string;
  employeeId: string;
  role: string;
  contactNumber: string;
  address: string;
  gender: string;
}

export interface getStaffInterface {
  _id: string;
  employeeName: string;
  employeeId: string;
  role: string;
  contactNumber: string;
  address: string;
  gender: string;
}

export interface getMedicalHistory {
  _id: string;
  petId: string;
  veterinarian: string;
  medicalConditions: string;
  medications: string;
  allergies: string;
  medicalNotes: string;
  appointmentDate: string;
}

export interface addAppointmentInterface {
  petId: string;
  appointmentDate: Date;
  veterinarian: string;
  medicalConditions: string;
  medications: string;
  allergies: string;
  medicalNotes: string;
}

export interface getAppointmentInterface {
  _id: string;
  petId: string;
  appointmentDate: Date;
  veterinarian: string;
  medicalConditions: string;
  medications: string;
  allergies: string;
  medicalNotes: string;
}

export interface loginInterface {
  email: string;
  password: string;
}

export interface getMonthlyData {
  _id: string;
  count: number;
}

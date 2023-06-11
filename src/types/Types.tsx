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
}

export interface getPetInterface {
  _id: string;
  petName: string;
  gender: string;
  weight: string;
  owner: string;
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

export interface addAppointmentInterface {
  petName: string;
  ownerName: string;
  description: string;
  appointmentDate: Date;
}

export interface getAppointmentInterface {
  _id: string;
  petName: string;
  ownerName: string;
  description: string;
  appointmentDate: Date;
}

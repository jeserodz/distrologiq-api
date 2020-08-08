export class CreateDestinationDTO {
  name: string;
  email: string;
  phone: string;
  code: string;
  references: string;
  longitude: number;
  latitude: number;
}

export class UpdateDestinationDTO {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  code?: string;
  references?: string;
  longitude?: number;
  latitude?: number;
}

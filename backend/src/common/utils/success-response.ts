type Meta = {
  currentPage: number;
  nextPage: number | null;
  lastPage: number;
  perPage: number;
  total: number;
}
export class SuccessResponse {
  success: boolean;
  message?: string;
  code: number;
  data: any;
  meta? : Meta

  constructor(data: any, code = 200, message?: string, success = true, meta?: Meta ) {
    this.success = success;
    this.code = code;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}
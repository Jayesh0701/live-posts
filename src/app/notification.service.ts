import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}
  showSuccess(header: string, message: string) {
    Swal.fire({
      icon: 'success',
      title: header,
      text: message,
      showConfirmButton: true,
    });
  }
  showError(header:string,message: string) {
    Swal.fire({
        icon: 'error',
        title: header,
        text: message,
        showConfirmButton: true,
      });
  }
}

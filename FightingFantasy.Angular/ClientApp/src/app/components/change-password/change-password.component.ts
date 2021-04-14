import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    newPasswordConfirm: new FormControl('', Validators.required),
  }, { validators: this.checkPasswords });

  constructor(private apiService: ApiService, private router: Router) { 
    console.log('change password loading');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.warn(this.changePasswordForm.value);
    var oldPassword = this.changePasswordForm.value.oldPassword;
    var newPassword = this.changePasswordForm.value.newPassword;

    this.apiService.client.changePassword(oldPassword, newPassword).then(
      () => {
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error.title);
      });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('newPassword').value;
    const confirmPassword = group.get('newPasswordConfirm').value;

    return password === confirmPassword ? null : { notSame: true }
  }

}

import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../ApiService/employer.service';
@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {
  public optionSelected: string = "";
  public employerRequirementDetails: EmployerRequirementDetails = { TotalProfessions: [], contractPeriod: '', leaveAfterMonths: '', leaveSalary: 0, email: '', contactNo: '', nameOfCaller: '', nameOfCompany: '' };
  public SignleProfession: SignleProfession = { amount: '', currency: '', jobDescription: '', placeofEmployment: '', profession: '', quantity: '' };

  constructor(public employerService: EmployerService) {

  }


  ngOnInit() {
  }

  addEmpProfessions(e) {
    if (e) e.preventDefault();
    // this.newEmpProfessions=newEmpProfessions;
    // console.log('this.newEmpProfessions', this.SignleProfession);
    this.employerRequirementDetails.TotalProfessions.push(this.SignleProfession);
    this.SignleProfession = { amount: '', currency: '', jobDescription: '', placeofEmployment: '', profession: '', quantity: '' };
  }

  removeEmpProfessions(qualIndex) {
    this.employerRequirementDetails.TotalProfessions.splice(qualIndex, 1);
  }

  submitRequirementDetails() {
    console.log(this.employerRequirementDetails);
    if (this.employerRequirementDetails.TotalProfessions.length <= 0) {
      this.atleastOneProfessionMsg();
      return;
    }
    else {
      //alert('corect');
      this.employerService.Create(this.employerRequirementDetails).subscribe(succ => {
        console.log(succ);
      }, err => {
        console.log(err);
      }, () => {
        alert('submit complete');
      })
    }
  }

  atleastOneProfessionMsg() {
    document.getElementById("noProfessionError").innerHTML = "Please provide atleast one profession";
    setTimeout(function () {
      document.getElementById("noProfessionError").innerHTML = "";
    }, 1500);
  }

}

interface EmployerRequirementDetails {
  TotalProfessions: SignleProfession[],
  contractPeriod: string,
  leaveSalary: number
  leaveAfterMonths: string,
  nameOfCaller: string,
  nameOfCompany: string,
  email: string,
  contactNo: string
}

interface SignleProfession {
  profession: string,
  quantity: string,
  placeofEmployment: string,
  jobDescription: string,
  currency: string,
  amount: string
}

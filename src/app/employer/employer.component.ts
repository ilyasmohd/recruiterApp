import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {
  public optionSelected: string = "";
  public newEmpProfessions: EmpProfessions = {
    profession: "", quantity: "", placeofEmployment: "",
    jobDescription: "", currency: 0, amount: 0
  };
  public empObj: EmpProfessionsDetails = { EmpProfessions: [], period: "", salary: 0 };

  constructor() { }


  ngOnInit() {
  }

  addEmpProfessions(e) {
    if (e) e.preventDefault();
    // this.newEmpProfessions=newEmpProfessions;
    console.log('this.newEmpProfessions', this.newEmpProfessions);
    if (this.newEmpProfessions.profession != "" && this.newEmpProfessions.quantity != ""
     && this.newEmpProfessions.placeofEmployment != "" && this.newEmpProfessions.jobDescription!= "" 
     && this.newEmpProfessions.currency!= 0 && this.newEmpProfessions.amount!= 0) {
    this.empObj.EmpProfessions.push(this.newEmpProfessions);
    this.newEmpProfessions = null;
    }
    else{
      alert("please enter all fields")
    }
  }

  removeEmpProfessions(qualIndex) {
    this.empObj.EmpProfessions.splice(qualIndex, 1);
  }

}

interface EmpProfessionsDetails {
  EmpProfessions: EmpProfessions[],
  period: string,
  salary: number
}

interface EmpProfessions {
  profession: string,
  quantity: string,
  placeofEmployment: string,
  jobDescription: string,
  currency: number,
  amount: number
}

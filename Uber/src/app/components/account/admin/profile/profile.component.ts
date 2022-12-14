import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  ngOnInit(): void {
    
    const profile = document.getElementById("profile");
    this.changeColor(profile as HTMLButtonElement);

    const favoriteLocations = document.getElementById("favorite");
    this.changeColor(favoriteLocations as HTMLButtonElement);

  }
  url: string | ArrayBuffer | null | undefined;
  
  onSelectFile(event : any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
    }
  }
  
  public delete(){
    this.url = null;
  }
  changeColor(button : HTMLButtonElement) : void {
    if (button != null) {
      button.addEventListener('click', function change(event){
        button.style.color = 'red';
        // button.setAttribute('src', "../../../../assets/images/unfilled_star.png");
        // if (button.getAttribute('src') == "../../../../assets/images/unfilled_star.png") {
        //   button.setAttribute('src', "../../../../assets/images/star.png");
        // } else {
        //   button.setAttribute('src', "../../../../assets/images/unfilled_star.png");
        // }
      });
    }
  }
}
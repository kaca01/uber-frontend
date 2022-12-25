import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
	@Input() pickup = '';
	@Input() destination = '';

	ngOnInit() : void {
		const Menu = document.getElementById("menu-container");
		const Close = document.getElementById("close-dialog");

		if (Menu != null) {
			Menu.style.display = 'none';
	  
			Menu.addEventListener('click', function open(event){
			  const Form = document.getElementById("form");
			  if (Form != null) Form.style.display = 'block';
			  Menu.style.display = 'none';
			});
		  }

		if (Close != null) {
			Close.addEventListener('click', function close(event){
			  const Form = document.getElementById("form");
			  if (Form != null) {
				Form.style.display = 'none';
				if (Menu != null) Menu.style.display = 'block';
				
			  }
			});
		}
	}

	getPickup(pickup: string) {
		console.log(pickup);
		this.pickup = pickup;
		
	}

	getDestination(destination: string) {
		console.log(destination);
		this.destination = destination;
	}

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../list-of-users/user.service';


@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent implements OnInit{
	public userId: number = -1;
	public role: string = "";

	constructor(private userService: UserService) {}

	ngOnInit() : void {
		this.setCurrentUserRole();
		const history = document.getElementById('history');
		if (history) {
			this.display("history");
		}
	}

	private closeAllDialogs(history : HTMLElement, details : HTMLElement, ratings : HTMLElement) : void {
		if (history && details && ratings) {
			history.style.display = 'none';
			details.style.display = 'none';
			ratings.style.display = 'none';
		}
	}

	display(dialog : String) {
		const history = document.getElementById('history');
		const details = document.getElementById('details');
		const ratings = document.getElementById('ride-ratings');
		if (history && details && ratings) {
			this.closeAllDialogs(history, details, ratings);
			if (dialog == "history") history.style.display = 'block';
			else if (dialog == "details") details.style.display = 'block';
			else if (dialog == 'ratings') ratings.style.display = 'block';
		}
	}

	setCurrentUserRole() {
		if (this.userService.currentUser != undefined)
			this.role = this.userService.currentUser?.roles[0].name;
	}
}


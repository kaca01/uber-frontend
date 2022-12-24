import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent {
  constructor(private router : Router) {}

  ngOnInit() : void {
	// getting all dialogs
    const history = document.getElementById('history');
    const details = document.getElementById('details');
    const ratings = document.getElementById('ride-ratings');

	// navigation
    const navHistory = document.getElementById('nav-history');

	// other elements
	const histories = document.getElementsByClassName("list-item");
	const arr = Array.from(histories);

	const viewRatings = document.getElementById('ratings');
	const backToHistory = document.getElementById('back-to-history');
	const backToDetails = document.getElementById('back-to-details');

    if (history && details && ratings && navHistory) {
		// adding click listeners
		display("history");

		navHistory.addEventListener('click', function click(event){
			display("history");
		});

		arr.forEach (oneHistory =>{
			if (oneHistory != null) {
			oneHistory.addEventListener('click', function click(event){
				display("details");
			});
			}
		});

		if (viewRatings != null) {
			viewRatings.addEventListener('click', function click(event){
			display("ratings");
			});
		}
		
		if (backToHistory != null) {
			backToHistory.addEventListener('click', function click(event){
			display("history");
			});
		}

		if (backToDetails != null) {
			backToDetails.addEventListener('click', function click(event){
			display("details");
			});
		}
    }

	function display(dialog : String) : void {
		closeAllDialogs();
		if (history && details && ratings != null) {
			if (dialog == "history") history.style.display = 'block';
			else if (dialog == "details") details.style.display = 'block';
			else if (dialog == 'ratings') ratings.style.display = 'block';
		}
	}

	function closeAllDialogs() : void {
		if (history && details && ratings != null) {
			history.style.display = 'none';
			details.style.display = 'none';
			ratings.style.display = 'none';
		}
	}
	}
}

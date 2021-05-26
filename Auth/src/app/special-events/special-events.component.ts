import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  constructor(private specialService: EventsService, private router: Router) { }

  specialEvents = []
  ngOnInit(): void {
    this.specialService.getSpecialEvents().subscribe(
      res => this.specialEvents = res,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status == 401){
            this.router.navigate(['/login'])
          }
        }
      }
    )
  }

}

/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/models/user.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
    //Variables
    user_details: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private user_service: UserService,
        private change_detector_ref: ChangeDetectorRef,
        private router: Router,
    ) {}

    ngOnInit(): void {
        // Subscribe to user changes
        this.user_service.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: (user: User) => {
                    this.user_details = user;
                    console.log(user);

                    // Mark for check
                    this.change_detector_ref.markForCheck();
                },
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }
}

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzureAdDemoService } from '../azure-ad-demo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserLoggedIn = false;
  private readonly _destroy = new Subject<void>();
  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
  private msalBroadCastService: MsalBroadcastService,
  private authService: MsalService, private azureADDemoService: AzureAdDemoService) { }

  ngOnInit(): void {
    this.msalBroadCastService.inProgress$.pipe((filter((interactionStatus: InteractionStatus) =>  interactionStatus == InteractionStatus.None), takeUntil(this._destroy)))
    .subscribe(x => {
      this.azureADDemoService.isUserLoggedIn.next(this.authService.instance.getAllAccounts().length > 0);
    })
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login() {
    if(this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() {
    this.authService.logoutRedirect({postLogoutRedirectUri: environment.postLogoutUrl});
  }
}

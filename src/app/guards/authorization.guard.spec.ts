import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthorizationGuard } from './authorization.guard';

describe('AuthorizationGuard', () => {
  // @ts-ignore

  const executeGuard: CanActivateFn = (...guardParameters) => {
    // @ts-ignore
    return TestBed.runInInjectionContext(() => new AuthorizationGuard(...guardParameters));
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GraphRenderService } from './graph-render.service';

describe('GraphRenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphRenderService = TestBed.get(GraphRenderService);
    expect(service).toBeTruthy();
  });
});

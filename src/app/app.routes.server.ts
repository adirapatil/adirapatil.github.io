import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Client
  },
  {
    path: 'login',
    renderMode: RenderMode.Client
  },
  {
    path: 'signup',
    renderMode: RenderMode.Client
  },
  {
    path: 'forgot-password',
    renderMode: RenderMode.Client
  },
  {
    path: 'pricing',
    renderMode: RenderMode.Client
  },
  {
    path: 'docs',
    renderMode: RenderMode.Client
  },
  {
    path: 'about',
    renderMode: RenderMode.Client
  },
  {
    path: 'blog',
    renderMode: RenderMode.Client
  },
  {
    path: 'careers',
    renderMode: RenderMode.Client
  },
  {
    path: 'help',
    renderMode: RenderMode.Client
  },
  {
    path: 'contact',
    renderMode: RenderMode.Client
  },
  {
    path: 'status',
    renderMode: RenderMode.Client
  },
  {
    path: 'privacy',
    renderMode: RenderMode.Client
  },
  {
    path: 'terms',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

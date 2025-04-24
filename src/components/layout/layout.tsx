import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../theme-provider';
import { Header } from './header';

export function Layout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="delivery-task-theme">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

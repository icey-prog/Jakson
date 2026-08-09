import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';

/**
 * Navigation vers une ancre de la page d'accueil, depuis n'importe quelle page.
 *
 * Sans ça, un `document.querySelector('#services')` posé dans un composant partagé
 * (Navigation, Footer) ne trouve rien dès qu'on n'est pas sur `/` : le clic ne fait
 * simplement rien. Le passage par `navigate('/')` règle le cas pour tous les appelants.
 */
export function useAnchorNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
      e.preventDefault();
      if (pathname === '/') {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // ScrollToHash (App.tsx) fait défiler une fois la page d'accueil montée.
        navigate(`/${hash}`);
      }
    },
    [pathname, navigate],
  );
}

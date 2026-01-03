'use client';

import { useRouter } from "next/navigation";

/**
 * 
 * @param {Object} param0 
 * @param {{request:any}=>void} param0.fetch - The fetch function to use for API calls
 */
export default function useAuthentication({ fetch }) {
  const router = useRouter();

  return new Promise((resolve, reject) => {
    fetch('/api/user', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to authenticate user');
        }

        if (response.status === 401) {
          return router.push('/login');
        }

        return response;
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}
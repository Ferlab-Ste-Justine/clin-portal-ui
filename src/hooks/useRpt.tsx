import { useCallback, useEffect, useState } from 'react';
import { RptManager } from 'auth/rpt';
import { DecodedRpt } from 'auth/types';

export const useRpt = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [rpt, setRpt] = useState('');
  const [decodedRpt, setDecodedRpt] = useState<DecodedRpt>();

  const fetchRpt = useCallback(async () => {
    try {
      const rpt = await RptManager.readRpt();
      setRpt(rpt.access_token);
      setDecodedRpt(rpt.decoded);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => await fetchRpt())();
  }, [fetchRpt]);

  return {
    loading,
    decodedRpt,
    rpt,
    error,
  };
};

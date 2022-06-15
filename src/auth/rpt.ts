import { sendRequest } from 'api';
import jwtDecode from 'jwt-decode';

import { keycloakConfig } from 'utils/config';

import { logout } from './keycloak';
import { DecodedRpt, IRptPayload } from './types';

const KEYCLOAK_AUTH_GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:uma-ticket';
export const RPT_TOKEN_URL = `${keycloakConfig.url}realms/clin/protocol/openid-connect/token`;

const rptPayload = new URLSearchParams({
  grant_type: KEYCLOAK_AUTH_GRANT_TYPE,
  audience: keycloakConfig.authClientId,
}).toString();

const decodeRptAccess = (rpt: IRptPayload): DecodedRpt => jwtDecode(rpt.access_token);

const fetchRptToken = async (): Promise<IRptPayload> => {
  const { data, error } = await sendRequest<IRptPayload>({
    method: 'POST',
    url: RPT_TOKEN_URL,
    data: rptPayload,
  });

  if (error) {
    await logout();
  }

  return {
    ...data!,
    decoded: decodeRptAccess(data!),
  };
};

const isTokenUnexpired = (iat: number, expires_in: number) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = iat + expires_in;
  return currentTime < expirationTime;
};

export class RptManager {
  private static storedRpt?: IRptPayload;

  private static async requestNewRpt() {
    return fetchRptToken();
  }

  private static async readRptFromStorage() {
    if (this.storedRpt == null) {
      this.storedRpt = await this.requestNewRpt();
    }
    return this.storedRpt;
  }

  public static async readRpt(): Promise<IRptPayload> {
    const rpt = await this.readRptFromStorage();
    if (isTokenUnexpired(rpt.decoded.iat, rpt.expires_in)) {
      return rpt;
    }
    return this.requestNewRpt();
  }
}

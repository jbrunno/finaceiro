import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import createHttpError from 'http-errors';
import { dashboardApiGateway } from '../dashboardApiGateway';
import { DASHBOARD_ICM_ERRORS, getIcm } from './icmGateway';
import { icm, icmRequests } from './icmGateway.mock';

describe('icmGateway', () => {
  const mockAdapter = makeMockAdapter(dashboardApiGateway);

  describe('getIcm', () => {
    it('test getIcm request success', async () => {
      icmRequests(mockAdapter);

      await expect(getIcm()).resolves.toEqual(icm);
    });

    it('test getIcm request error', async () => {
      icmRequests(mockAdapter, true);

      await expect(getIcm()).rejects.toEqual(
        createHttpError(400, DASHBOARD_ICM_ERRORS.BAD_REQUEST),
      );
      await expect(getIcm()).rejects.toEqual(
        createHttpError(500, DASHBOARD_ICM_ERRORS.SOMETHING_WENT_WRONG),
      );
      await expect(getIcm()).rejects.toEqual(
        createHttpError(503, DASHBOARD_ICM_ERRORS.SERVICE_UNAVAILABLE),
      );
    });
  });
});

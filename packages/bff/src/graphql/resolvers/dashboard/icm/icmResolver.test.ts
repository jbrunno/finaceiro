import { gqlTestRequest } from '@test-utils/gqlTestRequest';
import { Icm } from '@/domain/dashboard/icm/icmDomain';
import { dashboardApiGateway } from '@/gateway';
import { ICM_ERROR_MESSAGES } from '@/adapters/dashboard/icm/icmAdapter';
import { makeMockAdapter } from '@test-utils/makeMockAdapter';
import { token, ICM, icm, icmRequests } from './icmResolver.mock';

describe('icmResolver', () => {
  const mockAdapter = makeMockAdapter(dashboardApiGateway);

  describe('icm', () => {
    it('test icm query success', async () => {
      icmRequests(mockAdapter);

      const response = await gqlTestRequest(ICM, {
        headers: { Authorization: token },
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.icm).toEqual(new Icm(icm));
    });

    it('test icm query error', async () => {
      icmRequests(mockAdapter, true);

      const response = () =>
        gqlTestRequest(ICM, {
          headers: { Authorization: token },
        });

      const [error400] = (await response()).errors || [];
      expect(error400?.message).toEqual(
        ICM_ERROR_MESSAGES.DASHBOARD_ICM_ERROR_BAD_REQUEST,
      );

      const [error500] = (await response()).errors || [];
      expect(error500?.message).toEqual(
        ICM_ERROR_MESSAGES.DASHBOARD_ICM_ERROR_SOMETHING_WENT_WRONG,
      );

      const [error503] = (await response()).errors || [];
      expect(error503?.message).toEqual(
        ICM_ERROR_MESSAGES.DASHBOARD_ICM_ERROR_SERVICE_UNAVAILABLE,
      );
    });
  });
});
